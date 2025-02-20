import { ErrorObject } from "ajv";
type SchemaDefinitions = Record<string, any>;
export declare function validateStixObject(stixObject: any, schemaKey: keyof SchemaDefinitions): {
    errors?: ErrorObject[];
};
export {};
//# sourceMappingURL=validateStix.d.ts.map