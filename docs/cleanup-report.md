# Cleanup Report

**Date:** 2026-10-14  
**Branch:** `main` (kept per user direction; no commits created)  
**Validation baseline:** [`cleanup-baseline.txt`](./cleanup-baseline.txt)  
**Dependency findings:** [`structure-analysis.md`](./structure-analysis.md)

## Completed changes

| Original path | New path / action | Reason | Verification |
|---|---|---|---|
| `seo.md` | `docs/seo.md` | Keep the SEO audit with project documentation. | Moved with `git mv`; references updated in the cleanup brief. |
| `Report.md` | `docs/Report.md` | Group project report under docs. | Moved with `git mv`. |
| `PERFORMANCE_OPTIMIZATION_LOG.md` | `docs/PERFORMANCE_OPTIMIZATION_LOG.md` | Group optimization log under docs. | Moved with `git mv`. |
| `design.md` | `docs/design.md` | Group design notes under docs. | Moved with `git mv`. |
| `WEBSITE_DOCUMENTATION.txt` | `docs/WEBSITE_DOCUMENTATION.txt` | Group website documentation under docs. | Moved with `git mv`. |
| `portfolio.txt` | `docs/portfolio.txt` | Group portfolio notes under docs. | Moved with `git mv`. |
| `public/Updated Pakistan studies HU-115-29 Jan 2026.docx` | Moved outside repository to the current session's private files area. | Prevent unrelated personal/university material from being served as a public asset while retaining the only copy. | Destination existence and SHA-256 verified after move. |
| `scripts/README.md` | Added | Explain retained scripts and their invocation/context. | References verified against the workflow and script `require()` edge. |

No application source files were moved or changed. `cleanup-restructure-prompt.md`
was updated only to reference the new `docs/` paths.

## Quarantine and removals

No source components, dependencies, or other public assets were deleted or
quarantined. The full lint baseline is already failing (5 errors); the brief's
quarantine protocol requires all three validation commands to pass before a
candidate can be removed. Orphan candidates and reasons to retain them pending
that validation are listed in `structure-analysis.md`.

The PDF (`Virtual Velocity Profile (1).pdf`) and ZIP (`VV LOGOS.zip`) remain in
`public/`. No app references were found, but no verified external replacement
host or owner approval for removing their public URLs was available.

## Dependency and public-size result

- Dependencies removed: **0**. Knip's candidates are cross-referenced in
  `structure-analysis.md`; several still have source imports in orphan
  components and cannot be removed before those imports are quarantined.
- Public bytes removed by source-file deletion: **0**.
- The relocated DOCX no longer contributes to the deployed `public/` asset
  tree; it is retained outside the repository. Its tracked size was 123,508
  bytes (about 0.12 MiB).
- Bundle-size before/after: unavailable per route. The installed Next 16
  Turbopack build does not print First Load JS sizes; the baseline records the
  emitted global chunk inventory and explains why route attribution is not
  inferred.

## Validation after organization

Post-organization results:

- `npx tsc --noEmit`: pass.
- `npm run lint`: fail with 5 errors and 20 warnings.
- `npm run build`: pass; it reports all routes listed in
  [`cleanup-baseline.txt`](./cleanup-baseline.txt).
- Production smoke test (`npm run start`): all 13 public content routes tested
  returned HTTP 200; `/robots.txt`, `/sitemap.xml`, and `/llms.txt` returned
  HTTP 200; a deliberately invalid route returned HTTP 404. Server was stopped
  after the checks.
- `git diff --check` and `git diff --cached --check`: pass.

## Reverting the documentation moves

Run each command only if reverting this change:

```powershell
git mv docs/seo.md seo.md
git mv docs/Report.md Report.md
git mv docs/PERFORMANCE_OPTIMIZATION_LOG.md PERFORMANCE_OPTIMIZATION_LOG.md
git mv docs/design.md design.md
git mv docs/WEBSITE_DOCUMENTATION.txt WEBSITE_DOCUMENTATION.txt
git mv docs/portfolio.txt portfolio.txt
```

The DOCX can be restored by moving the verified session-file copy back to
`public/Updated Pakistan studies HU-115-29 Jan 2026.docx`. Remove the new
analysis/report/README files individually only if intentionally reverting
those additions; do not use broad recursive cleanup commands.
