# Implementation Plan: Obsidian-Style Dark Pokelist UI

**Branch**: `` | **Date**: 2026-07-02 | **Spec**: `specs/003-obsidian-dark-ui/spec.md`

**Input**: Feature specification from `/specs/003-obsidian-dark-ui/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Redesign the existing generation-1 Pokelist UI into a dark-only, Obsidian-inspired
experience while preserving current filter behavior. The result list moves to a
dense table format with balanced row density (28px sprite thumbnails), locally
bundled Gen 1 sprites sourced from PokemonDB, deterministic lowercase
`spriteSlug` mapping, and a neutral silhouette fallback for missing sprites.
All loading/empty/error/validation states remain explicit and accessible, with
no changes to search/filter semantics or generation scope.

## Technical Context

**Language/Version**: TypeScript (strict), React 19, Vite 8

**Primary Dependencies**: React, React DOM, Vite, TypeScript, Vitest,
React Testing Library, jest-dom

**Storage**: N/A (local static JSON dataset and local bundled sprite assets)

**Testing**: Vitest + React Testing Library + contract and performance tests

**Target Platform**: Modern desktop/mobile browsers

**Project Type**: Single-page frontend web application

**Performance Goals**: Preserve filtering responsiveness (<= 100ms p95 local
for generation-1 filtering interactions; visible updates < 1s in normal usage)

**Constraints**: Dark-only UI for this feature; no light toggle/system-theme
switching; no scope expansion beyond #001-#151; locally bundled sprites using
PokemonDB silver/normal sprite naming pattern via lowercase `spriteSlug`

**Scale/Scope**: 151 rows max, single-client filtering flow, no auth, no
pagination/favorites/multi-generation support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `Type Safety Gate`: PASS - planned `spriteSlug` is explicit typed domain data;
  strict TypeScript remains enforced.
- `Accessibility Gate`: PASS - table semantics, keyboard-operable controls,
  focus visibility, and perceivable status feedback are planned.
- `Performance Gate`: PASS - existing 100ms p95 filter budget is retained;
  table rendering and local assets avoid network jitter in core flow.
- `Architecture Gate`: PASS - UI redesign remains in components, filtering
  logic remains in domain modules, data mapping stays in service/data layer.
- `Testing Gate`: PASS - tests planned for row rendering, sprite fallback,
  filtering regression, and UX states.

## Project Structure

### Documentation (this feature)

```text
specs/003-obsidian-dark-ui/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── App.css
├── app/
├── components/
├── data/
├── domain/
└── services/

tests/
├── component/
├── contract/
├── performance/
└── unit/
```

**Structure Decision**: Keep the existing single-frontend project structure.
Implement UI-table and dark-theme changes in `src/components/`, `src/App.tsx`,
and styles; keep filter semantics in `src/domain/filters/`; extend dataset/model
shape in `src/data/` and `src/domain/models/` for `spriteSlug`.

## Phase 0 Output

- Research file generated: `specs/003-obsidian-dark-ui/research.md`
- All clarifications from `/speckit.clarify` are resolved and captured.

## Phase 1 Output

- Data model generated: `specs/003-obsidian-dark-ui/data-model.md`
- Contract generated: `specs/003-obsidian-dark-ui/contracts/pokemon-table-ui-contract.md`
- Quickstart generated: `specs/003-obsidian-dark-ui/quickstart.md`
- Agent context update step: SKIPPED (no update-agent-context script under
  `.specify/scripts/bash/` in this repository)

### Post-Phase 1 Constitution Re-Check

- `Type Safety Gate`: PASS
- `Accessibility Gate`: PASS
- `Performance Gate`: PASS
- `Architecture Gate`: PASS
- `Testing Gate`: PASS

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
