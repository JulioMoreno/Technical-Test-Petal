const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, removeAdditional: "all" });

function errorResponse(schemaErrors) {
  const errors = schemaErrors.map((error) => {
    return {
      path:
        error.instancePath != ""
          ? error.instancePath
          : error.params.missingProperty,
      message: error.message,
    };
  });
  return {
    status: "failed",
    errors,
  };
}

exports.validateSchema = (request, schema) => {
  ajv.removeSchema(schema);
  ajv.addSchema(schema);
  const validate = ajv.compile(schema);
  const valid = validate(request);
  if (!valid) {
    return errorResponse(validate.errors);
  }
  return true;
};
