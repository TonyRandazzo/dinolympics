import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const LoginModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mode, setMode] = useState('login');

  const onSubmit = async (data) => {
    const url = mode === 'login' ? `${process.env.REACT_APP_BACKEND_URL}/api/login` : `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(`${mode === 'login' ? 'Logging in with:' : 'Registering with:'}`, data);
        onClose();
      } else {
        const errorData = await response.json();
        console.error(`${mode === 'login' ? 'Login' : 'Registration'} failed:`, errorData);
      }
    } catch (error) {
      console.error(`${mode === 'login' ? 'Login' : 'Registration'} failed:`, error);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="ReactModalContent"
      overlayClassName="CustomOverlay"
    >
      <button className="closeButton" onClick={onClose}>
        <span></span>
        &times;
      </button>
      <div className='login-register'>
        <input type='button' value={mode === 'login' ? 'Login' : 'Register'} onClick={toggleMode}></input> 
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            {...register('username', { required: mode === 'login' ? 'Username is required' : 'Username is required for registration' })}
          />
        </label>
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </label>
        <button className="login-button" type="submit">
          <span></span>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
