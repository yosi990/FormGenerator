
import axios from "axios";
import { FormSection } from "../types/FormSchema";

export const getFormSchema = async (): Promise<FormSection[]> => {
  try {
    const response = await axios.get<FormSection[]>("https://private-705dcb-formgenerator1.apiary-mock.com/form_fields");
    return response.data; // מחזיר מערך של FormSection
  } catch (error) {
    console.error("Error fetching form schema:", error);
    return []; // במקרה של שגיאה מחזיר מערך ריק
  }
};
