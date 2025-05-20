import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormField } from "../../types/FormSchema";

interface Props {
  field: FormField;
  control: any;
  error?: any;
}

const FormFieldComponent: React.FC<Props> = ({ field, control, error }) => {
  const isNumber = field.type === "input_number";
  const isTextArea = field.type === "textarea";

  return (
    <Controller
      name={field.label}
      control={control}
      defaultValue=""
      render={({ field: controllerField }) => {
        let validator = controllerField.value;

      
        // if (field.rules.regex?.value && typeof field.rules.regex.value === "string") {
        //   validator = validator.matches(
        //     new RegExp(field.rules.regex.value),
        //     field.rules.regex.error_message
        //   );
        // }

        switch (field.type) {
          case "input":
          case "input_number":
          case "textarea":
            return (
              <TextField
                {...controllerField}
                label={field.label}
                fullWidth
                margin="normal"
                type={isNumber ? "number" : "text"}
                multiline={isTextArea}
                rows={isTextArea ? 4 : 1}
                error={!!error}
                helperText={error?.message}
              />
            );

          case "select":
            return (
              <TextField
                {...controllerField}
                select
                label={field.label}
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.key}
                  </MenuItem>
                ))}
              </TextField>
            );

          default:
            return <></>;
        }
      }}
    />
  );
};

export default FormFieldComponent;
