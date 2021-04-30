import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const name = props.match.params.name;
    const category = props.match.params.category;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productCategoryList = useSelector(
        (state) => state.productCategoryList
    );
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            listProducts({
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
            })
        );
    }, [dispatch, name, category]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
    };

    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div style={{ paddingLeft: '1rem' }}>
                        <strong>Found {products.length} Result</strong>
                    </div>
                )}
            </div>
            <div className="row top">
                <div className="col-1" style={{ paddingLeft: '1rem' }}>
                    <h3 style={{ fontSize: '2.5rem' }}>Categories</h3>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">
                            {errorCategories}
                        </MessageBox>
                    ) : (
                        <ul>
                            {categories.map((c) => (
                                <li
                                    key={c}
                                    style={{
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    <Link
                                        className={
                                            c === category ? 'active' : ''
                                        }
                                        to={getFilterUrl({ category: c })}
                                    >
                                        <strong>{c}</strong>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
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
