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
}
interface MalwareProperties {
    name: string;
    is_family: boolean;
    description?: string;
    aliases?: string[];
    kill_chain_phases?: {
        phase_name: string;
        kill_chain_name: string;
    }[];
}
declare class Malware extends StixObject {
    constructor(properties: MalwareProperties);
}
interface ThreatActorProperties {
    name: string;
    sophistication?: string;
    goals?: string[];
    resource_level?: string;
    primary_motivation?: string;
    secondary_motivations?: string[];
}
declare class ThreatActor extends StixObject {
    constructor(properties: ThreatActorProperties);
}
interface IndicatorProperties {
    pattern: string;
    pattern_type: string;
    valid_from: string;
    valid_until?: string;
    labels?: string[];
    description?: string;
}
declare class Indicator extends StixObject {
    constructor(properties: IndicatorProperties);
}
interface AttackPatternProperties {
    name: string;
    description?: string;
    kill_chain_phases?: {
        phase_name: string;
        kill_chain_name: string;
    }[];
}
declare class AttackPattern extends StixObject {
    constructor(properties: AttackPatternProperties);
}
interface RelationshipProperties {
    relationship_type: string;
    source_ref: string;
    target_ref: string;
    description?: string;
}
declare class Relationship extends StixObject {
    constructor(properties: RelationshipProperties);
}
export { StixObject, Malware, ThreatActor, Indicator, AttackPattern, Relationship, };
//# sourceMappingURL=index.d.ts.map