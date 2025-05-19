import * as yup from "yup";
import { FormField } from "../types/FormSchema";

export const generateYupSchema = (fields: FormField[]) => {
  const shape: { [key: string]: any } = {};

  fields.forEach((field) => {
    const { rules } = field;
    const { required, min, max, regex } = rules;

    let validator;

    const isText = field.type === "input" || field.type === "textarea";
    const isNumber = field.type === "input_number";
    const isSelect = field.type === "select";

    // עבור טקסט
    if (isText) {
      validator = yup.string();

      if (required?.value) {
        validator = validator.required(required.error_message);
      }
      if (min?.value) {
        validator = validator.min(min.value as number, min.error_message);
      }
      if (max?.value) {
        validator = validator.max(max.value as number, max.error_message);
      }
      if (regex?.value && typeof regex.value === "string") {
        validator = validator.matches(new RegExp(regex.value), regex.error_message);
      }
    }

    // עבור מספר
    else if (isNumber) {
      validator = yup
        .number()
        .typeError("Must be a number");

      if (required?.value) {
        validator = validator.required(required.error_message);
      }
      if (min?.value) {
        validator = validator.min(min.value as number, min.error_message);
      }
      if (max?.value) {
        validator = validator.max(max.value as number, max.error_message);
      }
    }

    // עבור select
    else if (isSelect) {
      validator = yup.string();

      if (required?.value) {
        validator = validator.required(required.error_message);
      }
    }

    // שיוך לשם השדה
    shape[field.label] = validator;
  });

  return yup.object().shape(shape);
};
