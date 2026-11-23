"""Genera gli snippet del grimorio e inserisce la sezione nei template PDP."""
import csv
from html import escape
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SHARED = Path('/home/box/shared/benessere-zen')
MOCK = SHARED / 'approfondimenti/mockup-grimorio/libro'
GRIMOIRE = SHARED / 'grimorio'
FAMILIES = ('ametista', 'quarzo-rosa', 'selenite', 'cristallo-di-rocca',
            'lapislazzuli', 'occhio-di-tigre', 'ossidiana', 'tormalina-nera')
CHAPTERS = ('primo', 'secondo', 'terzo', 'quarto')
KEYS = ('origine', 'tradizione', 'uso', 'credenze')


def parse_lot(text):
    books = {}
    for slug, block in zip(FAMILIES[1:], re.split(r'^## [2-8]\. .+$', text, flags=re.M)[1:], strict=True):
        block = block.split('#### Fonti')[0]
        fields = dict(re.findall(r'^- (Titolo di copertina|Occhiello|Titolo|Sottotitolo): (.+)$', block, re.M))
        cover = fields['Titolo di copertina'].strip('*')
        chapters = []
        for index, chapter in enumerate(re.split(r'^### Capitolo \w+ · ', block, flags=re.M)[1:]):
            label, content = chapter.split('\n', 1)
            pieces = re.split(r'^\*\*p\. (\d+)\*\*(?: · (.*))?$', content, flags=re.M)
            pages = []
            for number, heading, body in zip(pieces[1::3], pieces[2::3], pieces[3::3], strict=True):
                number = int(number)
                assert number == 3 + index * 3 + len(pages), (slug, number)
                if not pages:
                    title = heading.split('titolo: **')[1].removesuffix('**')
                body = re.split(r'^\*\*Conteggio|^## ', body, flags=re.M)[0]
                page = {}
                if heading and pages:
                    page['titolo'] = heading
                paragraphs = []
                for line in body.splitlines():
                    line = re.sub(r'\s*\*\((?:note: )?\d+ parole, \d+ caratteri\)\*\s*$', '', line).strip()
                    if not line or line.startswith('> Figura:'):
                        continue
                    if line.startswith('|'):
                        cells = [cell.strip() for cell in line.strip('|').split('|')]
                        if all(cells) and not all(set(cell) == {'-'} for cell in cells):
                            page.setdefault('scheda', []).append(cells)
                    elif line.startswith('- '):
                        page.setdefault('elenco', []).append(line[2:])
                    elif line.startswith('*Sottotitolo:* '):
                        page['titolo'] = line.removeprefix('*Sottotitolo:* ')
                        page['apertura'], paragraphs = paragraphs, []
                    elif line.startswith('*Nota:* '):
                        page['nota'] = line.removeprefix('*Nota:* ')
                    elif line.startswith('*Chiusa:* '):
                        page['explicit'] = line.removeprefix('*Chiusa:* ')
                    else:
                        assert not line.startswith(('*', '#', '>')), (slug, number, line)
                        paragraphs.append(line)
                if paragraphs:
                    page['testo_dopo' if 'scheda' in page else 'testo'] = paragraphs
                if number == 5:
                    assert len(page['scheda']) == 5 and len(page['testo_dopo']) == 2
                assert page, (slug, number)
                pages.append(page)
            if index == 3:
                pages.append({'explicit': pages[-1].pop('explicit')})
            assert len(pages) == 3
            chapters.append(dict(chiave=KEYS[index], linguetta=label, titolo=title, pagine=pages))
        assert len(chapters) == 4
        books[slug] = dict(titolo_copertina=cover, testata=cover,
                          frontespizio=dict(sopratitolo=fields['Occhiello'], titolo=fields['Titolo'],
                                           sottotitolo=fields['Sottotitolo']), capitoli=chapters)
    return books


def asset(name):
    return "{{ '" + name + "' | asset_url }}"


def rich(text):
    return escape(text).replace('&lt;i&gt;', '<i>').replace('&lt;/i&gt;', '</i>')


def figure(data, cls=''):
    if data.get('piccola'):
        cls += ' fig--sm'
    return (f'<figure class="pg-fig {cls}"><img src="{asset("libro-" + data["file"] + ".webp")}" '
            f'alt="{escape(data["alt"])}" width="{data["w"]}" height="{data["h"]}" loading="lazy" decoding="async"></figure>')


def fleuron():
    return '<p class="fr-f" aria-hidden="true"><span>u</span></p>'


def render_book(slug, book):
    title = book['titolo_copertina']
    front = book['frontespizio']
    cover_name = 'libro-copertina.webp' if slug == 'ametista' else 'libro-copertina-comune.webp'
    cover = asset(cover_name)
    end = '<div class="pg pg--hard pg--end pg--{}" data-n="{}" aria-hidden="true"><div class="end"></div></div>'
    front_cls = '' if front.get('illustrazione') else ' pg--unillustrated'
    pages = [
        f'<div class="pg pg--cover pg--hard" data-n="0" aria-hidden="true"><div class="cv"><img class="cv-img" src="{cover}" alt="" width="768" height="1024" loading="lazy"><p class="cv-t">{escape(title)}</p></div></div>',
        end.format('l', 1),
        f'<div class="pg pg--text pg--r pg--front{front_cls}" data-n="2"><div class="pg-in"><div class="pg-body">'
        f'<h3 class="fr-k">{escape(front["sopratitolo"])}</h3><p class="fr-t">{escape(front["titolo"])}</p><p class="fr-s">{escape(front["sottotitolo"])}</p>'
        + (figure(front['illustrazione'], 'fig--front') if front.get('illustrazione') else '') + fleuron() + '</div></div></div>',
    ]
    n = 3
    for ci, chapter in enumerate(book['capitoli']):
        for pi, page in enumerate(chapter['pagine']):
            body = []
            if pi == 0:
                body.append(f'<p class="pg-cap">Capitolo {CHAPTERS[ci]}</p><h3 class="pg-h">{escape(chapter["titolo"])}</h3>')
            elif page.get('titolo'):
                body.extend(f'<p>{rich(par)}</p>' for par in page.get('apertura', []))
                body.append(f'<h4 class="pg-h4">{escape(page["titolo"])}</h4>')
            illustration = page.get('illustrazione')
            for k, par in enumerate(page.get('testo', [])):
                cls = ' class="dc"' if pi == 0 and k == 0 else ''
                body.append(f'<p{cls}>{rich(par)}</p>')
                if illustration and k == page.get('illustrazione_dopo', 0):
                    body.append(figure(illustration))
                    illustration = None
            if page.get('scheda'):
                body.append('<dl class="pg-dl">' + ''.join(f'<div><dt>{escape(a)}</dt><dd>{escape(b)}</dd></div>' for a, b in page['scheda']) + '</dl>')
                body.extend(f'<p>{rich(par)}</p>' for par in page['testo_dopo'])
            if page.get('elenco'):
                body.append('<ul class="pg-ul">' + ''.join(f'<li>{rich(item)}</li>' for item in page['elenco']) + '</ul>')
            if illustration:
                body.append(figure(illustration, 'fig--sm' if 'scheda' in page or 'elenco' in page else ''))
            if page.get('nota'):
                body.append(f'<p class="pg-note">{rich(page["nota"])}</p>')
            if page.get('explicit'):
                body.append(f'<p class="pg-ex">{rich(page["explicit"])}</p>')
            if page.get('finale'):
                body.append(figure(page['finale'], 'fig--fin'))
            unillustrated = not (page.get('illustrazione') or page.get('finale'))
            if unillustrated:
                body.append(fleuron())
            side = 'l' if n % 2 else 'r'
            cls = (' pg--open' if pi == 0 else '') + (' pg--unillustrated' if unillustrated else '')
            header = f'{book["testata"]} · {chapter["linguetta"]}'
            pages.append(f'<div class="pg pg--text pg--{side}{cls}" data-n="{n}"><div class="pg-in">'
                         f'<p class="pg-rh" aria-hidden="true">{escape(header)}</p><div class="pg-body">{"".join(body)}</div>'
                         f'<p class="pg-fo" aria-hidden="true">{n}</p></div></div>')
            n += 1
    if n % 2:
        pages.append('<div class="pg pg--blank pg--l" aria-hidden="true"></div>')
        n += 1
    pages.append(end.format('r', n))
    pages.append(f'<div class="pg pg--cover pg--back pg--hard" data-n="{n+1}" aria-hidden="true"><div class="cv"><img class="cv-img" src="{cover}" alt="" width="768" height="1024" loading="lazy"></div></div>')
    args = [f'titolo: "{title}"']
    if slug == 'ametista':
        args.append(f'copertina: "{cover_name}"')
    args.extend(f'capitolo_{i}: "{chapter["linguetta"]}"' for i, chapter in enumerate(book['capitoli'], 1))
    return '{% capture pagine %}\n' + '\n'.join(pages) + '\n{% endcapture %}\n' + (
        "{% render 'bz-libro-interno', pagine: pagine, " + ', '.join(args) + ' %}\n'
    )


def update_templates():
    for path in sorted((ROOT / 'templates').glob('product*.json')):
        original = path.read_text()
        prefix = re.match(r'\s*(?:/\*.*?\*/\s*)*', original, re.S).group()
        data = json.loads(original[len(prefix):])
        ritual = next((key for key in data['order'] if data['sections'][key]['type'] == 'bz-ritual'), None)
        if not ritual or 'bz_libro' in data['sections']:
            continue
        section = re.compile(rf'^( +)"{re.escape(ritual)}": \{{', re.M)
        order = re.compile(rf'^( +)"{re.escape(ritual)}"(?=,?\s*$)', re.M)
        edited, count = section.subn(r'\1"bz_libro": {\n\1  "type": "bz-libro",\n\1  "settings": {}\n\1},\n\g<0>', original)
        assert count == 1, path
        edited, count = order.subn(r'\1"bz_libro",\n\g<0>', edited)
        assert count == 1, path
        data['sections']['bz_libro'] = {'type': 'bz-libro', 'settings': {}}
        data['order'].insert(data['order'].index(ritual), 'bz_libro')
        assert json.loads(edited[len(prefix):]) == data, path
        path.write_text(edited)
        print(path.relative_to(ROOT))


def main():
    books = {'ametista': json.loads((MOCK / 'build/dati-ametista.json').read_text())}
    books.update(parse_lot((GRIMOIRE / 'testi/lotto1-v3.md').read_text()))
    for slug, data in books.items():
        (ROOT / 'snippets' / f'bz-libro-{slug}.liquid').write_text(render_book(slug, data))
    with (GRIMOIRE / 'famiglie-mappa.csv').open(newline='') as source:
        rows = list(csv.DictReader(source))
    lines = ['{%- liquid', "  assign famiglia = ''", '  case product.handle']
    mapped = set()
    for family in FAMILIES:
        handles = sorted({row['handle'] for row in rows if row['family_slug'] == family})
        assert handles and mapped.isdisjoint(handles)
        mapped.update(handles)
        for start in range(0, len(handles), 5):
            lines.extend(('    when ' + ', '.join(f"'{handle}'" for handle in handles[start:start+5]),
                          f"      assign famiglia = '{family}'"))
    lines.extend(('  endcase', '  echo famiglia', '-%}'))
    (ROOT / 'snippets/bz-libro-famiglia.liquid').write_text('\n'.join(lines) + '\n')
    update_templates()
    print(f'{len(mapped)} handle')


if __name__ == '__main__':
    main()
