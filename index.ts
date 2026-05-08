// ═══════════════════════════════════════════════════════════════════════════
// @amlhubs/bfo — index.ts
// Curated low-abstraction facade over the BFO 2020 metaclasses declared in
// `./bfo.ts`.
//
// Five symmetric axes (each a separately-callable, tree-shakeable export):
//
//   - `position`     — IRI / spec-position binding for every BFO class and relation
//   - `model`        — model identity (BFO 2.0 / BFO 2020 / ISO/IEC 21838-2:2021)
//   - `thing`        — typed projection of every BFO class
//   - `composition`  — typed projection of every BFO part-of / has-part axiom
//   - `action`       — typed projection of every BFO object-property (relation)
//
// Decomposition rule (Genus.Differentia, mirroring
// `.claude/skills/aml/packages/foundational/modelology/src/index.ts`):
//
//   {Word1}{Word2}...{WordN}    where each Wordi is a PascalCase token
//
//   - N == 1  -> bfo.{axis}.{word1Lower}
//   - N == 2  -> bfo.{axis}.{rightmostLower}.{leftmostLower}
//   - N >= 3  -> bfo.{axis}.{rightmostLower}...{leftmostLower}
//
// Runtime classes (when consumers need to construct) are exposed under the
// same path with a `.runtime` suffix.
// ═══════════════════════════════════════════════════════════════════════════

// TODO(implementer): import every BFO interface and runtime class from `./bfo.js`
// once `bfo.ts` is implemented.

export const position = {
  // TODO(implementer): IRI / spec-position bindings keyed by class/relation name.
} as const;

export const model = {
  // TODO(implementer): model identity — BFO 2.0 / BFO 2020 / ISO/IEC 21838-2:2021.
} as const;

export const thing = {
  // TODO(implementer): every BFO class projected here under Genus.Differentia.
} as const;

export const composition = {
  // TODO(implementer): every BFO part-of / has-part axiom.
} as const;

export const action = {
  // TODO(implementer): every BFO object-property (relation).
} as const;
