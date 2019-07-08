/* eslint-env jest */
import * as React from 'react';
import { mount } from 'enzyme';
import { DatabaseStorageService } from '../src/app/shared/services/DataStorage.service';
import { Provider } from 'react-redux';
import MenuManageComponent from '../src/app/modules/components/manage/Menu.manage.component';
import configureStore from 'redux-mock-store';
import ViewDescriptionManageComponent from '../src/app/modules/components/manage/components/ViewDescription.manage.component';
import { DbDescription } from '../src/app/shared/interface/db.interface';

const mockStore = configureStore();
const initialState = {
  menu: {
    data: [
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
    ]
  }
};
const store = mockStore(initialState);

describe('Manage Page', () => {
  // describe('Manage Page', () => {
  //   it('should render full page', async function() {
  //     const wrap = shallow(
  //       <Container>
  //         <Provider store={store}>
  //           <Manage />
  //         </Provider>
  //       </Container>
  //     );

  //     expect(wrap.html()).toBeDefined();
  //   });
  // });

  describe('Menu Component', () => {
    it('should have same length for menu', async function() {
      await DatabaseStorageService.initialize();
      const data = await DatabaseStorageService.getTableData('manage.menu');
      const onMenuRequest = jest.fn();
      const onKeySelected = jest.fn();

      // https://github.com/airbnb/enzyme/issues/2165
      // const wrap = shallow(
      //   <Provider store={store}>
      //     <MenuManageComponent
      //       onMenuRequest={onMenuRequest}
      //       onKeySelected={onKeySelected}
      //     />
      //   </Provider>
      // ).dive();

      const wrap = mount(
        <Provider store={store}>
          <MenuManageComponent
            onMenuRequest={onMenuRequest}
            onKeySelected={onKeySelected}
          />
        </Provider>
      );

      //console.log(wrap.find('div.menu-manage-component .option').length);
      expect(wrap.find('div.menu-manage-component .option')).toHaveLength(
        data.length
      );
    });
  });

  describe('ViewDescription Component', () => {
    it('should have description, type, sensitivity', async function() {
      await DatabaseStorageService.initialize();
      const desc: DbDescription = DatabaseStorageService.getTableDataBy(
        'manage.description',
        {
          id: 1
        }
      );

      const type = desc.possibleValues
        ? desc.possibleValues.find(el => el.id === desc.type)
        : null;

      const onChangeMode = jest.fn();
      const wrap = mount(
        <ViewDescriptionManageComponent
          menuId={1}
          onChangeMode={onChangeMode}
        />
      );

      expect(
        wrap
          .find('div.input')
          .at(0)
          .find('.desc')
          .text()
      ).toEqual(desc.description);

      expect(
        wrap
          .find('div.input')
          .at(1)
          .find('.desc')
          .text()
      ).toEqual(type ? type.value : null);

      expect(
        wrap
          .find('div.input')
          .at(2)
          .find('.desc')
          .text()
      ).toEqual(
        !!desc.isPersonalData
          ? 'This is personal data, and cannot be distributed in raw form'
          : 'This is general data'
      );
    });
  });
});
