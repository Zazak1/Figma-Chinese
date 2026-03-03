#!/bin/zsh
set -euo pipefail
INPUT="/Users/linyichen/Desktop/figma-chinese/scripts/raw_text_sources.txt"
OUT="/Users/linyichen/Desktop/figma-chinese/dict/candidates.freq.txt"
tr '\r' '\n' < "$INPUT" \
| rg -o '"[A-Za-z][A-Za-z0-9 ,.!?&()/:;\-+\x27]{1,80}"|>[A-Za-z][A-Za-z0-9 ,.!?&()/:;\-+\x27]{1,80}<' -N \
| sed -E 's/^"//; s/"$//; s/^>//; s/<$//' \
| sed -E 's/&nbsp;/ /g; s/&amp;/\&/g' \
| sed -E 's/^ +| +$//g' \
| rg -v '^(https?|www\.|[A-Za-z0-9_./-]+\.(js|css|png|jpg|svg|woff2?)|[A-Fa-f0-9]{16,}|[0-9]+|[A-Za-z]{1,3})$' \
| awk 'length($0)>=3 && length($0)<=70' \
| sort | uniq -c | sort -nr > "$OUT"
head -n 200 "$OUT"
