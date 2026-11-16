#!/usr/bin/env python3
"""Validate Shopify JSON templates and section groups against section schemas.

Checks range step counts, setting ids, block types, url values, and richtext tags.
Shopify richtext allows only p, ul, ol, li, a, strong, em, b, i, br, span.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RICH_TAGS = {"p", "ul", "ol", "li", "a", "strong", "em", "b", "i", "br", "span"}
HEADING_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6"}
TAG_RE = re.compile(r"</?([a-zA-Z0-9]+)")
URL_OK = re.compile(
    r"^(?:/|https?://|shopify://|mailto:|tel:|#)",
    re.IGNORECASE,
)


def load_json(path):
    text = path.read_text(encoding="utf-8")
    start = text.find("{")
    if start < 0:
        raise ValueError("no JSON object")
    return text[:start], json.loads(text[start:])


def schemas():
    found = {}
    for path in (ROOT / "sections").glob("*.liquid"):
        text = path.read_text(encoding="utf-8", errors="replace")
        if "{% schema %}" not in text:
            continue
        raw = text.split("{% schema %}", 1)[1].split("{% endschema %}", 1)[0]
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as error:
            found[path.stem] = {"error": str(error)}
            continue
        settings = {}
        for setting in data.get("settings") or []:
            if isinstance(setting, dict) and setting.get("id"):
                settings[setting["id"]] = setting
        blocks = {}
        for block in data.get("blocks") or []:
            if not isinstance(block, dict):
                continue
            block_settings = {}
            for setting in block.get("settings") or []:
                if isinstance(setting, dict) and setting.get("id"):
                    block_settings[setting["id"]] = setting
            blocks[block.get("type")] = block_settings
        found[path.stem] = {"settings": settings, "blocks": blocks, "error": None}
    return found


def richtext_tags(value):
    return {match.group(1).lower() for match in TAG_RE.finditer(value or "")}


def check_setting(setting, value, where, issues):
    kind = setting.get("type")
    if kind in ("richtext", "inline_richtext") and isinstance(value, str):
        tags = richtext_tags(value)
        blocked = tags - RICH_TAGS - HEADING_TAGS
        headings = tags & HEADING_TAGS
        if blocked:
            issues.append(f"RICHTEXT {where} disallowed tags: {', '.join(sorted(blocked))}")
        if headings:
            issues.append(f"RICHTEXT_HEADING {where} headings: {', '.join(sorted(headings))}")
    if kind == "url" and isinstance(value, str) and value.strip():
        if not URL_OK.match(value.strip()):
            issues.append(f"URL {where} invalid: {value[:80]}")
    if kind == "range":
        minimum, maximum, step = setting.get("min"), setting.get("max"), setting.get("step")
        if None not in (minimum, maximum, step) and step and (maximum - minimum) / step > 100:
            issues.append(f"RANGE {where} too many steps")


def check_document(path, doc, section_schemas, issues):
    sections = doc.get("sections") or {}
    order = doc.get("order") or []
    rel = path.relative_to(ROOT)
    for key in order:
        if key not in sections:
            issues.append(f"ORDER {rel} missing section {key}")
    for key, section in sections.items():
        if not isinstance(section, dict):
            continue
        section_type = section.get("type")
        if not section_type:
            issues.append(f"TYPE {rel} {key} has no type")
            continue
        schema = section_schemas.get(section_type)
        if schema is None:
            issues.append(f"MISSING_SECTION {rel} {key} type {section_type}")
            continue
        if schema.get("error"):
            issues.append(f"SCHEMA {section_type} {schema['error']}")
            continue
        for setting_id, value in (section.get("settings") or {}).items():
            setting = schema["settings"].get(setting_id)
            if setting is None:
                issues.append(f"UNKNOWN_SETTING {rel} {section_type}.{setting_id}")
                continue
            check_setting(setting, value, f"{rel} {section_type}.{setting_id}", issues)
        for block_id, block in (section.get("blocks") or {}).items():
            if not isinstance(block, dict):
                continue
            block_type = block.get("type")
            if block_type not in schema["blocks"]:
                issues.append(f"UNKNOWN_BLOCK {rel} {section_type} block {block_type}")
                continue
            for setting_id, value in (block.get("settings") or {}).items():
                setting = schema["blocks"][block_type].get(setting_id)
                if setting is None:
                    issues.append(f"UNKNOWN_SETTING {rel} {section_type}.{block_type}.{setting_id}")
                    continue
                check_setting(setting, value, f"{rel} {section_type}.{block_type}.{setting_id}", issues)


def main():
    section_schemas = schemas()
    issues = []
    files = list((ROOT / "templates").rglob("*.json"))
    files += list((ROOT / "sections").glob("*-group*.json"))
    files += list((ROOT / "sections").glob("*group.json"))
    seen = set()
    for path in files:
        if path in seen:
            continue
        seen.add(path)
        try:
            _, doc = load_json(path)
        except Exception as error:
            issues.append(f"JSON {path.relative_to(ROOT)} {error}")
            continue
        if "sections" not in doc and "order" not in doc:
            continue
        check_document(path, doc, section_schemas, issues)
    reject_prefixes = ("RICHTEXT ", "URL ", "MISSING_SECTION", "UNKNOWN_BLOCK", "RANGE", "JSON ", "ORDER ", "TYPE ", "SCHEMA ")
    reject = [line for line in issues if line.startswith(reject_prefixes)]
    extra = [line for line in issues if line.startswith("UNKNOWN_SETTING")]
    headings = [line for line in issues if line.startswith("RICHTEXT_HEADING")]
    print(f"files {len(seen)}")
    print(f"reject {len(reject)} extra_settings {len(extra)} headings {len(headings)}")
    print("Shopify drops a template for disallowed richtext, a bad url, a missing section, or an unknown block.")
    print("Extra setting ids are reported because they are not in the schema; Shopify ignores them.")
    for line in reject + headings:
        print(line)
    if extra:
        print(f"... {len(extra)} extra setting ids omitted from this list")
    return 1 if reject else 0


if __name__ == "__main__":
    sys.exit(main())
