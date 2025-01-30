import React, { useState } from 'react';
import PopoutWithForm from './PopUpWithForm';
import FormInput from './FormInput';

function SignInPopup({
  signInOpen, onClose, handleSubmit, toggle,
}) {
  const [formState, setFormState] = useState({
    email: '',
    isEmailValid: false,
    password: '',
    isPasswordValid: false,
  });

  const [formValid, setFormValid] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email) => {
    const validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validation.test(email);
  };

  const validateForm = (updatedState) => {
    return updatedState.isEmailValid && updatedState.isPasswordValid;
  };

  const handleInputChange = (field, value) => {
    const updatedState = {
      ...formState,
      [field]: value,
      isEmailValid: field === 'email' ? validateEmail(value) : formState.isEmailValid,
      isPasswordValid: field === 'password' ? value.length > 5 : formState.isPasswordValid,
    };

    setFormState(updatedState);

    const updatedTouched = { ...touched, [field]: true };
    setTouched(updatedTouched);

    setFormValid(validateForm(updatedState));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      email: formState.email,
      password: formState.password,
    });
  };

  return (
    <PopoutWithForm
      isOpen={signInOpen}
      buttonText="Entrar"
      onClose={onClose}
      title="Entrar"
      link="Inscreva-se"
      toggle={toggle}
      handleSubmit={handleSignInSubmit}
      valid={formValid}
    >
      <FormInput
        type="email"
        name="E-mail"
        form="sign-in"
        handleChange={(e) => handleInputChange('email', e.target.value)}
        errorText="Invalid email address"
        valid={touched.email ? formState.isEmailValid : true}
        placeholderText="Insira e-mail"
      />

      <FormInput
        type="password"
        name="Senha"
        form="sign-in"
        handleChange={(e) => handleInputChange('password', e.target.value)}
        placeholderText="Insira senha"
        errorText="Senha deve ter pelo menos 6 caracteres"
        valid={touched.password ? formState.isPasswordValid : true}
      />
    </PopoutWithForm>
  );
}

export default SignInPopup;
