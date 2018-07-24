import { call, put, takeLatest } from 'redux-saga/effects';
import remote from '../../Services/Remote';

function* logout (action) {
    try {
        const response = yield call(remote, {
            route: '/account/logout',
            method: 'post',
            body: JSON.stringify(action.data)
        });
        if (response.success) {;
            // yield put(logoutUserSuccess());
        } else {
            // yield put(logoutUserFailure());
        }
    } catch (e) {
        console.error(e);
    }
}

export default function* watchAuth() {
    // yield takeLatest(USER_LOGOUT_REQUEST , logout);
}