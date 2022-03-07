import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { jsonParse, jsonStringify } from '@lib/json';

export default function BlogForm({ submitCallback, globalData, buttonText }) {
  const onSubmit = async (data, { resetForm, setErrors }) => {
    try {
      await submitCallback(jsonStringify(data));
      resetForm();
    } catch (err) {
      setErrors(jsonParse(err.message));
    }
  };

  const formik = useFormik({
    initialValues: {
      title: globalData?.title || '',
      description: globalData?.description || '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, 'Must be atleast 3 charaters long')
        .required('Title is required')
        .typeError('Title must be string'),
      description: Yup.string()
        .min(10, 'Must be atleast 10 characters long')
        .required('Description is required'),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <form
      onSubmit={formik.handleSubmit}
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl"
    >
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          autoComplete="off"
          placeholder="Enter Title for the blog"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('title')}
        />
      </label>
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          autoComplete="off"
          placeholder="Enter Description for the blog"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('description')}
        />
      </label>
      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Loading...' : buttonText}
      </button>
    </form>
  );

  return renderForm();
}
