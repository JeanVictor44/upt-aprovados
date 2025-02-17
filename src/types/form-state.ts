export type FormState<FormFields> = {
  errors?: {
    [K in keyof FormFields]?: string[];
  };
} | undefined;



export function createInitialState<FormFields>(): FormState<FormFields> {
  return {
    errors: {},
  };
}