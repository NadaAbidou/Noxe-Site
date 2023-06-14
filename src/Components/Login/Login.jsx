import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';


export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [error,setError]=useState('');
  const [isLoading,setIsLoading]=useState(false);

  let validate = Yup.object({
      email:Yup.string().required('E-mail is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}$/i,'Invalid e-mail address'),
      // email('Invalid e-mail address'),
      password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{7,}$/, 'Password must start with a Capital letter and at least 8 character'),
  })


  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    
    },
    validationSchema:validate,
    onSubmit:sendLoginData,
  })

async function sendLoginData(values){
  setIsLoading(true)
  let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
  setIsLoading(false) 
  setError(err.response?.data?.message)
    
    // console.log(err);
  })

 if (data.message === 'success'){
    setIsLoading(false) 
      // console.log(data);
      localStorage.setItem('userToken', data.token);
       saveUserData()
       navigate ('/home');
    }
  }

  return <>
  <div className='w-75 mx-auto'>
    <h2 className='py-2'>Login Now</h2>
   
    {error ? <div className='alert alert-danger'>{error}</div> : ""}

    <form onSubmit={formik.handleSubmit}>
    
      <label htmlFor="email">Email : </label>
      <input type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.email}/>
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>: ""}       

      <label htmlFor="password">Password : </label>
      <input type="password" email="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.password}/>
      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>: ""}  


      {isLoading ?<button type='button' className='btn btn-info my-2'><i className='fas fa-spinner fa-spin'></i></button>: 
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-info my-2'>Login</button>}

        <p className='mt-2'>Don't have account?<Link className='btn btn-outline-info border border-0 mx-0' to={'/register'}>Sign Up</Link></p>
    </form>
  </div>
  </>
}
