import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { jsonStringify, jsonParse } from '@lib/json';

export default function Register({ setAuthType }) {
  const onSubmit = async (data) => {
    // try {
    //   const request = await fetch('/api/auth/register', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: jsonStringify(data),
    //   });

    //   if (!request.ok) {
    //     const response = await request.json();
    //     throw new Error(jsonStringify(response));
    //   }

    //   await signIn('credentials', {
    //     ...data,
    //     callbackUrl: '/',
    //   });
    // } catch (err) {
    //   setErrors(jsonParse(err.message));
    // }
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string()
        .min(3, 'Must be 3-50 charaters long')
        .max(50, 'Must be 3-50 characters long')
        .required('Full Name is required')
        .typeError('Full Name must be string'),
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
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
          autoComplete="off"
          placeholder="Email"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('email')}
        />
      </label>
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
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
        {formik.isSubmitting ? 'Loading...' : 'Sign-Up with credentials'}
      </button>
    </form>
  );

  return (
    <div>
      <div>{renderForm()}</div>
      <div>
        <div>
          Already have an account?{' '}
          <span role="button" onClick={() => setAuthType('login')} tabIndex="0">
            Sign-In
          </span>{' '}
          to your account.
        </div>
      </div>
    </div>
  );
}
