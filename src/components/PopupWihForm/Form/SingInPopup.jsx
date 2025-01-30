import React, { useState } from 'react';
import PopoutWithForm from './PopUpWithForm';
import FormInput from './FormInput';

function SignInPopup({
  signInOpen, onClose, handleSubmit, toggle,
}) {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [email, setEmail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validation.test(email);
  };

  const allValid = (e) => {
    
    setFormValid(e.target.closest('form').checkValidity());
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const bool = validateEmail(email);
    
    setIsEmailValid(bool);
    allValid(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (password.length > 7) {
      setIsPasswordValid(true);
    }

    allValid(e);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ password, email });
  };

  return (
    <PopoutWithForm isOpen={signInOpen} buttonText="Entrar" onClose={onClose} title="Entrar" link="Inscreva-se" toggle={toggle} handleSubmit={handleSignInSubmit} valid={formValid}>

      <FormInput type="email" name="E-mail" form="sign-in" handleChange={handleEmailChange} errorText="Invalid email address" valid={isEmailValid} placeholderText="Insira e-mail" />

      <FormInput type="password" name="Senha" form="sign-in" handleChange={handlePasswordChange} placeholderText="Insira senha" valid={isPasswordValid} />

    </PopoutWithForm>
  );
}
export default SignInPopup;
