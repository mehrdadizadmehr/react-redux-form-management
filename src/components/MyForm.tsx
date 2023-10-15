import React from 'react';
import * as yup from 'yup';
import { useForm } from '../hooks/useForm';
import './my-form.css'

const validationSchema = yup.object().shape({
  field1: yup.string().required('Field 1 is required'),
  field2: yup.string().required('Field 2 is required'),
});

type MyFormState = {
  field1: string;
  field2: string;
};

const MyForm: React.FC = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<MyFormState>({
    initialValues: {
      field1: '',
      field2: '',
    },
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit} className="my-form">
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

      <button type="submit" disabled={isSubmitting} className="my-form-button">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
