import React, { useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getFormSchema } from "../../services/Api";
import { FormField } from "../../types/FormSchema";
import { generateYupSchema } from "../../utils/yupSchema";
import FormFieldComponent from "../pages/DynamicForm";

interface FormValues {
  [key: string]: any;
}

const HomePage: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [validationSchema, setValidationSchema] = useState<yup.AnyObjectSchema>(yup.object({}));

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    getFormSchema().then((data) => {
      if (data && data.length > 0) {
        const fields = data[0].fields;
        setFormSchema(fields);
        const schema = generateYupSchema(fields);
        setValidationSchema(schema);
      }
    });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dynamic Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {formSchema.map((field, index) => (
          <FormFieldComponent
            key={index}
            field={field}
            control={control}
            error={errors[field.label]}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default HomePage;
