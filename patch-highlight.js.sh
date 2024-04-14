#!/usr/bin/env bash
set -eu
sed -i -e '/haskell/d' -e '/swift/d' node_modules/highlight.js/lib/index.js
