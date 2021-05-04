import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function OrderHistoryScreen(props) {
    const pageNumber = props.match.params.pageNumber || 1;
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders, page, pages } = orderMineList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine({ pageNumber }));
    }, [dispatch, pageNumber]);

    return (
        <div>
            <h1>Order History</h1>
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <MessageBox variant="danger">
                            No Order History
                        </MessageBox>
                    )}
                    <div className="row center pagination">
                        {[...Array(pages).keys()].map((x) => (
                            <Link
                                key={x + 1}
                                className={x + 1 === page ? 'active' : ''}
                                to={`/orderhistory/pageNumber/${x + 1}`}
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
