import React from 'react';
import '../styles/styles.css';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const FormsPage = () => {
    return (
        <main className="forms">
            <LoginForm />
            <RegisterForm />
        </main>
    );
};
