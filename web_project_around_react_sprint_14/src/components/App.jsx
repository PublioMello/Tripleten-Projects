import { useState, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import api from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then(setCurrentUser);
    api.getInitialCards().then(setCards);
  }, []);

  async function handleUpdateUser(data) {
    const newData = await api.editarDados(data);
    setCurrentUser(newData);
  }

  async function handleUpdateAvatar(data) {
    try {
      const updatedUser = await api.editProfilePicture(data);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCardLike(card) {
    try {
      const isLiked = card.isLiked;

      const updatedCard = !isLiked
        ? await api.addLike(card._id)
        : await api.removeLike(card._id);

      setCards((prevCards) =>
        prevCards.map((c) => (c._id === card._id ? updatedCard : c)),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteCard(id) {
    try {
      await api.deleteCard(id);

      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.addNewCard(data);
      console.log(newCard);

      setCards((prevCards) => [
        {
          ...newCard,
          isLiked:
            newCard.likes?.some((user) => user._id === currentUser._id) ||
            false,
        },
        ...prevCards,
      ]);

      return newCard;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
