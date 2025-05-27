import PasswordValidator from "password-validator";

// Create a schema
const passwordSchema = new PasswordValidator();

// Add validation rules
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(12) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .not()
  .spaces() // Should not have spaces
  .has()
  .symbols() // At least 1 special symbol
  .is()
  .not()
  .oneOf(["1234", "Password123"]); // Blacklist these values

export default passwordSchema;
