import {
    GET_VIDEOS_REQUEST,
    GET_VIDEOS_SUCCESS,
    GET_VIDEOS_FAILURE,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from './constants';

export function getVideos (url) {
    return {
        type: GET_VIDEOS_REQUEST,
        data: url
    }
}

export function getVideosSuccess (data) {
    return {
        type: GET_VIDEOS_SUCCESS,
        data: data
    }
}

export function getVideosFailure (error) {
    return {
        type: GET_VIDEOS_FAILURE,
        data: error
    }
}

export function search (url) {
    return {
        type: SEARCH_REQUEST,
        data: url
    }
}

export function searchSuccess (data) {
    return {
        type: SEARCH_SUCCESS,
        data: data
    }
}

export function searchFailure (error) {
    return {
        type: SEARCH_FAILURE,
        data: error
    }
}