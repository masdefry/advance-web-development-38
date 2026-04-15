'use client';
import axiosInstance from '@/utils/axiosInstance';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

export default function CreateNewMenuPage() {
  const [categories, setCategories] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      categoryId: '',
      images: [] as File[],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onGetCategories = async () => {
    try {
      const res = await axiosInstance.get('/categories');
      setCategories(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>Create New Menu</h2>
      <form onSubmit={formik?.handleSubmit}>
        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Menu Name</legend>
          <input
            name='name'
            onChange={formik?.handleChange}
            type='text'
            className='input w-full'
            placeholder='Type here'
          />
          <p className='label'>Optional</p>
        </fieldset>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Price</legend>
          <input
            name='price'
            onChange={formik?.handleChange}
            type='text'
            className='input w-full'
            placeholder='Type here'
          />
          <p className='label'>Optional</p>
        </fieldset>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Category</legend>
          <select
            name='categoryId'
            onChange={formik?.handleChange}
            className='select'
          >
            <option disabled={true}>Pick a category</option>
            {categories?.map((category: any, index: number) => {
              return (
                <option key={index} value={category?.id}>
                  {category?.name}
                </option>
              );
            })}
          </select>
          <div className='label'>Optional</div>
        </fieldset>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Menu Image(s)</legend>
          <input
            name='images'
            onChange={(e: any) => {
              if (e.currentTarget.files) {
                formik?.setFieldValue(
                  'images',
                  Array.from(e.currentTarget.files),
                );
              }
            }}
            type='file'
            className='file-input w-full'
            multiple
          />
          <label className='label'>Max size 2MB</label>
        </fieldset>

        <div className='form-control mb-3'>
          <label className='label cursor-pointer justify-start gap-3'>
            <input type='checkbox' className='toggle toggle-primary' />
            <span className='label-text'>Is Available</span>
          </label>
        </div>

        <div className='form-control'>
          <button type='submit' className='btn btn-primary w-full'>
            Save Menu
          </button>
        </div>
      </form>
    </>
  );
}
