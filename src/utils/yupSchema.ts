import * as yup from "yup";
import { FormField } from "../types/FormSchema";

export const generateYupSchema = (fields: FormField[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    const { rules } = field;

    let validator: yup.StringSchema | yup.NumberSchema = 
      field.type === "input_number" 
        ? yup.number().typeError("Must be a number") 
        : yup.string();

    if (rules.required?.value) {
      validator = validator.required(rules.required.error_message);
    }

    if (rules.min?.value) {
      validator = field.type === "input_number"
        ? validator.min(rules.min.value as number, rules.min.error_message)
        : validator.min(rules.min.value as number, rules.min.error_message);
    }

    if (rules.max?.value) {
      validator = field.type === "input_number"
        ? validator.max(rules.max.value as number, rules.max.error_message)
        : validator.max(rules.max.value as number, rules.max.error_message);
    }

    if (rules.regex?.value && field.type !== "input_number") {
      validator = (validator as yup.StringSchema).matches(
        new RegExp(rules.regex.value as string),
        rules.regex.error_message
      );
    }

    shape[field.label] = validator;
  });

  return yup.object().shape(shape);
};
