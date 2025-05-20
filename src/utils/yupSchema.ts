import * as yup from "yup";
import { FormField } from "../types/FormSchema";

export const buildYupSchema = (fields: FormField[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let validator: yup.StringSchema | yup.NumberSchema;

    const isNumber = field.type === "input_number";
    const isText = field.type === "input" || field.type === "textarea";

    // התחלה עם טיפוס בסיסי
    if (isNumber) {
      validator = yup
        .number()
        .typeError("This field must be a number");
    } else {
      validator = yup.string();
    }

    const { required, min, max, regex } = field.rules;

    // Required
    if (required?.value) {
      validator = validator.required(required.error_message);
    }

    // Min
    if (min?.value !== undefined && typeof min.value === "number") {
      const msg = min.error_message.replace("{{value}}", String(min.value));
      validator = isNumber
        ? (validator as yup.NumberSchema).min(min.value, msg)
        : (validator as yup.StringSchema).min(min.value, msg);
    }

    // Max
    if (max?.value !== undefined && typeof max.value === "number") {
      const msg = max.error_message.replace("{{value}}", String(max.value));
      validator = isNumber
        ? (validator as yup.NumberSchema).max(max.value, msg)
        : (validator as yup.StringSchema).max(max.value, msg);
    }

    // Regex - רק בטקסט
    if (regex?.value && typeof regex.value === "string" && isText) {
      validator = (validator as yup.StringSchema).matches(
        new RegExp(regex.value),
        regex.error_message
      );
    }

    shape[field.label] = validator;
  });

  return yup.object().shape(shape);
};
