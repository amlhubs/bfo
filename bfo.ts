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
  readonly metaClass: 'MaterialEntity';
  readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000040';
}

export abstract class AbstractMaterialEntity
  extends AbstractIndependentContinuant
  implements IMaterialEntity {
  abstract override readonly metaClass: 'MaterialEntity';
  abstract override readonly iri: 'http://purl.obolibrary.org/obo/BFO_0000040';
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
