// ═══════════════════════════════════════════════════════════════════════════
// bfo.ts
// Basic Formal Ontology (BFO) 2.0 — ISO/IEC 21838-2:2021
//
// Scope: Pure BFO 2020 metaclasses covering the upper-level-ontology spine —
// the classes (Continuant, IndependentContinuant, GenericallyDependentContinuant,
// SpecificallyDependentContinuant, Quality, RealizableEntity, Role, Disposition,
// Function, Object, ObjectAggregate, FiatObjectPart, MaterialEntity,
// ImmaterialEntity, Site, SpatialRegion + dimensional specializations,
// Occurrent, Process, ProcessBoundary, ProcessProfile, History, TemporalRegion +
// dimensional specializations, SpatiotemporalRegion) and the relations
// (continuantPartOf, hasContinuantPart, occurrentPartOf, hasOccurrentPart,
// inheresIn, bearerOf, participatesIn, hasParticipant, locatedIn, hasLocation,
// occursIn, etc.) declared by BFO 2020 OWL files (bfo.owl + supporting files).
//
// Metaclass count: TODO (filled by the implementer subagents during the
// implementation wave). Initial scaffold authors only the top-banner header;
// metaclass declarations are inserted in subsequent commits.
//
// Architectural ordering:
//   BFO (this file) is PURE BFO 2020. It imports NOTHING from any other
//   @amlhubs metamodel. Downstream consumers extend the interfaces and
//   base classes exported from this file through standard TypeScript
//   inheritance.
//
// @standard      ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
// @specification https://www.iso.org/standard/74572.html
// @owl-source    https://github.com/bfo-ontology/bfo
// @authority     ISO/IEC JTC 1/SC 32 (ISO 21838) and the BFO Consortium
// ═══════════════════════════════════════════════════════════════════════════

// Implementation declarations (Layer 1 interfaces, Layer 2 abstract classes,
// Layer 3 concrete classes) are inserted here by the implementer subagents.
// Do NOT modify this banner without coordinating with the lead engineer.
