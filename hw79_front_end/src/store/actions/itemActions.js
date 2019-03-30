import axios from '../../axios-api';

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const GET_ITEM = 'GET_ITEM';

export const fetchItemsSuccess = items => ({type: FETCH_ITEMS_SUCCESS, items});
export const fetchItemSuccess = item => ({type: FETCH_ITEM_SUCCESS, item});
export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchPlacesSuccess = places => ({type: FETCH_PLACES_SUCCESS, places});
export const createItemSuccess = () => ({type: CREATE_ITEM_SUCCESS});
export const selectItem = id => ({type: GET_ITEM, id});

export const fetchItems = () => {
    return dispatch => {
        return axios.get('/items').then(
            response => {
                dispatch(fetchItemsSuccess(response.data));
            });
    }
};

export const fetchItem = id => {
    return dispatch => {
        return axios.get('/items/' + id).then(
            response => {
                dispatch(fetchItemSuccess(response.data));
                dispatch(fetchCategories(response.data));
                dispatch(fetchPlaces(response.data));
            });
    }
};

export const fetchCategories = () => {
    return dispatch => {
        return axios.get('/categories').then(
            response => {
                dispatch(fetchCategoriesSuccess(response.data));
                console.log('Категории  ', response.data);
            });
    }
};

export const fetchPlaces = () => {
    return dispatch => {
        return axios.get('/places').then(
            response => {
                dispatch(fetchPlacesSuccess(response.data));
                console.log('Места  ', response.data);
            });
    }
};

export const createItem = itemData => {
    return dispatch => {
        return axios.post('/items', itemData).then(
            () => {

                console.log(itemData);
                dispatch(createItemSuccess());
            });
    };
};