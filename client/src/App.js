import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">
                            amazona
                        </Link>
                    </div>
                    <div>
                        <Link to="/cart">
                            Cart{' '}
                            {cartItems.length > 0 && (
                                <span className="badge">
                                    {cartItems.length}
                                </span>
                            )}{' '}
                        </Link>
                        <Link to="/signin">Sign In</Link>
                    </div>
                </header>
                <main>
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/cart/:id?" component={CartScreen} />
                </main>
                <footer className="row center">All Right Reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
