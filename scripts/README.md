# Maintenance scripts

These scripts are manual maintenance utilities; none is exposed as an npm
script.

- `daily-supabase-task.js` is invoked by
  `.github/workflows/supabase-daily-cron.yml`; keep it in sync with that
  workflow.
- `fix-logos.js` uses `cdp-client.js` to connect to a running local Chrome
  DevTools endpoint and process the SVG logos in `public/All logo in SVG
  Format/`.
- `strip-logo-backgrounds.js`, `verify-logos.js`, and
  `optimize-public-assets.js` are one-off asset maintenance tools. They are
  retained pending owner confirmation that their transformations and
  environment-specific assumptions are no longer needed.

Review scripts before running: some depend on local executables, a browser, or
paths that are specific to their original development environment.
