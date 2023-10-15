// Import the useState hook from React to manage the form state.
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
    // Update the form state with the new value.
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // If validation is enabled, validate the field.
    if (validationSchema) {
      validateField(name, value);
    }
  };

  // Define a function to validate a form field.
  const validateField = async (name: string, value: any) => {
    try {

      if (validationSchema) {
        await validationSchema.validateAt(name, values);

        // If the field is valid, clear the error message.
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    } catch (error) {
      // If validation is enabled, set the error message for the field.
      if (validationSchema) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: (error as yup.ValidationError).errors[0] as string,
        }));
      }
    }
  };

  // Define a function to handle the form submission.
  const handleSubmit = async (event?: React.FormEvent) => {
    // If an event is passed, prevent the default form submission behavior.
    if (event) {
      event.preventDefault();
    }

    // If validation is enabled, validate all of the form fields.
    if (validationSchema) {
      const validationErrors: AnyObject = {};

      for (const key in values) {
        try {
          // Validate the field against the validation schema.
          await validationSchema.validateAt(key, values);
        } catch (error) {
          // Add the field error to the validation errors object.
          validationErrors[key] = (error as yup.ValidationError).errors[0];
        }
      }

      // If there are any validation errors, display them to the user.
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);


    setIsSubmitting(false);
  };

  // Return the form state and event handlers.
  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
