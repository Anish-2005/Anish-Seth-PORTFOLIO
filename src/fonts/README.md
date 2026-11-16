# Fonts

`archivo-variable-subset.woff2` is **Archivo** (variable: weight 100–900, width 62–125%),
Copyright 2020 The Archivo Project Authors (https://github.com/Omnibus-Type/Archivo),
licensed under the SIL Open Font License 1.1 (https://openfontlicense.org).

It's a subset made with fonttools (`pyftsubset`) so pages download less. It keeps basic Latin,
lowercase accented letters plus É, common punctuation and symbols, both variation axes and all
OpenType features (including tabular numbers). Anything outside that set falls back to the next
font in the stack.

To regenerate from the full Archivo variable font:

```bash
pyftsubset Archivo-Variable.woff2 \
  --unicodes="U+0020-007E,U+00A0,U+00A7,U+00A9,U+00AE,U+00B0,U+00B7,U+00D7,U+00C9,U+00E0-00FF,U+2013-2014,U+2018-201F,U+2022,U+2026,U+20AC,U+2122,U+2191,U+2193,U+2212" \
  --layout-features='*' --name-IDs='*' --flavor=woff2 \
  --output-file=archivo-variable-subset.woff2
```
