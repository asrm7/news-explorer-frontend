import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SaveNews from "../SavedNews/SaveNews";
import NewsCardList from "../NewsCardList/NewsCardList";
import RegistrationSuccessful from "../PopupWihForm/RegistrationSuccessful";
import SignInPopup from "../PopupWihForm/Form/SingInPopup";
import SignUpPopup from "../PopupWihForm/Form/SingUpPopup";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth";
import newsApi from "../../utils/news-api";
import NoResults from "../Preloader/NoResults";
import Preloader from "../Preloader/Preloader";
import ResultError from "../Preloader/ResultError";
import MainBackend from "../../utils/backend";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [keyword, setKeyWord] = useState("");
  const [cards, setCards] = useState([]);
  const [results, setResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [resultError, setResultError] = useState(false);
  const navigate = useNavigate();
  const mainApi = new MainBackend({
    // baseUrl: "http://localhost:3000",
    baseUrl: "https://news-explorer-backend-m2lm.onrender.com",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "content-type": "application/json",
    },
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("jwt");
    if (tokenFromStorage) {
      auth
        .checkToken(tokenFromStorage)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const openSignIn = () => {
    setSignUp(false);
    setRegistrationComplete(false);
    setSignIn(true);
  };

  const openSignUp = () => {
    setSignIn(false);
    setSignUp(true);
  };

  const openSuccess = () => {
    setRegistrationComplete(true);
  };

  const closeAll = (e) => {
    if (e.target !== e.currentTarget) return;
    setSignUp(false);
    setRegistrationComplete(false);
    setSignIn(false);
  };

  const signInSubmit = (password, email) => {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          auth.checkToken(res.token).then((res) => {
            setCurrentUser(res);
            setLoggedIn(true);
          });
        }
      })
      .then(() => {
        setSignIn(false);
      })
      .catch((err) => console.error(err));
  };

  const signUpSubmit = ({ email, password, name }) => {
    auth
      .register(email, password, name)
      .then(() => {
        setSignUp(false);
        openSuccess();
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    navigate("/");
  };

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      setSignUp(false);
      setRegistrationComplete(false);
      setSignIn(false);
    }
  });

  const search = (keyword) => {
    setKeyWord(keyword);
    setNoResults(false);
    setResultError(false);
    setResults(false);
    setLoading(true);
    newsApi
      .getArticles(keyword)
      .then((res) => {
        setCards(res);
        setLoading(false);
        if (res.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setResults(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setResultError(true);
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  isLoading={loading}
                  currentUser={currentUser}
                  headerClick={loggedIn ? logout : openSignIn}
                  loggedIn={loggedIn}
                  search={search}
                />
                {results && (
                  <NewsCardList
                    cards={cards}
                    setCards={setCards}
                    keyword={keyword}
                    hover="Entre para salvar artigos"
                    loggedIn={loggedIn}
                    mainApi={mainApi} 
                  />
                )}
                {noResults && <NoResults />}
                {loading && <Preloader />}
                {resultError && <ResultError />}
                <About />
              </>
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SaveNews
                  headerClick={logout}
                  signInDirect={openSignIn}
                  mainApi={mainApi} 
                  loggedIn={loggedIn}
                  hover=""
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
        <RegistrationSuccessful
          isOpen={registrationComplete}
          onClose={closeAll}
          redirectLink={openSignIn}
        />
        <SignInPopup
          signInOpen={signIn}
          onClose={closeAll}
          handleSubmit={signInSubmit}
          toggle={openSignUp}
        />
        <SignUpPopup
          signUpOpen={signUp}
          onClose={closeAll}
          handleSubmit={signUpSubmit}
          toggle={openSignIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
