import axios from '../../axios-api';

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const GET_POST = 'GET_POST';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});
export const fetchCommentSuccess = comment => ({type: FETCH_COMMENT_SUCCESS, comment});
export const selectPost = id => ({type: GET_POST, id});

export const fetchNews = () => {
    return dispatch => {
        return axios.get('/news').then(
            response => {
                dispatch(fetchNewsSuccess(response.data));
            });
    }
};

export const fetchItem = id => {
    return dispatch => {
        return axios.get('/news/' + id).then(
            response => {
                dispatch(fetchPostSuccess(response.data));

            });
    }
};

export const fetchComment = (id) => {
    return dispatch => {
        return axios.get('/comments?news_id=' + id).then(
            response => {
                dispatch(fetchCommentSuccess(response.data));
                console.log('Коммент для 1 новости  ', response.data);
            });
    }
};

export const postNewComment = (newComment) => {
    console.log(newComment);
    return dispatch => {
        return axios.post('/comments', newComment).then(
            response => {
                console.log('Отправка комента  ', response.data);
            });
    }
};

export const createPost = newPost => {
    return dispatch => {
        return axios.post('/news', newPost).then(
            () => {
                console.log(newPost);
            });
    };
};

export const deletePost = id => {
    return dispatch => {
        return axios.delete('/news/' + id).then(
            response => {
                console.log('Произошло удаление ', response.data);
            });
    };
};