import remote from '../../Services/Remote';
import {GET_VIDEOS_REQUEST} from './constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import {getVideosSuccess, getVideosFailure} from './actions';

function* getVideos (action) {
    try {
        const response = yield call(remote, {
            route: action.data, //action.data is the url
            method: 'GET',
        });
        if (response.success) {
            yield put(getVideosSuccess(response.data));
        } else {
            yield put(getVideosFailure(response));
        }
    } catch (e) {
        console.error(e);
    }
}

export default function* watchAuth() {
    yield takeLatest(GET_VIDEOS_REQUEST , getVideos);
}