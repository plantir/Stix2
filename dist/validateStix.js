import Ajv from "ajv";
import addFormats from "ajv-formats";
import stixSchema from './stix-schema.json' assert { type: 'json' };
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
    return {
        errors: valid ? [] : validate.errors,
    };
}
