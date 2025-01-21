import React from 'react';
import '../styles/styles.css';

export const LoginForm = () => {
    return (
        <div className="form">
            <h1 className="form__title">Login</h1>
            <div className="form__group">
                <label htmlFor="email" className="form__label">Email</label>
                <input type="email" id="email" className="form__input" placeholder="Digite seu email" />
            </div>
            <div className="form__group">
                <label htmlFor="password" className="form__label">Senha</label>
                <input type="password" id="password" className="form__input" placeholder="Digite sua senha" />
            </div>
            <button className="form__button">Entrar</button>
        </div>
    );
};