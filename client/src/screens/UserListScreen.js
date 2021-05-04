import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';

export default function UserListScreen(props) {
    const pageNumber = props.match.params.pageNumber || 1;
    const userList = useSelector((state) => state.userList);
    const { loading, error, users, page, pages } = userList;
    const dispatch = useDispatch();
    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    useEffect(() => {
        dispatch(listUsers({ pageNumber }));
        dispatch({ type: USER_DETAILS_RESET });
    }, [dispatch, pageNumber, successDelete]);

    const deleteHandler = (user) => {
        if (window.confirm('Are you sure? ')) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
            )}
            {successDelete && (
                <MessageBox variant="success">
                    User Delete Successfully
                </MessageBox>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IS SELLER</th>
                                <th>IS ADMIN</th>
                                <th>ACTONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() =>
                                                props.history.push(
                                                    `/user/${user._id}/edit`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(user)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row center pagination">
                        {[...Array(pages).keys()].map((x) => (
                            <Link
                                key={x + 1}
                                className={x + 1 === page ? 'active' : ''}
                                to={`/userlist/pageNumber/${x + 1}`}
                            >
                                {x + 1}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
