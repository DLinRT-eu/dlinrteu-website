#!/usr/bin/env bash
# Enumerate active ProductDetails entries for the audit swarm.
# Usage:
#   enumerate_products.sh                 # all categories
#   enumerate_products.sh <category>      # one category folder
#   enumerate_products.sh --id <slug>     # one product id
#
# Skips src/data/products/archived/ and src/data/products/examples/.
# Prints one file path per line and a final summary line on stderr.

set -euo pipefail

ROOT="src/data/products"
[ -d "$ROOT" ] || { echo "error: $ROOT not found (run from project root)" >&2; exit 1; }

mode="all"
arg="${1:-}"
case "$arg" in
  "")            ;;
  --id)          mode="id"; slug="${2:-}"; [ -n "$slug" ] || { echo "error: --id requires a slug" >&2; exit 1; } ;;
  -h|--help)     sed -n '2,9p' "$0"; exit 0 ;;
  *)             mode="category"; category="$arg" ;;
esac

case "$mode" in
  all)
    files=$(find "$ROOT" -type f -name "*.ts" \
      -not -path "*/archived/*" -not -path "*/examples/*" | sort)
    ;;
  category)
    [ -d "$ROOT/$category" ] || { echo "error: category $category not found" >&2; exit 1; }
    files=$(find "$ROOT/$category" -type f -name "*.ts" \
      -not -path "*/archived/*" -not -path "*/examples/*" | sort)
    ;;
  id)
    files=$(rg -l --no-messages "id:\s*[\"']${slug}[\"']" "$ROOT" \
      --glob '!archived/**' --glob '!examples/**' | sort || true)
    [ -n "$files" ] || { echo "error: no product file declares id=$slug" >&2; exit 1; }
    ;;
esac

count=$(printf '%s\n' "$files" | grep -c . || true)
printf '%s\n' "$files"
printf 'enumerated %s file(s)\n' "$count" >&2
