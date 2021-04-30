import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const name = props.match.params.name;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name : '' }));
    }, [dispatch, name]);

    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{products.length} Result</div>
                )}
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    <ul>
                        <li>Category 1</li>
                    </ul>
                </div>
                <div className="col-3">
                    <>
                        {!products ? (
                            <MessageBox>No Product Found</MessageBox>
                        ) : (
                            <div className="row center">
                                {products.map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}
