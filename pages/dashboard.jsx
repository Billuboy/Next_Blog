import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserIcon, AtSymbolIcon, KeyIcon } from '@heroicons/react/outline';

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
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl w-[562px] h-[576px] flex justify-center"
    >
      <div>
        <h4 className="header-auth">Dashboard</h4>
        <label
          htmlFor="fullName"
          className={
            formik.touched.full_name && formik.errors.full_name
              ? 'label-auth-error'
              : 'label-auth'
          }
        >
          <div className="icon-auth">
            <UserIcon className="w-[20px] h-[24px]" />
          </div>
          <input
            id="fullName"
            type="text"
            autoComplete="off"
            placeholder="Full Name"
            className="input-auth"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('full_name')}
          />
        </label>
        <div className="container-error">
          {formik.touched.full_name && formik.errors.full_name ? (
            <p className="text-error">{formik.errors.full_name}</p>
          ) : null}
        </div>

        <label htmlFor="email" className="label-auth cursor-not-allowed">
          <div className="icon-auth">
            <AtSymbolIcon className="w-[20px] h-[24px]" />
          </div>
          <input
            id="email"
            type="email"
            readOnly
            disabled
            className="input-auth cursor-not-allowed"
            {...formik.getFieldProps('email')}
          />
        </label>
        <div className="container-error" />

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
            className="input-auth"
            disabled={formik.isSubmitting}
            {...formik.getFieldProps('password')}
          />
        </label>
        <div className="container-error">
          {formik.touched.password && formik.errors.password ? (
            <p className="text-error">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="flex justify-center mt-[1rem]">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="button-auth-form"
          >
            {formik.isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="w-full h-full grid place-items-center">{renderForm()}</div>
  );
}

Dashboard.auth = true;
