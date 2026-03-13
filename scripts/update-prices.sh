#!/bin/bash
# Updates metal price cache by running scraper on Russian proxy server.
# Cron: 0 8 * * * /var/www/calc.uralmetstroy.ru/scripts/update-prices.sh >> /var/log/prices-update.log 2>&1

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CACHE_FILE="$SCRIPT_DIR/../src/app/api/prices/cache.json"
SCRAPER="$SCRIPT_DIR/scrape-prices.py"
OLD_SERVER="root@77.222.37.168"
OLD_PASS="Q8WNK1JGLL^V5a6F"

echo "[$(date)] Starting price update..."

# Upload scraper and run it on the Russian server
sshpass -p "$OLD_PASS" scp -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$SCRAPER" "$OLD_SERVER:/tmp/scrape-prices.py" || {
  echo "[$(date)] ERROR: could not upload scraper" >&2; exit 1
}

RESULT=$(sshpass -p "$OLD_PASS" ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$OLD_SERVER" "python3 /tmp/scrape-prices.py 2>/dev/null")

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
