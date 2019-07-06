import { AC_MENU } from './actionCreators/constants.actionCreators';

// Login Methods
export const onMenuRequest = (
  data: any
  // setErrors: any,
  // setSubmitting: any
) => ({
  type: AC_MENU.MENU_REQUEST,
  data
  // setErrors,
  // setSubmitting
});
export const onMenuSuccess = (data: any) => ({
  type: AC_MENU.MENU_SUCCESS,
  data
});
export const onMenuError = (data: any) => ({
  type: AC_MENU.MENU_ERROR,
  data
});
export const onMenuClear = () => ({
  type: AC_MENU.MENU_CLEAR
});
