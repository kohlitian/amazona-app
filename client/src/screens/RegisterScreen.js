import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { USER_REGISTER_REST } from '../constants/userConstants';

export default function RegisterScreen(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: USER_REGISTER_REST });
            props.history.push(redirect);
        }
    }, [dispatch, props.history, redirect, userInfo]);

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassowrd">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Alread Have An Account ?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
