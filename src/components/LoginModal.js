import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const LoginModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const onSubmit = (data) => {
    console.log(`${isLoginMode ? 'Logging in with:' : 'Registering with:'}`, data);
    onClose();
  };

  const toggleMode = () => {
    if ((isLoginMode && document.activeElement.value !== 'Login') || (!isLoginMode && document.activeElement.value !== 'Register')) {
      setIsLoginMode(!isLoginMode);
    }
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
        <input type='button' value={'Login'} onClick={toggleMode}></input>
        <input type='button' value={'Register'} onClick={toggleMode}></input>  
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            {...register('username', { required: isLoginMode ? 'Username is required' : 'Username is required for registration' })}
          />
        </label>
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            {...register('password', { required: isLoginMode ? 'Password is required' : 'Password is required for registration' })}
          />
        </label>
        <button className="login-button" type="submit">
          <span></span>
          {isLoginMode ? 'Login' : 'Register'}
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;


