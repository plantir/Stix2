import { v4 as uuidv4 } from "uuid";

interface StixObjectProperties {
  [key: string]: any;
}

class StixObject {
  type: string;
  id: string;
  spec_version: string = "2.1";
  created: string;
  modified: string;

  constructor(type: string, properties: StixObjectProperties) {
    this.type = type;
    this.id = `${type}--${uuidv4()}`;
    this.created = new Date().toISOString();
    this.modified = this.created;
    Object.assign(this, properties);
  }
}

interface MalwareProperties {
  name: string;
  is_family: boolean;
  description?: string;
  aliases?: string[];
  kill_chain_phases?: { phase_name: string; kill_chain_name: string }[];
}

class Malware extends StixObject {
  constructor(properties: MalwareProperties) {
    super("malware", properties);
  }
}

interface ThreatActorProperties {
  name: string;
  sophistication?: string;
  goals?: string[];
  resource_level?: string;
  primary_motivation?: string;
  secondary_motivations?: string[];
}

class ThreatActor extends StixObject {
  constructor(properties: ThreatActorProperties) {
    super("threat-actor", properties);
  }
}

interface IndicatorProperties {
  pattern: string;
  pattern_type: string;
  valid_from: string;
  valid_until?: string;
  labels?: string[];
  description?: string;
}

class Indicator extends StixObject {
  constructor(properties: IndicatorProperties) {
    super("indicator", properties);
  }
}

interface AttackPatternProperties {
  name: string;
  description?: string;
  kill_chain_phases?: { phase_name: string; kill_chain_name: string }[];
}

class AttackPattern extends StixObject {
  constructor(properties: AttackPatternProperties) {
    super("attack-pattern", properties);
  }
}

interface RelationshipProperties {
  relationship_type: string;
  source_ref: string;
  target_ref: string;
  description?: string;
}

class Relationship extends StixObject {
  constructor(properties: RelationshipProperties) {
    super("relationship", properties);
  }
}

export {
  StixObject,
  Malware,
  ThreatActor,
  Indicator,
  AttackPattern,
  Relationship,
};
let maleware = new Malware({
  is_family: true,
  name: "WannaCry",
  description:
    "A ransomware that encrypts files on a computer and demands payment to unlock them.",
});
let attackpattern = new AttackPattern({ name: "Spear Phishing" });
let relationship = new Relationship({
  relationship_type: "uses",
  source_ref: maleware.id,
  target_ref: attackpattern.id,
});

console.log(relationship);
