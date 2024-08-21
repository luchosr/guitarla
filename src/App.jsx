import { useState, useEffect } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { db } from './data/db';

const App = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart
      ? [...JSON.parse(localStorage.getItem('cart'))]
      : [];
  };
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  const addToCart = (item) => {
    const itemsExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemsExists >= 0) {
      if (cart[itemsExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemsExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
    // saveLocalStorage();
  };

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
