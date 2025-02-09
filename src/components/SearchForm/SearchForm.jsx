import React, { useState, useRef, useEffect } from 'react';

const SearchForm = (props) => {
  const [keyword, setKeyword] = useState('');
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false); 
  const inputRef = useRef();

  useEffect(() => {
    if (keyword.trim().length > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [keyword]);

  const submitForm = (e) => {
    e.preventDefault();
    setTouched(true); 

    if (valid) {
      props.onSubmit(keyword);
    }
  };

  return (
    <form className="search" onSubmit={submitForm}>
      <input
        ref={inputRef}
        placeholder="Inserir tema"
        className="search__input"
        onChange={({ target }) => setKeyword(target.value)}
        onBlur={() => setTouched(true)} 
        disabled={props.isLoading}
      />
      {touched && !valid && (
        <span
          id={`${props.name}-error`}
          className="form__input-error form__input-error_visible"
        >
          Por favor, insira uma palavra-chave
        </span>
      )}

      <button type="submit" className={`button search__button ${props.isLoading || !valid ? 'search__button_disabled' : ''} `} disabled={props.isLoading || !valid}>Procurar</button>
    </form>
  );
};

export default SearchForm;
