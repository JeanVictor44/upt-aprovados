import { FormState } from "@/types/form-state";
import { useToast } from "./use-toast";
import { useEffect } from "react";


function hasError<T>(state: FormState<T>): state is FormState<T> & { errors: Record<string, string[]> } {
    return state?.errors !== undefined && Object.keys(state.errors).length > 0;
}

export function useFormFeedback<T>(state: FormState<T>, submitted: boolean, onSuccess: () => void) {
    const { toast } = useToast();

    useEffect(() => {
      if (!submitted) return;

      if (hasError(state)) {
        Object.entries(state.errors).forEach(([, value]) => {
          if(value.length > 0){
            toast({
              description: value[0],
              variant: 'destructive'
              });
          }
        });
      } else {
        onSuccess();
      }
    }, [state]);
  }