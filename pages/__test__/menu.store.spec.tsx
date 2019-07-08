import configureStore from 'redux-mock-store';
import * as menuActions from '../../src/app/shared/redux/actions/menu.actions';
import * as menuReducers from '../../src/app/shared/redux/reducers/menu.reducer';
import * as menuActionCreators from '../../src/app/shared/redux/actions/actionCreators/constants.actionCreators';

const mockStore = configureStore();
const store = mockStore();

describe('menu_actions', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    // const expectedActions = [
    //   {
    //     data: '',
    //     type: menuActionCreators.AC_MENU.MENU_REQUEST
    //   }
    // ];

    store.dispatch(menuActions.onMenuRequest(''));
    //expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('menu_reducer', () => {
  describe('INITIAL_STATE', () => {
    test('is correct', () => {
      const action = { type: '' };
      const initialState = {
        loading: false,
        data: null,
        error: null
      };

      expect(menuReducers.default(undefined, action)).toEqual(initialState);
    });
  });

  describe('MENU_REQUEST', () => {
    test('returns correct data', () => {
      const action = {
        type: menuActionCreators.AC_MENU.MENU_REQUEST,
        data: {}
      };
      const expectedState = { data: null, error: null, loading: true };
      expect(menuReducers.default(undefined, action)).toEqual(expectedState);
    });
  });

  describe('MENU_SUCCESS', () => {
    test('returns correct data', () => {
      const menu = [
        {
          value: 1,
          label: 'user_id'
        },
        {
          value: 2,
          label: 'item_id'
        },
        {
          value: 3,
          label: 'user_email'
        },
        {
          value: 4,
          label: 'item_views'
        },
        {
          value: 5,
          label: 'item_favorites'
        }
      ];

      const action = {
        type: menuActionCreators.AC_MENU.MENU_SUCCESS,
        data: {
          data: menu
        }
      };

      // const expectedState = {
      //   data: menu,
      //   error: null,
      //   loading: false
      // };
      //expect(menuReducers.default(undefined, action)).toEqual(expectedState);
      expect(menuReducers.default(undefined, action)).toMatchSnapshot();
    });
  });
});
