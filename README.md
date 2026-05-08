# @amlhubs/bfo — Basic Formal Ontology (BFO 2.0 / ISO/IEC 21838-2:2021) as a Typed Metamodel

## Identity

| Field | Value |
|---|---|
| Standard | Basic Formal Ontology (BFO) 2.0 |
| ISO Document | [ISO/IEC 21838-2:2021](https://www.iso.org/standard/74572.html) |
| OMG Adoption | None — BFO is an ISO standard maintained outside the Object Management Group |
| Upstream Authority | [BFO Consortium](https://basic-formal-ontology.org/) (community of practice); ISO/IEC JTC 1/SC 32 (ISO 21838 series) |
| OWL Source | [github.com/bfo-ontology/bfo](https://github.com/bfo-ontology/bfo) |
| npm Package | `@amlhubs/bfo` |
| npm Version | `0.0.1` |
| Peer Dependencies | None — pure BFO, zero downstream dependencies |
| License | UNLICENSED (this projection); upstream BFO 2.0 OWL files are CC-BY-4.0 (see [LICENSE](./LICENSE)) |

## Abstract

(filled by implementer waves)

## Scope

(filled by implementer waves)

## Spec sources

The following authoritative OWL/OBO files from the upstream `bfo-ontology/bfo` repository will be vendored under `spec/` during the spec-scrape phase:

- `bfo.owl` — primary OWL serialization of BFO 2.0 / BFO 2020 classes and relations
- `bfo_classes_only.obo` — OBO Format projection (classes only)
- `bfo_classes_only.owl` — OWL serialization (classes only, without relations)
- `rel.owl` — BFO relation ontology (continuant / occurrent part-of, inheres-in, bearer-of, participates-in, etc.)
- `ro.owl` — Relation Ontology imports used by BFO 2020

## License

UNLICENSED — restricted npm access under `@amlhubs` scope at [npm.pkg.github.com](https://npm.pkg.github.com). Upstream BFO 2.0 OWL content remains CC-BY-4.0. See [LICENSE](./LICENSE).
