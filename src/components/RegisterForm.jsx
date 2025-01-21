import React from 'react';
import '../styles/styles.css';


export const RegisterForm = () => {
    return (
        <div className="form">
            <h1 className="form__title">Cadastro</h1>
            <div className="form__group">
                <label htmlFor="name" className="form__label">Nome</label>
                <input type="text" id="name" className="form__input" placeholder="Digite seu nome" />
            </div>
            <div className="form__group">
                <label htmlFor="email" className="form__label">Email</label>
                <input type="email" id="email" className="form__input" placeholder="Digite seu email" />
            </div>
            <div className="form__group">
                <label htmlFor="password" className="form__label">Senha</label>
                <input type="password" id="password" className="form__input" placeholder="Digite sua senha" />
            </div>
            <button className="form__button">Cadastrar</button>
        </div>
    );
};