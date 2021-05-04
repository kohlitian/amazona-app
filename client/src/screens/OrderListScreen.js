import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {
    const pageNumber = props.match.params.pageNumber || 1;
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: ORDER_DELETE_RESET });
        }
        dispatch(
            listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber })
        );
    }, [dispatch, pageNumber, sellerMode, successDelete, userInfo]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div>
            <h1>Order History</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    {orders ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {order.isPaid
                                                ? order.paidAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(
                                                      0,
                                                      10
                                                  )
                                                : 'No'}
                                        </td>
                                        <td>
                                            <button
                                                className="small"
                                                type="button"
                                                onClick={() => {
                                                    props.history.push(
                                                        `/order/${order._id}`
                                                    );
                                                }}
                                            >
                                                Details
                                            </button>
                                            <button
                                                className="small"
                                                type="button"
                                                onClick={() =>
                                                    deleteHandler(order)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <MessageBox variant="danger">No Order Found</MessageBox>
                    )}
                    <div className="row center pagination">
                        {[...Array(pages).keys()].map((x) => (
                            <Link
                                key={x + 1}
                                className={x + 1 === page ? 'active' : ''}
                                to={
                                    sellerMode
                                        ? `/orderlist/seller/pageNumber/${
                                              x + 1
                                          }`
                                        : `/orderlist/pageNumber/${x + 1}`
                                }
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
