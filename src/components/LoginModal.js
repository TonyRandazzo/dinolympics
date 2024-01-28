import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const LoginModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Logging in with:', data);
    onClose();
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
        </label>
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
        </label>
        <button className="login-button" type="submit">
          <span></span>
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
