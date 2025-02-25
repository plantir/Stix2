import { AttackPatternProperties, CampaignProperties, CourseOfActionProperties, GroupingProperties, IdentityProperties, IncidentProperties, IndicatorProperties, InfrastructureProperties, IntrusionSetProperties, LocationProperties, MalwareAnalysisProperties, MalwareProperties, NoteProperties, ObservedDataProperties, OpinionProperties, RelationshipProperties, ReportProperties, SightingProperties, ThreatActorProperties, ToolProperties, VulnerabilityProperties } from "./types.js";
interface StixObjectProperties {
    [key: string]: any;
}
declare class StixObject {
    type: string;
    id: string;
    spec_version: string;
    created: string;
    modified: string;
    constructor(type: string, properties: StixObjectProperties);
    createRelationship(type: string, target: StixObject, description?: string): Relationship;
    toJSON(): any;
}
export declare class Malware extends StixObject {
    constructor(properties: MalwareProperties);
}
export declare class AttackPattern extends StixObject {
    constructor(properties: AttackPatternProperties);
}
export declare class IntrusionSet extends StixObject {
    constructor(properties: IntrusionSetProperties);
}
export declare class ThreatActor extends StixObject {
    constructor(properties: ThreatActorProperties);
}
export declare class Sighting extends StixObject {
    constructor(properties: SightingProperties);
}
export declare class Vulnerability extends StixObject {
    constructor(properties: VulnerabilityProperties);
}
export declare class Indicator extends StixObject {
    constructor(properties: IndicatorProperties);
}
export declare class ObservedData extends StixObject {
    constructor(properties: ObservedDataProperties);
}
export declare class Relationship extends StixObject {
    constructor(properties: RelationshipProperties);
}
export declare class Campaign extends StixObject {
    constructor(properties: CampaignProperties);
}
export declare class CourseOfAction extends StixObject {
    constructor(properties: CourseOfActionProperties);
}
export declare class Grouping extends StixObject {
    constructor(properties: GroupingProperties);
}
export declare class Identity extends StixObject {
    constructor(properties: IdentityProperties);
}
export declare class Incident extends StixObject {
    constructor(properties: IncidentProperties);
}
export declare class Infrastructure extends StixObject {
    constructor(properties: InfrastructureProperties);
}
export declare class Location extends StixObject {
    constructor(properties: LocationProperties);
}
export declare class MalwareAnalysis extends StixObject {
    constructor(properties: MalwareAnalysisProperties);
}
export declare class Note extends StixObject {
    constructor(properties: NoteProperties);
}
export declare class Opinion extends StixObject {
    constructor(properties: OpinionProperties);
}
export declare class Report extends StixObject {
    constructor(properties: ReportProperties);
}
export declare class Tool extends StixObject {
    constructor(properties: ToolProperties);
}
export declare class Bundle {
    type: string;
    id: string;
    spec_version: string;
    objects: StixObject[];
    constructor(objects: StixObject[]);
    addObjects(objects: StixObject[]): void;
    findObjectById(id: string): StixObject | undefined;
    filterByType(type: string): StixObject[];
    toJSON(): any;
}
export {};
//# sourceMappingURL=index.d.ts.map