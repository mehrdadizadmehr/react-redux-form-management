// Import the React library and the yup library for validation.
import React from 'react';
import * as yup from 'yup';
import { useForm } from '../hooks/useForm';
import './my-form.css';
const validationSchema = yup.object().shape({
  // The field1 field is required.
  field1: yup.string().required('Field 1 is required'),

  // The field2 field is required.
  field2: yup.string().required('Field 2 is required'),
});

// Define the type of the form state.
type MyFormState = {
  // The field1 field is a string.
  field1: string;

  // The field2 field is a string.
  field2: string;
};

// Define the MyForm component.
const MyForm: React.FC = () => {
  // Use the useForm hook to get the form state and event handlers.
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<MyFormState>({
    // Set the initial values of the form state.
    initialValues: {
      field1: '',
      field2: '',
    },

    // Set the validation schema for the form.
    validationSchema,
  });

  // Return the form element.
  return (
    <form onSubmit={handleSubmit} className="my-form">
      // Field 1
      <div>
        <label htmlFor="field1">Field 1</label>
        <input
          type="text"
          id="field1"
          name="field1"
          value={values.field1}
          onChange={(e) => handleChange('field1', e.target.value)}
          className="my-form-input"
        />
        <span>{errors.field1}</span>
      </div>

      // Field 2
      <div>
        <label htmlFor="field2">Field 2</label>
        <input
          type="text"
          id="field2"
          name="field2"
          value={values.field2}
          onChange={(e) => handleChange('field2', e.target.value)}
          className="my-form-input"
        />
        <span>{errors.field2}</span>
      </div>

      // Submit button
      <button type="submit" disabled={isSubmitting} className="my-form-button">
        Submit
      </button>
    </form>
  );
};

// Export the MyForm component.
export default MyForm;
