import React, { useEffect, useState } from "react";
import {  Container, Button, Typography, Box, Snackbar, Alert} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormFieldComponent from "../pages/DynamicForm";
import { getFormSchema } from "../../services/Api";
import { FormField } from "../../types/FormSchema";
import { buildYupSchema } from "../../utils/yupSchema";

interface FormValues {
  [key: string]: any;
}

const HomePage: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [resolverSchema, setResolverSchema] = useState<yup.AnyObjectSchema>(yup.object());

  useEffect(() => {
    getFormSchema().then((data) => {
      if (data.length > 0) {
        const fields = data[0].fields;
        setFormSchema(fields);
        const yupSchema = buildYupSchema(fields);
        setResolverSchema(yupSchema);
      }
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(resolverSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmittedData(data);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Form Generator</Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {formSchema.map((field, index) => (
          <FormFieldComponent
            key={index}
            field={field}
            control={control}
            error={errors[field.label]}
          />
        ))}

        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValid}
          >
            Submit
          </Button>
        </Box>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>

      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Form Summary</Typography>
          <Box sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            padding: 2,
            backgroundColor: "#f9f9f9"
          }}>
            {Object.entries(submittedData).map(([key, value]) => (
              <Box key={key} mb={1}>
                <Typography variant="body2" color="text.secondary">{key}:</Typography>
                <Typography variant="body1">{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
