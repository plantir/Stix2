import Ajv from "ajv";
import addFormats from "ajv-formats";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stixSchema = require("./stix-schema.json");
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
export function validateStixObject(stixObject, schemaKey) {
    const definitions = stixSchema.definitions;
    const schema = definitions[schemaKey];
    if (!schema) {
        return {
            errors: [{ message: `Schema for ${schemaKey} not found.` }],
        };
    }
    const validate = ajv.compile(schema);
    const valid = validate(stixObject);
    if (valid) {
        return { errors: [] };
    }
    else {
        const formattedErrors = validate.errors?.map(error => ({
            ...error,
            message: `[${schemaKey}] ${error.message}`,
        }));
        return { errors: formattedErrors };
    }
}
