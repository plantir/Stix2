# README.md

## Installation and Usage

### Installing Dependencies

To install this project, ensure that `npm` is installed on your system. Then, install the project from the GitHub repository using the following command:

```sh
npm install git+https://github.com/plantir/Stix2.git
```


your package.json should be like this

```
 "dependencies": {
    ...
    "stix2": "git+https://github.com/plantir/Stix2.git",
    ...
  }
```

### Usage

After installation, you can use this module in your project. For example:

```javascript
import {Indicator} from 'stix2';

// Example of creating a STIX 2.0 object
const indicator = new Indicator({
    name: "Example Indicator",
    pattern: "[ipv4-addr:value = '192.168.1.1']",
    pattern_type: "stix"
});

console.log(indicator);
```

### Issues and Suggestions

If you encounter any issues while using the project or have suggestions for improvement, please open an issue in the GitHub repository.

### License

This project is released under the [MIT](LICENSE) license.




### Full Example
```
import { Malware,AttackPattern,IntrusionSet,Vulnerability,Indicator,ObservedData,ThreatActor,Sighting,Bundle } from 'stix2';
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
```