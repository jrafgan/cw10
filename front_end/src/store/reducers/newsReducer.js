import {
    FETCH_POST_SUCCESS,
    FETCH_NEWS_SUCCESS,
    FETCH_COMMENT_SUCCESS,
    GET_POST
} from "../actions/newsActions";

const initialState = {
    news: [],
    comment: null,
    post: null,
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_SUCCESS:
            return {...state, news: action.news};

        case FETCH_POST_SUCCESS:
            return {...state, post: action.post};

        case FETCH_COMMENT_SUCCESS:
            return {...state, comment: action.comment};

        default:
            return state;
    }
};

export default newsReducer;