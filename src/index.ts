import { v4 as uuidv4 } from "uuid";
import { validateStixObject } from "./validateStix.js";
import {AttackPatternProperties, CampaignProperties, CourseOfActionProperties, GroupingProperties, IdentityProperties, IncidentProperties, IndicatorProperties, InfrastructureProperties, IntrusionSetProperties, LocationProperties, MalwareAnalysisProperties, MalwareProperties, NoteProperties, ObservedDataProperties, OpinionProperties, RelationshipProperties, ReportProperties, SightingProperties, ThreatActorProperties, ToolProperties, VulnerabilityProperties} from "./types.js"
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

    const validationResult = validateStixObject(this.toJSON(), type);

    if (validationResult.errors?.length) {
      throw validationResult.errors;
    }
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

export class Malware extends StixObject {
  constructor(properties: MalwareProperties) {
    super("malware", properties);
  }
}

export class AttackPattern extends StixObject {
  constructor(properties: AttackPatternProperties) {
    super("attack-pattern", properties);
  }
}

export class IntrusionSet extends StixObject {
  constructor(properties: IntrusionSetProperties) {
    super("intrusion-set", properties);
  }
}

export class ThreatActor extends StixObject {
  constructor(properties: ThreatActorProperties) {
    super("threat-actor", properties);
  }
}

export class Sighting extends StixObject {
  constructor(properties: SightingProperties) {
    super("sighting", properties);
  }
}

export class Vulnerability extends StixObject {
  constructor(properties: VulnerabilityProperties) {
    super("vulnerability", properties);
  }
}

export class Indicator extends StixObject {
  constructor(properties: IndicatorProperties) {
    super("indicator", properties);
  }
}

export class ObservedData extends StixObject {
  constructor(properties: ObservedDataProperties) {
    super("observed-data", properties);
  }
}

export class Relationship extends StixObject {
  constructor(properties: RelationshipProperties) {
    super("relationship", properties);
  }
}

export class Campaign extends StixObject {
  constructor(properties: CampaignProperties) {
    super("campaign", properties);
  }
}

export class CourseOfAction extends StixObject {
  constructor(properties: CourseOfActionProperties) {
    super("course-of-action", properties);
  }
}

export class Grouping extends StixObject {
  constructor(properties: GroupingProperties) {
    super("grouping", properties);
  }
}

export class Identity extends StixObject {
  constructor(properties: IdentityProperties) {
    super("identity", properties);
  }
}

export class Incident extends StixObject {
  constructor(properties: IncidentProperties) {
    super("incident", properties);
  }
}

export class Infrastructure extends StixObject {
  constructor(properties: InfrastructureProperties) {
    super("infrastructure", properties);
  }
}

export class Location extends StixObject {
  constructor(properties: LocationProperties) {
    super("location", properties);
  }
}

export class MalwareAnalysis extends StixObject {
  constructor(properties: MalwareAnalysisProperties) {
    super("malware-analysis", properties);
  }
}

export class Note extends StixObject {
  constructor(properties: NoteProperties) {
    super("note", properties);
  }
}

export class Opinion extends StixObject {
  constructor(properties: OpinionProperties) {
    super("opinion", properties);
  }
}

export class Report extends StixObject {
  constructor(properties: ReportProperties) {
    super("report", properties);
  }
}

export class Tool extends StixObject {
  constructor(properties: ToolProperties) {
    super("tool", properties);
  }
}


export class Bundle {
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