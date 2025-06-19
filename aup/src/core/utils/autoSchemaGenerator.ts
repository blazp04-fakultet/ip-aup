// core/utils/autoSchemaGenerator.ts
import * as TJS from 'typescript-json-schema';
import * as path from 'path';

export const generateSchemasFromTypes = () => {
  const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true,
  };

  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
  };

  // Get all model files
  const modelFiles = [
    path.join(__dirname, '../models/user.ts'),
    path.join(__dirname, '../models/dto/userDto.ts'),
  ];

  const program = TJS.getProgramFromFiles(modelFiles, compilerOptions);

  // Fix: Properly type the schemas object
  const schemas: Record<string, any> = {};
  const typeNames = ['User', 'CreateUserDto', 'UpdateUserDto'];

  typeNames.forEach((typeName) => {
    const schema = TJS.generateSchema(program, typeName, settings);
    if (schema) {
      schemas[typeName] = schema;
    }
  });

  return schemas;
};
