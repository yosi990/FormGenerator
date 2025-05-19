export interface ValidationRule {
    value: boolean | number | string | null;
    error_message: string;
  }
  
  export interface FieldRules {
    required?: ValidationRule;
    min?: ValidationRule;
    max?: ValidationRule;
    regex?: ValidationRule;
  }
  
  export interface FieldOption {
    key: string;
    value: string;
  }
  
  export interface FormField {
    type: "input" | "input_number" | "select" | "textarea";
    label: string;
    rules: FieldRules;
    options?: FieldOption[];
  }
  
  export interface FormSection {
    title: string;
    fields: FormField[];
  }