import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';


export default function Register() {

  let navigate = useNavigate();
  const [error,setError]=useState('');
  const [isLoading,setIsLoading]=useState(false);

  let validate = Yup.object({
    name:Yup.string().required('Name is required').min(3, "Minimum lenght is 3").max(15, 'Maximum lenght  is 15'),
      email:Yup.string().required('E-mail is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}$/i,'Invalid e-mail address'),
      // email('Invalid e-mail address'),
      password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{7,}$/, 'Password must start with a Capital letter and at least 8 character'),
      rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'rePassword does not match'),
      phone:Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid Phone number'),
  })


  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validationSchema:validate,
    onSubmit:sendRegisterData,
  })

async function sendRegisterData(values){
  setIsLoading(true)
  let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
  setIsLoading(false) 
  setError(err.response?.data?.message)
    
    // console.log(err);
  })

 if (data.message === 'success'){
    setIsLoading(false) 
      // console.log(data);
       navigate ('/login')
    }
  }

  return <>
  <div className='w-75 mx-auto'>
    <h2 className='py-2'>Register Now</h2>
   
    {error ? <div className='alert alert-danger'>{error}</div> : ""}

    <form onSubmit={formik.handleSubmit}>
    
      <label htmlFor="name">Name : </label>
      <input type="text" name="name" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.name}/>
      {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>: ""}       

      <label htmlFor="email">Email : </label>
      <input type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.email}/>
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>: ""}       

      <label htmlFor="password">Password : </label>
      <input type="password" email="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.password}/>
      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>: ""}  

      <label htmlFor="rePassword">rePassword : </label>
      <input type="password" name="rePassword" id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.rePassword}/>
      {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>: ""}       

      <label htmlFor="phone">Phone : </label>
      <input type="tel" name="phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.phone}/>
      {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>: ""}       

      {isLoading ?<button type='button' className='btn btn-info my-2'><i className='fas fa-spinner fa-spin'></i></button>: 
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-info my-2'>Register</button>}
    </form>
  </div>
  </>
}
