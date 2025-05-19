// services/formSchemaService.ts
import axios from "axios";
import { FormSchema } from "../types/FormSchema"

export const getFormSchema = async (): Promise<FormSchema> => {
  const response = await axios.get<FormSchema>("https://your-api.com/form-schema");
  return response.data;
};
