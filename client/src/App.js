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
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';

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
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">
                                            Order History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#signout"
                                            onClick={signoutHandler}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin"> Sign In </Link>
                        )}
                        {userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                <Link to="#seller">
                                    Seller <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist/seller">
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist/seller">
                                            Orders
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashbord">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>
                <main>
                    <Route
                        path="/product/:id"
                        exact
                        component={ProductScreen}
                    />
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/shipping" component={ShippingAddressScreen} />
                    <Route path="/payment" component={PaymentMethodScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route
                        path="/orderhistory"
                        component={OrderHistoryScreen}
                    />
                    <Route path="/seller/:id" component={SellerScreen} />
                    <PrivateRoute path="/profile" component={ProfileScreen} />
                    <AdminRoute
                        path="/productlist"
                        component={ProductListScreen}
                        exact
                    />
                    <AdminRoute
                        path="/product/:id/edit"
                        component={ProductEditScreen}
                        exact
                    />
                    <AdminRoute
                        path="/orderlist"
                        component={OrderListScreen}
                        exact
                    />
                    <AdminRoute path="/userlist" component={UserListScreen} />
                    <AdminRoute
                        path="/user/:id/edit"
                        component={UserEditScreen}
                    />
                    <SellerRoute
                        path="/productlist/seller"
                        component={ProductListScreen}
                    />
                    <SellerRoute
                        path="/orderlist/seller"
                        component={OrderListScreen}
                    />
                </main>
                <footer className="row center">All Right Reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
