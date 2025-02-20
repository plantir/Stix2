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
class Malware extends StixObject {
    constructor(properties) {
        super("malware", properties);
    }
}
class AttackPattern extends StixObject {
    constructor(properties) {
        super("attack-pattern", properties);
    }
}
class IntrusionSet extends StixObject {
    constructor(properties) {
        super("intrusion-set", properties);
    }
}
class ThreatActor extends StixObject {
    constructor(properties) {
        super("threat-actor", properties);
    }
}
class Sighting extends StixObject {
    constructor(properties) {
        super("sighting", properties);
    }
}
class Vulnerability extends StixObject {
    constructor(properties) {
        super("vulnerability", properties);
    }
}
class Indicator extends StixObject {
    constructor(properties) {
        super("indicator", properties);
    }
}
class ObservedData extends StixObject {
    constructor(properties) {
        super("observed-data", properties);
    }
}
class Relationship extends StixObject {
    constructor(properties) {
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
//examples-------------------------------------------------
let malware = new Malware({
    name: "WannaCry",
    is_family: true,
    description: "A ransomware that encrypts files and demands payment.",
});
const attackPattern = new AttackPattern({
    name: "Spear Phishing",
    description: "An attack method that uses deceptive emails to gain unauthorized access.",
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
    pattern: "[file:hashes.'SHA-256' = 'c3d1af78c8fa1bd0a2768b9294b3d60b8d3b800fda2fbfe531f0c2e3f1c15e33']",
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
    name: "actor",
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
