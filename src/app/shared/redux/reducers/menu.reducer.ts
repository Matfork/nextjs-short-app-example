import { AC_MENU } from '../actions/actionCreators/constants.actionCreators';
import { DbMenu } from '../../interface/db.interface';

export interface IMenuState {
  loading: boolean;
  data: DbMenu[] | null;
  error?: any;
}

const initialState: IMenuState = {
  loading: false,
  data: null,
  error: null
};

export default (
  state: IMenuState = initialState,
  { type, data }: any
): IMenuState => {
  switch (type) {
    case AC_MENU.MENU_REQUEST:
      return { ...initialState, loading: true };
    case AC_MENU.MENU_SUCCESS:
      return {
        data: data.data,
        error: null,
        loading: false
      };
    case AC_MENU.MENU_ERROR:
      return {
        data: null,
        error: data.error,
        loading: false
      };
    case AC_MENU.MENU_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};
