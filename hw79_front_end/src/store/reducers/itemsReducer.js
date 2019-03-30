import {
    FETCH_CATEGORIES_SUCCESS,
    FETCH_ITEM_SUCCESS,
    FETCH_ITEMS_SUCCESS,
    FETCH_PLACES_SUCCESS,
    GET_ITEM
} from "../actions/itemActions";

const initialState = {
    items: [],
    categories: [],
    places: [],
    item: null,
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_SUCCESS:
            return {...state, items: action.items};

        case FETCH_ITEM_SUCCESS:
            return {...state, item: action.item};

        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.categories};

        case FETCH_PLACES_SUCCESS:
            return {...state, places: action.places};

        case GET_ITEM:
            console.log(action.id);
            const ndx = state.items.findIndex(item=>item.id == action.id);
            console.log(ndx);
            return {...state, item: state.items[ndx]};

        default:
            return state;
    }
};

export default itemsReducer;