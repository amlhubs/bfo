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

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #1: Continuant spine
// (Entity • Continuant • IndependentContinuant • MaterialEntity •
//  ImmaterialEntity • GenericallyDependentContinuant •
//  SpecificallyDependentContinuant • Quality • RealizableEntity •
//  Role • Disposition • Function)
// ═══════════════════════════════════════════════════════════════════════════

// ─── 1. Entity (BFO_0000001) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000001
 * @metaclass owl:Class
 * @isAbstract true
 * @parent (root — owl:Thing)
 * @rdfsLabel "entity"
 * @definition "An entity is anything that exists or has existed or will exist."
 *             (axiom label in BFO2 Reference: [001-001]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000001, so the elucidation/axiom annotation IAO_0000600 is used
 *              verbatim as the closest formal definition the OWL release carries.)
 * @bfoReferenceSection §2.1 Entities
 * @disjointWith (none — Entity is the root; the disjointness Continuant ⊓ Occurrent = ∅
 *                is declared on Continuant (BFO_0000002) and Occurrent (BFO_0000003)
 *                rather than on Entity itself in the OWL release.)
 * @subClassOf owl:Thing
 * @owlAxioms SubClassOf(owl:Thing); BFO 2020 OWL declares Entity without a closure axiom
 *            (subclasses do not necessarily exhaust all possibilities — see Ceusters'
 *            'portions of reality'). Children: Continuant (BFO_0000002),
 *            Occurrent (BFO_0000003).
 */
export interface IEntity {
  readonly metaClass: string;
  readonly iri: string;
}

/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000001
 * @metaclass owl:Class
 * @isAbstract true
 * @parent (root — owl:Thing)
 * @rdfsLabel "entity"
 */
export abstract class AbstractEntity implements IEntity {
  abstract readonly metaClass: string;
  abstract readonly iri: string;
}

// ─── 2. Continuant (BFO_0000002) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000002
 * @metaclass owl:Class
 * @isAbstract true
 * @parent Entity
 * @rdfsLabel "continuant"
 * @definition "A continuant is an entity that persists, endures, or continues to exist through time while maintaining its identity."
 *             (axiom label in BFO2 Reference: [008-002]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000002, so the elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.2 Continuant
 * @disjointWith Occurrent (BFO_0000003)
 * @subClassOf Entity (BFO_0000001)
 * @owlAxioms SubClassOf(BFO_0000001); DisjointWith(BFO_0000003);
 *            [009-002] (forall (x y) (if (and (Continuant x) (continuantPartOfAt y x t)) (Continuant y)));
 *            [126-001] (forall (x y) (if (and (Continuant x) (hasContinuantPartOfAt y x t)) (Continuant y)));
 *            BFO 2020 declares Continuant without a closure axiom.
 */
export interface IContinuant extends IEntity {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractContinuant
  extends AbstractEntity
  implements IContinuant {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 3. IndependentContinuant (BFO_0000004) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000004
 * @metaclass owl:Class
 * @isAbstract true
 * @parent Continuant
 * @rdfsLabel "independent continuant"
 * @definition "b is an independent continuant = Def. b is a continuant which is such that there is no c and no t such that b s-depends_on c at t. (axiom label in BFO2 Reference: [017-002])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §3.4 Independent continuant
 * @disjointWith SpecificallyDependentContinuant (BFO_0000020), GenericallyDependentContinuant (BFO_0000031)
 * @subClassOf Continuant (BFO_0000002)
 * @owlAxioms SubClassOf(BFO_0000002); DisjointWith(BFO_0000020); DisjointWith(BFO_0000031);
 *            [134-001] (forall (x t) (if (IndependentContinuant x) (exists (r) (and (SpatialRegion r) (locatedInAt x r t)))));
 *            [018-002] (forall (x t) (if (and (IndependentContinuant x) (existsAt x t)) (exists (y) (and (Entity y) (specificallyDependsOnAt y x t)))));
 *            [017-002] (iff (IndependentContinuant a) (and (Continuant a) (not (exists (b t) (specificallyDependsOnAt a b t))))).
 */
export interface IIndependentContinuant extends IContinuant {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractIndependentContinuant
  extends AbstractContinuant
  implements IIndependentContinuant {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 4. MaterialEntity (BFO_0000040) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000040
 * @metaclass owl:Class
 * @isAbstract false
 * @parent IndependentContinuant
 * @rdfsLabel "material entity"
 * @definition "A material entity is an independent continuant that has some portion of matter as proper or improper continuant part."
 *             (axiom label in BFO2 Reference: [019-002]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000040, so the elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.5 Material entity
 * @disjointWith ImmaterialEntity (BFO_0000141)
 * @subClassOf IndependentContinuant (BFO_0000004)
 * @owlAxioms SubClassOf(BFO_0000004); DisjointWith(BFO_0000141);
 *            [019-002] (forall (x) (if (MaterialEntity x) (IndependentContinuant x)));
 *            [020-002] (forall (x) (if (and (Entity x) (exists (y t) (and (MaterialEntity y) (continuantPartOfAt y x t)))) (MaterialEntity x)));
 *            [021-002] (forall (x) (if (and (Entity x) (exists (y t) (and (MaterialEntity y) (continuantPartOfAt x y t)))) (MaterialEntity x))).
 */
export interface IMaterialEntity extends IIndependentContinuant {
  // Widened to `string` so the asserted children — Object (BFO_0000030),
  // ObjectAggregate (BFO_0000027), FiatObjectPart (BFO_0000024) — declared by
  // Implementer #2 below can narrow to their own disjoint string literals.
  // The concrete `MaterialEntity` leaf still narrows the discriminant via
  // `'MaterialEntity' as const` at instantiation time.
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractMaterialEntity
  extends AbstractIndependentContinuant
  implements IMaterialEntity {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class MaterialEntity extends AbstractMaterialEntity implements IMaterialEntity {
  override readonly metaClass = 'MaterialEntity' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000040' as const;
}

// ─── 5. ImmaterialEntity (BFO_0000141) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000141
 * @metaclass owl:Class
 * @isAbstract true
 * @parent IndependentContinuant
 * @rdfsLabel "immaterial entity"
 * @definition (none declared in BFO 2020 OWL release — neither obo:IAO_0000115 nor
 *             obo:IAO_0000600 is asserted on BFO_0000141. The OWL release carries
 *             only an obo:IAO_0000116 commentary: "Immaterial entities are divided
 *             into two subgroups: boundaries and sites, which bound, or are demarcated
 *             in relation, to material entities, and which can thus change location,
 *             shape and size as their material hosts move or change shape or size
 *             (for example: your nasal passage; the hold of a ship; the boundary of
 *             Wales (which moves with the rotation of the Earth)).")
 * @bfoReferenceSection §3.6 Immaterial entity
 * @disjointWith MaterialEntity (BFO_0000141 partitions IndependentContinuant against MaterialEntity (BFO_0000040))
 * @subClassOf IndependentContinuant (BFO_0000004)
 * @owlAxioms SubClassOf(BFO_0000004); BFO 2020 declares ImmaterialEntity without a
 *            closure axiom — its concrete subclasses {ContinuantFiatBoundary (BFO_0000140),
 *            Site (BFO_0000029), SpatialRegion (BFO_0000006)} are declared in implementer
 *            slices owned by Implementer #2/#3.
 */
export interface IImmaterialEntity extends IIndependentContinuant {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractImmaterialEntity
  extends AbstractIndependentContinuant
  implements IImmaterialEntity {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 6. GenericallyDependentContinuant (BFO_0000031) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000031
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Continuant
 * @rdfsLabel "generically dependent continuant"
 * @definition "b is a generically dependent continuant = Def. b is a continuant that g-depends_on one or more other entities. (axiom label in BFO2 Reference: [074-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §3.8 Generically dependent continuant
 * @disjointWith IndependentContinuant (BFO_0000004), SpecificallyDependentContinuant (BFO_0000020) — implicit
 *               via the Continuant tripartite partition declared on IndependentContinuant.
 * @subClassOf Continuant (BFO_0000002)
 * @owlAxioms SubClassOf(BFO_0000002);
 *            [074-001] (iff (GenericallyDependentContinuant a) (and (Continuant a) (exists (b t) (genericallyDependsOnAt a b t)))).
 *            BFO 2020 documents that generically dependent continuants — unlike
 *            specifically dependent continuants — admit migration through exact
 *            copying (e.g. a PDF saved to multiple drives is the same generically
 *            dependent continuant).
 */
export interface IGenericallyDependentContinuant extends IContinuant {
  readonly metaClass: 'GenericallyDependentContinuant';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000031';
}

export abstract class AbstractGenericallyDependentContinuant
  extends AbstractContinuant
  implements IGenericallyDependentContinuant {
  abstract override readonly metaClass: 'GenericallyDependentContinuant';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000031';
}

export class GenericallyDependentContinuant
  extends AbstractGenericallyDependentContinuant
  implements IGenericallyDependentContinuant {
  override readonly metaClass = 'GenericallyDependentContinuant' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000031' as const;
}

// ─── 7. SpecificallyDependentContinuant (BFO_0000020) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000020
 * @metaclass owl:Class
 * @isAbstract true
 * @parent Continuant
 * @rdfsLabel "specifically dependent continuant"
 * @definition "b is a specifically dependent continuant = Def. b is a continuant & there is some independent continuant c which is not a spatial region and which is such that b s-depends_on c at every time t during the course of b's existence. (axiom label in BFO2 Reference: [050-003])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §3.7 Specifically dependent continuant
 * @disjointWith GenericallyDependentContinuant (BFO_0000031)
 * @subClassOf Continuant (BFO_0000002)
 * @owlAxioms SubClassOf(BFO_0000002); DisjointWith(BFO_0000031);
 *            [050-003] (iff (SpecificallyDependentContinuant a) (and (Continuant a) (forall (t) (if (existsAt a t) (exists (b) (and (IndependentContinuant b) (not (SpatialRegion b)) (specificallyDependsOnAt a b t))))))).
 *            BFO 2020 declares SpecificallyDependentContinuant without a closure
 *            axiom — its asserted children are Quality (BFO_0000019) and
 *            RealizableEntity (BFO_0000017).
 */
export interface ISpecificallyDependentContinuant extends IContinuant {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractSpecificallyDependentContinuant
  extends AbstractContinuant
  implements ISpecificallyDependentContinuant {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 8. Quality (BFO_0000019) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000019
 * @metaclass owl:Class
 * @isAbstract false
 * @parent SpecificallyDependentContinuant
 * @rdfsLabel "quality"
 * @definition "a quality is a specifically dependent continuant that, in contrast to roles and dispositions, does not require any further process in order to be realized."
 *             (axiom label in BFO2 Reference: [055-001]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000019, so the elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.7 Specifically dependent continuant — Quality
 * @disjointWith RealizableEntity (BFO_0000017) — implicit via the disjointWith axiom
 *               declared on RealizableEntity in the OWL release.
 * @subClassOf SpecificallyDependentContinuant (BFO_0000020)
 * @owlAxioms SubClassOf(BFO_0000020);
 *            [055-001] (forall (x) (if (Quality x) (SpecificallyDependentContinuant x)));
 *            [105-001] (forall (x) (if (exists (t) (and (existsAt x t) (Quality x))) (forall (t_1) (if (existsAt x t_1) (Quality x))))) — Quality is a rigid universal:
 *            if an entity is a quality at any time it exists, it is a quality at every time it exists.
 */
export interface IQuality extends ISpecificallyDependentContinuant {
  readonly metaClass: 'Quality';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000019';
}

export abstract class AbstractQuality
  extends AbstractSpecificallyDependentContinuant
  implements IQuality {
  abstract override readonly metaClass: 'Quality';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000019';
}

export class Quality extends AbstractQuality implements IQuality {
  override readonly metaClass = 'Quality' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000019' as const;
}

// ─── 9. RealizableEntity (BFO_0000017) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000017
 * @metaclass owl:Class
 * @isAbstract true
 * @parent SpecificallyDependentContinuant
 * @rdfsLabel "realizable entity"
 * @definition "To say that b is a realizable entity is to say that b is a specifically dependent continuant that inheres in some independent continuant which is not a spatial region and is of a type instances of which are realized in processes of a correlated type."
 *             (axiom label in BFO2 Reference: [058-002]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000017, so the elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.7 Specifically dependent continuant — Realizable entity
 * @disjointWith Quality (BFO_0000019)
 * @subClassOf SpecificallyDependentContinuant (BFO_0000020)
 * @owlAxioms SubClassOf(BFO_0000020); DisjointWith(BFO_0000019);
 *            [058-002] (forall (x) (if (RealizableEntity x) (and (SpecificallyDependentContinuant x) (exists (y) (and (IndependentContinuant y) (not (SpatialRegion y)) (inheresIn x y))))));
 *            [060-002] (forall (x t) (if (RealizableEntity x) (exists (y) (and (IndependentContinuant y) (not (SpatialRegion y)) (bearerOfAt y x t))))).
 *            BFO 2020 asserts Role (BFO_0000023) and Disposition (BFO_0000016) as
 *            realizable-entity children; BFO 2020 declares RealizableEntity without
 *            a closure axiom.
 */
export interface IRealizableEntity extends ISpecificallyDependentContinuant {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractRealizableEntity
  extends AbstractSpecificallyDependentContinuant
  implements IRealizableEntity {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 10. Role (BFO_0000023) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000023
 * @metaclass owl:Class
 * @isAbstract false
 * @parent RealizableEntity
 * @rdfsLabel "role"
 * @definition "b is a role means: b is a realizable entity & b exists because there is some single bearer that is in some special physical, social, or institutional set of circumstances in which this bearer does not have to be & b is not such that, if it ceases to exist, then the physical make-up of the bearer is thereby changed."
 *             (axiom label in BFO2 Reference: [061-001]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000023, so the elucidation IAO_0000600 carries the formal definition.
 *              A role is the externally-grounded realizable entity: bearer is in a special
 *              physical, social, or institutional set of circumstances in which it does
 *              not have to be.)
 * @bfoReferenceSection §3.7 Specifically dependent continuant — Role (externally-grounded realizable entity)
 * @disjointWith Disposition (BFO_0000016), Function (BFO_0000034) — declared on
 *               Disposition (BFO_0000016) in the OWL release.
 * @subClassOf RealizableEntity (BFO_0000017)
 * @owlAxioms SubClassOf(BFO_0000017);
 *            [061-001] (forall (x) (if (Role x) (RealizableEntity x))).
 *            BFO 2020 distinguishes Role (externally grounded) from Disposition
 *            (internally grounded): if a role ceases, the bearer's physical make-up
 *            is unchanged; if a disposition ceases, the bearer's physical make-up changes.
 */
export interface IRole extends IRealizableEntity {
  readonly metaClass: 'Role';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000023';
}

export abstract class AbstractRole
  extends AbstractRealizableEntity
  implements IRole {
  abstract override readonly metaClass: 'Role';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000023';
}

export class Role extends AbstractRole implements IRole {
  override readonly metaClass = 'Role' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000023' as const;
}

// ─── 11. Disposition (BFO_0000016) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000016
 * @metaclass owl:Class
 * @isAbstract false
 * @parent RealizableEntity
 * @rdfsLabel "disposition"
 * @definition "b is a disposition means: b is a realizable entity & b's bearer is some material entity & b is such that if it ceases to exist, then its bearer is physically changed, & b's realization occurs when and because this bearer is in some special physical circumstances, & this realization occurs in virtue of the bearer's physical make-up."
 *             (axiom label in BFO2 Reference: [062-002]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000016, so the elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.7 Specifically dependent continuant — Disposition (internally-grounded realizable entity)
 * @disjointWith Role (BFO_0000023), Function (BFO_0000034) — Function is asserted as
 *               a subClassOf Disposition, so the disjointness with Function is interpreted
 *               at the sibling-Role level (the OWL release declares DisjointWith(Role)).
 * @subClassOf RealizableEntity (BFO_0000017)
 * @owlAxioms SubClassOf(BFO_0000017); DisjointWith(BFO_0000023);
 *            [062-002] (forall (x) (if (Disposition x) (and (RealizableEntity x) (exists (y) (and (MaterialEntity y) (bearerOfAt x y t))))));
 *            [063-002] (forall (x t) (if (and (RealizableEntity x) (existsAt x t)) (exists (y) (and (MaterialEntity y) (specificallyDepends x y t))))).
 *            BFO 2020 documents that dispositions are unlike roles in that they are
 *            not optional: if the bearer's physical make-up changes, the disposition
 *            may be lost; if the disposition ceases, the bearer is physically changed.
 */
export interface IDisposition extends IRealizableEntity {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractDisposition
  extends AbstractRealizableEntity
  implements IDisposition {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class Disposition extends AbstractDisposition implements IDisposition {
  override readonly metaClass = 'Disposition' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000016' as const;
}

// ─── 12. Function (BFO_0000034) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000034
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Disposition
 * @rdfsLabel "function"
 * @definition "A function is a disposition that exists in virtue of the bearer's physical make-up and this physical make-up is something the bearer possesses because it came into being, either through evolution (in the case of natural biological entities) or through intentional design (in the case of artifacts), in order to realize processes of a certain sort."
 *             (axiom label in BFO2 Reference: [064-001]; sourced from obo:IAO_0000600
 *              in spec/bfo_classes_only.owl — obo:IAO_0000115 is not declared on
 *              BFO_0000034, so the elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.7 Specifically dependent continuant — Function
 * @disjointWith (none asserted in the OWL release at the Function level; in BFO 2 Reference
 *                the past distinction between artifactual function and biological function
 *                is explicitly NOT lifted into the OWL hierarchy as an asserted child
 *                disjointness — the same function (e.g. "to pump") can exist in both
 *                artifacts and biological entities.)
 * @subClassOf Disposition (BFO_0000016)
 * @owlAxioms SubClassOf(BFO_0000016);
 *            [064-001] (forall (x) (if (Function x) (Disposition x))).
 *            BFO 2020 makes Function a subkind of Disposition: every function is a
 *            disposition, but not every disposition is a function — a function adds
 *            the criterion that the bearer's physical make-up came into being for the
 *            sake of realizing a certain process type (selection or design history).
 */
export interface IFunction extends IDisposition {
  readonly metaClass: 'Function';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000034';
}

export abstract class AbstractFunction
  extends AbstractDisposition
  implements IFunction {
  abstract override readonly metaClass: 'Function';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000034';
}

export class Function_ extends AbstractFunction implements IFunction {
  override readonly metaClass = 'Function' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000034' as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #1: Continuant spine
// (next: Implementer #2 — material entity specializations + spatial regions)
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #2: Material specializations + Immaterial + Spatial regions
// (Object • ObjectAggregate • FiatObjectPart • Site •
//  ContinuantFiatBoundary + 3 dimensional specializations •
//  SpatialRegion + 4 dimensional specializations)
// ═══════════════════════════════════════════════════════════════════════════

// ─── 13. Object (BFO_0000030) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000030
 * @metaclass owl:Class
 * @isAbstract false
 * @parent MaterialEntity
 * @rdfsLabel "object"
 * @definition "b is an object means: b is a material entity which manifests causal unity of one or other of the types CUn listed above & is of a type (a material universal) instances of which are maximal relative to this criterion of causal unity. (axiom label in BFO2 Reference: [024-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000030, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.5 Material entity — Object (a maximal causally unified material entity)
 * @disjointWith ObjectAggregate (BFO_0000027), FiatObjectPart (BFO_0000024) — the OWL release
 *               does not assert pairwise disjointness on Object directly; the BFO 2 Reference
 *               documents the trichotomy of Object / ObjectAggregate / FiatObjectPart as the
 *               sub-partition of MaterialEntity, and notes (BFO2 Reference §3.5) that
 *               problematic penumbra cases do not invalidate the categories.
 * @subClassOf MaterialEntity (BFO_0000040)
 * @owlAxioms SubClassOf(BFO_0000040);
 *            BFO 2 Reference [024-001]: object = maximal causally unified material entity.
 *            BFO 2020 OWL release does not assert a CLIF axiom (IAO_0000602) for Object —
 *            the elucidation [024-001] in IAO_0000600 carries the formal definition.
 *            BFO 2 Reference enumerates causal unity types CU1 (physical covering), CU2
 *            (internal physical forces), CU3 (engineered assembly).
 */
export interface IObject extends IMaterialEntity {
  readonly metaClass: 'Object';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000030';
}

export abstract class AbstractObject
  extends AbstractMaterialEntity
  implements IObject {
  abstract override readonly metaClass: 'Object';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000030';
}

export class Object_ extends AbstractObject implements IObject {
  override readonly metaClass = 'Object' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000030' as const;
}

// ─── 14. ObjectAggregate (BFO_0000027) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000027
 * @metaclass owl:Class
 * @isAbstract false
 * @parent MaterialEntity
 * @rdfsLabel "object aggregate"
 * @definition "b is an object aggregate means: b is a material entity consisting exactly of a plurality of objects as member_parts at all times at which b exists. (axiom label in BFO2 Reference: [025-004])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000027, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.5 Material entity — Object aggregate
 * @disjointWith Object (BFO_0000030), FiatObjectPart (BFO_0000024) — the OWL release
 *               does not assert pairwise disjointness on ObjectAggregate directly; the
 *               trichotomy is documented in BFO 2 Reference §3.5 rather than enforced
 *               at the OWL axiom level.
 * @subClassOf MaterialEntity (BFO_0000040)
 * @owlAxioms SubClassOf(BFO_0000040);
 *            [025-004] (forall (x) (if (ObjectAggregate x) (and (MaterialEntity x) (forall (t) (if (existsAt x t) (exists (y z) (and (Object y) (Object z) (memberPartOfAt y x t) (memberPartOfAt z x t) (not (= y z)))))) (not (exists (w t_1) (and (memberPartOfAt w x t_1) (not (Object w)))))))).
 *            IAO_0000116 commentary: "An entity a is an object aggregate if and only if
 *            there is a mutually exhaustive and pairwise disjoint partition of a into objects."
 *            BFO 2 Reference notes object aggregates may gain and lose parts while
 *            remaining numerically identical over time (e.g. baseball team, cells in body).
 */
export interface IObjectAggregate extends IMaterialEntity {
  readonly metaClass: 'ObjectAggregate';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000027';
}

export abstract class AbstractObjectAggregate
  extends AbstractMaterialEntity
  implements IObjectAggregate {
  abstract override readonly metaClass: 'ObjectAggregate';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000027';
}

export class ObjectAggregate
  extends AbstractObjectAggregate
  implements IObjectAggregate {
  override readonly metaClass = 'ObjectAggregate' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000027' as const;
}

// ─── 15. FiatObjectPart (BFO_0000024) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000024
 * @metaclass owl:Class
 * @isAbstract false
 * @parent MaterialEntity
 * @rdfsLabel "fiat object part"
 * @definition "b is a fiat object part = Def. b is a material entity which is such that for all times t, if b exists at t then there is some object c such that b proper continuant_part of  c at t and c is demarcated from the remainder of c by a two-dimensional continuant fiat boundary. (axiom label in BFO2 Reference: [027-004])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000024, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.5 Material entity — Fiat object part
 * @disjointWith Object (BFO_0000030), ObjectAggregate (BFO_0000027) — the OWL release
 *               does not assert pairwise disjointness on FiatObjectPart directly; the
 *               trichotomy is documented in BFO 2 Reference §3.5.
 * @subClassOf MaterialEntity (BFO_0000040)
 * @owlAxioms SubClassOf(BFO_0000040);
 *            [027-004] (forall (x) (if (FiatObjectPart x) (and (MaterialEntity x) (forall (t) (if (existsAt x t) (exists (y) (and (Object y) (properContinuantPartOfAt x y t)))))))).
 *            BFO 2 Reference notes most examples of fiat object parts are associated
 *            with theoretically drawn divisions (e.g. dorsal/ventral surfaces, lung lobes,
 *            Western hemisphere of the Earth). Fiat object parts do not depend for their
 *            existence on the cognitive acts of delineation.
 */
export interface IFiatObjectPart extends IMaterialEntity {
  readonly metaClass: 'FiatObjectPart';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000024';
}

export abstract class AbstractFiatObjectPart
  extends AbstractMaterialEntity
  implements IFiatObjectPart {
  abstract override readonly metaClass: 'FiatObjectPart';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000024';
}

export class FiatObjectPart
  extends AbstractFiatObjectPart
  implements IFiatObjectPart {
  override readonly metaClass = 'FiatObjectPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000024' as const;
}

// ─── 16. Site (BFO_0000029) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000029
 * @metaclass owl:Class
 * @isAbstract false
 * @parent ImmaterialEntity
 * @rdfsLabel "site"
 * @definition "b is a site means: b is a three-dimensional immaterial entity that is (partially or wholly) bounded by a material entity or it is a three-dimensional immaterial part thereof. (axiom label in BFO2 Reference: [034-002])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000029, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Site
 * @disjointWith SpatialRegion (BFO_0000006), ContinuantFiatBoundary (BFO_0000140) —
 *               disjointness is asserted on SpatialRegion (DisjointWith Site) in the
 *               OWL release; sibling-Site/CFB disjointness is documented in BFO 2
 *               Reference §3.6.
 * @subClassOf ImmaterialEntity (BFO_0000141)
 * @owlAxioms SubClassOf(BFO_0000141);
 *            [034-002] (forall (x) (if (Site x) (ImmaterialEntity x))).
 *            BFO 2 Reference exemplars: cockpit of an aircraft, hold of a ship, interior
 *            of a kangaroo pouch, lumen of the gut, the Grand Canyon, Manhattan Canyon,
 *            interior of the trunk of a car, interior of a refrigerator, an air traffic
 *            control region. Sites are bounded by material entities (or fiat boundaries)
 *            but contain no portion of matter as proper continuant part.
 */
export interface ISite extends IImmaterialEntity {
  readonly metaClass: 'Site';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000029';
}

export abstract class AbstractSite
  extends AbstractImmaterialEntity
  implements ISite {
  abstract override readonly metaClass: 'Site';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000029';
}

export class Site extends AbstractSite implements ISite {
  override readonly metaClass = 'Site' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000029' as const;
}

// ─── 17. ContinuantFiatBoundary (BFO_0000140) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000140
 * @metaclass owl:Class
 * @isAbstract true
 * @parent ImmaterialEntity
 * @rdfsLabel "continuant fiat boundary"
 * @definition "b is a continuant fiat boundary = Def. b is an immaterial entity that is of zero, one or two dimensions and does not include a spatial region as part. (axiom label in BFO2 Reference: [029-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §3.6 Immaterial entity — Continuant fiat boundary
 * @disjointWith SpatialRegion (BFO_0000006) — disjointness is asserted on SpatialRegion
 *               in the OWL release (DisjointWith ContinuantFiatBoundary).
 * @subClassOf ImmaterialEntity (BFO_0000141)
 * @owlAxioms SubClassOf(BFO_0000141);
 *            [029-001] (iff (ContinuantFiatBoundary a) (and (ImmaterialEntity a) (exists (b) (and (or (ZeroDimensionalSpatialRegion b) (OneDimensionalSpatialRegion b) (TwoDimensionalSpatialRegion b)) (forall (t) (locatedInAt a b t)))) (not (exists (c t) (and (SpatialRegion c) (continuantPartOfAt c a t)))))).
 *            IAO_0000601: "Every continuant fiat boundary is located at some spatial
 *            region at every time at which it exists." BFO 2 Reference notes the OWL
 *            release does not declare a closure axiom because mereological sums of
 *            CFBs of different dimensions are admissible (analogous to spatial and
 *            temporal regions). Three asserted children:
 *            ZeroDimensionalContinuantFiatBoundary (BFO_0000147),
 *            OneDimensionalContinuantFiatBoundary (BFO_0000142),
 *            TwoDimensionalContinuantFiatBoundary (BFO_0000146).
 */
export interface IContinuantFiatBoundary extends IImmaterialEntity {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractContinuantFiatBoundary
  extends AbstractImmaterialEntity
  implements IContinuantFiatBoundary {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 18. ZeroDimensionalContinuantFiatBoundary (BFO_0000147) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000147
 * @metaclass owl:Class
 * @isAbstract false
 * @parent ContinuantFiatBoundary
 * @rdfsLabel "zero-dimensional continuant fiat boundary"
 * @definition "a zero-dimensional continuant fiat boundary is a fiat point whose location is defined in relation to some material entity. (axiom label in BFO2 Reference: [031-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000147, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Zero-dimensional continuant fiat boundary
 * @disjointWith (none asserted in the OWL release — sibling disjointness with
 *                OneDimensionalContinuantFiatBoundary (BFO_0000142) is asserted on
 *                BFO_0000142 (DisjointWith BFO_0000147), and BFO_0000146 has no asserted
 *                disjointness with BFO_0000147 in the OWL release.)
 * @subClassOf ContinuantFiatBoundary (BFO_0000140)
 * @owlAxioms SubClassOf(BFO_0000140);
 *            [031-001] (iff (ZeroDimensionalContinuantFiatBoundary a) (and (ContinuantFiatBoundary a) (exists (b) (and (ZeroDimensionalSpatialRegion b) (forall (t) (locatedInAt a b t)))))).
 *            IAO_0000116 commentary: zero-dimensional continuant fiat boundaries are NOT
 *            spatial points; the quadripoint where the boundaries of Colorado, Utah,
 *            New Mexico, and Arizona meet is a 0-D CFB (the same fiat point relative to
 *            the four state boundaries) — it is NOT the spatial point that varies by frame.
 *            Examples: geographic North Pole, point of origin of a coordinate system.
 */
export interface IZeroDimensionalContinuantFiatBoundary
  extends IContinuantFiatBoundary {
  readonly metaClass: 'ZeroDimensionalContinuantFiatBoundary';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000147';
}

export abstract class AbstractZeroDimensionalContinuantFiatBoundary
  extends AbstractContinuantFiatBoundary
  implements IZeroDimensionalContinuantFiatBoundary {
  abstract override readonly metaClass: 'ZeroDimensionalContinuantFiatBoundary';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000147';
}

export class ZeroDimensionalContinuantFiatBoundary
  extends AbstractZeroDimensionalContinuantFiatBoundary
  implements IZeroDimensionalContinuantFiatBoundary {
  override readonly metaClass = 'ZeroDimensionalContinuantFiatBoundary' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000147' as const;
}

// ─── 19. OneDimensionalContinuantFiatBoundary (BFO_0000142) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000142
 * @metaclass owl:Class
 * @isAbstract false
 * @parent ContinuantFiatBoundary
 * @rdfsLabel "one-dimensional continuant fiat boundary"
 * @definition "a one-dimensional continuant fiat boundary is a continuous fiat line whose location is defined in relation to some material entity. (axiom label in BFO2 Reference: [032-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000142, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — One-dimensional continuant fiat boundary
 * @disjointWith ZeroDimensionalContinuantFiatBoundary (BFO_0000147), TwoDimensionalContinuantFiatBoundary (BFO_0000146)
 *               — both disjointness axioms are asserted on BFO_0000142 in the OWL release.
 * @subClassOf ContinuantFiatBoundary (BFO_0000140)
 * @owlAxioms SubClassOf(BFO_0000140); DisjointWith(BFO_0000146); DisjointWith(BFO_0000147);
 *            [032-001] (iff (OneDimensionalContinuantFiatBoundary a) (and (ContinuantFiatBoundary a) (exists (b) (and (OneDimensionalSpatialRegion b) (forall (t) (locatedInAt a b t)))))).
 *            Examples: the Equator, all geopolitical boundaries, all lines of latitude
 *            and longitude, the median sulcus of a tongue.
 */
export interface IOneDimensionalContinuantFiatBoundary
  extends IContinuantFiatBoundary {
  readonly metaClass: 'OneDimensionalContinuantFiatBoundary';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000142';
}

export abstract class AbstractOneDimensionalContinuantFiatBoundary
  extends AbstractContinuantFiatBoundary
  implements IOneDimensionalContinuantFiatBoundary {
  abstract override readonly metaClass: 'OneDimensionalContinuantFiatBoundary';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000142';
}

export class OneDimensionalContinuantFiatBoundary
  extends AbstractOneDimensionalContinuantFiatBoundary
  implements IOneDimensionalContinuantFiatBoundary {
  override readonly metaClass = 'OneDimensionalContinuantFiatBoundary' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000142' as const;
}

// ─── 20. TwoDimensionalContinuantFiatBoundary (BFO_0000146) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000146
 * @metaclass owl:Class
 * @isAbstract false
 * @parent ContinuantFiatBoundary
 * @rdfsLabel "two-dimensional continuant fiat boundary"
 * @definition "a two-dimensional continuant fiat boundary (surface) is a self-connected fiat surface whose location is defined in relation to some material entity. (axiom label in BFO2 Reference: [033-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000146, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Two-dimensional continuant fiat boundary
 * @disjointWith OneDimensionalContinuantFiatBoundary (BFO_0000142) — declared on BFO_0000142
 *               in the OWL release (DisjointWith BFO_0000146); BFO_0000146 itself does
 *               not assert outgoing sibling disjointness in the OWL release.
 * @subClassOf ContinuantFiatBoundary (BFO_0000140)
 * @owlAxioms SubClassOf(BFO_0000140);
 *            [033-001] (iff (TwoDimensionalContinuantFiatBoundary a) (and (ContinuantFiatBoundary a) (exists (b) (and (TwoDimensionalSpatialRegion b) (forall (t) (locatedInAt a b t)))))).
 *            BFO 2 Reference: a 2-D CFB is the surface of a material entity (e.g. the
 *            external surface of an apple, the surface separating two adjacent tissue
 *            types). BFO 2.0 explicitly treats material-object surfaces as fiat surfaces
 *            (a departure from BFO 1.1 which treated them as mathematical boundaries).
 */
export interface ITwoDimensionalContinuantFiatBoundary
  extends IContinuantFiatBoundary {
  readonly metaClass: 'TwoDimensionalContinuantFiatBoundary';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000146';
}

export abstract class AbstractTwoDimensionalContinuantFiatBoundary
  extends AbstractContinuantFiatBoundary
  implements ITwoDimensionalContinuantFiatBoundary {
  abstract override readonly metaClass: 'TwoDimensionalContinuantFiatBoundary';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000146';
}

export class TwoDimensionalContinuantFiatBoundary
  extends AbstractTwoDimensionalContinuantFiatBoundary
  implements ITwoDimensionalContinuantFiatBoundary {
  override readonly metaClass = 'TwoDimensionalContinuantFiatBoundary' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000146' as const;
}

// ─── 21. SpatialRegion (BFO_0000006) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000006
 * @metaclass owl:Class
 * @isAbstract true
 * @parent ImmaterialEntity
 * @rdfsLabel "spatial region"
 * @definition "A spatial region is a continuant entity that is a continuant_part_of spaceR as defined relative to some frame R. (axiom label in BFO2 Reference: [035-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000006, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Spatial region
 * @disjointWith Site (BFO_0000029), ContinuantFiatBoundary (BFO_0000140) — both
 *               disjointness axioms are asserted on BFO_0000006 in the OWL release.
 * @subClassOf ImmaterialEntity (BFO_0000141)
 * @owlAxioms SubClassOf(BFO_0000141); DisjointWith(BFO_0000029); DisjointWith(BFO_0000140);
 *            [035-001] (forall (x) (if (SpatialRegion x) (Continuant x)));
 *            [036-001] (forall (x y t) (if (and (SpatialRegion x) (continuantPartOfAt y x t)) (SpatialRegion y))) — all continuant parts of spatial regions are spatial regions.
 *            IAO_0000116 commentary: "Spatial regions do not participate in processes."
 *            Closure axiom intentionally absent: subclasses {0D, 1D, 2D, 3D} do not exhaust
 *            all possibilities (e.g. union of a spatial point and a non-overlapping spatial
 *            line). Asserted children: ZeroDimensionalSpatialRegion (BFO_0000018),
 *            OneDimensionalSpatialRegion (BFO_0000026),
 *            TwoDimensionalSpatialRegion (BFO_0000009),
 *            ThreeDimensionalSpatialRegion (BFO_0000028).
 */
export interface ISpatialRegion extends IImmaterialEntity {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractSpatialRegion
  extends AbstractImmaterialEntity
  implements ISpatialRegion {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 22. ZeroDimensionalSpatialRegion (BFO_0000018) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000018
 * @metaclass owl:Class
 * @isAbstract false
 * @parent SpatialRegion
 * @rdfsLabel "zero-dimensional spatial region"
 * @definition "A zero-dimensional spatial region is a point in space. (axiom label in BFO2 Reference: [037-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000018, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Zero-dimensional spatial region
 * @disjointWith ThreeDimensionalSpatialRegion (BFO_0000028) — asserted on BFO_0000018
 *               in the OWL release. Sibling disjointness with 1D (BFO_0000026) and 2D
 *               (BFO_0000009) is not asserted on BFO_0000018 directly (BFO 2020 OWL
 *               release does not enforce full pairwise disjointness across all four
 *               dimensional siblings).
 * @subClassOf SpatialRegion (BFO_0000006)
 * @owlAxioms SubClassOf(BFO_0000006); DisjointWith(BFO_0000028);
 *            [037-001] (forall (x) (if (ZeroDimensionalSpatialRegion x) (SpatialRegion x))).
 *            A 0-D spatial region is a point in space (frame-relative; see also
 *            ZeroDimensionalContinuantFiatBoundary (BFO_0000147), which is a fiat point
 *            defined in relation to a material entity rather than to a spatial frame).
 */
export interface IZeroDimensionalSpatialRegion extends ISpatialRegion {
  readonly metaClass: 'ZeroDimensionalSpatialRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000018';
}

export abstract class AbstractZeroDimensionalSpatialRegion
  extends AbstractSpatialRegion
  implements IZeroDimensionalSpatialRegion {
  abstract override readonly metaClass: 'ZeroDimensionalSpatialRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000018';
}

export class ZeroDimensionalSpatialRegion
  extends AbstractZeroDimensionalSpatialRegion
  implements IZeroDimensionalSpatialRegion {
  override readonly metaClass = 'ZeroDimensionalSpatialRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000018' as const;
}

// ─── 23. OneDimensionalSpatialRegion (BFO_0000026) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000026
 * @metaclass owl:Class
 * @isAbstract false
 * @parent SpatialRegion
 * @rdfsLabel "one-dimensional spatial region"
 * @definition "A one-dimensional spatial region is a line or aggregate of lines stretching from one point in space to another. (axiom label in BFO2 Reference: [038-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000026, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — One-dimensional spatial region
 * @disjointWith ThreeDimensionalSpatialRegion (BFO_0000028) — asserted on BFO_0000026
 *               in the OWL release. Sibling disjointness with 0D (BFO_0000018) and 2D
 *               (BFO_0000009) is not asserted on BFO_0000026 directly.
 * @subClassOf SpatialRegion (BFO_0000006)
 * @owlAxioms SubClassOf(BFO_0000006); DisjointWith(BFO_0000028);
 *            [038-001] (forall (x) (if (OneDimensionalSpatialRegion x) (SpatialRegion x))).
 *            Example: an edge of a cube-shaped portion of space.
 */
export interface IOneDimensionalSpatialRegion extends ISpatialRegion {
  readonly metaClass: 'OneDimensionalSpatialRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000026';
}

export abstract class AbstractOneDimensionalSpatialRegion
  extends AbstractSpatialRegion
  implements IOneDimensionalSpatialRegion {
  abstract override readonly metaClass: 'OneDimensionalSpatialRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000026';
}

export class OneDimensionalSpatialRegion
  extends AbstractOneDimensionalSpatialRegion
  implements IOneDimensionalSpatialRegion {
  override readonly metaClass = 'OneDimensionalSpatialRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000026' as const;
}

// ─── 24. TwoDimensionalSpatialRegion (BFO_0000009) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000009
 * @metaclass owl:Class
 * @isAbstract false
 * @parent SpatialRegion
 * @rdfsLabel "two-dimensional spatial region"
 * @definition "A two-dimensional spatial region is a spatial region that is of two dimensions. (axiom label in BFO2 Reference: [039-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000009, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Two-dimensional spatial region
 * @disjointWith ThreeDimensionalSpatialRegion (BFO_0000028) — asserted on BFO_0000009
 *               in the OWL release. Sibling disjointness with 0D (BFO_0000018) and 1D
 *               (BFO_0000026) is not asserted on BFO_0000009 directly.
 * @subClassOf SpatialRegion (BFO_0000006)
 * @owlAxioms SubClassOf(BFO_0000006); DisjointWith(BFO_0000028);
 *            [039-001] (forall (x) (if (TwoDimensionalSpatialRegion x) (SpatialRegion x))).
 *            Examples: an infinitely thin plane in space; the surface of a sphere-shaped
 *            part of space.
 */
export interface ITwoDimensionalSpatialRegion extends ISpatialRegion {
  readonly metaClass: 'TwoDimensionalSpatialRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000009';
}

export abstract class AbstractTwoDimensionalSpatialRegion
  extends AbstractSpatialRegion
  implements ITwoDimensionalSpatialRegion {
  abstract override readonly metaClass: 'TwoDimensionalSpatialRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000009';
}

export class TwoDimensionalSpatialRegion
  extends AbstractTwoDimensionalSpatialRegion
  implements ITwoDimensionalSpatialRegion {
  override readonly metaClass = 'TwoDimensionalSpatialRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000009' as const;
}

// ─── 25. ThreeDimensionalSpatialRegion (BFO_0000028) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000028
 * @metaclass owl:Class
 * @isAbstract false
 * @parent SpatialRegion
 * @rdfsLabel "three-dimensional spatial region"
 * @definition "A three-dimensional spatial region is a spatial region that is of three dimensions. (axiom label in BFO2 Reference: [040-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000028, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §3.6 Immaterial entity — Three-dimensional spatial region
 * @disjointWith ZeroDimensionalSpatialRegion (BFO_0000018), OneDimensionalSpatialRegion (BFO_0000026), TwoDimensionalSpatialRegion (BFO_0000009)
 *               — disjointness with each lower-dimensional sibling is asserted on the
 *               sibling class against BFO_0000028; BFO_0000028 itself does not declare
 *               outgoing disjointness in the OWL release.
 * @subClassOf SpatialRegion (BFO_0000006)
 * @owlAxioms SubClassOf(BFO_0000006);
 *            [040-001] (forall (x) (if (ThreeDimensionalSpatialRegion x) (SpatialRegion x))).
 *            Examples: a cube-shaped region of space; a sphere-shaped region of space.
 */
export interface IThreeDimensionalSpatialRegion extends ISpatialRegion {
  readonly metaClass: 'ThreeDimensionalSpatialRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000028';
}

export abstract class AbstractThreeDimensionalSpatialRegion
  extends AbstractSpatialRegion
  implements IThreeDimensionalSpatialRegion {
  abstract override readonly metaClass: 'ThreeDimensionalSpatialRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000028';
}

export class ThreeDimensionalSpatialRegion
  extends AbstractThreeDimensionalSpatialRegion
  implements IThreeDimensionalSpatialRegion {
  override readonly metaClass = 'ThreeDimensionalSpatialRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000028' as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #2: Material specializations + Immaterial + Spatial regions
// (next: Implementer #3 — Occurrent / Process / Temporal regions)
// ═══════════════════════════════════════════════════════════════════════════
