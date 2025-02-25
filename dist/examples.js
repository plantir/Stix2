import { IntrusionSet, Vulnerability, Indicator, ObservedData, Malware, AttackPattern, Bundle, ThreatActor, Sighting, Campaign, CourseOfAction, Grouping, Incident, Location, MalwareAnalysis, Note, Opinion, Report, Tool, Identity, Infrastructure } from './index.js';
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
});
let indicator = new Indicator({
    pattern: "[file:hashes.'SHA-256' = 'c3d1af78c8fa1bd0a2768b9294b3d60b8d3b800fda2fbfe531f0c2e3f1c15e33']",
    pattern_type: "stix",
    valid_from: "2025-02-18T00:00:00Z",
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
let campaign = new Campaign({
    name: "Campaign #1",
    description: "A series of attacks targeting critical infrastructure.",
    first_seen: "2025-02-01T00:00:00Z",
    last_seen: "2025-02-20T00:00:00Z",
    objective: "Disrupt energy systems",
});
let courseOfAction = new CourseOfAction({
    name: "Mitigation #1",
    description: "Deploy additional security measures to protect against the attack pattern.",
});
let grouping = new Grouping({
    name: "Malware Grouping",
    description: "Group of malware samples that share common traits.",
    object_refs: [malware.id, attackPattern.id],
    context: "This grouping contains malware samples and attack patterns that are related to spear phishing attacks and ransomware distribution.", // Adding context
});
let incident = new Incident({
    name: "Ransomware Attack",
    description: "Ransomware attack impacting several organizations globally.",
});
let location = new Location({
    name: "Russia",
    description: "Country associated with several threat actors.",
    latitude: 55.7558,
    longitude: 37.6176,
    country: "Russia",
});
let identity = new Identity({
    name: "ACME, Inc.",
    description: "A global software company.",
    identity_class: "organization",
    roles: ["technology", "software development"],
    sectors: ["technology", "agriculture"],
    contact_information: "contact@acme.com",
});
let malwareAnalysis = new MalwareAnalysis({
    analysis_started: "2025-02-18T00:00:00Z",
    analysis_ended: "2025-02-20T00:00:00Z",
    result: "malicious",
    version: "2.1",
    submitted: "2025-02-18T00:00:00Z",
    created_by_ref: identity.id,
});
let note = new Note({
    content: "This is a note explaining the context of the threat actor APT28.",
    object_refs: [threatActor.id],
    authors: ["Analyst1", "Analyst2"],
});
let opinion = new Opinion({
    explanation: "The threat actor APT28 is highly skilled in espionage activities.",
    authors: ["Analyst1"],
    object_refs: [threatActor.id],
    opinion: "strongly-agree",
});
let report = new Report({
    name: "Threat Actor Activity Report",
    description: "Detailed report on the activities of APT28.",
    published: "2025-02-20T00:00:00Z",
    report_types: ["threat-report"],
    object_refs: [threatActor.id, observedData.id],
});
let tool = new Tool({
    name: "Tool #1",
    description: "A tool used to exploit CVE vulnerabilities.",
    tool_types: ["exploitation"],
    kill_chain_phases: [
        { phase_name: "exploitation", kill_chain_name: "cyber-attack" },
    ],
});
let infrastructure = new Infrastructure({
    name: "C2 Server",
    description: "Command and Control server used by threat actors for remote access.",
    infrastructure_types: ["command-and-control"],
    aliases: ["C2 Server 1", "Malicious Server A"],
    kill_chain_phases: [
        { phase_name: "delivery", kill_chain_name: "cyber-attack" },
        { phase_name: "exploitation", kill_chain_name: "cyber-attack" },
    ],
    first_seen: "2025-02-10T00:00:00Z",
    last_seen: "2025-02-18T00:00:00Z",
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
    campaign,
    courseOfAction,
    grouping,
    incident,
    location,
    malwareAnalysis,
    note,
    opinion,
    report,
    tool,
    identity,
    infrastructure
]);
console.log(bundle.toJSON());
