#!/bin/bash
# Updates metal price cache by running scraper locally.
# Cron: 0 5 * * * /var/www/nextjs/calc.uralmetstroy.ru/scripts/update-prices.sh >> /var/log/prices-update.log 2>&1

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CACHE_FILE="$SCRIPT_DIR/../src/app/api/prices/cache.json"
SCRAPER="$SCRIPT_DIR/scrape-prices.py"

echo "[$(date)] Starting price update..."

RESULT=$(python3 "$SCRAPER" 2>/dev/null)

if [ -z "$RESULT" ]; then
  echo "[$(date)] ERROR: scraper returned empty result" >&2; exit 1
fi

# Save to temp file and wrap with metadata
TMPFILE=$(mktemp)
echo "$RESULT" > "$TMPFILE"

python3 - <<PYEOF
import sys, json
ts = "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
try:
    items = json.load(open("$TMPFILE"))
    out = {"updatedAt": ts, "source": "mc.ru", "region": "Екатеринбург", "items": items}
    with open("$CACHE_FILE", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"[{ts}] Saved {len(items)} items to $CACHE_FILE")
except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)
    sys.exit(1)
PYEOF

STATUS=$?
rm -f "$TMPFILE"
exit $STATUS
