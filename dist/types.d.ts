export interface StixBaseProperties {
    type: string;
    id: string;
    spec_version: "2.1";
    created: string;
    modified: string;
}
export interface RelationshipProperties {
    relationship_type: string;
    source_ref: string;
    target_ref: string;
    description?: string;
}
export interface SightingProperties {
    sighting_of_ref: string;
    observed_data_refs?: string[];
    first_seen: string;
    last_seen: string;
    count?: number;
}
export interface MalwareProperties {
    name: string;
    is_family: boolean;
    description?: string;
    aliases?: string[];
    first_seen?: string;
    last_seen?: string;
    operating_system_refs?: string[];
    architecture_execution_envs?: string[];
    implementation_languages?: string[];
    capabilities?: string[];
    sample_refs?: string[];
    malware_types?: string[];
    kill_chain_phases?: {
        phase_name: string;
        kill_chain_name: string;
    }[];
}
export interface AttackPatternProperties {
    aliases?: string[];
    name: string;
    description?: string;
    kill_chain_phases?: {
        phase_name: string;
        kill_chain_name: string;
    }[];
}
export interface IntrusionSetProperties {
    name: string;
    description?: string;
    aliases?: string[];
    first_seen?: string;
    last_seen?: string;
    goals?: string[];
    resource_level?: string;
    primary_motivation?: string;
    secondary_motivations?: string[];
}
export interface ThreatActorProperties {
    threat_actor_types?: string[];
    name: string;
    description?: string;
    aliases?: string[];
    roles?: string[];
    goals?: string[];
    first_seen?: string;
    last_seen?: string;
    sophistication?: string;
    resource_level?: string;
    primary_motivation?: string;
    secondary_motivations?: string[];
    personal_motivations?: string[];
}
export interface VulnerabilityProperties {
    name: string;
    description?: string;
}
export interface IndicatorProperties {
    indicator_types?: string[];
    name?: string;
    description?: string;
    pattern: string;
    pattern_type: string;
    pattern_version?: string;
    valid_from: string;
    valid_until?: string;
    kill_chain_phases?: {
        phase_name: string;
        kill_chain_name: string;
    }[];
}
export interface ObservedDataProperties {
    first_observed: string;
    last_observed: string;
    number_observed: number;
    objects: object[];
}
export interface CampaignProperties {
    name: string;
    description?: string;
    aliases?: string[];
    first_seen?: string;
    last_seen?: string;
    objective?: string;
}
export interface CourseOfActionProperties {
    name: string;
    description?: string;
}
export interface GroupingProperties {
    name?: string;
    description?: string;
    context: string;
    object_refs: string[];
}
export interface IdentityProperties {
    roles?: string[];
    name: string;
    description?: string;
    identity_class?: "individual" | "group" | "system" | "organization" | "class" | "unknown";
    sectors?: ("agriculture" | "aerospace" | "automotive" | "chemical" | "commercial" | "communications" | "construction" | "defense" | "education" | "energy" | "engineering" | "entertainment" | "financial-services" | "government" | "emergency-services" | "government-local" | "government-national" | "government-public-services" | "government-regional" | "healthcare" | "hospitality-leisure" | "infrastructure" | "dams" | "nuclear" | "water" | "insurance" | "manufacturing" | "mining" | "non-profit" | "pharmaceuticals" | "retail" | "technology" | "telecommunications" | "transportation" | "utilities")[];
    contact_information?: string;
}
export interface IncidentProperties {
    name: string;
    description?: string;
}
export interface InfrastructureProperties {
    name: string;
    description?: string;
    infrastructure_types?: ("amplification" | "anonymization" | "botnet" | "command-and-control" | "exfiltration" | "hosting-malware" | "hosting-target-lists" | "phishing" | "reconnaissance" | "staging" | "unknown")[];
    aliases?: string[];
    kill_chain_phases?: {
        kill_chain_name: string;
        phase_name: string;
    }[];
    first_seen?: string;
    last_seen?: string;
}
export interface LocationProperties {
    description?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
    precision?: number;
    region?: string;
    country?: string;
    administrative_area?: string;
    city?: string;
    street_address?: string;
    postal_code?: string;
}
export interface MalwareAnalysisProperties {
    created_by_ref: string;
    created?: string;
    modified?: string;
    version: string;
    submitted: string;
    analysis_started: string;
    analysis_ended: string;
    result: string;
    product?: string;
    configuration_version?: string;
    modules?: string[];
    analysis_engine_version?: string;
    analysis_definition_version?: string;
    submitted_by_ref?: string;
}
export interface NoteProperties {
    abstract?: string;
    content: string;
    authors?: string[];
    object_refs: string[];
}
export interface OpinionProperties {
    explanation?: string;
    authors?: string[];
    object_refs: string[];
    opinion: "strongly-disagree" | "disagree" | "neutral" | "agree" | "strongly-agree";
}
export interface ReportProperties {
    report_types?: ("threat-report" | "attack-pattern" | "campaign" | "identity" | "indicator" | "malware" | "observed-data" | "threat-actor" | "tool" | "vulnerability")[];
    name: string;
    description?: string;
    published: string;
    object_refs: string[];
}
export interface ToolProperties {
    aliases?: string[];
    tool_types?: ("denial-of-service" | "exploitation" | "information-gathering" | "network-capture" | "credential-exploitation" | "remote-access" | "vulnerability-scanning" | "unknown")[];
    name: string;
    description?: string;
    tool_version?: string;
    kill_chain_phases?: {
        kill_chain_name: string;
        phase_name: string;
    }[];
}
//# sourceMappingURL=types.d.ts.map