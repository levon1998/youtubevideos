import { all } from 'redux-saga/effects';
import watchAuthSaga from '../Containers/AppWrapper/saga';

export default function* () {
    yield all([
        watchAuthSaga()
    ]);
}