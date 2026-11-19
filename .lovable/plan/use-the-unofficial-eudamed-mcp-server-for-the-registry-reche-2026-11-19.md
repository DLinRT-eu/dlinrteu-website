# Use the unofficial EUDAMED MCP server for the registry recheck

## What I found
- `@t4dhg/mcp-eudamed` v0.3.0 is free and MIT-licensed. It's read-only, needs no API key, and has two dependencies (the official MCP SDK and zod).
- It's a local program (stdio) that runs through `npx`. It isn't a hosted server, so it can't be added as a connector in Lovable. It can run here in the sandbox only.
- It calls the same official EUDAMED Data Lake service as our checker, so it can't get around today's outage. Its own docs say a device 404 while the actor lookup works means "probable device-dataset outage", which is exactly what we're seeing (it saw the same on 2026-11-12).
- Risk is low: it's read-only public data, nothing touches the site or the database, and it won't be installed in the project.

## Steps
1. Run the MCP server once in the sandbox (temporary folder, pinned to 0.3.0) and call `eudamed_status` to confirm whether the device data is available.
2. If it's available: re-run our own checker (`eudamed:refresh`) as the single source for site data, then use the MCP's `eudamed_devices` exact lookups only to cross-check new or changed matches and the products added since 2026-11-09 (Neosoma Platform, PIQE CT). Report the differences. Nothing from the MCP is written to the site directly.
3. If it's still down: keep the 2026-11-09 data and report the outage with the MCP's status output as evidence.
4. Finish the checker fix that was interrupted: the snapshot date moves forward only when at least one device lookup actually succeeded, plus a small test for that rule.
5. Run the EUDAMED tests and deliver a short report.

## Technical notes
- No new package goes into the project. Registry data still flows only through `scripts/verify-eudamed.ts`, per AGENTS.md.
