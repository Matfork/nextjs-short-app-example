import {
  call,
  put,
  //takeEvery,
  takeLatest
} from 'redux-saga/effects';

import { onMenuError, onMenuSuccess } from '../actions/menu.actions';
import { AC_MENU } from '../actions/actionCreators/constants.actionCreators';
import { MenuService } from '../../services/Menu.service';

function* doMenuRequest(params: any) {
  const response = yield call(MenuService.getInstance().getMenuData);
  if (response.error) {
    // params.setSubmitting(false);
    // params.setErrors({['user']: response.error.details})
    return yield put(onMenuError(response));
  }
  // params.setSubmitting(false);
  return yield put(onMenuSuccess(response));
}

export function* menuSaga() {
  yield takeLatest(AC_MENU.MENU_REQUEST, doMenuRequest);
}
