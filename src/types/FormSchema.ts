// types/FormSchema.ts
export interface FieldRule {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  }
  
  export interface FormField {
    name: string;
    label: string;
    type: string;
    rules: FieldRule;
  }
  
  export interface FormSchema {
    fields: FormField[];
  }
  