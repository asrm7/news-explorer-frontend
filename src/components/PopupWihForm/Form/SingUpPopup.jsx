import React, { useState } from 'react';
import PopoutWithForm from './PopUpWithForm';
import FormInput from './FormInput';

function SignUpPopup(props) {
  const [formState, setFormState] = useState({
    email: '',
    isEmailValid: false,
    password: '',
    isPasswordValid: false,
    user: '',
    isUserValid: false,
  });

  const [formValid, setFormValid] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false, user: false });

  const validateEmail = (email) => {
    const validation = /\S+@\S+\.\S+/;
    return validation.test(email);
  };

  const validateForm = (updatedState) => {
    return (
      updatedState.isEmailValid &&
      updatedState.isPasswordValid &&
      updatedState.isUserValid
    );
  };

  const handleInputChange = (field, value) => {
    const updatedState = {
      ...formState,
      [field]: value,
      isEmailValid: field === 'email' ? validateEmail(value) : formState.isEmailValid,
      isPasswordValid: field === 'password' ? value.length > 5 : formState.isPasswordValid,
      isUserValid: field === 'user' ? value.trim().length > 0 : formState.isUserValid,
    };
    setFormState(updatedState);

    const updatedTouched = { ...touched, [field]: true };
    setTouched(updatedTouched);

    setFormValid(validateForm(updatedState));
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit({
      email: formState.email,
      password: formState.password,
      name: formState.user,
    });
  };

  return (
    <PopoutWithForm
      isOpen={props.signUpOpen}
      buttonText="Inscrever-se"
      onClose={props.onClose}
      title="Inscrever-se"
      link="Entre"
      toggle={props.toggle}
      handleSubmit={signUpSubmit}
      valid={formValid}
    >
      <FormInput
        type="email"
        name="Email"
        form="sign-up"
        handleChange={(e) => handleInputChange('email', e.target.value)}
        errorText="E-mail inválido"
        valid={touched.email ? formState.isEmailValid : true}
        placeholderText="Insira email"
      />

      <FormInput
        type="password"
        name="Password"
        form="sign-up"
        handleChange={(e) => handleInputChange('password', e.target.value)}
        placeholderText="Insira a senha"
        errorText="Senha requer caracteres adicionais"
        valid={touched.password ? formState.isPasswordValid : true}
      />

      <FormInput
        type="text"
        name="Username"
        form="sign-up"
        handleChange={(e) => handleInputChange('user', e.target.value)}
        errorText="Nome de usuário não disponível."
        valid={touched.user ? formState.isUserValid : true}
        placeholderText="Insira seu nome de usuário"
      />
    </PopoutWithForm>
  );
}

export default SignUpPopup;
