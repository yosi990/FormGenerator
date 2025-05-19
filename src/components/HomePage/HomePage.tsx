import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import FormFieldComponent from "../pages/DynamicForm";
import { getFormSchema } from "../../services/Api";
import { FormField } from "../../types/FormSchema";

interface FormValues {
  [key: string]: string;
}

const HomePage: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  useEffect(() => {
    getFormSchema().then((data) => {
      if (data && data.length > 0) {
        setFormSchema(data[0].fields);
      }
    });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmittedData(data);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Dynamic Form
      </Typography>

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

      {/* סנאקבר קטן שנותן פידבק */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>

     
      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Form Summary
          </Typography>

          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              padding: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            {Object.entries(submittedData).map(([key, value]) => (
              <Box key={key} mb={1}>
                <Typography variant="body2" color="text.secondary">
                  {key}:
                </Typography>
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
