"""Verifica locale con Playwright e salva HTML e schermate di due libri."""
from html import escape
import re
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright

from importlib import import_module

build = import_module('bz-libro-build')
ROOT = build.ROOT
OUT = build.SHARED / 'revisione-simona/build/libro-prova'


def fixture(slug):
    """Applica al frammento Liquid le variabili e i rami usati dal libro."""
    book = (ROOT / 'snippets' / f'bz-libro-{slug}.liquid').read_text()
    pages = book.split('{% capture pagine %}\n')[1].split('{% endcapture %}')[0]
    title = re.search(r'titolo: "([^"]+)"', book)[1]
    chapters = re.findall(r'capitolo_\d: "([^"]+)"', book)
    shell = (ROOT / 'snippets/bz-libro-interno.liquid').read_text()
    shell = shell.split('-%}', 1)[1]
    def chapter_buttons(match):
        inner = match[1]
        break_at = r'{%- if forloop.index == 3 -%}(.*?){%- endif -%}'
        return ''.join(re.sub(break_at, lambda m: m[1] if i == 2 else '', inner, flags=re.S)
                       .replace('{{ inizi[forloop.index0] }}', str(3 + 3 * i))
                       .replace('{{ forloop.index0 }}', str(i))
                       .replace('{{ capitolo | escape }}', escape(name)) for i, name in enumerate(chapters))

    shell = re.sub(r'{%- for capitolo in capitoli -%}(.*?){%- endfor -%}', chapter_buttons, shell, flags=re.S)
    shell = shell.replace('{{ pagine }}', pages).replace('{{ titolo | escape }}', escape(title))
    shell = shell.replace('{{ genitivo | escape }}', escape(title.lower()))
    shell = re.sub(r"{{ '([^']+)' \| asset_url \| stylesheet_tag }}", r'<link rel="stylesheet" href="assets/\1">', shell)
    shell = re.sub(r"{{ '([^']+)' \| asset_url }}", r'./assets/\1', shell)
    assert not re.search(r'{[{%]', shell), slug
    return (f'<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<base href="{ROOT.as_uri()}/"><title>{escape(title)}</title><link rel="stylesheet" href="assets/bz-tokens.css">'
            '<style>body{margin:0}main{background:var(--bz-bg);color:var(--bz-text);min-height:100vh}</style>'
            f'<main class="bz">{shell}</main></html>')


def serve_fixture(route):
    path = urlsplit(route.request.url).path
    source = ROOT / path[1:] if path.startswith('/assets/') else OUT / path[1:]
    if source.suffix == '.html' and source.is_file():
        html = source.read_text().replace(f'<base href="{ROOT.as_uri()}/">', '')
        route.fulfill(body=html, content_type='text/html; charset=utf-8')
    elif source.is_file():
        route.fulfill(path=source)
    else:
        route.fulfill(status=404)


def verify(browser, slug, width, mode):
    page = browser.new_page(viewport={'width': width, 'height': 932 if width <= 430 else 1050},
                            reduced_motion='reduce' if mode == 'html' else 'no-preference')
    errors, failed, requests = [], [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: failed.append(response.url) if response.status >= 400 else None)
    page.on('request', lambda request: requests.append(request.url))
    if mode == 'no-webgl':
        page.add_init_script('window.WebGL2RenderingContext = undefined')
    page.route('http://libro.test/**', serve_fixture)
    page.goto(f'http://libro.test/{slug}.html')
    page.wait_for_selector('.lb.is-enhanced')
    page.evaluate('document.fonts.ready')
    if mode == '3d':
        page.wait_for_selector('.lb.is-3d', timeout=30000)
    else:
        assert page.locator('.lb.is-plain').count() == 1
    assert page.evaluate('document.documentElement.scrollWidth === innerWidth')
    assert page.locator('.lb-ch').count() == 4
    if width in (430, 1440) and mode == 'html':
        page.locator('.lb').screenshot(path=OUT / f'{slug}-{width}-chiuso.png')
    page.locator('.lb-open').click()
    page.wait_for_selector('.lb[data-state="open"]')
    if mode == '3d':
        page.wait_for_timeout(1500)
        page.locator('.lb').screenshot(path=OUT / f'{slug}-{width}-3d-frontespizio.png')
    else:
        page.wait_for_selector('.pg--front.is-on')
        if width in (430, 1440) and mode == 'html':
            page.locator('.lb').screenshot(path=OUT / f'{slug}-{width}-frontespizio.png')
    for button in page.locator('.lb-ch').all():
        button.click()
        page.wait_for_function(
            '(n) => Array.from(document.querySelectorAll(".lb-ch")).some(button => button.dataset.to === n && button.hasAttribute("aria-current"))',
            arg=button.get_attribute('data-to'),
        )
        if mode != '3d':
            assert not page.locator('.pg.is-on .pg-body').evaluate_all(
                '(nodes) => nodes.some(n => n.getBoundingClientRect().bottom > n.closest(".pg").getBoundingClientRect().bottom)')
    page.locator('.lb-ch').first.click()
    if mode != '3d':
        page.locator('.lb-next').click()
        if width <= 430:
            page.locator('.lb-next').click()
        page.wait_for_selector('.pg[data-n="5"].is-on')
        assert page.locator('.pg[data-n="5"] dt').count() == 5
        if width in (430, 1440) and mode == 'html':
            page.locator('.lb').screenshot(path=OUT / f'{slug}-{width}-in-breve.png')
    page.locator('.lb-all').click()
    page.wait_for_selector('dialog[open]')
    assert page.locator('dialog .pg-ex').count() == 1
    assert (page.locator('dialog img').count() > 0) == (slug == 'ametista')
    page.keyboard.press('Escape')
    assert page.locator('dialog[open]').count() == 0
    assert bool([url for url in requests if 'libro-3d.js' in url]) == (mode == '3d'), (slug, width, mode)
    assert not errors and not failed, (errors, failed)
    page.close()
    print(slug, width, mode, 'OK', flush=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    slugs = ('ametista', 'quarzo-rosa')
    for slug in slugs:
        (OUT / f'{slug}.html').write_text(fixture(slug))
    with sync_playwright() as p:
        browser = p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
        for slug in slugs:
            for width in (320, 430, 1440):
                verify(browser, slug, width, 'html')
            verify(browser, slug, 430, 'no-webgl')
            for width in (430, 1440):
                verify(browser, slug, width, '3d')
        browser.close()


if __name__ == '__main__':
    main()
