import { v4 as uuidv4 } from "uuid";
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
}
class Malware extends StixObject {
    constructor(properties) {
        super("malware", properties);
    }
}
class ThreatActor extends StixObject {
    constructor(properties) {
        super("threat-actor", properties);
    }
}
class Indicator extends StixObject {
    constructor(properties) {
        super("indicator", properties);
    }
}
class AttackPattern extends StixObject {
    constructor(properties) {
        super("attack-pattern", properties);
    }
}
class Relationship extends StixObject {
    constructor(properties) {
        super("relationship", properties);
    }
}
export { StixObject, Malware, ThreatActor, Indicator, AttackPattern, Relationship, };
let maleware = new Malware({
    is_family: true,
    name: "WannaCry",
    description: "A ransomware that encrypts files on a computer and demands payment to unlock them.",
});
let attackpattern = new AttackPattern({ name: "Spear Phishing" });
let relationship = new Relationship({
    relationship_type: "uses",
    source_ref: maleware.id,
    target_ref: attackpattern.id,
});
console.log(relationship);
