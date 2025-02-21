import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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

  createRelationship(type: string, target: StixObject, description?: string) {
    return new Relationship({
      relationship_type: type,
      source_ref: this.id,
      target_ref: target.id,
      description,
    });
  }

  toJSON(): any {
    const { type, id, spec_version, created, modified, ...otherProperties } =
      this;
    return {
      type,
      id,
      spec_version,
      created,
      modified,
      ...otherProperties,
    };
  }
}

class Malware extends StixObject {
  constructor(properties: StixObjectProperties) {
    const malwareSchema = z.object({
      name: z.string(),
      is_family: z.boolean(),
      description: z.string().optional(),
      aliases: z.array(z.string()).optional(),
      kill_chain_phases: z
        .array(
          z.object({ phase_name: z.string(), kill_chain_name: z.string() })
        )
        .optional(),
    });
    malwareSchema.parse(properties);
    super("malware", properties);
  }
}

class AttackPattern extends StixObject {
  constructor(properties: StixObjectProperties) {
    const attackPatternSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      kill_chain_phases: z
        .array(
          z.object({
            phase_name: z.string(),
            kill_chain_name: z.string(),
          })
        )
        .optional(),
    });

    attackPatternSchema.parse(properties);
    super("attack-pattern", properties);
  }
}

class IntrusionSet extends StixObject {
  constructor(properties: StixObjectProperties) {
    const intrusionSetSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      aliases: z.array(z.string()).optional(),
      goals: z.array(z.string()).optional(),
    });

    intrusionSetSchema.parse(properties);
    super("intrusion-set", properties);
  }
}

class ThreatActor extends StixObject {
  constructor(properties: StixObjectProperties) {
    const threatActorSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      aliases: z.array(z.string()).optional(),
      roles: z.array(z.string()).optional(),
      sophistication: z.string().optional(),
      resource_level: z.string().optional(),
      primary_motivation: z.string().optional(),
      secondary_motivations: z.array(z.string()).optional(),
    });

    threatActorSchema.parse(properties);
    super("threat-actor", properties);
  }
}

class Sighting extends StixObject {
  constructor(properties: StixObjectProperties) {
    const sightingSchema = z.object({
      sighting_of_ref: z.string(),
      observed_data_refs: z.array(z.string()).optional(),
      first_seen: z.string(),
      last_seen: z.string(),
      count: z.number().optional(),
    });

    sightingSchema.parse(properties);
    super("sighting", properties);
  }
}

class Vulnerability extends StixObject {
  constructor(properties: StixObjectProperties) {
    const vulnerabilitySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      cvss_score: z.number().optional(),
      source: z.string().optional(),
    });
    vulnerabilitySchema.parse(properties);
    super("vulnerability", properties);
  }
}

class Indicator extends StixObject {
  constructor(properties: StixObjectProperties) {
    const indicatorSchema = z.object({
      pattern: z.string(),
      pattern_type: z.string(),
      valid_from: z.string(),
      valid_until: z.string().optional(),
      labels: z.array(z.string()).optional(),
      description: z.string().optional(),
    });
    indicatorSchema.parse(properties);
    super("indicator", properties);
  }
}

class ObservedData extends StixObject {
  constructor(properties: StixObjectProperties) {
    const observedDataSchema = z.object({
      first_observed: z.string(),
      last_observed: z.string(),
      number_observed: z.number(),
      objects: z.array(z.record(z.string(), z.unknown())),
    });
    observedDataSchema.parse(properties);
    super("observed-data", properties);
  }
}

class Relationship extends StixObject {
  constructor(properties: StixObjectProperties) {
    const relationshipSchema = z.object({
      relationship_type: z.string(),
      source_ref: z.string(),
      target_ref: z.string(),
      description: z.string().optional(),
    });

    relationshipSchema.parse(properties);
    super("relationship", properties);
  }
}

class Bundle {
  type: string = "bundle";
  id: string = `bundle--${uuidv4()}`;
  spec_version: string = "2.1";
  objects: StixObject[] = [];

  constructor(objects: StixObject[]) {
    this.addObjects(objects);
  }

  addObjects(objects: StixObject[]): void {
    objects.forEach((obj) => {
      if (obj instanceof StixObject) {
        this.objects.push(obj);
      } else {
        throw new Error("Invalid STIX object provided.");
      }
    });
  }

  findObjectById(id: string): StixObject | undefined {
    return this.objects.find((obj) => obj.id === id);
  }

  filterByType(type: string): StixObject[] {
    return this.objects.filter((obj) => obj.type === type);
  }

  toJSON(): any {
    return {
      type: this.type,
      id: this.id,
      spec_version: this.spec_version,
      objects: this.objects.map((obj) => obj.toJSON()),
    };
  }
}

//examples-------------------------------------------------

let malware = new Malware({
  name: "WannaCry",
  is_family: true,
  description: "A ransomware that encrypts files and demands payment.",
});
const attackPattern = new AttackPattern({
  name: "Spear Phishing",
  description:
    "An attack method that uses deceptive emails to gain unauthorized access.",
  kill_chain_phases: [
    { phase_name: "delivery", kill_chain_name: "cyber-attack" },
    { phase_name: "exploitation", kill_chain_name: "cyber-attack" },
  ],
});
let relationship = malware.createRelationship("uses", attackPattern);
let intrusionSet = new IntrusionSet({
  name: "APT28",
  description: "A Russian cyber espionage group.",
  aliases: ["Fancy Bear", "Sofacy"],
  goals: ["Intelligence gathering", "Disrupt Western targets"],
});

let vulnerability = new Vulnerability({
  name: "CVE-2021-12345",
  description: "Remote code execution vulnerability in XYZ software.",
  cvss_score: 9.8,
  source: "https://cve.mitre.org",
});

let indicator = new Indicator({
  pattern:
    "[file:hashes.'SHA-256' = 'c3d1af78c8fa1bd0a2768b9294b3d60b8d3b800fda2fbfe531f0c2e3f1c15e33']",
  pattern_type: "stix",
  valid_from: "2025-02-18T00:00:00Z",
  labels: ["malicious", "file"],
  description: "Indicator for a specific malware hash.",
});

let observedData = new ObservedData({
  first_observed: "2025-02-18T00:00:00Z",
  last_observed: "2025-02-18T00:00:00Z",
  number_observed: 3,
  objects: [
    { file: { name: "malware.exe", size: 1024 } },
    { ip: { address: "192.168.1.1" } },
  ],
});

let threatActor = new ThreatActor({
  name: "APT28",
  description: "A cyber espionage group associated with Russian government",
  aliases: ["Fancy Bear", "Sofacy"],
  roles: ["espionage", "cyberwarfare"],
  sophistication: "high",
  resource_level: "high",
  primary_motivation: "political",
});

let sighting = new Sighting({
  sighting_of_ref: threatActor.id,
  first_seen: "2025-02-01T00:00:00Z",
  last_seen: "2025-02-10T00:00:00Z",
  count: 5,
});

let bundle = new Bundle([
  intrusionSet,
  vulnerability,
  indicator,
  observedData,
  malware,
  attackPattern,
  relationship,
  threatActor,
  sighting,
]);

console.log(bundle.toJSON());
