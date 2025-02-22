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
    constructor(properties: StixObjectProperties);
}
export declare class AttackPattern extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class IntrusionSet extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class ThreatActor extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Sighting extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Vulnerability extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Indicator extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class ObservedData extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Relationship extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Campaign extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class CourseOfAction extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Grouping extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Identity extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Incident extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Infrastructure extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Location extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class MalwareAnalysis extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Note extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Opinion extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Report extends StixObject {
    constructor(properties: StixObjectProperties);
}
export declare class Tool extends StixObject {
    constructor(properties: StixObjectProperties);
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