import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '@hooks/useUser';
import { jsonStringify } from '@lib/json';

export default function Dashboard() {
  const { data, token, changeFullName } = useUser();

  const onSubmit = async (body, { setTouched, setFieldValue }) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: jsonStringify(body),
    });
    changeFullName(body.full_name);
    setTouched({
      full_name: false,
      password: false,
    });
    setFieldValue('password', '');
  };

  const formik = useFormik({
    initialValues: {
      full_name: data.fullName,
      email: data.email,
      password: '',
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string()
        .min(3, 'Must be 3-50 charaters long')
        .max(50, 'Must be 3-50 characters long')
        .required('Full Name is required')
        .typeError('Full Name must be string'),
      password: Yup.string()
        .min(8, 'Must be 8-30 characters long')
        .max(30, 'Must be between 8-30 characters long')
        .required('Password is required')
        .typeError('Password must be string'),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <form
      onSubmit={formik.handleSubmit}
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl"
    >
      <h4>Register</h4>
      <label htmlFor="fullName">
        Full Name
        <input
          id="fullName"
          type="text"
          autoComplete="off"
          placeholder="Full Name"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('full_name')}
        />
      </label>
      {formik.touched.full_name && formik.errors.full_name ? (
        <div>{formik.errors.full_name}</div>
      ) : null}

      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          readOnly
          disabled
          {...formik.getFieldProps('email')}
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          autoComplete="off"
          placeholder="Password"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('password')}
        />
      </label>
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Loading...' : 'Update User'}
      </button>
    </form>
  );

  return (
    <div>
      <div>Dashboard</div>
      <div>
        <Image
          src={data.avatar}
          width="200"
          height="200"
          layout="fixed"
          priority
        />
      </div>
      {renderForm()}
    </div>
  );
}

Dashboard.auth = true;
