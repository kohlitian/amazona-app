import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
    const cart = useSelector((state) => state.cart);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const { cartItems } = cart;
    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    };

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
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {' '}
                                    {userInfo.name}{' '}
                                    <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content">
                                    <Link
                                        to="#signout"
                                        onClick={signoutHandler}
                                    >
                                        Sign Out
                                    </Link>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin"> Sign In </Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/shipping" component={ShippingAddressScreen} />
                    <Route path="/payment" component={PaymentMethodScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                </main>
                <footer className="row center">All Right Reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
