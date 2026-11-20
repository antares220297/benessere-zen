#!/usr/bin/env node
/**
 * Validate Shopify OS 2.0 JSON templates and section groups.
 * - every key in `sections` is in `order`, and vice versa
 * - each section type exists as sections/<type>.liquid
 * - each block type exists in that section schema
 * - each setting id exists on the section or block schema
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const warnings = [];

function schemaOf(type) {
  const path = join(root, "sections", `${type}.liquid`);
  if (!existsSync(path)) return null;
  const source = readFileSync(path, "utf8");
  const start = source.indexOf("{% schema %}");
  const end = source.indexOf("{% endschema %}");
  if (start < 0 || end < 0) return { missing: true, path };
  try {
    return JSON.parse(source.slice(start + "{% schema %}".length, end));
  } catch (error) {
    return { invalid: error.message, path };
  }
}

const cache = new Map();
function getSchema(type) {
  if (!cache.has(type)) cache.set(type, schemaOf(type));
  return cache.get(type);
}

function settingIds(list) {
  return new Set((list || []).map((setting) => setting.id).filter(Boolean));
}

function checkInstance(file, key, instance) {
  if (!instance || typeof instance !== "object") {
    errors.push(`${file}: section "${key}" is not an object`);
    return;
  }
  const type = instance.type;
  if (!type) {
    errors.push(`${file}: section "${key}" has no type`);
    return;
  }
  if (String(type).startsWith("shopify://")) return;
  const schema = getSchema(type);
  if (!schema) {
    errors.push(`${file}: section "${key}" type "${type}" has no sections/${type}.liquid`);
    return;
  }
  if (schema.missing || schema.invalid) {
    errors.push(`${file}: section "${key}" type "${type}" schema ${schema.invalid || "missing"}`);
    return;
  }
  const sectionSettings = settingIds(schema.settings);
  for (const id of Object.keys(instance.settings || {})) {
    if (!sectionSettings.has(id)) {
      const message = `${file}: section "${key}" (${type}) unknown setting "${id}"`;
      if (String(type).startsWith("bz-")) errors.push(message);
      else warnings.push(message);
    }
  }
  const blocks = schema.blocks || [];
  const byType = new Map(blocks.map((block) => [block.type, settingIds(block.settings)]));
  const used = instance.blocks || {};
  for (const [blockId, block] of Object.entries(used)) {
    if (!block || !byType.has(block.type)) {
      errors.push(`${file}: section "${key}" (${type}) unknown block "${block?.type}" (${blockId})`);
      continue;
    }
    const ids = byType.get(block.type);
    for (const id of Object.keys(block.settings || {})) {
      if (!ids.has(id)) {
        const message = `${file}: section "${key}" block "${blockId}" (${block.type}) unknown setting "${id}"`;
        if (String(type).startsWith("bz-")) errors.push(message);
        else warnings.push(message);
      }
    }
  }
  if (Array.isArray(instance.block_order)) {
    const keys = new Set(Object.keys(used));
    const order = new Set(instance.block_order);
    for (const id of keys) {
      if (!order.has(id)) errors.push(`${file}: section "${key}" block "${id}" missing from block_order`);
    }
    for (const id of instance.block_order) {
      if (!keys.has(id)) errors.push(`${file}: section "${key}" block_order "${id}" missing from blocks`);
    }
  }
}

function checkFile(file) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8").replace(/^\s*\/\*[\s\S]*?\*\//, ""));
  } catch (error) {
    errors.push(`${relative(root, file)}: invalid JSON (${error.message})`);
    return;
  }
  if (!data.sections || !data.order) return;
  const sectionKeys = Object.keys(data.sections);
  const order = Array.isArray(data.order) ? data.order : [];
  const rel = relative(root, file);
  for (const key of sectionKeys) {
    if (!order.includes(key)) errors.push(`${rel}: sections key "${key}" not in order`);
  }
  for (const key of order) {
    if (!Object.prototype.hasOwnProperty.call(data.sections, key)) {
      errors.push(`${rel}: order key "${key}" missing from sections`);
    }
  }
  for (const key of sectionKeys) checkInstance(rel, key, data.sections[key]);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (name.endsWith(".json")) checkFile(path);
  }
}

walk(join(root, "templates"));
for (const name of readdirSync(join(root, "sections"))) {
  if (name.includes("group") && name.endsWith(".json")) checkFile(join(root, "sections", name));
}

if (warnings.length) {
  console.log(`${warnings.length} legacy warning(s) on non-bz sections (Shopify keeps these settings; they do not reject the file)`);
}
if (errors.length) {
  console.error(`${errors.length} error(s)`);
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log("validate-theme-json: 0 errors");
