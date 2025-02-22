import { v4 as uuidv4 } from "uuid";
import { validateStixObject } from "./validateStix.js";
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
        const validationResult = validateStixObject(this.toJSON(), type);
        if (validationResult.errors?.length) {
            throw validationResult.errors;
        }
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
        const { type, id, spec_version, created, modified, ...otherProperties } = this;
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
    constructor(properties) {
        super("malware", properties);
    }
}
export class AttackPattern extends StixObject {
    constructor(properties) {
        super("attack-pattern", properties);
    }
}
export class IntrusionSet extends StixObject {
    constructor(properties) {
        super("intrusion-set", properties);
    }
}
export class ThreatActor extends StixObject {
    constructor(properties) {
        super("threat-actor", properties);
    }
}
export class Sighting extends StixObject {
    constructor(properties) {
        super("sighting", properties);
    }
}
export class Vulnerability extends StixObject {
    constructor(properties) {
        super("vulnerability", properties);
    }
}
export class Indicator extends StixObject {
    constructor(properties) {
        super("indicator", properties);
    }
}
export class ObservedData extends StixObject {
    constructor(properties) {
        super("observed-data", properties);
    }
}
export class Relationship extends StixObject {
    constructor(properties) {
        super("relationship", properties);
    }
}
export class Campaign extends StixObject {
    constructor(properties) {
        super("campaign", properties);
    }
}
export class CourseOfAction extends StixObject {
    constructor(properties) {
        super("course-of-action", properties);
    }
}
export class Grouping extends StixObject {
    constructor(properties) {
        super("grouping", properties);
    }
}
export class Identity extends StixObject {
    constructor(properties) {
        super("identity", properties);
    }
}
export class Incident extends StixObject {
    constructor(properties) {
        super("incident", properties);
    }
}
export class Infrastructure extends StixObject {
    constructor(properties) {
        super("infrastructure", properties);
    }
}
export class Location extends StixObject {
    constructor(properties) {
        super("location", properties);
    }
}
export class MalwareAnalysis extends StixObject {
    constructor(properties) {
        super("malware-analysis", properties);
    }
}
export class Note extends StixObject {
    constructor(properties) {
        super("note", properties);
    }
}
export class Opinion extends StixObject {
    constructor(properties) {
        super("opinion", properties);
    }
}
export class Report extends StixObject {
    constructor(properties) {
        super("report", properties);
    }
}
export class Tool extends StixObject {
    constructor(properties) {
        super("tool", properties);
    }
}
export class Bundle {
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
