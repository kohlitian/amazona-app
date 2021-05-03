import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';

export default function SearchScreen(props) {
    const name = props.match.params.name || 'all';
    const category = props.match.params.category || 'all';
    const min = props.match.params.min || 0;
    const max = props.match.params.max || 1000000;
    const rating = props.match.params.rating || 0;
    const order = props.match.params.order || 'newest';
    var pageNumber = props.match.params.pageNumber || 1;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
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
                pageNumber,
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
                min,
                max,
                rating,
                order,
            })
        );
    }, [dispatch, name, category, min, max, rating, order, pageNumber]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterPage = filter.page || pageNumber;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    };

    return (
        <div style={{ paddingLeft: '1rem' }}>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div style={{ fontSize: '1.7rem' }}>
                        <strong>Found {products.length} Result</strong>
                    </div>
                )}
                <div>
                    <strong>Sort by</strong>{' '}
                    <select
                        style={{ padding: 0, margin: '0 1rem' }}
                        value={order}
                        onChange={(e) =>
                            props.history.push(
                                getFilterUrl({ order: e.target.value })
                            )
                        }
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Proces: Hight to Low</option>
                        <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Categories</h3>
                    <div>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">
                                {errorCategories}
                            </MessageBox>
                        ) : (
                            <ul>
                                <li>
                                    <Link
                                        className={
                                            'all' === category ? 'active' : ''
                                        }
                                        to={getFilterUrl({
                                            category: 'all',
                                            page: 1,
                                        })}
                                    >
                                        Any
                                    </Link>
                                </li>
                                {categories.map((c) => (
                                    <li key={c}>
                                        <Link
                                            className={
                                                c === category ? 'active' : ''
                                            }
                                            to={getFilterUrl({
                                                category: c,
                                                page: 1,
                                            })}
                                        >
                                            {c}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            {prices.map((p) => (
                                <li key={p.name}>
                                    <Link
                                        to={getFilterUrl({
                                            min: p.min,
                                            max: p.max,
                                            page: 1,
                                        })}
                                        className={
                                            `${p.min}-${p.max}` ===
                                            `${min}-${max}`
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        onClick={() => (pageNumber = 1)}
                                        to={getFilterUrl({
                                            rating: r.rating,
                                            page: 1,
                                        })}
                                        className={
                                            `${r.rating}` === `${rating}`
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <Rating
                                            caption={' & up'}
                                            rating={r.rating}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-3">
                    {!products || products.length === 0 ? (
                        <MessageBox>No Product Found</MessageBox>
                    ) : (
                        <>
                            <div className="row center">
                                {products.map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                            <div className="row center pagination">
                                {[...Array(pages).keys()].map((x) => (
                                    <Link
                                        className={
                                            x + 1 === page ? 'active' : ''
                                        }
                                        key={x + 1}
                                        to={getFilterUrl({ page: x + 1 })}
                                    >
                                        {x + 1}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
