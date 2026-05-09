# BFO Spec — Provenance Notes

## Scrape metadata

- **Scrape date**: 2026-05-08
- **Upstream source**: https://github.com/bfo-ontology/bfo
- **Upstream commit SHA**: `857be9f15100531c7202ef0eb73142f95b70f3a7`
- **Upstream commit message**: `Merge pull request #237 from johnbeve/master` (John Beverley, 2024-01-29)
- **Upstream license**: CC-BY-4.0 (see `UPSTREAM_LICENSE`)
- **Vendoring scope**: every authoritative OWL / OBO / CLIF artifact, plus the BFO 2 Reference PDF, status notes, OWL-TIME tests, and Ruttenberg / Schulz / Mungall / Ressler / Grewe working ontologies. File contents are byte-identical to the upstream commit.

## Canonical files at `spec/` root

| File                          | Role                                                                                                        |
|-------------------------------|-------------------------------------------------------------------------------------------------------------|
| `bfo.owl`                     | Canonical merged BFO 2.0 / BFO 2020 ontology (classes + relations + metadata). Authoritative open implementation of ISO/IEC 21838-2:2021. |
| `bfo_classes_only.owl`        | Class-axioms-only OWL projection of `bfo.owl`. No relation hierarchy.                                       |
| `bfo_classes_only.obo`        | OBO-format equivalent of the class-axioms-only projection.                                                  |
| `rel.owl`                     | Relation-axioms-only OWL projection — carries BFO's relations.                                              |
| `ro.owl`                      | OBO Foundry Relations Ontology subset that BFO imports.                                                     |
| `UPSTREAM_LICENSE`            | Upstream `LICENSE` file (CC-BY-4.0), copied verbatim.                                                       |
| `UPSTREAM_README.md`          | Upstream `README.md`, copied verbatim.                                                                      |

## ISO/IEC 21838-2:2021 provenance

ISO/IEC 21838-2:2021 ("Information technology — Top-level ontologies (TLO) — Part 2: Basic Formal Ontology (BFO)") corresponds to the BFO 2020 OWL implementation in this directory. The ISO PDF is paywalled and is **not** vendored. The `bfo.owl` and supporting artifacts in this `spec/` directory **are** the authoritative open-source reference implementation of the standard, maintained by the BFO development group on behalf of the standards committee (IUFoST / NCBO / OBO Foundry).

Use the OWL files as the normative reference for the AML/TypeScript projection.

## Directory layout

### `spec/releases/`

Versioned OWL/OBO release artifacts spanning every BFO public version:

- `1.0/` — BFO 1.0 OWL + OBO
- `1.1/` — BFO 1.1 OWL + OBO
- `1.1.1/` — BFO 1.1.1 OWL + OBO
- `2.0/` — BFO 2.0 OWL + OBO
- `2012-07-20-graz/` — Graz milestone snapshot (FOL CLIF + OWL)
- `2012-11-15-bugfix/` — bugfix milestone snapshot (FOL CLIF + OWL)
- `2014-05-03/` — May 2014 milestone snapshot (FOL CLIF + OWL classes-only + OWL-group merged)
- `bfo_classes_only_latest.owl` — latest classes-only release at top of the releases tree
- `owl-ruttenberg-2010-05-25/` — Alan Ruttenberg's 2010 BFO 2 candidate set (full + classes + granularity + regions + relations + biotop equivalence)

### `spec/src/ontology/`

Source-tree ontology working files:

- `fol-group/owl-axiomatization.clif` — canonical Common Logic Interchange Format (CLIF) axiomatization for the OWL surface
- `fol-mungall/` — Chris Mungall's FOL approach
  - `fol-derived/` — instance-instance + type-type RO core derivations (CLIF)
  - `fol-src/` — source CLIF for BFO + RO background, BFO taxonomy, RO core derivations
  - `meta/` — meta-CLIF: BFO meta + OWL mapping + type-level
  - `owl-derived/ro-core-inst-inst.owl` — OWL projection of the inst-inst FOL
- `fol-ressler/` — Joel Ressler's CLIF axiomatization, including the alpha 2012-05-21 (with and without comments) and 2012-07-20 milestones
- `owl-group/` — primary OWL development tree
  - `bfo.owl` — current development merged ontology
  - `bfo_classes_only_dev.owl` — development class-axioms-only projection
  - `examples/` — illustrative OWL files: `generic-part`, `permanent-generic-part-of`, `property-chains/has-part-chains`, `spatial-disjointness/sd-atemporal`, `sd-bfo2-fail`, `sd-bfo2-succeed`
- `owl-grewe/exploratory/temporalized_relations.owl` — Grewe's temporalized-relations exploration
- `owl-ruttenberg/` — Ruttenberg working set (BFO 2 + granularity + regions + relations + biotop equivalence) plus `exploratory/` drafts (`bfo-2-draft.owl`, `realization-chain.owl`, `organism-temporal-test.owl`, `temporalized-relations.owl`)
- `owl-schulz/` — Stefan Schulz's TQC (Temporally Qualified Continuants) variants: `bfo.owl`, `bfo_tqc.owl`, `tqc2.owl`, `tqc6.owl`

### `spec/docs/`

- `bfo2-reference/BFO2-Reference.pdf` — canonical BFO 2 reference document (Smith / Ceusters / Ruttenberg / Mungall / Grenon et al.)
- `bfo2-frames-coordinate-systems-notes.txt` — frames + coordinate systems notes (Ruttenberg)
- `bfo2-status-report-for-ub-meeting.txt` — Buffalo meeting status report
- `OWL-TIME/tests/` — OWL-TIME test cases: `bfo_tqc.owl`, `bfo_tqc_uc.owl`, `bfo_tr.owl`, `bfo_tr_uc.owl`, `tcq-counterexample-1.owl`, `tcq-counterexample-2.owl`, `tr-counterexample-1.owl`

## License

All files under this `spec/` directory are licensed under CC-BY-4.0 by the upstream BFO maintainers. Attribution is preserved through `UPSTREAM_LICENSE` and `UPSTREAM_README.md`. Downstream consumers in this submodule (`bfo.ts`, `index.ts`, etc.) are **derivative works**: they MUST cite this `spec/` directory and the upstream commit SHA when redistributing or republishing.
