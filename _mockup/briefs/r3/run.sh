#!/bin/bash
D=/home/box/shared/benessere-zen/mockup-v411c
N=$1; B=$2; F=$3
P="Sei un front-end designer senior. Cartella $D. Leggi $D/briefs/r3/COMMON.md e poi $D/briefs/r3/$B ed eseguilo ALLA LETTERA modificando SOLO questi file: $F. Non fare nulla che non sia scritto nel brief. I file HTML hanno righe molto lunghe: usa python per patch puntuali. Quando hai finito fermati e scrivi il riepilogo richiesto."
timeout 3000 /home/box/.local/bin/codex exec -s workspace-write -C "$D" --skip-git-repo-check -c model_reasoning_effort="high" --json -o "$D/logs/r3-$N.last.md" "$P" > "$D/logs/r3-$N.jsonl" 2> "$D/logs/r3-$N.err" < /dev/null
echo "exit $?" > "$D/logs/r3-$N.done"
