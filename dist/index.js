import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
class StixObject {
  type;
  id;
  spec_version = "2.1";
  created;
  modified;
  constructor(type, properties) {
    this.type = type;
    this.id = `${type}--${uuidv4()}`;
    this.created = new Date().toISOString();
    this.modified = this.created;
    Object.assign(this, properties);
  }
  createRelationship(type, target, description) {
    return new Relationship({
      relationship_type: type,
      source_ref: this.id,
      target_ref: target.id,
      description,
    });
  }
  toJSON() {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  constructor(properties) {
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
  type = "bundle";
  id = `bundle--${uuidv4()}`;
  spec_version = "2.1";
  objects = [];
  constructor(objects) {
    this.addObjects(objects);
  }
  addObjects(objects) {
    objects.forEach((obj) => {
      if (obj instanceof StixObject) {
        this.objects.push(obj);
      } else {
        throw new Error("Invalid STIX object provided.");
      }
    });
  }
  findObjectById(id) {
    return this.objects.find((obj) => obj.id === id);
  }
  filterByType(type) {
    return this.objects.filter((obj) => obj.type === type);
  }
  toJSON() {
    return {
      type: this.type,
      id: this.id,
      spec_version: this.spec_version,
      objects: this.objects.map((obj) => obj.toJSON()),
    };
  }
}
