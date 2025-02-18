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
const indicator = new Stix2.Indicator({
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

