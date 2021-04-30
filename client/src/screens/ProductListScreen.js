import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProduct,
    deleteProduct,
    listProducts,
} from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function ProductListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(detailsUser(userInfo._id));
        dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }, [
        createdProduct,
        dispatch,
        props.history,
        sellerMode,
        successCreate,
        successDelete,
        userInfo._id,
    ]);
    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };

    const createHandler = () => {
        if (user.seller.name) {
            dispatch({ type: USER_DETAILS_RESET });
            dispatch(createProduct());
        } else {
            if (
                window.confirm(
                    'Please fill up profile form before creating product'
                )
            ) {
                props.history.push('/profile');
            }
        }
    };

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button
                    type="button"
                    className="primary"
                    onClick={createHandler}
                >
                    Create Product
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
            )}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && (
                <MessageBox variant="danger">{errorCreate}</MessageBox>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products ? (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() =>
                                                props.history.push(
                                                    `/product/${product._id}/edit`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="small"
                                            type="button"
                                            onClick={() =>
                                                deleteHandler(product)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <MessageBox variant="danger">
                                No Product In The List
                            </MessageBox>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
