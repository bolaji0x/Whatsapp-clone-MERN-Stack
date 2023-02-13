import React, { useEffect, useState } from 'react'
import { Alert, FormRow } from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate, Navigate } from 'react-router-dom'
//Dummy Phone Number +2348140785264
const initialState = {
    name: '',
    phoneNo: '',
    password: '',
    isMember: true
}

const Register = () => {
    const navigate = useNavigate()
    const { user, setupUser, showAlert, isLoading, displayAlert } = useAppContext()

    const [values, setValues] = useState(initialState)
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const {name, phoneNo, password, isMember} = values

    if(!phoneNo || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = new FormData();

    currentUser.set("name", values.name);
    currentUser.set("phoneNo", values.phoneNo);
    currentUser.set("password", values.password);

    images.forEach((image) => {
      currentUser.append("images", image);
    });
    if (values.isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  };
  
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])


  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <div className='bd-container'>
        <form 
          encType="multipart/form-data"  className='register-section' 
          onSubmit={handleSubmit}
        >
          <h2 className='rh-title'>{values.isMember ? 'Login to your Whatsapp Account' : 'Create your Whatsapp Account'}</h2>
          {showAlert && <Alert />}
        {/* profile photo */}
        {!values.isMember && (
        <div>
            <div className='img-preview-container'>
              <div className='img-prev-grid'>
                <img src={imagesPreview} className='img-prev' alt='preview' />
                <label className='upload-text' htmlFor='files'>ADD PROFILE PHOTO</label>
              </div>
              <input
              type="file"
              id='files'
              className='upload-btn'
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
              />
            </div>
            {/* name */}
            <FormRow
              type='text'
              name='name'
              placeholder='name'
              value={values.name}
              handleChange={handleChange}
            />
            
        </div>
        )}
        {/* email */}
        <FormRow
          type='number'
          name='phoneNo'
          placeholder='Phone Number'
          value={values.phoneNo}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          handleChange={handleChange}
        />
        {/* btn container */}
        <div className='btn-container'>
          <button disabled={isLoading} onClick={toggleMember} type='button' className='signin-btn'>{values.isMember ? 'Sign up instead' : 'Sign in instead'}</button>
          
          <button disabled={isLoading} type='submit' className='submit-btn'>{values.isMember ? 'Login' : 'Register'}</button>
          
        </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Register