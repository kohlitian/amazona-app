import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIS_FAIL,
    ORDER_DETAIS_REQUEST,
    ORDER_DETAIS_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAIS_REQUEST:
            return { loading: true };
        case ORDER_DETAIS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAIS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export const orderMineListReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_MINE_LIST_REQUEST:
            return { loading: true };
        case ORDER_MINE_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_MINE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
