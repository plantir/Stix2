import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import stixSchema from './stix-schema.json' assert { type: 'json' };

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

type SchemaDefinitions = Record<string, any>;

export function validateStixObject(
  stixObject: any,
  schemaKey: keyof SchemaDefinitions
): { errors?: ErrorObject[] } {
  const definitions = stixSchema.definitions as SchemaDefinitions;

  const schema = definitions[schemaKey];

  if (!schema) {
    return {
      errors: [{ message: `Schema for ${schemaKey} not found.` }] as ErrorObject[],
    };
  }

  const validate = ajv.compile(schema);
  const valid = validate(stixObject);

  return {
    errors: valid ? [] : (validate.errors as ErrorObject[]),
  };
}
