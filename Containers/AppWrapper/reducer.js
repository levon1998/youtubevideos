import {GET_VIDEOS_REQUEST, GET_VIDEOS_SUCCESS, GET_VIDEOS_FAILURE} from './constants';

const initialState = {
    videoList: {},
    loading: false,
    errorMessage: undefined
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOS_REQUEST :
            return Object.assign({}, state, {loading: true});
        case GET_VIDEOS_SUCCESS :
            return Object.assign({}, state, {loading: false, videoList: action.data, errorMessage: undefined});
        case GET_VIDEOS_FAILURE :
            return Object.assign({}, state, {loading: false, videoList: {}, errorMessage: action.data});
        default:
            return state;
    }
};

export default authReducer;