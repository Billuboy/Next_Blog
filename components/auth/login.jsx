import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/outline';

import { useUser } from '@hooks/useUser';

export default function Login({ setAuthType }) {
  const router = useRouter();
  const { login } = useUser();

  const onSubmit = async (data, { setErrors }) => {
    try {
      await login(data);
      router.replace('/');
    } catch (err) {
      setErrors({
        username: 'Invalid Username-Password combination',
        password: 'Invalid Username-Password combination',
      });
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
        .required('Username is required'),
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
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl w-[562px] h-[476px] flex justify-center"
    >
      <div>
        <h4 className="header-auth">Login</h4>
        <label
          htmlFor="username"
          className={
            formik.touched.username && formik.errors.username
              ? 'label-auth-error'
              : 'label-auth'
          }
        >
          <div className="icon-auth">
            <AtSymbolIcon className="w-[20px] h-[24px]" />
          </div>
          <input
            id="username"
            type="email"
            autoComplete="off"
            placeholder="Email"
            className="input-auth"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('username')}
          />
        </label>
        <div className="container-error">
          {formik.touched.username && formik.errors.username ? (
            <p className="text-error">{formik.errors.username}</p>
          ) : null}
        </div>

        <label
          htmlFor="password"
          className={
            formik.touched.password && formik.errors.password
              ? 'label-auth-error'
              : 'label-auth'
          }
        >
          <div className="icon-auth">
            <KeyIcon className="w-[20px] h-[20px]" />
          </div>
          <input
            id="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
            disabled={formik.isSubmitting}
            className="input-auth"
            {...formik.getFieldProps('password')}
          />
        </label>
        <div className="container-error">
          {formik.touched.password && formik.errors.password ? (
            <p className="text-error">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="button-auth-form"
          >
            {formik.isSubmitting ? 'Logging-In...' : 'Sign-In'}
          </button>
        </div>

        <div className="font-medium text-center">
          New to Blogs?{' '}
          <span
            role="button"
            onClick={() => router.replace('/auth?type=sign-up')}
            tabIndex="0"
            className="text-purple-500"
          >
            Sign-Up
          </span>{' '}
          on Blogs.
        </div>
      </div>
    </form>
  );

  return (
    <div className="w-full h-full grid place-items-center">{renderForm()}</div>
  );
}
