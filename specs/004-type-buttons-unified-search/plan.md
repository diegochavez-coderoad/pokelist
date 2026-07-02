# Implementation Plan: Type Buttons And Unified Search Input

**Branch**: `004-type-buttons-unified-search` | **Date**: 2026-07-02 | **Spec**: `specs/004-type-buttons-unified-search/spec.md`

**Input**: Feature specification from `/specs/004-type-buttons-unified-search/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Introduce a single unified search input that preserves current name and
pokedex behaviors while replacing plain type labels with canonical color
type-buttons in both filter controls and table rows. The feature keeps existing
generation-1 scope, filtering semantics, and status-state behavior, and adds an
explicit canonical type-color token map for consistent rendering.

## Technical Context

**Language/Version**: TypeScript (strict), React 19, Vite 8

**Primary Dependencies**: React, React DOM, TypeScript, Vite, Vitest,
React Testing Library, jest-dom

**Storage**: N/A (local static dataset + local UI token configuration)

**Testing**: Vitest + React Testing Library, unit/component/contract tests

**Target Platform**: Modern desktop/mobile browsers

**Project Type**: Single-page frontend web application

**Performance Goals**: Maintain filtering responsiveness <= 100ms p95 for
generation-1 interactions in local development

**Constraints**: No regression to existing filtering semantics; one combined
search input only; canonical hex type colors required; preserve accessibility
and perceivable loading/empty/error/validation states

**Scale/Scope**: 151 rows max (#001-#151), no auth/favorites/pagination,
single-client interaction flow

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `Type Safety Gate`: PASS - unified input parsing and type-color token mapping
  are planned with explicit typed models and no new untyped boundaries.
- `Accessibility Gate`: PASS - keyboard operability and semantic status feedback
  remain mandatory for combined input and type-button interactions.
- `Performance Gate`: PASS - existing 100ms p95 budget is retained with
  lightweight UI token rendering and existing filter pipeline reuse.
- `Architecture Gate`: PASS - input parsing/filter logic remains in domain/app
  layers; presentation changes remain within component/style layers.
- `Testing Gate`: PASS - plan includes regression tests for search semantics,
  type button rendering, and status-state continuity.

## Project Structure

### Documentation (this feature)

```text
specs/004-type-buttons-unified-search/
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
├── domain/
└── services/

tests/
├── component/
├── contract/
├── performance/
└── unit/
```

**Structure Decision**: Keep existing single-project frontend structure.
Implement unified-input and type-button rendering updates in `src/components/`,
`src/App.tsx`, and styles, with filtering semantic continuity preserved in
domain/app layers.

## Phase 0 Output

- Research file generated: `specs/004-type-buttons-unified-search/research.md`
- No unresolved clarifications remain for this feature scope.

## Phase 1 Output

- Data model generated: `specs/004-type-buttons-unified-search/data-model.md`
- Contract generated: `specs/004-type-buttons-unified-search/contracts/unified-search-type-button-ui-contract.md`
- Quickstart generated: `specs/004-type-buttons-unified-search/quickstart.md`
- Agent context update step: SKIPPED (no `update-agent-context` script under
  `.specify/scripts/` in this repository)

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
