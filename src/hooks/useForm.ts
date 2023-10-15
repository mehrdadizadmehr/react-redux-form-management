import { useState } from 'react';
import * as yup from 'yup';

type AnyObject = Record<string, any>;

interface UseFormProps<T extends AnyObject> {
  initialValues: T;
  validationSchema?: yup.ObjectSchema<T>;
}


export const useForm = <T extends AnyObject>({ initialValues, validationSchema }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<AnyObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (validationSchema) {
      validateField(name, value);
    }
  };

  const validateField = async (name: string, value: any) => {
    try {
      if (validationSchema) {
        await validationSchema.validateAt(name, values);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    } catch (error) {
      if (validationSchema) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: (error as yup.ValidationError).errors[0] as string }));
      }
    }
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (validationSchema) {
      const validationErrors: AnyObject = {};

      for (const key in values) {
        try {
          await validationSchema.validateAt(key, values);
        } catch (error) {
          validationErrors[key] = (error as yup.ValidationError).errors[0];
        }
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);

   

    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
