import { GET_VIDEOS_REQUEST, GET_VIDEOS_SUCCESS, GET_VIDEOS_FAILURE } from './constants';

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