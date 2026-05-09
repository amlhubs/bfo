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

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #3: Occurrent spine + Temporal regions
// (Occurrent • Process • ProcessBoundary • History • ProcessProfile •
//  TemporalRegion + dimensional specializations •
//  SpatiotemporalRegion)
//
// Spec-conditional notes (verified against spec/bfo_classes_only.owl):
//   • TemporalInstant — NOT declared as a separate class in BFO 2020 OWL.
//     It appears only as an obo:IAO_0000118 (alternative term) annotation on
//     BFO_0000148 (ZeroDimensionalTemporalRegion). Omitted here. The synonym
//     is documented in the JSDoc of ZeroDimensionalTemporalRegion.
//   • TemporalInterval — NOT declared as a separate class in BFO 2020 OWL.
//     It appears only as obo:IAO_0000116 (commentary) on BFO_0000038
//     (OneDimensionalTemporalRegion): "A temporal interval is a special kind
//     of one-dimensional temporal region, namely one that is self-connected
//     (is without gaps or breaks)." Omitted here. The synonym is documented
//     in the JSDoc of OneDimensionalTemporalRegion.
//   • History — declared in BFO 2020 OWL as SubClassOf(BFO_0000015 = Process)
//     at spec/bfo_classes_only.owl L1699, NOT SubClassOf(Occurrent). The
//     implementation honours the OWL axiom (History extends Process).
//   • ProcessProfile — declared in BFO 2020 OWL as SubClassOf(BFO_0000015 =
//     Process) at spec/bfo_classes_only.owl L1531. Implemented as a concrete
//     class (the OWL release does not assert isAbstract on BFO_0000144).
//   • ProcessBoundary — declared in BFO 2020 OWL as SubClassOf(BFO_0000003
//     = Occurrent) at spec/bfo_classes_only.owl L1309, NOT SubClassOf(Process).
//     This matches the BFO 2 Reference treatment of process boundaries as
//     instantaneous occurrent boundaries, not as proper temporal parts that
//     would inherit the Process closure axiom.
// ═══════════════════════════════════════════════════════════════════════════

// ─── 26. Occurrent (BFO_0000003) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000003
 * @metaclass owl:Class
 * @isAbstract true
 * @parent Entity
 * @rdfsLabel "occurrent"
 * @definition "An occurrent is an entity that unfolds itself in time or it is the instantaneous boundary of such an entity (for example a beginning or an ending) or it is a temporal or spatiotemporal region which such an entity occupies_temporal_region or occupies_spatiotemporal_region. (axiom label in BFO2 Reference: [077-002])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000003, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §4 Occurrent
 * @disjointWith Continuant (BFO_0000002) — disjointness is asserted on Continuant
 *               in the OWL release (DisjointWith BFO_0000003); BFO_0000003 itself
 *               does not assert outgoing disjointness.
 * @subClassOf Entity (BFO_0000001)
 * @owlAxioms SubClassOf(BFO_0000001);
 *            [077-002] elucidation: occurrents unfold in time, are instantaneous
 *            boundaries thereof, or are temporal/spatiotemporal regions occupied
 *            by such entities.
 *            [108-001] (forall (x) (if (Occurrent x) (exists (r) (and (SpatioTemporalRegion r) (occupiesSpatioTemporalRegion x r))));
 *            [079-001] (forall (x) (iff (Occurrent x) (and (Entity x) (exists (y) (temporalPartOf y x))))) — Occurrent ≡ Entity that has temporal parts.
 *            BFO 2020 declares Occurrent without a closure axiom (subclasses do not
 *            necessarily exhaust all possibilities — example: the sum of a process
 *            and the process boundary of another process). Asserted children:
 *            Process (BFO_0000015), ProcessBoundary (BFO_0000035),
 *            TemporalRegion (BFO_0000008), SpatiotemporalRegion (BFO_0000011).
 */
export interface IOccurrent extends IEntity {
  // Widened to `string` so the asserted children — Process (BFO_0000015),
  // ProcessBoundary (BFO_0000035), TemporalRegion (BFO_0000008),
  // SpatiotemporalRegion (BFO_0000011) — declared below can narrow to their
  // own disjoint string literals.
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractOccurrent
  extends AbstractEntity
  implements IOccurrent {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 27. Process (BFO_0000015) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000015
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Occurrent
 * @rdfsLabel "process"
 * @definition "p is a process = Def. p is an occurrent that has temporal proper parts and for some time t, p s-depends_on some material entity at t. (axiom label in BFO2 Reference: [083-003])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §4.1 Occurrent — Process
 * @disjointWith TemporalRegion (BFO_0000008) — declared on BFO_0000008 in the OWL
 *               release (DisjointWith BFO_0000015); BFO_0000015 itself does not
 *               assert outgoing disjointness.
 * @subClassOf Occurrent (BFO_0000003)
 * @owlAxioms SubClassOf(BFO_0000003);
 *            [083-003] (iff (Process a) (and (Occurrent a) (exists (b) (properTemporalPartOf b a)) (exists (c t) (and (MaterialEntity c) (specificallyDependsOnAt a c t))))) — Process ≡ Occurrent with proper temporal parts that s-depends_on some material entity at some time.
 *            BFO 2 Reference IAO_0000116: "In BFO 2.0 'process' is, rather, the
 *            occurrent counterpart of 'material entity'." Examples include a process
 *            of cell-division, the flight of a bird, the life of an organism, your
 *            process of aging. Asserted children: ProcessProfile (BFO_0000144),
 *            History (BFO_0000182).
 */
export interface IProcess extends IOccurrent {
  // Widened to `string` so the asserted children — ProcessProfile (BFO_0000144)
  // and History (BFO_0000182) — declared below can narrow to their own disjoint
  // string literals. The concrete `Process` leaf still narrows the discriminant
  // via `'Process' as const` at instantiation time.
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractProcess
  extends AbstractOccurrent
  implements IProcess {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class Process extends AbstractProcess implements IProcess {
  override readonly metaClass = 'Process' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000015' as const;
}

// ─── 28. History (BFO_0000182) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000182
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Process
 * @rdfsLabel "history"
 * @definition "A history is a process that is the sum of the totality of processes taking place in the spatiotemporal region occupied by a material entity or site, including processes on the surface of the entity or within the cavities to which it serves as host. (axiom label in BFO2 Reference: [138-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000182, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §4.1 Occurrent — Process — History
 * @disjointWith ProcessProfile (BFO_0000144) — declared on BFO_0000144 in the OWL
 *               release (DisjointWith BFO_0000182); BFO_0000182 itself does not
 *               assert outgoing disjointness.
 * @subClassOf Process (BFO_0000015)
 * @owlAxioms SubClassOf(BFO_0000015);
 *            [138-001] elucidation: history is the maximal sum of processes taking
 *            place in the spatiotemporal region occupied by a material entity or
 *            site (including surface processes and processes within hosted cavities).
 *            BFO 2020 OWL release does not assert a CLIF axiom (IAO_0000602) for
 *            History — the elucidation [138-001] in IAO_0000600 carries the formal
 *            definition. Note: BFO 2020 OWL declares History as SubClassOf(Process),
 *            placing it on the Process branch rather than the Occurrent branch.
 */
export interface IHistory extends IProcess {
  readonly metaClass: 'History';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000182';
}

export abstract class AbstractHistory
  extends AbstractProcess
  implements IHistory {
  abstract override readonly metaClass: 'History';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000182';
}

export class History extends AbstractHistory implements IHistory {
  override readonly metaClass = 'History' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000182' as const;
}

// ─── 29. ProcessProfile (BFO_0000144) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000144
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Process
 * @rdfsLabel "process profile"
 * @definition "b is a process_profile =Def. there is some process c such that b process_profile_of c (axiom label in BFO2 Reference: [093-002])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §4.1 Occurrent — Process — Process profile
 * @disjointWith History (BFO_0000182) — asserted on BFO_0000144 in the OWL release
 *               (DisjointWith BFO_0000182).
 * @subClassOf Process (BFO_0000015)
 * @owlAxioms SubClassOf(BFO_0000015); DisjointWith(BFO_0000182);
 *            [093-002] (iff (ProcessProfile a) (exists (b) (and (Process b) (processProfileOf a b)))) — ProcessProfile ≡ Process with a process_profile_of relation to some Process.
 *            [094-005] (forall (x y) (if (processProfileOf x y) (and (properContinuantPartOf x y) (exists (z t) (and (properOccurrentPartOf z y) (TemporalRegion t) (occupiesSpatioTemporalRegion x t) (occupiesSpatioTemporalRegion y t) (occupiesSpatioTemporalRegion z t) (not (exists (w) (and (occurrentPartOf w x) (occurrentPartOf w z))))))))).
 *            BFO 2 Reference IAO_0000112 examples: quality process profiles
 *            (selective abstraction over single-quality changes — mass, temperature,
 *            aortic pressure); rate process profiles (ratios of magnitudes to elapsed
 *            time — speed, beat frequency); beat process profiles (cyclical sub-family
 *            of rate profiles — e.g. 60 bpm heartbeat).
 */
export interface IProcessProfile extends IProcess {
  readonly metaClass: 'ProcessProfile';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000144';
}

export abstract class AbstractProcessProfile
  extends AbstractProcess
  implements IProcessProfile {
  abstract override readonly metaClass: 'ProcessProfile';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000144';
}

export class ProcessProfile
  extends AbstractProcessProfile
  implements IProcessProfile {
  override readonly metaClass = 'ProcessProfile' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000144' as const;
}

// ─── 30. ProcessBoundary (BFO_0000035) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000035
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Occurrent
 * @rdfsLabel "process boundary"
 * @definition "p is a process boundary =Def. p is a temporal part of a process & p has no proper temporal parts. (axiom label in BFO2 Reference: [084-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/bfo_classes_only.owl.)
 * @bfoReferenceSection §4.2 Occurrent — Process boundary
 * @disjointWith TemporalRegion (BFO_0000008) — declared on BFO_0000008 in the OWL
 *               release (DisjointWith BFO_0000035); BFO_0000035 itself does not
 *               assert outgoing disjointness.
 * @subClassOf Occurrent (BFO_0000003)
 * @owlAxioms SubClassOf(BFO_0000003);
 *            [084-001] (iff (ProcessBoundary a) (exists (p) (and (Process p) (temporalPartOf a p) (not (exists (b) (properTemporalPartOf b a)))))) — ProcessBoundary ≡ Occurrent that is a temporal part of some Process and has no proper temporal parts.
 *            [085-002] (forall (x) (if (ProcessBoundary x) (exists (y) (and (ZeroDimensionalTemporalRegion y) (occupiesTemporalRegion x y))))) — every process boundary occupies a zero-dimensional temporal region.
 *            BFO 2 Reference example: the boundary between the 2nd and 3rd year of
 *            your life. Note: ProcessBoundary is a subClassOf Occurrent (NOT Process)
 *            in the OWL release — the [084-001] axiom asserts the temporal-part
 *            relation to a Process without making ProcessBoundary itself a Process.
 */
export interface IProcessBoundary extends IOccurrent {
  readonly metaClass: 'ProcessBoundary';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000035';
}

export abstract class AbstractProcessBoundary
  extends AbstractOccurrent
  implements IProcessBoundary {
  abstract override readonly metaClass: 'ProcessBoundary';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000035';
}

export class ProcessBoundary
  extends AbstractProcessBoundary
  implements IProcessBoundary {
  override readonly metaClass = 'ProcessBoundary' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000035' as const;
}

// ─── 31. TemporalRegion (BFO_0000008) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000008
 * @metaclass owl:Class
 * @isAbstract true
 * @parent Occurrent
 * @rdfsLabel "temporal region"
 * @definition "A temporal region is an occurrent entity that is part of time as defined relative to some reference frame. (axiom label in BFO2 Reference: [100-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000008, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §4.6 Occurrent — Temporal region
 * @disjointWith SpatiotemporalRegion (BFO_0000011), Process (BFO_0000015), ProcessBoundary (BFO_0000035)
 *               — all three disjointness axioms are asserted on BFO_0000008 in the OWL release.
 * @subClassOf Occurrent (BFO_0000003)
 * @owlAxioms SubClassOf(BFO_0000003); DisjointWith(BFO_0000011); DisjointWith(BFO_0000015); DisjointWith(BFO_0000035);
 *            [100-001] (forall (x) (if (TemporalRegion x) (Occurrent x)));
 *            [101-001] (forall (x y) (if (and (TemporalRegion x) (occurrentPartOf y x)) (TemporalRegion y))) — all parts of temporal regions are temporal regions;
 *            [119-002] (forall (r) (if (TemporalRegion r) (occupiesTemporalRegion r r))) — every temporal region occupies itself.
 *            IAO_0000116 commentary: "Temporal region doesn't have a closure axiom
 *            because the subclasses don't exhaust all possibilities. An example would
 *            be the mereological sum of a temporal instant and a temporal interval
 *            that doesn't overlap the instant." Asserted children:
 *            ZeroDimensionalTemporalRegion (BFO_0000148),
 *            OneDimensionalTemporalRegion (BFO_0000038).
 */
export interface ITemporalRegion extends IOccurrent {
  // Widened to `string` so the asserted children —
  // ZeroDimensionalTemporalRegion (BFO_0000148) and
  // OneDimensionalTemporalRegion (BFO_0000038) — declared below can narrow
  // to their own disjoint string literals.
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractTemporalRegion
  extends AbstractOccurrent
  implements ITemporalRegion {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

// ─── 32. ZeroDimensionalTemporalRegion (BFO_0000148) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000148
 * @metaclass owl:Class
 * @isAbstract false
 * @parent TemporalRegion
 * @rdfsLabel "zero-dimensional temporal region"
 * @definition "A zero-dimensional temporal region is a temporal region that is without extent. (axiom label in BFO2 Reference: [102-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000148, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §4.6 Occurrent — Temporal region — Zero-dimensional temporal region
 * @disjointWith OneDimensionalTemporalRegion (BFO_0000038) — declared on BFO_0000038
 *               in the OWL release (DisjointWith BFO_0000148); BFO_0000148 itself
 *               does not assert outgoing disjointness.
 * @subClassOf TemporalRegion (BFO_0000008)
 * @owlAxioms SubClassOf(BFO_0000008);
 *            [102-001] (forall (x) (if (ZeroDimensionalTemporalRegion x) (TemporalRegion x))).
 *            obo:IAO_0000118 alternative term: "temporal instant" — BFO 2020 OWL does
 *            NOT declare a separate `TemporalInstant` class; the term appears only
 *            as an IAO_0000118 alternative-term annotation on BFO_0000148. Examples:
 *            "right now"; the moment a child is born; the moment of death; a temporal
 *            region occupied by a process boundary.
 */
export interface IZeroDimensionalTemporalRegion extends ITemporalRegion {
  readonly metaClass: 'ZeroDimensionalTemporalRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000148';
}

export abstract class AbstractZeroDimensionalTemporalRegion
  extends AbstractTemporalRegion
  implements IZeroDimensionalTemporalRegion {
  abstract override readonly metaClass: 'ZeroDimensionalTemporalRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000148';
}

export class ZeroDimensionalTemporalRegion
  extends AbstractZeroDimensionalTemporalRegion
  implements IZeroDimensionalTemporalRegion {
  override readonly metaClass = 'ZeroDimensionalTemporalRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000148' as const;
}

// ─── 33. OneDimensionalTemporalRegion (BFO_0000038) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000038
 * @metaclass owl:Class
 * @isAbstract false
 * @parent TemporalRegion
 * @rdfsLabel "one-dimensional temporal region"
 * @definition "A one-dimensional temporal region is a temporal region that is extended. (axiom label in BFO2 Reference: [103-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000038, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §4.6 Occurrent — Temporal region — One-dimensional temporal region
 * @disjointWith ZeroDimensionalTemporalRegion (BFO_0000148) — asserted on BFO_0000038
 *               in the OWL release (DisjointWith BFO_0000148).
 * @subClassOf TemporalRegion (BFO_0000008)
 * @owlAxioms SubClassOf(BFO_0000008); DisjointWith(BFO_0000148);
 *            [103-001] (forall (x) (if (OneDimensionalTemporalRegion x) (TemporalRegion x))).
 *            BFO 2 Reference IAO_0000116 commentary: "A temporal interval is a special
 *            kind of one-dimensional temporal region, namely one that is self-connected
 *            (is without gaps or breaks)." BFO 2020 OWL does NOT declare a separate
 *            `TemporalInterval` class; the term appears only as IAO_0000116 commentary
 *            on BFO_0000038. Example: the temporal region during which a process occurs.
 */
export interface IOneDimensionalTemporalRegion extends ITemporalRegion {
  readonly metaClass: 'OneDimensionalTemporalRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000038';
}

export abstract class AbstractOneDimensionalTemporalRegion
  extends AbstractTemporalRegion
  implements IOneDimensionalTemporalRegion {
  abstract override readonly metaClass: 'OneDimensionalTemporalRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000038';
}

export class OneDimensionalTemporalRegion
  extends AbstractOneDimensionalTemporalRegion
  implements IOneDimensionalTemporalRegion {
  override readonly metaClass = 'OneDimensionalTemporalRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000038' as const;
}

// ─── 34. SpatiotemporalRegion (BFO_0000011) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000011
 * @metaclass owl:Class
 * @isAbstract false
 * @parent Occurrent
 * @rdfsLabel "spatiotemporal region"
 * @definition "A spatiotemporal region is an occurrent entity that is part of spacetime. (axiom label in BFO2 Reference: [095-001])"
 *             (sourced from obo:IAO_0000600 in spec/bfo_classes_only.owl —
 *              obo:IAO_0000115 is not declared on BFO_0000011, so the
 *              elucidation IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §4.5 Occurrent — Spatiotemporal region
 * @disjointWith TemporalRegion (BFO_0000008) — declared on BFO_0000008 in the OWL
 *               release (DisjointWith BFO_0000011); BFO_0000011 itself does not
 *               assert outgoing disjointness.
 * @subClassOf Occurrent (BFO_0000003)
 * @owlAxioms SubClassOf(BFO_0000003);
 *            [095-001] (forall (x) (if (SpatioTemporalRegion x) (Occurrent x)));
 *            [096-001] (forall (x y) (if (and (SpatioTemporalRegion x) (occurrentPartOf y x)) (SpatioTemporalRegion y))) — all parts of spatiotemporal regions are spatiotemporal regions;
 *            [098-001] (forall (x) (if (SpatioTemporalRegion x) (exists (y) (and (TemporalRegion y) (temporallyProjectsOnto x y))))) — every spatiotemporal region projects_onto some temporal region;
 *            [099-001] (forall (x t) (if (SpatioTemporalRegion x) (exists (y) (and (SpatialRegion y) (spatiallyProjectsOntoAt x y t))))) — every spatiotemporal region at any time t projects_onto some spatial region at t;
 *            [107-002] (forall (r) (if (SpatioTemporalRegion r) (occupiesSpatioTemporalRegion r r))) — every spatiotemporal region occupies itself.
 *            BFO 2 Reference IAO_0000112 examples: the spatiotemporal region occupied
 *            by a human life; by a process of cellular meiosis; by the development of
 *            a cancer tumor.
 */
export interface ISpatiotemporalRegion extends IOccurrent {
  readonly metaClass: 'SpatiotemporalRegion';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000011';
}

export abstract class AbstractSpatiotemporalRegion
  extends AbstractOccurrent
  implements ISpatiotemporalRegion {
  abstract override readonly metaClass: 'SpatiotemporalRegion';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000011';
}

export class SpatiotemporalRegion
  extends AbstractSpatiotemporalRegion
  implements ISpatiotemporalRegion {
  override readonly metaClass = 'SpatiotemporalRegion' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000011' as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #3: Occurrent spine + Temporal regions
// (next: Implementer #4 — BFO Object Properties part 1: part-of / has-part)
// ═══════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #4: BFO Object Properties Part 1
// (ObjectProperty root marker • continuant_part_of family •
//  occurrent_part_of family • member_part_of family •
//  temporal-lifecycle: exists_at, has_history, has_first/last_instant)
//
// Spec source: spec/src/ontology/owl-group/bfo.owl (the BFO 2.0 / 2014-05-03
// merged OWL release that carries both Class and ObjectProperty declarations
// — the spec/bfo.owl at the directory root is BFO 1.1 with no BFO_xxxxxxx
// IRIs, and spec/bfo_classes_only.owl is the BFO 2.0 / 2019-08-26 classes-only
// projection that explicitly excludes relations per its own ontology comment:
// "The BFO 2.0 OWL is a classes-only specification. The incorporation of core
// relations has been held over for a later version." The owl-group/bfo.owl
// is therefore the authoritative ObjectProperty source vendored in this
// submodule.
//
// Discriminant pattern: every interface here keeps `metaClass`/`iri`/`rdfsLabel`/
// `domain`/`range`/`inverseOf`/`subPropertyOf`/`characteristics` typed as the
// broad `IObjectProperty` shape (string / ReadonlyArray<string>), letting
// each abstract class extend its TypeScript parent without literal-type
// collisions on inherited members. Concrete leaves narrow every discriminant
// via `as const` initialization — the same pattern Implementer #1/#2/#3 used
// for the Class spine (e.g. `MaterialEntity` declares
// `override readonly metaClass = 'MaterialEntity' as const` while
// `IMaterialEntity` widens to `string` so subclasses can supply their own
// disjoint literals). Static-typed reads at the call site recover the narrowed
// literal automatically thanks to TypeScript's `as const` flow analysis.
// ═══════════════════════════════════════════════════════════════════════════

// ─── 0. ObjectProperty (root marker for BFO 2020 owl:ObjectProperty declarations) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @metaclass owl:ObjectProperty (root marker for the BFO 2020 ObjectProperty surface)
 * @isAbstract true
 * @parent (root)
 * @definition Marker root for every BFO 2020 owl:ObjectProperty declared in
 *             spec/src/ontology/owl-group/bfo.owl. Concrete properties extend
 *             AbstractObjectProperty and supply registry-bound `as const` literals
 *             for `metaClass`, `iri`, `rdfsLabel`, `domain`, `range`, and the
 *             optional `inverseOf` / `subPropertyOf` / `characteristics` discriminants
 *             when the underlying OWL declares them.
 */
export interface IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
  readonly rdfsLabel: string;
  readonly domain: string;
  readonly range: string;
  readonly inverseOf?: string;
  readonly subPropertyOf?: ReadonlyArray<string>;
  readonly characteristics?: ReadonlyArray<
    | 'Reflexive'
    | 'Irreflexive'
    | 'Transitive'
    | 'Symmetric'
    | 'Asymmetric'
    | 'Functional'
    | 'InverseFunctional'
  >;
}

export abstract class AbstractObjectProperty implements IObjectProperty {
  abstract readonly metaClass: string;
  abstract readonly iri: string;
  abstract readonly rdfsLabel: string;
  abstract readonly domain: string;
  abstract readonly range: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART-OF FAMILY (CONTINUANTS) — BFO_0000176, BFO_0000178, BFO_0000177,
//   BFO_0000186, BFO_0000110, BFO_0000187, BFO_0000175, BFO_0000174,
//   BFO_0000137, BFO_0000111
// ═══════════════════════════════════════════════════════════════════════════

// ─── 1. ContinuantPartOf (BFO_0000176) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000176
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "part of continuant at some time"
 * @definition "[copied from inverse property 'has continuant part at some time'] b has_continuant_part c at t = Def. c continuant_part_of b at t. (axiom label in BFO2 Reference: [006-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl;
 *              the elucidation IAO_0000600 reads "b continuant_part_of c at t =Def.
 *              b is a part of c at t & t is a time & b and c are continuants.
 *              (axiom label in BFO2 Reference: [002-001])".)
 * @bfoReferenceSection §2.1 Continuant — part_of relation
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000178 (has_continuant_part)
 * @characteristics Reflexive, Transitive, Antisymmetric, satisfies unique product, satisfies weak supplementation
 *                  (declared via obo:IAO_0000601 axioms [111-002], [110-001], [120-001],
 *                  [122-001], [121-001]; OWL does not declare these as `rdf:type`
 *                  characteristics on BFO_0000176 itself but its subPropertyOf BFO_0000177
 *                  is declared as `owl:TransitiveProperty`.)
 * @owlAxioms rdfs:domain BFO_0000002; rdfs:range BFO_0000002;
 *            owl:inverseOf BFO_0000178;
 *            [047-002] if b continuant_part_of c at t and b is an independent continuant, then b is located_in c at t;
 *            [028-001] iff (ImmaterialEntity a) (and (IndependentContinuant a) (not (exists (b t) (and (MaterialEntity b) (continuantPartOfAt b a t)))))
 */
export interface IContinuantPartOf extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractContinuantPartOf
  extends AbstractObjectProperty
  implements IContinuantPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ContinuantPartOf
  extends AbstractContinuantPartOf
  implements IContinuantPartOf {
  override readonly metaClass = 'ContinuantPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000176' as const;
  override readonly rdfsLabel = 'part of continuant at some time' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000178' as const;
}

// ─── 2. HasContinuantPart (BFO_0000178) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000178
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "has continuant part at some time"
 * @definition "b has_continuant_part c at t = Def. c continuant_part_of b at t. (axiom label in BFO2 Reference: [006-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — has_part inverse relation
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000176 (continuant_part_of) — declared on BFO_0000176; the
 *            owl:inverseOf assertion is one-sided in the OWL release.
 * @owlAxioms rdfs:domain BFO_0000002; rdfs:range BFO_0000002;
 *            [006-001] iff (hasContinuantPartAt a b t) (continuantPartOfAt b a t)
 */
export interface IHasContinuantPart extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasContinuantPart
  extends AbstractObjectProperty
  implements IHasContinuantPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasContinuantPart
  extends AbstractHasContinuantPart
  implements IHasContinuantPart {
  override readonly metaClass = 'HasContinuantPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000178' as const;
  override readonly rdfsLabel = 'has continuant part at some time' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
}

// ─── 3. ContinuantPartOfAtAllTimes (BFO_0000177) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000177
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent ContinuantPartOf (BFO_0000176)
 * @rdfsLabel "part of continuant at all times"
 * @definition "[copied from inverse property 'has continuant part at all times that part exists'] forall(t) exists_at(y,t) -> exists_at(x,t) and 'has continuant part'(x,y,t)"
 *             (sourced from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl; the
 *              elucidation IAO_0000600 reads "b continuant_part_of c at t =Def.
 *              b is a part of c at t & t is a time & b and c are continuants.
 *              (axiom label in BFO2 Reference: [002-001])".)
 * @bfoReferenceSection §2.1 Continuant — part_of (universal time index)
 * @domain Continuant (BFO_0000002) — inherited from BFO_0000176; not re-asserted
 *         on BFO_0000177 directly in the OWL.
 * @range Continuant (BFO_0000002) — inherited from BFO_0000176; not re-asserted
 *        on BFO_0000177 directly in the OWL.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`
 *                  on BFO_0000177 in the OWL release.
 * @subPropertyOf BFO_0000176 (continuant_part_of)
 * @owlAxioms `rdf:type owl:TransitiveProperty`; rdfs:subPropertyOf BFO_0000176
 */
export interface IContinuantPartOfAtAllTimes extends IContinuantPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractContinuantPartOfAtAllTimes
  extends AbstractContinuantPartOf
  implements IContinuantPartOfAtAllTimes {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ContinuantPartOfAtAllTimes
  extends AbstractContinuantPartOfAtAllTimes
  implements IContinuantPartOfAtAllTimes {
  override readonly metaClass = 'ContinuantPartOfAtAllTimes' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000177' as const;
  override readonly rdfsLabel = 'part of continuant at all times' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000176'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 4. PartOfContinuantAtAllTimesThatWholeExists (BFO_0000186) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000186
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent ContinuantPartOf (BFO_0000176)
 * @rdfsLabel "part of continuant at all times that whole exists"
 * @definition "forall(t) exists_at(y,t) -> exists_at(x,t) and 'part of continuant'(x,y,t)"
 *             (sourced from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl;
 *              IAO_0000116 carries the curator note "Unlike the rest of the
 *              temporalized relations which temporally quantify over existence
 *              of the subject of the relation, this relation temporally quantifies
 *              over the existence of the object of the relation.")
 * @bfoReferenceSection §2.1 Continuant — whole-existence-quantified part_of
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000110 (has_continuant_part_at_all_times)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000176 (continuant_part_of)
 * @owlAxioms `rdf:type owl:TransitiveProperty`; rdfs:domain BFO_0000002;
 *            rdfs:range BFO_0000002; owl:inverseOf BFO_0000110;
 *            rdfs:subPropertyOf BFO_0000176
 */
export interface IPartOfContinuantAtAllTimesThatWholeExists extends IContinuantPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractPartOfContinuantAtAllTimesThatWholeExists
  extends AbstractContinuantPartOf
  implements IPartOfContinuantAtAllTimesThatWholeExists {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class PartOfContinuantAtAllTimesThatWholeExists
  extends AbstractPartOfContinuantAtAllTimesThatWholeExists
  implements IPartOfContinuantAtAllTimesThatWholeExists {
  override readonly metaClass = 'PartOfContinuantAtAllTimesThatWholeExists' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000186' as const;
  override readonly rdfsLabel = 'part of continuant at all times that whole exists' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000110' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000176'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 5. HasContinuantPartAtAllTimes (BFO_0000110) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000110
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasContinuantPart (BFO_0000178)
 * @rdfsLabel "has continuant part at all times"
 * @definition "b has_continuant_part c at t = Def. c continuant_part_of b at t. (axiom label in BFO2 Reference: [006-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — universal-time-quantified has_part
 * @domain Continuant (BFO_0000002) — inherited from BFO_0000178; not re-asserted
 *         on BFO_0000110 directly in the OWL.
 * @range Continuant (BFO_0000002) — inherited from BFO_0000178; not re-asserted
 *        on BFO_0000110 directly in the OWL.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000178 (has_continuant_part)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:subPropertyOf BFO_0000178;
 *            [006-001] iff (hasContinuantPartAt a b t) (continuantPartOfAt b a t);
 *            owl:inverseOf BFO_0000186 (asserted on BFO_0000186, one-sided)
 */
export interface IHasContinuantPartAtAllTimes extends IHasContinuantPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasContinuantPartAtAllTimes
  extends AbstractHasContinuantPart
  implements IHasContinuantPartAtAllTimes {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasContinuantPartAtAllTimes
  extends AbstractHasContinuantPartAtAllTimes
  implements IHasContinuantPartAtAllTimes {
  override readonly metaClass = 'HasContinuantPartAtAllTimes' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000110' as const;
  override readonly rdfsLabel = 'has continuant part at all times' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000178'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 6. HasContinuantPartAtAllTimesThatPartExists (BFO_0000187) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000187
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasContinuantPart (BFO_0000178)
 * @rdfsLabel "has continuant part at all times that part exists"
 * @definition "forall(t) exists_at(y,t) -> exists_at(x,t) and 'has continuant part'(x,y,t)"
 *             (sourced from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl;
 *              IAO_0000116 reads "Unlike the rest of the temporalized relations
 *              which temporally quantify over existence of the subject of the
 *              relation, this relation temporally quantifies over the existence
 *              of the object of the relation.")
 * @bfoReferenceSection §2.1 Continuant — part-existence-quantified has_part
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000177 (continuant_part_of_at_all_times)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000178 (has_continuant_part)
 * @owlAxioms `rdf:type owl:TransitiveProperty`; rdfs:domain BFO_0000002;
 *            rdfs:range BFO_0000002; owl:inverseOf BFO_0000177;
 *            rdfs:subPropertyOf BFO_0000178
 */
export interface IHasContinuantPartAtAllTimesThatPartExists extends IHasContinuantPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasContinuantPartAtAllTimesThatPartExists
  extends AbstractHasContinuantPart
  implements IHasContinuantPartAtAllTimesThatPartExists {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasContinuantPartAtAllTimesThatPartExists
  extends AbstractHasContinuantPartAtAllTimesThatPartExists
  implements IHasContinuantPartAtAllTimesThatPartExists {
  override readonly metaClass = 'HasContinuantPartAtAllTimesThatPartExists' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000187' as const;
  override readonly rdfsLabel = 'has continuant part at all times that part exists' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000177' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000178'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 7. ProperContinuantPartOf (BFO_0000175) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000175
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent ContinuantPartOf (BFO_0000176)
 * @rdfsLabel "proper part of continuant at some time"
 * @definition "b proper_continuant_part_of c at t =Def. b continuant_part_of c at t & b and c are not identical. (axiom label in BFO2 Reference: [004-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — proper part_of
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000174 (has_proper_continuant_part_at_some_time)
 * @characteristics Irreflexive — implied by definition (b and c are not identical);
 *                  not declared as `rdf:type owl:IrreflexiveProperty` in the OWL release,
 *                  so this is a definitional rather than declared characteristic.
 * @subPropertyOf BFO_0000176 (continuant_part_of)
 * @owlAxioms rdfs:domain BFO_0000002; rdfs:range BFO_0000002;
 *            owl:inverseOf BFO_0000174; rdfs:subPropertyOf BFO_0000176;
 *            [004-001] iff (properContinuantPartOfAt a b t) (and (continuantPartOfAt a b t) (not (= a b)))
 */
export interface IProperContinuantPartOf extends IContinuantPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractProperContinuantPartOf
  extends AbstractContinuantPartOf
  implements IProperContinuantPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ProperContinuantPartOf
  extends AbstractProperContinuantPartOf
  implements IProperContinuantPartOf {
  override readonly metaClass = 'ProperContinuantPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000175' as const;
  override readonly rdfsLabel = 'proper part of continuant at some time' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000174' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000176'] as const;
}

// ─── 8. HasProperContinuantPart (BFO_0000174) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000174
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasContinuantPart (BFO_0000178)
 * @rdfsLabel "has proper continuant part at some time"
 * @definition "b has_proper_continuant_part c at t = Def. c proper_continuant_part_of b at t. [XXX-001"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — has_proper_part inverse relation
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000175 (proper_continuant_part_of) — declared on BFO_0000175.
 * @subPropertyOf BFO_0000178 (has_continuant_part)
 * @owlAxioms rdfs:domain BFO_0000002; rdfs:range BFO_0000002;
 *            rdfs:subPropertyOf BFO_0000178
 */
export interface IHasProperContinuantPart extends IHasContinuantPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasProperContinuantPart
  extends AbstractHasContinuantPart
  implements IHasProperContinuantPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasProperContinuantPart
  extends AbstractHasProperContinuantPart
  implements IHasProperContinuantPart {
  override readonly metaClass = 'HasProperContinuantPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000174' as const;
  override readonly rdfsLabel = 'has proper continuant part at some time' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000178'] as const;
}

// ─── 9. ProperContinuantPartOfAtAllTimes (BFO_0000137) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000137
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent ProperContinuantPartOf (BFO_0000175) and ContinuantPartOfAtAllTimes (BFO_0000177)
 *   — multi-parent in the OWL via two rdfs:subPropertyOf assertions; we extend the
 *   first sibling abstract (BFO_0000175 / AbstractProperContinuantPartOf) and
 *   declare BFO_0000177 only in the concrete `subPropertyOf` array.
 * @rdfsLabel "proper part of continuant at all times"
 * @definition "b proper_continuant_part_of c at t =Def. b continuant_part_of c at t & b and c are not identical. (axiom label in BFO2 Reference: [004-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — universal-time-quantified proper part_of
 * @domain Continuant (BFO_0000002) — inherited; not re-asserted on BFO_0000137 directly.
 * @range Continuant (BFO_0000002) — inherited; not re-asserted on BFO_0000137 directly.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000175 (proper_continuant_part_of), BFO_0000177 (continuant_part_of_at_all_times)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:subPropertyOf BFO_0000175; rdfs:subPropertyOf BFO_0000177
 */
export interface IProperContinuantPartOfAtAllTimes extends IProperContinuantPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractProperContinuantPartOfAtAllTimes
  extends AbstractProperContinuantPartOf
  implements IProperContinuantPartOfAtAllTimes {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ProperContinuantPartOfAtAllTimes
  extends AbstractProperContinuantPartOfAtAllTimes
  implements IProperContinuantPartOfAtAllTimes {
  override readonly metaClass = 'ProperContinuantPartOfAtAllTimes' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000137' as const;
  override readonly rdfsLabel = 'proper part of continuant at all times' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000174' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000175',
    'http://purl.obolibrary.org/obo/BFO_0000177',
  ] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 10. HasProperContinuantPartAtAllTimes (BFO_0000111) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000111
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasProperContinuantPart (BFO_0000174) and HasContinuantPartAtAllTimes (BFO_0000110)
 *   — multi-parent in the OWL via two rdfs:subPropertyOf assertions; we extend the
 *   first sibling abstract (BFO_0000174 / AbstractHasProperContinuantPart) and
 *   declare BFO_0000110 only in the concrete `subPropertyOf` array.
 * @rdfsLabel "has proper continuant part at all times"
 * @definition "b has_proper_continuant_part c at t = Def. c proper_continuant_part_of b at t. [XXX-001"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — universal-time-quantified has_proper_part
 * @domain Continuant (BFO_0000002) — inherited; not re-asserted on BFO_0000111 directly.
 * @range Continuant (BFO_0000002) — inherited; not re-asserted on BFO_0000111 directly.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000110 (has_continuant_part_at_all_times), BFO_0000174 (has_proper_continuant_part)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:subPropertyOf BFO_0000110; rdfs:subPropertyOf BFO_0000174
 */
export interface IHasProperContinuantPartAtAllTimes extends IHasProperContinuantPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasProperContinuantPartAtAllTimes
  extends AbstractHasProperContinuantPart
  implements IHasProperContinuantPartAtAllTimes {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasProperContinuantPartAtAllTimes
  extends AbstractHasProperContinuantPartAtAllTimes
  implements IHasProperContinuantPartAtAllTimes {
  override readonly metaClass = 'HasProperContinuantPartAtAllTimes' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000111' as const;
  override readonly rdfsLabel = 'has proper continuant part at all times' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000110',
    'http://purl.obolibrary.org/obo/BFO_0000174',
  ] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// MEMBER-PART-OF FAMILY (CONTINUANTS) — BFO_0000129, BFO_0000115,
//   BFO_0000173, BFO_0000172
// ═══════════════════════════════════════════════════════════════════════════

// ─── 11. MemberPartOf (BFO_0000129) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000129
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent ProperContinuantPartOf (BFO_0000175) and ContinuantPartOf (BFO_0000176)
 *   — multi-parent in the OWL; we extend the more specific sibling abstract
 *   (BFO_0000175 / AbstractProperContinuantPartOf) and declare BFO_0000176
 *   only in the concrete `subPropertyOf` array.
 * @rdfsLabel "member part of at some time"
 * @definition "b member_part_of c at t =Def. b is an object & there is at t a mutually exhaustive and pairwise disjoint partition of c into objects x1, …, xn (for some n > 1) with b = xi for some 1 <= i <= n. (axiom label in BFO2 Reference: [026-004])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — Object aggregate / member_part_of
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000115 (has_member_part_at_some_time)
 * @subPropertyOf BFO_0000175 (proper_continuant_part_of), BFO_0000176 (continuant_part_of)
 * @owlAxioms rdfs:domain BFO_0000002; rdfs:range BFO_0000002;
 *            owl:inverseOf BFO_0000115;
 *            rdfs:subPropertyOf BFO_0000175; rdfs:subPropertyOf BFO_0000176;
 *            [104-001] (forall (x y t) (if (memberPartOfAt x y t) (continuantPartOfAt x y t)))
 */
export interface IMemberPartOf extends IProperContinuantPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractMemberPartOf
  extends AbstractProperContinuantPartOf
  implements IMemberPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class MemberPartOf
  extends AbstractMemberPartOf
  implements IMemberPartOf {
  override readonly metaClass = 'MemberPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000129' as const;
  override readonly rdfsLabel = 'member part of at some time' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000115' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000175',
    'http://purl.obolibrary.org/obo/BFO_0000176',
  ] as const;
}

// ─── 12. HasMemberPart (BFO_0000115) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000115
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasContinuantPart (BFO_0000178)
 * @rdfsLabel "has member part at some time"
 * @definition "[copied from inverse property 'member part of at some time'] b member_part_of c at t =Def. b is an object & there is at t a mutually exhaustive and pairwise disjoint partition of c into objects x1, …, xn (for some n > 1) with b = xi for some 1 <= i <= n. (axiom label in BFO2 Reference: [026-004])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — Object aggregate / has_member_part inverse
 * @domain Continuant (BFO_0000002)
 * @range Continuant (BFO_0000002)
 * @inverseOf BFO_0000129 (member_part_of) — declared on BFO_0000129.
 * @subPropertyOf BFO_0000178 (has_continuant_part)
 * @owlAxioms rdfs:domain BFO_0000002; rdfs:range BFO_0000002;
 *            rdfs:subPropertyOf BFO_0000178
 */
export interface IHasMemberPart extends IHasContinuantPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasMemberPart
  extends AbstractHasContinuantPart
  implements IHasMemberPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasMemberPart
  extends AbstractHasMemberPart
  implements IHasMemberPart {
  override readonly metaClass = 'HasMemberPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000115' as const;
  override readonly rdfsLabel = 'has member part at some time' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000178'] as const;
}

// ─── 13. MemberPartOfAtAllTimes (BFO_0000173) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000173
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent MemberPartOf (BFO_0000129), ProperContinuantPartOfAtAllTimes (BFO_0000137),
 *   and ContinuantPartOfAtAllTimes (BFO_0000177) — three rdfs:subPropertyOf
 *   assertions in the OWL; we extend the most-specific sibling abstract
 *   (BFO_0000129 / AbstractMemberPartOf) and declare BFO_0000137 + BFO_0000177
 *   only in the concrete `subPropertyOf` array.
 * @rdfsLabel "member part of at all times"
 * @definition "b member_part_of c at t =Def. b is an object & there is at t a mutually exhaustive and pairwise disjoint partition of c into objects x1, …, xn (for some n > 1) with b = xi for some 1 <= i <= n. (axiom label in BFO2 Reference: [026-004])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §2.1 Continuant — universal-time-quantified member_part_of
 * @domain Continuant (BFO_0000002) — inherited.
 * @range Continuant (BFO_0000002) — inherited.
 * @subPropertyOf BFO_0000129 (member_part_of), BFO_0000137 (proper_continuant_part_of_at_all_times), BFO_0000177 (continuant_part_of_at_all_times)
 * @owlAxioms rdfs:subPropertyOf BFO_0000129;
 *            rdfs:subPropertyOf BFO_0000137; rdfs:subPropertyOf BFO_0000177;
 *            [104-001] (forall (x y t) (if (memberPartOfAt x y t) (continuantPartOfAt x y t)))
 */
export interface IMemberPartOfAtAllTimes extends IMemberPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractMemberPartOfAtAllTimes
  extends AbstractMemberPartOf
  implements IMemberPartOfAtAllTimes {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class MemberPartOfAtAllTimes
  extends AbstractMemberPartOfAtAllTimes
  implements IMemberPartOfAtAllTimes {
  override readonly metaClass = 'MemberPartOfAtAllTimes' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000173' as const;
  override readonly rdfsLabel = 'member part of at all times' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000115' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000129',
    'http://purl.obolibrary.org/obo/BFO_0000137',
    'http://purl.obolibrary.org/obo/BFO_0000177',
  ] as const;
}

// ─── 14. HasMemberPartAtAllTimes (BFO_0000172) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000172
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasContinuantPartAtAllTimes (BFO_0000110), HasProperContinuantPartAtAllTimes (BFO_0000111),
 *   and HasMemberPart (BFO_0000115) — three rdfs:subPropertyOf assertions in
 *   the OWL; we extend the most-specific sibling abstract (BFO_0000115 /
 *   AbstractHasMemberPart) and declare BFO_0000110 + BFO_0000111 only in the
 *   concrete `subPropertyOf` array.
 * @rdfsLabel "has member part at all times"
 * @definition (No explicit obo:IAO_0000115 elucidation declared on BFO_0000172.)
 *             Inherits the [copied-from-inverse] elucidation from BFO_0000129:
 *             "b member_part_of c at t =Def. b is an object & there is at t a
 *             mutually exhaustive and pairwise disjoint partition of c into
 *             objects x1, …, xn (for some n > 1) with b = xi for some
 *             1 <= i <= n. (axiom label in BFO2 Reference: [026-004])"
 * @bfoReferenceSection §2.1 Continuant — universal-time-quantified has_member_part
 * @domain Continuant (BFO_0000002) — inherited.
 * @range Continuant (BFO_0000002) — inherited.
 * @subPropertyOf BFO_0000110 (has_continuant_part_at_all_times),
 *                BFO_0000111 (has_proper_continuant_part_at_all_times),
 *                BFO_0000115 (has_member_part_at_some_time)
 * @owlAxioms rdfs:subPropertyOf BFO_0000110;
 *            rdfs:subPropertyOf BFO_0000111; rdfs:subPropertyOf BFO_0000115
 */
export interface IHasMemberPartAtAllTimes extends IHasMemberPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasMemberPartAtAllTimes
  extends AbstractHasMemberPart
  implements IHasMemberPartAtAllTimes {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasMemberPartAtAllTimes
  extends AbstractHasMemberPartAtAllTimes
  implements IHasMemberPartAtAllTimes {
  override readonly metaClass = 'HasMemberPartAtAllTimes' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000172' as const;
  override readonly rdfsLabel = 'has member part at all times' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000002' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000110',
    'http://purl.obolibrary.org/obo/BFO_0000111',
    'http://purl.obolibrary.org/obo/BFO_0000115',
  ] as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART-OF FAMILY (OCCURRENTS) — BFO_0000132, BFO_0000117, BFO_0000138,
//   BFO_0000118, BFO_0000139, BFO_0000121, BFO_0000136, BFO_0000181
// ═══════════════════════════════════════════════════════════════════════════

// ─── 15. OccurrentPartOf (BFO_0000132) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000132
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "part of occurrent"
 * @definition "[copied from inverse property 'has occurrent part'] b has_occurrent_part c = Def. c occurrent_part_of b. (axiom label in BFO2 Reference: [007-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl;
 *              the elucidation IAO_0000600 reads "b occurrent_part_of c =Def.
 *              b is a part of c & b and c are occurrents. (axiom label in BFO2
 *              Reference: [003-002])".)
 * @bfoReferenceSection §3.1 Occurrent — part_of relation
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000117 (has_occurrent_part)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`;
 *                  also Reflexive [113-002], Antisymmetric [123-001], satisfies
 *                  unique product [125-001] and weak supplementation [124-001]
 *                  per IAO_0000601 axioms (not as `rdf:type` characteristics).
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            owl:inverseOf BFO_0000117;
 *            [113-002] (forall (x) (if (Occurrent x) (occurrentPartOf x x))) — reflexivity;
 *            [112-001] (forall (x y z) (if (and (occurrentPartOf x y) (occurrentPartOf y z)) (occurrentPartOf x z))) — transitivity;
 *            [123-001] antisymmetry; [124-001] weak supplementation; [125-001] unique product.
 */
export interface IOccurrentPartOf extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractOccurrentPartOf
  extends AbstractObjectProperty
  implements IOccurrentPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class OccurrentPartOf
  extends AbstractOccurrentPartOf
  implements IOccurrentPartOf {
  override readonly metaClass = 'OccurrentPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000132' as const;
  override readonly rdfsLabel = 'part of occurrent' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000117' as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 16. HasOccurrentPart (BFO_0000117) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000117
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "has occurrent part"
 * @definition "b has_occurrent_part c = Def. c occurrent_part_of b. (axiom label in BFO2 Reference: [007-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §3.1 Occurrent — has_part inverse relation
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000132 (occurrent_part_of) — declared on BFO_0000132.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            [007-001] iff (hasOccurrentPart a b) (occurrentPartOf b a)
 */
export interface IHasOccurrentPart extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasOccurrentPart
  extends AbstractObjectProperty
  implements IHasOccurrentPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasOccurrentPart
  extends AbstractHasOccurrentPart
  implements IHasOccurrentPart {
  override readonly metaClass = 'HasOccurrentPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000117' as const;
  override readonly rdfsLabel = 'has occurrent part' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 17. ProperOccurrentPartOf (BFO_0000138) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000138
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent OccurrentPartOf (BFO_0000132)
 * @rdfsLabel "proper part of occurrent"
 * @definition "b proper_occurrent_part_of c =Def. b occurrent_part_of c & b and c are not identical. (axiom label in BFO2 Reference: [005-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §3.1 Occurrent — proper part_of
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000118 (has_proper_occurrent_part)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`;
 *                  Irreflexive — implied by definition (b and c are not identical),
 *                  not declared as `rdf:type owl:IrreflexiveProperty` in the OWL.
 * @subPropertyOf BFO_0000132 (occurrent_part_of)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            owl:inverseOf BFO_0000118; rdfs:subPropertyOf BFO_0000132;
 *            [005-001] iff (properOccurrentPartOf a b) (and (occurrentPartOf a b) (not (= a b)))
 */
export interface IProperOccurrentPartOf extends IOccurrentPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractProperOccurrentPartOf
  extends AbstractOccurrentPartOf
  implements IProperOccurrentPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ProperOccurrentPartOf
  extends AbstractProperOccurrentPartOf
  implements IProperOccurrentPartOf {
  override readonly metaClass = 'ProperOccurrentPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000138' as const;
  override readonly rdfsLabel = 'proper part of occurrent' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000118' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000132'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 18. HasProperOccurrentPart (BFO_0000118) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000118
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasOccurrentPart (BFO_0000117)
 * @rdfsLabel "has proper occurrent part"
 * @definition "b has_proper_occurrent_part c = Def. c proper_occurrent_part_of b. [XXX-001"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §3.1 Occurrent — has_proper_part inverse relation
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000138 (proper_occurrent_part_of) — declared on BFO_0000138.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000117 (has_occurrent_part)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            rdfs:subPropertyOf BFO_0000117
 */
export interface IHasProperOccurrentPart extends IHasOccurrentPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasProperOccurrentPart
  extends AbstractHasOccurrentPart
  implements IHasProperOccurrentPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasProperOccurrentPart
  extends AbstractHasProperOccurrentPart
  implements IHasProperOccurrentPart {
  override readonly metaClass = 'HasProperOccurrentPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000118' as const;
  override readonly rdfsLabel = 'has proper occurrent part' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000117'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 19. TemporalPartOf (BFO_0000139) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000139
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent OccurrentPartOf (BFO_0000132)
 * @rdfsLabel "temporal part of"
 * @definition "b temporal_part_of c =Def. b occurrent_part_of c & for some temporal region t, b occupies_temporal_region t & for all occurrents d, t (if d occupies_temporal_region t & t' occurrent_part_of t then (d occurrent_part_of a iff d occurrent_part_of b)). (axiom label in BFO2 Reference: [078-003])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §3.1 Occurrent — temporal_part_of
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000121 (has_temporal_part)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000132 (occurrent_part_of)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            owl:inverseOf BFO_0000121; rdfs:subPropertyOf BFO_0000132;
 *            [078-003] iff (temporalPartOf a b) (and (occurrentPartOf a b) ...)
 */
export interface ITemporalPartOf extends IOccurrentPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractTemporalPartOf
  extends AbstractOccurrentPartOf
  implements ITemporalPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class TemporalPartOf
  extends AbstractTemporalPartOf
  implements ITemporalPartOf {
  override readonly metaClass = 'TemporalPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000139' as const;
  override readonly rdfsLabel = 'temporal part of' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000121' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000132'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 20. HasTemporalPart (BFO_0000121) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000121
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasOccurrentPart (BFO_0000117)
 * @rdfsLabel "has temporal part"
 * @definition "[copied from inverse property 'temporal part of'] b temporal_part_of c =Def. b occurrent_part_of c & for some temporal region t, b occupies_temporal_region t & for all occurrents d, t (if d occupies_temporal_region t & t' occurrent_part_of t then (d occurrent_part_of a iff d occurrent_part_of b)). (axiom label in BFO2 Reference: [078-003])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §3.1 Occurrent — has_temporal_part inverse relation
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000139 (temporal_part_of) — declared on BFO_0000139.
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000117 (has_occurrent_part)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            rdfs:subPropertyOf BFO_0000117
 */
export interface IHasTemporalPart extends IHasOccurrentPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasTemporalPart
  extends AbstractHasOccurrentPart
  implements IHasTemporalPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasTemporalPart
  extends AbstractHasTemporalPart
  implements IHasTemporalPart {
  override readonly metaClass = 'HasTemporalPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000121' as const;
  override readonly rdfsLabel = 'has temporal part' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly subPropertyOf = ['http://purl.obolibrary.org/obo/BFO_0000117'] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 21. ProperTemporalPartOf (BFO_0000136) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000136
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent ProperOccurrentPartOf (BFO_0000138) and TemporalPartOf (BFO_0000139)
 *   — multi-parent in the OWL via two rdfs:subPropertyOf assertions; we extend the
 *   first sibling abstract (BFO_0000138 / AbstractProperOccurrentPartOf) and
 *   declare BFO_0000139 only in the concrete `subPropertyOf` array.
 * @rdfsLabel "proper temporal part of"
 * @definition "b proper_temporal_part_of c =Def. b temporal_part_of c & not (b = c). (axiom label in BFO2 Reference: [116-001])"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl)
 * @bfoReferenceSection §3.1 Occurrent — proper temporal_part_of
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @inverseOf BFO_0000181 (has_proper_temporal_part)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000138 (proper_occurrent_part_of), BFO_0000139 (temporal_part_of)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            owl:inverseOf BFO_0000181;
 *            rdfs:subPropertyOf BFO_0000138; rdfs:subPropertyOf BFO_0000139
 */
export interface IProperTemporalPartOf extends IProperOccurrentPartOf {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractProperTemporalPartOf
  extends AbstractProperOccurrentPartOf
  implements IProperTemporalPartOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ProperTemporalPartOf
  extends AbstractProperTemporalPartOf
  implements IProperTemporalPartOf {
  override readonly metaClass = 'ProperTemporalPartOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000136' as const;
  override readonly rdfsLabel = 'proper temporal part of' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000181' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000138',
    'http://purl.obolibrary.org/obo/BFO_0000139',
  ] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ─── 22. HasProperTemporalPart (BFO_0000181) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000181
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent HasProperOccurrentPart (BFO_0000118) and HasTemporalPart (BFO_0000121)
 *   — multi-parent in the OWL via two rdfs:subPropertyOf assertions; we extend the
 *   first sibling abstract (BFO_0000118 / AbstractHasProperOccurrentPart) and
 *   declare BFO_0000121 only in the concrete `subPropertyOf` array.
 * @rdfsLabel "has proper temporal part"
 * @definition (No explicit obo:IAO_0000115 elucidation declared on BFO_0000181.)
 *             By inversion of BFO_0000136: b has_proper_temporal_part c at t =Def.
 *             c proper_temporal_part_of b at t. (axiom label in BFO2 Reference: [116-001])
 * @bfoReferenceSection §3.1 Occurrent — has_proper_temporal_part inverse relation
 * @domain Occurrent (BFO_0000003)
 * @range Occurrent (BFO_0000003)
 * @characteristics Transitive — declared via `rdf:type owl:TransitiveProperty`.
 * @subPropertyOf BFO_0000118 (has_proper_occurrent_part), BFO_0000121 (has_temporal_part)
 * @owlAxioms `rdf:type owl:TransitiveProperty`;
 *            rdfs:domain BFO_0000003; rdfs:range BFO_0000003;
 *            rdfs:subPropertyOf BFO_0000118; rdfs:subPropertyOf BFO_0000121
 */
export interface IHasProperTemporalPart extends IHasProperOccurrentPart {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasProperTemporalPart
  extends AbstractHasProperOccurrentPart
  implements IHasProperTemporalPart {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasProperTemporalPart
  extends AbstractHasProperTemporalPart
  implements IHasProperTemporalPart {
  override readonly metaClass = 'HasProperTemporalPart' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000181' as const;
  override readonly rdfsLabel = 'has proper temporal part' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000003' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000118',
    'http://purl.obolibrary.org/obo/BFO_0000121',
  ] as const;
  readonly characteristics = ['Transitive'] as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// TEMPORAL-LIFECYCLE FAMILY — BFO_0000108, BFO_0000184, BFO_0000185
// ═══════════════════════════════════════════════════════════════════════════

// ─── 23. ExistsAt (BFO_0000108) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000108
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "exists at"
 * @definition "b exists_at t means: b is an entity which exists at some temporal region t. (axiom label in BFO2 Reference: [118-002])"
 *             (sourced verbatim from obo:IAO_0000600 in spec/src/ontology/owl-group/bfo.owl;
 *              IAO_0000115 is not declared on BFO_0000108, so the elucidation
 *              IAO_0000600 carries the formal definition.)
 * @bfoReferenceSection §2.1 Continuant / §3.1 Occurrent — temporal lifecycle
 * @domain Entity (BFO_0000001)
 * @range TemporalRegion (BFO_0000008)
 * @inverseOf BFO_0000157 (temporal region of) — declared on BFO_0000108 in the OWL.
 *            BFO_0000157 itself is implementer #5's territory; we record only
 *            the IRI here and #5 will declare the property.
 * @owlAxioms rdfs:domain BFO_0000001; rdfs:range BFO_0000008; owl:inverseOf BFO_0000157
 */
export interface IExistsAt extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractExistsAt
  extends AbstractObjectProperty
  implements IExistsAt {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class ExistsAt
  extends AbstractExistsAt
  implements IExistsAt {
  override readonly metaClass = 'ExistsAt' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000108' as const;
  override readonly rdfsLabel = 'exists at' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000001' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000008' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000157' as const;
}

// ─── 24. HistoryOf (BFO_0000184) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000184
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "history of"
 * @definition "b history_of c if c is a material entity or site and b is a history that is the unique history of c. Axiom: if b history_of c and b history_of d then c=d [XXX-001"
 *             (sourced verbatim from obo:IAO_0000600 in spec/src/ontology/owl-group/bfo.owl;
 *              IAO_0000115 reads "[copied from inverse property 'has history']
 *              b has_history c iff c history_of b [XXX-001".)
 * @bfoReferenceSection §3.2 Occurrent — History
 * @domain History (BFO_0000015) — Process root in implementer #2's spine; here
 *         History per BFO 2020 is BFO_0000182 (subClass of Process / Occurrent),
 *         but the OWL declares the rdfs:domain of BFO_0000184 as BFO_0000015
 *         (Process), reflecting the BFO 2014 model where History is registered
 *         as a Process. We mirror the OWL domain BFO_0000015 verbatim.
 * @range MaterialEntity (BFO_0000040)
 * @inverseOf BFO_0000185 (has_history)
 * @characteristics Functional, InverseFunctional — both declared via
 *                  `rdf:type owl:FunctionalProperty` and
 *                  `rdf:type owl:InverseFunctionalProperty` in the OWL release.
 * @subPropertyOf BFO_0000066 (occurs_in) and BFO_0000070 (subordinate to history root)
 *                — both declared via two rdfs:subPropertyOf assertions; both
 *                IRIs are implementer #5's territory and are recorded here only
 *                as parent IRIs in `subPropertyOf`.
 * @owlAxioms `rdf:type owl:FunctionalProperty`; `rdf:type owl:InverseFunctionalProperty`;
 *            rdfs:domain BFO_0000015; rdfs:range BFO_0000040;
 *            rdfs:subPropertyOf BFO_0000066; rdfs:subPropertyOf BFO_0000070;
 *            owl:inverseOf BFO_0000185
 */
export interface IHistoryOf extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHistoryOf
  extends AbstractObjectProperty
  implements IHistoryOf {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HistoryOf
  extends AbstractHistoryOf
  implements IHistoryOf {
  override readonly metaClass = 'HistoryOf' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000184' as const;
  override readonly rdfsLabel = 'history of' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000015' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000040' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000185' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000066',
    'http://purl.obolibrary.org/obo/BFO_0000070',
  ] as const;
  readonly characteristics = ['Functional', 'InverseFunctional'] as const;
}

// ─── 25. HasHistory (BFO_0000185) ───
/**
 * @standard ISO/IEC 21838-2:2021 — Basic Formal Ontology (BFO) 2020
 * @iri http://purl.obolibrary.org/obo/BFO_0000185
 * @metaclass owl:ObjectProperty
 * @isAbstract false
 * @parent (root)
 * @rdfsLabel "has history"
 * @definition "b has_history c iff c history_of b [XXX-001"
 *             (sourced verbatim from obo:IAO_0000115 in spec/src/ontology/owl-group/bfo.owl;
 *              IAO_0000600 reads "[copied from inverse property 'history of']
 *              b history_of c if c is a material entity or site and b is a
 *              history that is the unique history of c. Axiom: if b history_of c
 *              and b history_of d then c=d [XXX-001".)
 * @bfoReferenceSection §3.2 Occurrent — has_history
 * @domain MaterialEntity (BFO_0000040)
 * @range History (BFO_0000015) — declared as Process root in this OWL release;
 *        see HistoryOf comment for BFO_0000015 vs BFO_0000182 reconciliation.
 * @inverseOf BFO_0000184 (history_of) — declared on BFO_0000184.
 * @characteristics Functional, InverseFunctional — both declared via
 *                  `rdf:type owl:FunctionalProperty` and
 *                  `rdf:type owl:InverseFunctionalProperty` in the OWL release.
 * @subPropertyOf BFO_0000067 (contains_process) and BFO_0000166 (subordinate to has_history root)
 *                — both declared via two rdfs:subPropertyOf assertions; both
 *                IRIs are implementer #5's territory and are recorded here only
 *                as parent IRIs in `subPropertyOf`.
 * @owlAxioms `rdf:type owl:FunctionalProperty`; `rdf:type owl:InverseFunctionalProperty`;
 *            rdfs:domain BFO_0000040; rdfs:range BFO_0000015;
 *            rdfs:subPropertyOf BFO_0000067; rdfs:subPropertyOf BFO_0000166
 */
export interface IHasHistory extends IObjectProperty {
  readonly metaClass: string;
  readonly iri: string;
}

export abstract class AbstractHasHistory
  extends AbstractObjectProperty
  implements IHasHistory {
  abstract override readonly metaClass: string;
  abstract override readonly iri: string;
}

export class HasHistory
  extends AbstractHasHistory
  implements IHasHistory {
  override readonly metaClass = 'HasHistory' as const;
  override readonly iri = 'http://purl.obolibrary.org/obo/BFO_0000185' as const;
  override readonly rdfsLabel = 'has history' as const;
  override readonly domain = 'http://purl.obolibrary.org/obo/BFO_0000040' as const;
  override readonly range = 'http://purl.obolibrary.org/obo/BFO_0000015' as const;
  readonly inverseOf = 'http://purl.obolibrary.org/obo/BFO_0000184' as const;
  readonly subPropertyOf = [
    'http://purl.obolibrary.org/obo/BFO_0000067',
    'http://purl.obolibrary.org/obo/BFO_0000166',
  ] as const;
  readonly characteristics = ['Functional', 'InverseFunctional'] as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #4: BFO Object Properties Part 1
// (next: Implementer #5 — Object Properties Part 2: inheres_in, bearer_of,
//  participates_in, has_participant, located_in, occurs_in, concretizes,
//  realized_in, function_of, disposition_of, quality_of, role_of, …)
// ═══════════════════════════════════════════════════════════════════════════
