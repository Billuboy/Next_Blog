import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog } from '@headlessui/react';

import { jsonParse, jsonStringify } from '@lib/json';

export default function BlogForm({
  submitCallback,
  globalData,
  buttonText,
  isOpen,
  setIsOpen,
  setGlobalData,
}) {
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
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-scroll"
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        if (globalData) setGlobalData(null);
      }}
    >
      <div className="grid place-items-center h-full">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white-basic shadow-xl rounded-xl w-[800px] h-[700px]">
          <Dialog.Title className="font-semibold text-[24px] text-purple-500 my-[2rem] text-center">
            {buttonText}
          </Dialog.Title>
          <Dialog.Description as="div" className="w-11/12 mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="title" className="modal-field-label">
                <p>Title</p>
                <input
                  id="title"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Title for the blog"
                  disabled={formik.isSubmitting}
                  className={
                    formik.touched.title && formik.errors.title
                      ? 'modal-blog-title-error'
                      : 'modal-blog-title'
                  }
                  {...formik.getFieldProps('title')}
                />
              </label>
              <div className="container-error">
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-error">{formik.errors.title}</div>
                ) : null}
              </div>

              <label htmlFor="description" className="modal-field-label">
                <p>Description</p>
                <textarea
                  id="description"
                  autoComplete="off"
                  placeholder="Enter Description for the blog"
                  disabled={formik.isSubmitting}
                  className={
                    formik.touched.description && formik.errors.description
                      ? 'modal-blog-title-error h-[300px] resize-none'
                      : 'modal-blog-title h-[300px] resize-none'
                  }
                  {...formik.getFieldProps('description')}
                />
              </label>
              <div className="container-error">
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-error">{formik.errors.description}</div>
                ) : null}
              </div>

              <div className="text-center mt-[2rem]">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-[200px] font-semibold bg-purple-500 text-[1.2rem] text-white-basic rounded-[5px]"
                >
                  {formik.isSubmitting ? 'Submitting...' : buttonText}
                </button>
              </div>
            </form>
          </Dialog.Description>
        </div>
      </div>
    </Dialog>
  );

  return <div>{renderForm()}</div>;
}
