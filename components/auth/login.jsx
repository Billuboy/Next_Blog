import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { useUser } from '@hooks/useUser';
import { jsonParse } from '@lib/json';

export default function Login({ setAuthType }) {
  const router = useRouter();
  const { login } = useUser();

  const onSubmit = async (data, { setErrors }) => {
    try {
      await login(data);
      router.replace('/');
    } catch (err) {
      const error = jsonParse(err.message);
      setErrors({ auth: error.detail });
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .email('Must be a valid email')
        .typeError('Username must be string'),
      password: Yup.string()
        .min(8, 'Must be 8-30 characters long')
        .max(30, 'Must be between 8-30 characters long')
        .required('Password is required')
        .typeError('Username must be string'),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <form
      onSubmit={formik.handleSubmit}
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl"
    >
      <h4>Login</h4>
      <label htmlFor="username">
        Username
        <input
          id="username"
          type="text"
          autoComplete="off"
          placeholder="Username"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('username')}
        />
      </label>
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

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
        {formik.isSubmitting ? 'Loading...' : 'Sign-In with credentials'}
      </button>

      {formik.errors.auth}
    </form>
  );

  return (
    <div>
      <div>{renderForm()}</div>
      <div>
        New to DevChat?{' '}
        <span
          role="button"
          onClick={() => setAuthType('register')}
          tabIndex="0"
        >
          Sign-Up
        </span>{' '}
        on DevChat.
      </div>
    </div>
  );
}
