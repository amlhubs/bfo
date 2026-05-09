/**
 * @amlhubs/bfo
 *
 * Curated low-abstraction facade over the BFO 2020 metaclasses declared in
 * `./bfo.ts`.
 *
 * Five symmetric axes (each a separately-callable, tree-shakeable export):
 *
 *   - position     — IRI / spec-position binding for every BFO class and relation
 *   - model        — model identity (BFO 2.0 / BFO 2020 / ISO/IEC 21838-2:2021)
 *   - thing        — typed projection of every BFO owl:Class
 *   - composition  — typed projection of every BFO part-of / has-part / lifecycle axiom
 *   - action       — typed projection of every BFO object-property (relation)
 *
 * Decomposition rule (Genus.Differentia, mirroring
 * `.claude/skills/aml/packages/foundational/modelology/src/index.ts`):
 *
 *   {Word1}{Word2}...{WordN}    where each Wordi is a PascalCase token
 *
 *   - N == 1  -> bfo.{axis}.{word1Lower}
 *               (e.g. Process               -> bfo.thing.process)
 *   - N == 2  -> bfo.{axis}.{rightmostLower}.{leftmostLower}
 *               (genus is rightmost noun; differentia is the modifier)
 *               (e.g. MaterialEntity        -> bfo.thing.entity.material)
 *               (e.g. ProcessBoundary       -> bfo.thing.boundary.process)
 *   - N >= 3  -> bfo.{axis}.{rightmostLower}...{leftmostLower}
 *               (chain genera right-to-left)
 *               (e.g. ZeroDimensionalSpatialRegion -> bfo.thing.region.spatial.zeroDimensional)
 *               (e.g. ContinuantFiatBoundary       -> bfo.thing.boundary.fiat.continuant)
 *
 * For ObjectProperties, the canonical camelCase metaClass discriminant
 * (e.g. `continuantPartOf`) is exposed as the primary leaf, with the dotted
 * Genus.Differentia path provided as an alias when meaningful.
 *
 * TypeScript reserved-name workaround:
 *
 *   bfo.ts exports the BFO metaclasses `Function` and `Object` as `Function_`
 *   and `Object_` (the trailing underscore avoids collision with the TS
 *   built-ins). The underlying `metaClass` discriminant remains `'Function'`
 *   / `'Object'` and the IRIs remain unchanged.
 *
 * Runtime classes (when consumers need to construct) are exposed under
 * `runtime`. Concrete (Layer 3) classes only — abstract spine classes
 * cannot be instantiated and are exposed only through their interface.
 *
 * Module resolution: tsconfig.json sets `moduleResolution: NodeNext`, so
 * runtime imports use the `.js` extension (NOT `.ts`, NOT bare).
 */

// ─────────────────────────────────────────────────────────────────────
// Type imports — every BFO interface (113 metaclasses + 1 synthetic root)
// ─────────────────────────────────────────────────────────────────────

import type {
  // ── owl:Class — Continuant spine ──
  IEntity,
  IContinuant,
  IIndependentContinuant,
  IMaterialEntity,
  IImmaterialEntity,
  IGenericallyDependentContinuant,
  ISpecificallyDependentContinuant,
  IQuality,
  IRelationalQuality,
  IRealizableEntity,
  IRole,
  IDisposition,
  IFunction,
  IObject,
  IObjectAggregate,
  IFiatObjectPart,
  ISite,
  IContinuantFiatBoundary,
  IZeroDimensionalContinuantFiatBoundary,
  IOneDimensionalContinuantFiatBoundary,
  ITwoDimensionalContinuantFiatBoundary,
  ISpatialRegion,
  IZeroDimensionalSpatialRegion,
  IOneDimensionalSpatialRegion,
  ITwoDimensionalSpatialRegion,
  IThreeDimensionalSpatialRegion,
  // ── owl:Class — Occurrent spine ──
  IOccurrent,
  IProcess,
  IHistory,
  IProcessProfile,
  IProcessBoundary,
  ITemporalRegion,
  IZeroDimensionalTemporalRegion,
  IOneDimensionalTemporalRegion,
  ISpatiotemporalRegion,
  // ── owl:ObjectProperty root marker ──
  IObjectProperty,
  // ── owl:ObjectProperty — Continuant part-of family ──
  IContinuantPartOf,
  IHasContinuantPart,
  IContinuantPartOfAtAllTimes,
  IPartOfContinuantAtAllTimesThatWholeExists,
  IHasContinuantPartAtAllTimes,
  IHasContinuantPartAtAllTimesThatPartExists,
  IProperContinuantPartOf,
  IHasProperContinuantPart,
  IProperContinuantPartOfAtAllTimes,
  IHasProperContinuantPartAtAllTimes,
  IMemberPartOf,
  IHasMemberPart,
  IMemberPartOfAtAllTimes,
  IHasMemberPartAtAllTimes,
  // ── owl:ObjectProperty — Occurrent part-of family ──
  IOccurrentPartOf,
  IHasOccurrentPart,
  IProperOccurrentPartOf,
  IHasProperOccurrentPart,
  ITemporalPartOf,
  IHasTemporalPart,
  IProperTemporalPartOf,
  IHasProperTemporalPart,
  // ── owl:ObjectProperty — Temporal lifecycle ──
  IExistsAt,
  IHistoryOf,
  IHasHistory,
  // ── owl:ObjectProperty — Specific dependence ──
  IInheresIn,
  IBearerOf,
  IHasSpecificDependent,
  ISpecificallyDependsOn,
  IBearerOfAtAllTimes,
  IHasSpecificDependentAtAllTimes,
  ISpecificallyDependsOnAtAllTimes,
  // ── owl:ObjectProperty — Realization ──
  IRealizedIn,
  IRealizes,
  // ── owl:ObjectProperty — Participation ──
  IParticipatesIn,
  IHasParticipant,
  IParticipatesInAtAllTimes,
  IHasParticipantAtAllTimes,
  // ── owl:ObjectProperty — Generic dependence / concretization ──
  IConcretizedBy,
  IConcretizes,
  IConcretizesAtAllTimes,
  IConcretizedByAtAllTimes,
  IGenericallyDependsOn,
  IHasGenericDependent,
  // ── owl:ObjectProperty — Inheres-in family (specific dependence shorthand) ──
  IFunctionOf,
  IQualityOf,
  IRoleOf,
  IDispositionOf,
  IHasFunction,
  IHasQuality,
  IHasRole,
  IHasDisposition,
  IHasQualityAtAllTimes,
  IHasFunctionAtAllTimes,
  IHasRoleAtAllTimes,
  IHasDispositionAtAllTimes,
  IHasMaterialBasis,
  IMaterialBasisOf,
  IMaterialBasisOfAtAllTimes,
  // ── owl:ObjectProperty — Location ──
  ILocatedIn,
  ILocatedInAtAllTimes,
  IHasLocation,
  IHasLocationAtAllTimes,
  IOccupiesSpatialRegion,
  IHasSpatialOccupant,
  IOccupiesSpatiotemporalRegion,
  IHasSpatiotemporalOccupant,
  IProjectsOntoSpatialRegion,
  ISpatialProjectionOfSpatiotemporal,
  IProjectsOntoTemporalRegion,
  IDuringWhichExists,
  ITemporalProjectionOfSpatiotemporal,
  IOccupiesTemporalRegion,
  IHasTemporalOccupant,
  // ── owl:ObjectProperty — Process profile ──
  IHasProfile,
  IProcessProfileOf,
  // ── owl:ObjectProperty — Process containment ──
  IOccursIn,
  IContainsProcess,
} from './bfo.js';

// ─────────────────────────────────────────────────────────────────────
// Runtime imports — every Layer 3 concrete class exported by bfo.ts.
// (Abstract spine classes are exposed through their interface only and
// cannot be imported here — they are not instantiable.)
// ─────────────────────────────────────────────────────────────────────

import {
  // ── owl:Class concrete leaves ──
  MaterialEntity,
  GenericallyDependentContinuant,
  Quality,
  RelationalQuality,
  Role,
  Disposition,
  Function_,
  Object_,
  ObjectAggregate,
  FiatObjectPart,
  Site,
  ZeroDimensionalContinuantFiatBoundary,
  OneDimensionalContinuantFiatBoundary,
  TwoDimensionalContinuantFiatBoundary,
  ZeroDimensionalSpatialRegion,
  OneDimensionalSpatialRegion,
  TwoDimensionalSpatialRegion,
  ThreeDimensionalSpatialRegion,
  Process,
  History,
  ProcessProfile,
  ProcessBoundary,
  ZeroDimensionalTemporalRegion,
  OneDimensionalTemporalRegion,
  SpatiotemporalRegion,
  // ── owl:ObjectProperty concrete leaves ──
  ContinuantPartOf,
  HasContinuantPart,
  ContinuantPartOfAtAllTimes,
  PartOfContinuantAtAllTimesThatWholeExists,
  HasContinuantPartAtAllTimes,
  HasContinuantPartAtAllTimesThatPartExists,
  ProperContinuantPartOf,
  HasProperContinuantPart,
  ProperContinuantPartOfAtAllTimes,
  HasProperContinuantPartAtAllTimes,
  MemberPartOf,
  HasMemberPart,
  MemberPartOfAtAllTimes,
  HasMemberPartAtAllTimes,
  OccurrentPartOf,
  HasOccurrentPart,
  ProperOccurrentPartOf,
  HasProperOccurrentPart,
  TemporalPartOf,
  HasTemporalPart,
  ProperTemporalPartOf,
  HasProperTemporalPart,
  ExistsAt,
  HistoryOf,
  HasHistory,
  InheresIn,
  BearerOf,
  HasSpecificDependent,
  SpecificallyDependsOn,
  BearerOfAtAllTimes,
  HasSpecificDependentAtAllTimes,
  SpecificallyDependsOnAtAllTimes,
  RealizedIn,
  Realizes,
  ParticipatesIn,
  HasParticipant,
  ParticipatesInAtAllTimes,
  HasParticipantAtAllTimes,
  ConcretizedBy,
  Concretizes,
  ConcretizesAtAllTimes,
  ConcretizedByAtAllTimes,
  GenericallyDependsOn,
  HasGenericDependent,
  FunctionOf,
  QualityOf,
  RoleOf,
  DispositionOf,
  HasFunction,
  HasQuality,
  HasRole,
  HasDisposition,
  HasQualityAtAllTimes,
  HasFunctionAtAllTimes,
  HasRoleAtAllTimes,
  HasDispositionAtAllTimes,
  HasMaterialBasis,
  MaterialBasisOf,
  MaterialBasisOfAtAllTimes,
  LocatedIn,
  LocatedInAtAllTimes,
  HasLocation,
  HasLocationAtAllTimes,
  OccupiesSpatialRegion,
  HasSpatialOccupant,
  OccupiesSpatiotemporalRegion,
  HasSpatiotemporalOccupant,
  ProjectsOntoSpatialRegion,
  SpatialProjectionOfSpatiotemporal,
  ProjectsOntoTemporalRegion,
  DuringWhichExists,
  TemporalProjectionOfSpatiotemporal,
  OccupiesTemporalRegion,
  HasTemporalOccupant,
  HasProfile,
  ProcessProfileOf,
  OccursIn,
  ContainsProcess,
} from './bfo.js';

// =====================================================================
// PUBLIC API — `position`
//
// IRI binding for every BFO 2020 metaclass that has one (113 entries):
//   - 35 owl:Class IRIs (Continuant spine + Occurrent spine)
//   - 78 owl:ObjectProperty IRIs (every BFO relation)
//
// The synthetic `IObjectProperty` root marker has no BFO IRI of its own
// and therefore does not appear here.
// =====================================================================

export const position = {
  // ── owl:Class IRIs (35) — Continuant spine ──
  entity: 'http://purl.obolibrary.org/obo/BFO_0000001',
  continuant: 'http://purl.obolibrary.org/obo/BFO_0000002',
  independentContinuant: 'http://purl.obolibrary.org/obo/BFO_0000004',
  materialEntity: 'http://purl.obolibrary.org/obo/BFO_0000040',
  immaterialEntity: 'http://purl.obolibrary.org/obo/BFO_0000141',
  genericallyDependentContinuant: 'http://purl.obolibrary.org/obo/BFO_0000031',
  specificallyDependentContinuant: 'http://purl.obolibrary.org/obo/BFO_0000020',
  quality: 'http://purl.obolibrary.org/obo/BFO_0000019',
  relationalQuality: 'http://purl.obolibrary.org/obo/BFO_0000145',
  realizableEntity: 'http://purl.obolibrary.org/obo/BFO_0000017',
  role: 'http://purl.obolibrary.org/obo/BFO_0000023',
  disposition: 'http://purl.obolibrary.org/obo/BFO_0000016',
  function: 'http://purl.obolibrary.org/obo/BFO_0000034',
  object: 'http://purl.obolibrary.org/obo/BFO_0000030',
  objectAggregate: 'http://purl.obolibrary.org/obo/BFO_0000027',
  fiatObjectPart: 'http://purl.obolibrary.org/obo/BFO_0000024',
  site: 'http://purl.obolibrary.org/obo/BFO_0000029',
  continuantFiatBoundary: 'http://purl.obolibrary.org/obo/BFO_0000140',
  zeroDimensionalContinuantFiatBoundary: 'http://purl.obolibrary.org/obo/BFO_0000147',
  oneDimensionalContinuantFiatBoundary: 'http://purl.obolibrary.org/obo/BFO_0000142',
  twoDimensionalContinuantFiatBoundary: 'http://purl.obolibrary.org/obo/BFO_0000146',
  spatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000006',
  zeroDimensionalSpatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000018',
  oneDimensionalSpatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000026',
  twoDimensionalSpatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000009',
  threeDimensionalSpatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000028',

  // ── owl:Class IRIs — Occurrent spine ──
  occurrent: 'http://purl.obolibrary.org/obo/BFO_0000003',
  process: 'http://purl.obolibrary.org/obo/BFO_0000015',
  history: 'http://purl.obolibrary.org/obo/BFO_0000182',
  processProfile: 'http://purl.obolibrary.org/obo/BFO_0000144',
  processBoundary: 'http://purl.obolibrary.org/obo/BFO_0000035',
  temporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000008',
  zeroDimensionalTemporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000148',
  oneDimensionalTemporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000038',
  spatiotemporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000011',

  // ── owl:ObjectProperty IRIs (78) — Continuant part-of family ──
  continuantPartOf: 'http://purl.obolibrary.org/obo/BFO_0000176',
  hasContinuantPart: 'http://purl.obolibrary.org/obo/BFO_0000178',
  continuantPartOfAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000177',
  partOfContinuantAtAllTimesThatWholeExists: 'http://purl.obolibrary.org/obo/BFO_0000186',
  hasContinuantPartAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000110',
  hasContinuantPartAtAllTimesThatPartExists: 'http://purl.obolibrary.org/obo/BFO_0000187',
  properContinuantPartOf: 'http://purl.obolibrary.org/obo/BFO_0000175',
  hasProperContinuantPart: 'http://purl.obolibrary.org/obo/BFO_0000174',
  properContinuantPartOfAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000137',
  hasProperContinuantPartAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000111',
  memberPartOf: 'http://purl.obolibrary.org/obo/BFO_0000129',
  hasMemberPart: 'http://purl.obolibrary.org/obo/BFO_0000115',
  memberPartOfAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000173',
  hasMemberPartAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000172',

  // ── owl:ObjectProperty IRIs — Occurrent part-of family ──
  occurrentPartOf: 'http://purl.obolibrary.org/obo/BFO_0000132',
  hasOccurrentPart: 'http://purl.obolibrary.org/obo/BFO_0000117',
  properOccurrentPartOf: 'http://purl.obolibrary.org/obo/BFO_0000138',
  hasProperOccurrentPart: 'http://purl.obolibrary.org/obo/BFO_0000118',
  temporalPartOf: 'http://purl.obolibrary.org/obo/BFO_0000139',
  hasTemporalPart: 'http://purl.obolibrary.org/obo/BFO_0000121',
  properTemporalPartOf: 'http://purl.obolibrary.org/obo/BFO_0000136',
  hasProperTemporalPart: 'http://purl.obolibrary.org/obo/BFO_0000181',

  // ── owl:ObjectProperty IRIs — Temporal lifecycle ──
  existsAt: 'http://purl.obolibrary.org/obo/BFO_0000108',
  historyOf: 'http://purl.obolibrary.org/obo/BFO_0000184',
  hasHistory: 'http://purl.obolibrary.org/obo/BFO_0000185',

  // ── owl:ObjectProperty IRIs — Specific dependence ──
  inheresIn: 'http://purl.obolibrary.org/obo/BFO_0000052',
  bearerOf: 'http://purl.obolibrary.org/obo/BFO_0000053',
  hasSpecificDependent: 'http://purl.obolibrary.org/obo/BFO_0000125',
  specificallyDependsOn: 'http://purl.obolibrary.org/obo/BFO_0000169',
  bearerOfAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000158',
  hasSpecificDependentAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000168',
  specificallyDependsOnAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000070',

  // ── owl:ObjectProperty IRIs — Realization ──
  realizedIn: 'http://purl.obolibrary.org/obo/BFO_0000054',
  realizes: 'http://purl.obolibrary.org/obo/BFO_0000055',

  // ── owl:ObjectProperty IRIs — Participation ──
  participatesIn: 'http://purl.obolibrary.org/obo/BFO_0000056',
  hasParticipant: 'http://purl.obolibrary.org/obo/BFO_0000057',
  participatesInAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000166',
  hasParticipantAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000167',

  // ── owl:ObjectProperty IRIs — Generic dependence / concretization ──
  concretizedBy: 'http://purl.obolibrary.org/obo/BFO_0000058',
  concretizes: 'http://purl.obolibrary.org/obo/BFO_0000059',
  concretizesAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000164',
  concretizedByAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000165',
  genericallyDependsOn: 'http://purl.obolibrary.org/obo/BFO_0000084',
  hasGenericDependent: 'http://purl.obolibrary.org/obo/BFO_0000101',

  // ── owl:ObjectProperty IRIs — Inheres-in shorthand family ──
  functionOf: 'http://purl.obolibrary.org/obo/BFO_0000079',
  qualityOf: 'http://purl.obolibrary.org/obo/BFO_0000080',
  roleOf: 'http://purl.obolibrary.org/obo/BFO_0000081',
  dispositionOf: 'http://purl.obolibrary.org/obo/BFO_0000107',
  hasFunction: 'http://purl.obolibrary.org/obo/BFO_0000085',
  hasQuality: 'http://purl.obolibrary.org/obo/BFO_0000086',
  hasRole: 'http://purl.obolibrary.org/obo/BFO_0000087',
  hasDisposition: 'http://purl.obolibrary.org/obo/BFO_0000112',
  hasQualityAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000159',
  hasFunctionAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000160',
  hasRoleAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000161',
  hasDispositionAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000162',
  hasMaterialBasis: 'http://purl.obolibrary.org/obo/BFO_0000113',
  materialBasisOf: 'http://purl.obolibrary.org/obo/BFO_0000127',
  materialBasisOfAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000163',

  // ── owl:ObjectProperty IRIs — Location ──
  locatedIn: 'http://purl.obolibrary.org/obo/BFO_0000171',
  locatedInAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000082',
  hasLocation: 'http://purl.obolibrary.org/obo/BFO_0000124',
  hasLocationAtAllTimes: 'http://purl.obolibrary.org/obo/BFO_0000170',
  occupiesSpatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000083',
  hasSpatialOccupant: 'http://purl.obolibrary.org/obo/BFO_0000123',
  occupiesSpatiotemporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000130',
  hasSpatiotemporalOccupant: 'http://purl.obolibrary.org/obo/BFO_0000126',
  projectsOntoSpatialRegion: 'http://purl.obolibrary.org/obo/BFO_0000151',
  spatialProjectionOfSpatiotemporal: 'http://purl.obolibrary.org/obo/BFO_0000152',
  projectsOntoTemporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000153',
  duringWhichExists: 'http://purl.obolibrary.org/obo/BFO_0000157',
  temporalProjectionOfSpatiotemporal: 'http://purl.obolibrary.org/obo/BFO_0000154',
  occupiesTemporalRegion: 'http://purl.obolibrary.org/obo/BFO_0000155',
  hasTemporalOccupant: 'http://purl.obolibrary.org/obo/BFO_0000156',

  // ── owl:ObjectProperty IRIs — Process profile ──
  hasProfile: 'http://purl.obolibrary.org/obo/BFO_0000119',
  processProfileOf: 'http://purl.obolibrary.org/obo/BFO_0000133',

  // ── owl:ObjectProperty IRIs — Process containment ──
  occursIn: 'http://purl.obolibrary.org/obo/BFO_0000066',
  containsProcess: 'http://purl.obolibrary.org/obo/BFO_0000067',
} as const;

// =====================================================================
// PUBLIC API — `model`
//
// Identity tags for the BFO release editions.
// =====================================================================

export const model = {
  iso21838: {
    standard: 'ISO/IEC 21838-2:2021',
    name: 'Basic Formal Ontology',
    edition: 'BFO 2020',
    isoUrl: 'https://www.iso.org/standard/74572.html',
    owlSource: 'https://github.com/bfo-ontology/bfo',
    authority: 'ISO/IEC JTC 1/SC 32 (ISO 21838) and the BFO Consortium',
  },
  bfo20: {
    name: 'Basic Formal Ontology',
    edition: 'BFO 2.0',
    classesOnlyOwl: 'http://purl.obolibrary.org/obo/bfo/2.0/bfo.owl',
    mergedOwl: 'http://purl.obolibrary.org/obo/bfo/2014-05-03/bfo.owl',
  },
  rdfNamespace: 'http://purl.obolibrary.org/obo/',
  prefix: 'BFO_',
} as const;

// =====================================================================
// PUBLIC API — `thing`
//
// Typed projection of every BFO owl:Class (35 metaclasses), keyed by
// Genus.Differentia.
//
// Each leaf is `undefined as unknown as IFooClass` — a typed phantom that
// carries the interface type without a runtime instance. The actual
// runtime classes (where instantiable; abstract spine classes are not)
// are exposed under `runtime.thing`.
// =====================================================================

export const thing = {
  // ── N=1 single-token leaves ──
  entity: undefined as unknown as IEntity,
  continuant: undefined as unknown as IContinuant,
  occurrent: undefined as unknown as IOccurrent,
  quality: undefined as unknown as IQuality,
  disposition: undefined as unknown as IDisposition,
  role: undefined as unknown as IRole,
  function: undefined as unknown as IFunction,
  site: undefined as unknown as ISite,
  history: undefined as unknown as IHistory,
  process: undefined as unknown as IProcess,
  object: undefined as unknown as IObject,

  // ── *Entity — genus = entity ──
  // {MaterialEntity}        -> entity.material
  // {ImmaterialEntity}      -> entity.immaterial
  // {RealizableEntity}      -> entity.realizable
  entityByKind: {
    material: undefined as unknown as IMaterialEntity,
    immaterial: undefined as unknown as IImmaterialEntity,
    realizable: undefined as unknown as IRealizableEntity,
  },

  // ── *Continuant — genus = continuant; differentia = independence/dependence ──
  // {IndependentContinuant}            -> continuant.independent
  // {GenericallyDependentContinuant}   -> continuant.dependent.generic
  // {SpecificallyDependentContinuant}  -> continuant.dependent.specific
  continuantByKind: {
    independent: undefined as unknown as IIndependentContinuant,
    dependent: {
      generic: undefined as unknown as IGenericallyDependentContinuant,
      specific: undefined as unknown as ISpecificallyDependentContinuant,
    },
  },

  // ── *Quality — sub-kinds ──
  // {RelationalQuality}     -> quality.relational
  qualityByKind: {
    relational: undefined as unknown as IRelationalQuality,
  },

  // ── *Object — sub-kinds (genus = object) ──
  // {ObjectAggregate}       -> object.aggregate
  // {FiatObjectPart}        -> object.part.fiat (N=3 → genus Object, mid Part, diff Fiat)
  objectByKind: {
    aggregate: undefined as unknown as IObjectAggregate,
    part: {
      fiat: undefined as unknown as IFiatObjectPart,
    },
  },

  // ── *Boundary — genus = boundary ──
  // {ProcessBoundary}                          -> boundary.process
  // {ContinuantFiatBoundary}                   -> boundary.fiat.continuant
  // {ZeroDimensionalContinuantFiatBoundary}    -> boundary.fiat.continuant.zeroDimensional
  // {OneDimensionalContinuantFiatBoundary}     -> boundary.fiat.continuant.oneDimensional
  // {TwoDimensionalContinuantFiatBoundary}     -> boundary.fiat.continuant.twoDimensional
  boundary: {
    process: undefined as unknown as IProcessBoundary,
    fiat: {
      continuant: Object.assign(
        undefined as unknown as IContinuantFiatBoundary,
        {
          zeroDimensional: undefined as unknown as IZeroDimensionalContinuantFiatBoundary,
          oneDimensional: undefined as unknown as IOneDimensionalContinuantFiatBoundary,
          twoDimensional: undefined as unknown as ITwoDimensionalContinuantFiatBoundary,
        },
      ),
    },
  },

  // ── *Region — genus = region ──
  // {SpatialRegion}                  -> region.spatial
  // {ZeroDimensionalSpatialRegion}   -> region.spatial.zeroDimensional
  // {OneDimensionalSpatialRegion}    -> region.spatial.oneDimensional
  // {TwoDimensionalSpatialRegion}    -> region.spatial.twoDimensional
  // {ThreeDimensionalSpatialRegion}  -> region.spatial.threeDimensional
  // {TemporalRegion}                 -> region.temporal
  // {ZeroDimensionalTemporalRegion}  -> region.temporal.zeroDimensional
  // {OneDimensionalTemporalRegion}   -> region.temporal.oneDimensional
  // {SpatiotemporalRegion}           -> region.spatiotemporal
  region: {
    spatial: Object.assign(undefined as unknown as ISpatialRegion, {
      zeroDimensional: undefined as unknown as IZeroDimensionalSpatialRegion,
      oneDimensional: undefined as unknown as IOneDimensionalSpatialRegion,
      twoDimensional: undefined as unknown as ITwoDimensionalSpatialRegion,
      threeDimensional: undefined as unknown as IThreeDimensionalSpatialRegion,
    }),
    temporal: Object.assign(undefined as unknown as ITemporalRegion, {
      zeroDimensional: undefined as unknown as IZeroDimensionalTemporalRegion,
      oneDimensional: undefined as unknown as IOneDimensionalTemporalRegion,
    }),
    spatiotemporal: undefined as unknown as ISpatiotemporalRegion,
  },

  // ── *Profile — genus = profile ──
  // {ProcessProfile}                 -> profile.process
  profile: {
    process: undefined as unknown as IProcessProfile,
  },
} as const;

// =====================================================================
// PUBLIC API — `composition`
//
// Typed projection of every BFO part-of / has-part / temporal-lifecycle
// ObjectProperty (~26 entries). These are the relations whose semantics
// are mereological (parthood) or lifecycle-of-the-aggregate (history).
//
// The synthetic `IObjectProperty` root marker is exposed at `composition.root`
// for advanced consumers; it has no IRI of its own.
// =====================================================================

export const composition = {
  // synthetic root marker for every BFO ObjectProperty (no IRI)
  root: undefined as unknown as IObjectProperty,

  // ── Continuant part-of family ──
  // {ContinuantPartOf}                                -> partOf.continuant
  // {ContinuantPartOfAtAllTimes}                      -> partOf.continuant.atAllTimes
  // {PartOfContinuantAtAllTimesThatWholeExists}       -> partOf.continuant.atAllTimes.whileWholeExists
  // {ProperContinuantPartOf}                          -> partOf.continuant.proper
  // {ProperContinuantPartOfAtAllTimes}                -> partOf.continuant.proper.atAllTimes
  // {MemberPartOf}                                    -> partOf.member
  // {MemberPartOfAtAllTimes}                          -> partOf.member.atAllTimes
  // {OccurrentPartOf}                                 -> partOf.occurrent
  // {ProperOccurrentPartOf}                           -> partOf.occurrent.proper
  // {TemporalPartOf}                                  -> partOf.temporal
  // {ProperTemporalPartOf}                            -> partOf.temporal.proper
  continuantPartOf: undefined as unknown as IContinuantPartOf,
  continuantPartOfAtAllTimes: undefined as unknown as IContinuantPartOfAtAllTimes,
  partOfContinuantAtAllTimesThatWholeExists:
    undefined as unknown as IPartOfContinuantAtAllTimesThatWholeExists,
  properContinuantPartOf: undefined as unknown as IProperContinuantPartOf,
  properContinuantPartOfAtAllTimes:
    undefined as unknown as IProperContinuantPartOfAtAllTimes,
  memberPartOf: undefined as unknown as IMemberPartOf,
  memberPartOfAtAllTimes: undefined as unknown as IMemberPartOfAtAllTimes,
  occurrentPartOf: undefined as unknown as IOccurrentPartOf,
  properOccurrentPartOf: undefined as unknown as IProperOccurrentPartOf,
  temporalPartOf: undefined as unknown as ITemporalPartOf,
  properTemporalPartOf: undefined as unknown as IProperTemporalPartOf,

  // ── Continuant has-part family ──
  // {HasContinuantPart}                               -> has.continuantPart
  // {HasContinuantPartAtAllTimes}                     -> has.continuantPart.atAllTimes
  // {HasContinuantPartAtAllTimesThatPartExists}       -> has.continuantPart.atAllTimes.whilePartExists
  // {HasProperContinuantPart}                         -> has.continuantPart.proper
  // {HasProperContinuantPartAtAllTimes}               -> has.continuantPart.proper.atAllTimes
  // {HasMemberPart}                                   -> has.memberPart
  // {HasMemberPartAtAllTimes}                         -> has.memberPart.atAllTimes
  // {HasOccurrentPart}                                -> has.occurrentPart
  // {HasProperOccurrentPart}                          -> has.occurrentPart.proper
  // {HasTemporalPart}                                 -> has.temporalPart
  // {HasProperTemporalPart}                           -> has.temporalPart.proper
  hasContinuantPart: undefined as unknown as IHasContinuantPart,
  hasContinuantPartAtAllTimes: undefined as unknown as IHasContinuantPartAtAllTimes,
  hasContinuantPartAtAllTimesThatPartExists:
    undefined as unknown as IHasContinuantPartAtAllTimesThatPartExists,
  hasProperContinuantPart: undefined as unknown as IHasProperContinuantPart,
  hasProperContinuantPartAtAllTimes:
    undefined as unknown as IHasProperContinuantPartAtAllTimes,
  hasMemberPart: undefined as unknown as IHasMemberPart,
  hasMemberPartAtAllTimes: undefined as unknown as IHasMemberPartAtAllTimes,
  hasOccurrentPart: undefined as unknown as IHasOccurrentPart,
  hasProperOccurrentPart: undefined as unknown as IHasProperOccurrentPart,
  hasTemporalPart: undefined as unknown as IHasTemporalPart,
  hasProperTemporalPart: undefined as unknown as IHasProperTemporalPart,

  // ── Temporal-lifecycle properties (existence + history of the aggregate) ──
  // {ExistsAt}     -> existsAt
  // {HistoryOf}    -> historyOf
  // {HasHistory}   -> hasHistory
  existsAt: undefined as unknown as IExistsAt,
  historyOf: undefined as unknown as IHistoryOf,
  hasHistory: undefined as unknown as IHasHistory,

  // ─────────────────────────────────────────────────────────────────
  // Genus.Differentia aliases (parent-child paths under part-of / has)
  // — same types as the canonical leaves above; provided for IDE
  // discovery ergonomics and to exercise the right-to-left chaining
  // rule on multi-token relation names.
  // ─────────────────────────────────────────────────────────────────
  partOf: {
    continuant: Object.assign(undefined as unknown as IContinuantPartOf, {
      atAllTimes: Object.assign(
        undefined as unknown as IContinuantPartOfAtAllTimes,
        {
          whileWholeExists:
            undefined as unknown as IPartOfContinuantAtAllTimesThatWholeExists,
        },
      ),
      proper: Object.assign(undefined as unknown as IProperContinuantPartOf, {
        atAllTimes:
          undefined as unknown as IProperContinuantPartOfAtAllTimes,
      }),
    }),
    member: Object.assign(undefined as unknown as IMemberPartOf, {
      atAllTimes: undefined as unknown as IMemberPartOfAtAllTimes,
    }),
    occurrent: Object.assign(undefined as unknown as IOccurrentPartOf, {
      proper: undefined as unknown as IProperOccurrentPartOf,
    }),
    temporal: Object.assign(undefined as unknown as ITemporalPartOf, {
      proper: undefined as unknown as IProperTemporalPartOf,
    }),
  },
  has: {
    continuantPart: Object.assign(undefined as unknown as IHasContinuantPart, {
      atAllTimes: Object.assign(
        undefined as unknown as IHasContinuantPartAtAllTimes,
        {
          whilePartExists:
            undefined as unknown as IHasContinuantPartAtAllTimesThatPartExists,
        },
      ),
      proper: Object.assign(undefined as unknown as IHasProperContinuantPart, {
        atAllTimes:
          undefined as unknown as IHasProperContinuantPartAtAllTimes,
      }),
    }),
    memberPart: Object.assign(undefined as unknown as IHasMemberPart, {
      atAllTimes: undefined as unknown as IHasMemberPartAtAllTimes,
    }),
    occurrentPart: Object.assign(undefined as unknown as IHasOccurrentPart, {
      proper: undefined as unknown as IHasProperOccurrentPart,
    }),
    temporalPart: Object.assign(undefined as unknown as IHasTemporalPart, {
      proper: undefined as unknown as IHasProperTemporalPart,
    }),
  },
} as const;

// =====================================================================
// PUBLIC API — `action`
//
// Typed projection of every BFO object-property (relation) that is NOT
// a part-of / has-part / lifecycle relation (~52 entries). These are the
// relations BFO uses to describe how entities depend on, realize, locate,
// participate in, and project onto one another.
// =====================================================================

export const action = {
  // ── Specific dependence (inheres-in / bearer-of family) ──
  // {InheresIn}                          -> inheresIn
  // {BearerOf}                           -> bearerOf
  // {HasSpecificDependent}               -> hasSpecificDependent
  // {SpecificallyDependsOn}              -> specificallyDependsOn
  // {BearerOfAtAllTimes}                 -> bearerOf.atAllTimes
  // {HasSpecificDependentAtAllTimes}     -> hasSpecificDependent.atAllTimes
  // {SpecificallyDependsOnAtAllTimes}    -> specificallyDependsOn.atAllTimes
  inheresIn: undefined as unknown as IInheresIn,
  bearerOf: undefined as unknown as IBearerOf,
  hasSpecificDependent: undefined as unknown as IHasSpecificDependent,
  specificallyDependsOn: undefined as unknown as ISpecificallyDependsOn,
  bearerOfAtAllTimes: undefined as unknown as IBearerOfAtAllTimes,
  hasSpecificDependentAtAllTimes:
    undefined as unknown as IHasSpecificDependentAtAllTimes,
  specificallyDependsOnAtAllTimes:
    undefined as unknown as ISpecificallyDependsOnAtAllTimes,

  // ── Realization ──
  // {RealizedIn}    -> realizedIn
  // {Realizes}      -> realizes
  realizedIn: undefined as unknown as IRealizedIn,
  realizes: undefined as unknown as IRealizes,

  // ── Participation ──
  // {ParticipatesIn}              -> participatesIn
  // {HasParticipant}              -> hasParticipant
  // {ParticipatesInAtAllTimes}    -> participatesIn.atAllTimes
  // {HasParticipantAtAllTimes}    -> hasParticipant.atAllTimes
  participatesIn: undefined as unknown as IParticipatesIn,
  hasParticipant: undefined as unknown as IHasParticipant,
  participatesInAtAllTimes: undefined as unknown as IParticipatesInAtAllTimes,
  hasParticipantAtAllTimes: undefined as unknown as IHasParticipantAtAllTimes,

  // ── Generic dependence / concretization ──
  // {ConcretizedBy}             -> concretizedBy
  // {Concretizes}               -> concretizes
  // {ConcretizesAtAllTimes}     -> concretizes.atAllTimes
  // {ConcretizedByAtAllTimes}   -> concretizedBy.atAllTimes
  // {GenericallyDependsOn}      -> genericallyDependsOn
  // {HasGenericDependent}       -> hasGenericDependent
  concretizedBy: undefined as unknown as IConcretizedBy,
  concretizes: undefined as unknown as IConcretizes,
  concretizesAtAllTimes: undefined as unknown as IConcretizesAtAllTimes,
  concretizedByAtAllTimes: undefined as unknown as IConcretizedByAtAllTimes,
  genericallyDependsOn: undefined as unknown as IGenericallyDependsOn,
  hasGenericDependent: undefined as unknown as IHasGenericDependent,

  // ── Inheres-in shorthand family — quality / role / disposition / function ──
  // {FunctionOf}                   -> of.function
  // {QualityOf}                    -> of.quality
  // {RoleOf}                       -> of.role
  // {DispositionOf}                -> of.disposition
  // {HasFunction}                  -> hasFunction
  // {HasQuality}                   -> hasQuality
  // {HasRole}                      -> hasRole
  // {HasDisposition}               -> hasDisposition
  // {HasQualityAtAllTimes}         -> hasQuality.atAllTimes
  // {HasFunctionAtAllTimes}        -> hasFunction.atAllTimes
  // {HasRoleAtAllTimes}            -> hasRole.atAllTimes
  // {HasDispositionAtAllTimes}     -> hasDisposition.atAllTimes
  functionOf: undefined as unknown as IFunctionOf,
  qualityOf: undefined as unknown as IQualityOf,
  roleOf: undefined as unknown as IRoleOf,
  dispositionOf: undefined as unknown as IDispositionOf,
  hasFunction: undefined as unknown as IHasFunction,
  hasQuality: undefined as unknown as IHasQuality,
  hasRole: undefined as unknown as IHasRole,
  hasDisposition: undefined as unknown as IHasDisposition,
  hasQualityAtAllTimes: undefined as unknown as IHasQualityAtAllTimes,
  hasFunctionAtAllTimes: undefined as unknown as IHasFunctionAtAllTimes,
  hasRoleAtAllTimes: undefined as unknown as IHasRoleAtAllTimes,
  hasDispositionAtAllTimes: undefined as unknown as IHasDispositionAtAllTimes,

  // ── Material basis (specifically-dependent continuants) ──
  // {HasMaterialBasis}             -> hasMaterialBasis
  // {MaterialBasisOf}              -> materialBasisOf
  // {MaterialBasisOfAtAllTimes}    -> materialBasisOf.atAllTimes
  hasMaterialBasis: undefined as unknown as IHasMaterialBasis,
  materialBasisOf: undefined as unknown as IMaterialBasisOf,
  materialBasisOfAtAllTimes: undefined as unknown as IMaterialBasisOfAtAllTimes,

  // ── Location (spatial / spatiotemporal / temporal) ──
  // {LocatedIn}                                  -> locatedIn
  // {LocatedInAtAllTimes}                        -> locatedIn.atAllTimes
  // {HasLocation}                                -> hasLocation
  // {HasLocationAtAllTimes}                      -> hasLocation.atAllTimes
  // {OccupiesSpatialRegion}                      -> occupies.region.spatial
  // {HasSpatialOccupant}                         -> has.occupant.spatial
  // {OccupiesSpatiotemporalRegion}               -> occupies.region.spatiotemporal
  // {HasSpatiotemporalOccupant}                  -> has.occupant.spatiotemporal
  // {OccupiesTemporalRegion}                     -> occupies.region.temporal
  // {HasTemporalOccupant}                        -> has.occupant.temporal
  // {ProjectsOntoSpatialRegion}                  -> projectsOnto.region.spatial
  // {ProjectsOntoTemporalRegion}                 -> projectsOnto.region.temporal
  // {SpatialProjectionOfSpatiotemporal}          -> projectionOf.spatiotemporal.spatial
  // {TemporalProjectionOfSpatiotemporal}         -> projectionOf.spatiotemporal.temporal
  // {DuringWhichExists}                          -> duringWhichExists
  locatedIn: undefined as unknown as ILocatedIn,
  locatedInAtAllTimes: undefined as unknown as ILocatedInAtAllTimes,
  hasLocation: undefined as unknown as IHasLocation,
  hasLocationAtAllTimes: undefined as unknown as IHasLocationAtAllTimes,
  occupiesSpatialRegion: undefined as unknown as IOccupiesSpatialRegion,
  hasSpatialOccupant: undefined as unknown as IHasSpatialOccupant,
  occupiesSpatiotemporalRegion:
    undefined as unknown as IOccupiesSpatiotemporalRegion,
  hasSpatiotemporalOccupant: undefined as unknown as IHasSpatiotemporalOccupant,
  occupiesTemporalRegion: undefined as unknown as IOccupiesTemporalRegion,
  hasTemporalOccupant: undefined as unknown as IHasTemporalOccupant,
  projectsOntoSpatialRegion: undefined as unknown as IProjectsOntoSpatialRegion,
  projectsOntoTemporalRegion: undefined as unknown as IProjectsOntoTemporalRegion,
  spatialProjectionOfSpatiotemporal:
    undefined as unknown as ISpatialProjectionOfSpatiotemporal,
  temporalProjectionOfSpatiotemporal:
    undefined as unknown as ITemporalProjectionOfSpatiotemporal,
  duringWhichExists: undefined as unknown as IDuringWhichExists,

  // ── Process profile ──
  // {HasProfile}        -> hasProfile
  // {ProcessProfileOf}  -> processProfileOf
  hasProfile: undefined as unknown as IHasProfile,
  processProfileOf: undefined as unknown as IProcessProfileOf,

  // ── Process containment ──
  // {OccursIn}        -> occursIn
  // {ContainsProcess} -> containsProcess
  occursIn: undefined as unknown as IOccursIn,
  containsProcess: undefined as unknown as IContainsProcess,
} as const;

// =====================================================================
// PUBLIC API — `runtime`
//
// Layer 3 concrete classes (the ones that can be instantiated). The
// abstract spine classes (Entity, Continuant, IndependentContinuant,
// ImmaterialEntity, SpecificallyDependentContinuant, RealizableEntity,
// ContinuantFiatBoundary, SpatialRegion, Occurrent, TemporalRegion, and
// the synthetic ObjectProperty marker) are not instantiable and are
// available only through their interface in `thing` / `composition` /
// `action` above.
//
// TS reserved-name workaround: BFO's `Function` and `Object` are
// re-exported as `function_` and `object` (matching the bfo.ts exports
// `Function_` / `Object_`); the `metaClass` discriminant remains
// `'Function'` / `'Object'`.
// =====================================================================

export const runtime = {
  thing: {
    materialEntity: MaterialEntity,
    genericallyDependentContinuant: GenericallyDependentContinuant,
    quality: Quality,
    relationalQuality: RelationalQuality,
    role: Role,
    disposition: Disposition,
    function_: Function_,
    object_: Object_,
    objectAggregate: ObjectAggregate,
    fiatObjectPart: FiatObjectPart,
    site: Site,
    zeroDimensionalContinuantFiatBoundary:
      ZeroDimensionalContinuantFiatBoundary,
    oneDimensionalContinuantFiatBoundary: OneDimensionalContinuantFiatBoundary,
    twoDimensionalContinuantFiatBoundary: TwoDimensionalContinuantFiatBoundary,
    zeroDimensionalSpatialRegion: ZeroDimensionalSpatialRegion,
    oneDimensionalSpatialRegion: OneDimensionalSpatialRegion,
    twoDimensionalSpatialRegion: TwoDimensionalSpatialRegion,
    threeDimensionalSpatialRegion: ThreeDimensionalSpatialRegion,
    process: Process,
    history: History,
    processProfile: ProcessProfile,
    processBoundary: ProcessBoundary,
    zeroDimensionalTemporalRegion: ZeroDimensionalTemporalRegion,
    oneDimensionalTemporalRegion: OneDimensionalTemporalRegion,
    spatiotemporalRegion: SpatiotemporalRegion,
  },
  composition: {
    continuantPartOf: ContinuantPartOf,
    hasContinuantPart: HasContinuantPart,
    continuantPartOfAtAllTimes: ContinuantPartOfAtAllTimes,
    partOfContinuantAtAllTimesThatWholeExists:
      PartOfContinuantAtAllTimesThatWholeExists,
    hasContinuantPartAtAllTimes: HasContinuantPartAtAllTimes,
    hasContinuantPartAtAllTimesThatPartExists:
      HasContinuantPartAtAllTimesThatPartExists,
    properContinuantPartOf: ProperContinuantPartOf,
    hasProperContinuantPart: HasProperContinuantPart,
    properContinuantPartOfAtAllTimes: ProperContinuantPartOfAtAllTimes,
    hasProperContinuantPartAtAllTimes: HasProperContinuantPartAtAllTimes,
    memberPartOf: MemberPartOf,
    hasMemberPart: HasMemberPart,
    memberPartOfAtAllTimes: MemberPartOfAtAllTimes,
    hasMemberPartAtAllTimes: HasMemberPartAtAllTimes,
    occurrentPartOf: OccurrentPartOf,
    hasOccurrentPart: HasOccurrentPart,
    properOccurrentPartOf: ProperOccurrentPartOf,
    hasProperOccurrentPart: HasProperOccurrentPart,
    temporalPartOf: TemporalPartOf,
    hasTemporalPart: HasTemporalPart,
    properTemporalPartOf: ProperTemporalPartOf,
    hasProperTemporalPart: HasProperTemporalPart,
    existsAt: ExistsAt,
    historyOf: HistoryOf,
    hasHistory: HasHistory,
  },
  action: {
    inheresIn: InheresIn,
    bearerOf: BearerOf,
    hasSpecificDependent: HasSpecificDependent,
    specificallyDependsOn: SpecificallyDependsOn,
    bearerOfAtAllTimes: BearerOfAtAllTimes,
    hasSpecificDependentAtAllTimes: HasSpecificDependentAtAllTimes,
    specificallyDependsOnAtAllTimes: SpecificallyDependsOnAtAllTimes,
    realizedIn: RealizedIn,
    realizes: Realizes,
    participatesIn: ParticipatesIn,
    hasParticipant: HasParticipant,
    participatesInAtAllTimes: ParticipatesInAtAllTimes,
    hasParticipantAtAllTimes: HasParticipantAtAllTimes,
    concretizedBy: ConcretizedBy,
    concretizes: Concretizes,
    concretizesAtAllTimes: ConcretizesAtAllTimes,
    concretizedByAtAllTimes: ConcretizedByAtAllTimes,
    genericallyDependsOn: GenericallyDependsOn,
    hasGenericDependent: HasGenericDependent,
    functionOf: FunctionOf,
    qualityOf: QualityOf,
    roleOf: RoleOf,
    dispositionOf: DispositionOf,
    hasFunction: HasFunction,
    hasQuality: HasQuality,
    hasRole: HasRole,
    hasDisposition: HasDisposition,
    hasQualityAtAllTimes: HasQualityAtAllTimes,
    hasFunctionAtAllTimes: HasFunctionAtAllTimes,
    hasRoleAtAllTimes: HasRoleAtAllTimes,
    hasDispositionAtAllTimes: HasDispositionAtAllTimes,
    hasMaterialBasis: HasMaterialBasis,
    materialBasisOf: MaterialBasisOf,
    materialBasisOfAtAllTimes: MaterialBasisOfAtAllTimes,
    locatedIn: LocatedIn,
    locatedInAtAllTimes: LocatedInAtAllTimes,
    hasLocation: HasLocation,
    hasLocationAtAllTimes: HasLocationAtAllTimes,
    occupiesSpatialRegion: OccupiesSpatialRegion,
    hasSpatialOccupant: HasSpatialOccupant,
    occupiesSpatiotemporalRegion: OccupiesSpatiotemporalRegion,
    hasSpatiotemporalOccupant: HasSpatiotemporalOccupant,
    projectsOntoSpatialRegion: ProjectsOntoSpatialRegion,
    spatialProjectionOfSpatiotemporal: SpatialProjectionOfSpatiotemporal,
    projectsOntoTemporalRegion: ProjectsOntoTemporalRegion,
    duringWhichExists: DuringWhichExists,
    temporalProjectionOfSpatiotemporal: TemporalProjectionOfSpatiotemporal,
    occupiesTemporalRegion: OccupiesTemporalRegion,
    hasTemporalOccupant: HasTemporalOccupant,
    hasProfile: HasProfile,
    processProfileOf: ProcessProfileOf,
    occursIn: OccursIn,
    containsProcess: ContainsProcess,
  },
} as const;

// =====================================================================
// Re-export raw upstream interfaces and concrete runtime classes for
// advanced consumers that need direct access. The curated facade above
// is the recommended consumption mode.
// =====================================================================

export type {
  // ── owl:Class interfaces (35) ──
  IEntity,
  IContinuant,
  IIndependentContinuant,
  IMaterialEntity,
  IImmaterialEntity,
  IGenericallyDependentContinuant,
  ISpecificallyDependentContinuant,
  IQuality,
  IRelationalQuality,
  IRealizableEntity,
  IRole,
  IDisposition,
  IFunction,
  IObject,
  IObjectAggregate,
  IFiatObjectPart,
  ISite,
  IContinuantFiatBoundary,
  IZeroDimensionalContinuantFiatBoundary,
  IOneDimensionalContinuantFiatBoundary,
  ITwoDimensionalContinuantFiatBoundary,
  ISpatialRegion,
  IZeroDimensionalSpatialRegion,
  IOneDimensionalSpatialRegion,
  ITwoDimensionalSpatialRegion,
  IThreeDimensionalSpatialRegion,
  IOccurrent,
  IProcess,
  IHistory,
  IProcessProfile,
  IProcessBoundary,
  ITemporalRegion,
  IZeroDimensionalTemporalRegion,
  IOneDimensionalTemporalRegion,
  ISpatiotemporalRegion,
  // ── owl:ObjectProperty interfaces (78 + 1 root marker = 79) ──
  IObjectProperty,
  IContinuantPartOf,
  IHasContinuantPart,
  IContinuantPartOfAtAllTimes,
  IPartOfContinuantAtAllTimesThatWholeExists,
  IHasContinuantPartAtAllTimes,
  IHasContinuantPartAtAllTimesThatPartExists,
  IProperContinuantPartOf,
  IHasProperContinuantPart,
  IProperContinuantPartOfAtAllTimes,
  IHasProperContinuantPartAtAllTimes,
  IMemberPartOf,
  IHasMemberPart,
  IMemberPartOfAtAllTimes,
  IHasMemberPartAtAllTimes,
  IOccurrentPartOf,
  IHasOccurrentPart,
  IProperOccurrentPartOf,
  IHasProperOccurrentPart,
  ITemporalPartOf,
  IHasTemporalPart,
  IProperTemporalPartOf,
  IHasProperTemporalPart,
  IExistsAt,
  IHistoryOf,
  IHasHistory,
  IInheresIn,
  IBearerOf,
  IHasSpecificDependent,
  ISpecificallyDependsOn,
  IBearerOfAtAllTimes,
  IHasSpecificDependentAtAllTimes,
  ISpecificallyDependsOnAtAllTimes,
  IRealizedIn,
  IRealizes,
  IParticipatesIn,
  IHasParticipant,
  IParticipatesInAtAllTimes,
  IHasParticipantAtAllTimes,
  IConcretizedBy,
  IConcretizes,
  IConcretizesAtAllTimes,
  IConcretizedByAtAllTimes,
  IGenericallyDependsOn,
  IHasGenericDependent,
  IFunctionOf,
  IQualityOf,
  IRoleOf,
  IDispositionOf,
  IHasFunction,
  IHasQuality,
  IHasRole,
  IHasDisposition,
  IHasQualityAtAllTimes,
  IHasFunctionAtAllTimes,
  IHasRoleAtAllTimes,
  IHasDispositionAtAllTimes,
  IHasMaterialBasis,
  IMaterialBasisOf,
  IMaterialBasisOfAtAllTimes,
  ILocatedIn,
  ILocatedInAtAllTimes,
  IHasLocation,
  IHasLocationAtAllTimes,
  IOccupiesSpatialRegion,
  IHasSpatialOccupant,
  IOccupiesSpatiotemporalRegion,
  IHasSpatiotemporalOccupant,
  IProjectsOntoSpatialRegion,
  ISpatialProjectionOfSpatiotemporal,
  IProjectsOntoTemporalRegion,
  IDuringWhichExists,
  ITemporalProjectionOfSpatiotemporal,
  IOccupiesTemporalRegion,
  IHasTemporalOccupant,
  IHasProfile,
  IProcessProfileOf,
  IOccursIn,
  IContainsProcess,
};

export {
  // ── Concrete runtime classes — owl:Class leaves ──
  MaterialEntity,
  GenericallyDependentContinuant,
  Quality,
  RelationalQuality,
  Role,
  Disposition,
  Function_,
  Object_,
  ObjectAggregate,
  FiatObjectPart,
  Site,
  ZeroDimensionalContinuantFiatBoundary,
  OneDimensionalContinuantFiatBoundary,
  TwoDimensionalContinuantFiatBoundary,
  ZeroDimensionalSpatialRegion,
  OneDimensionalSpatialRegion,
  TwoDimensionalSpatialRegion,
  ThreeDimensionalSpatialRegion,
  Process,
  History,
  ProcessProfile,
  ProcessBoundary,
  ZeroDimensionalTemporalRegion,
  OneDimensionalTemporalRegion,
  SpatiotemporalRegion,
  // ── Concrete runtime classes — owl:ObjectProperty leaves ──
  ContinuantPartOf,
  HasContinuantPart,
  ContinuantPartOfAtAllTimes,
  PartOfContinuantAtAllTimesThatWholeExists,
  HasContinuantPartAtAllTimes,
  HasContinuantPartAtAllTimesThatPartExists,
  ProperContinuantPartOf,
  HasProperContinuantPart,
  ProperContinuantPartOfAtAllTimes,
  HasProperContinuantPartAtAllTimes,
  MemberPartOf,
  HasMemberPart,
  MemberPartOfAtAllTimes,
  HasMemberPartAtAllTimes,
  OccurrentPartOf,
  HasOccurrentPart,
  ProperOccurrentPartOf,
  HasProperOccurrentPart,
  TemporalPartOf,
  HasTemporalPart,
  ProperTemporalPartOf,
  HasProperTemporalPart,
  ExistsAt,
  HistoryOf,
  HasHistory,
  InheresIn,
  BearerOf,
  HasSpecificDependent,
  SpecificallyDependsOn,
  BearerOfAtAllTimes,
  HasSpecificDependentAtAllTimes,
  SpecificallyDependsOnAtAllTimes,
  RealizedIn,
  Realizes,
  ParticipatesIn,
  HasParticipant,
  ParticipatesInAtAllTimes,
  HasParticipantAtAllTimes,
  ConcretizedBy,
  Concretizes,
  ConcretizesAtAllTimes,
  ConcretizedByAtAllTimes,
  GenericallyDependsOn,
  HasGenericDependent,
  FunctionOf,
  QualityOf,
  RoleOf,
  DispositionOf,
  HasFunction,
  HasQuality,
  HasRole,
  HasDisposition,
  HasQualityAtAllTimes,
  HasFunctionAtAllTimes,
  HasRoleAtAllTimes,
  HasDispositionAtAllTimes,
  HasMaterialBasis,
  MaterialBasisOf,
  MaterialBasisOfAtAllTimes,
  LocatedIn,
  LocatedInAtAllTimes,
  HasLocation,
  HasLocationAtAllTimes,
  OccupiesSpatialRegion,
  HasSpatialOccupant,
  OccupiesSpatiotemporalRegion,
  HasSpatiotemporalOccupant,
  ProjectsOntoSpatialRegion,
  SpatialProjectionOfSpatiotemporal,
  ProjectsOntoTemporalRegion,
  DuringWhichExists,
  TemporalProjectionOfSpatiotemporal,
  OccupiesTemporalRegion,
  HasTemporalOccupant,
  HasProfile,
  ProcessProfileOf,
  OccursIn,
  ContainsProcess,
};
