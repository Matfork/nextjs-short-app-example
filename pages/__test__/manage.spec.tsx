import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Manage from '../../pages/manage';
import MenuManageComponent from '../../src/app/modules/components/manage/Menu.manage.component';
import configureStore from 'redux-mock-store';
import { DatabaseStorageService } from '../../src/app/shared/services/DataStorage.service';
import ViewDescriptionManageComponent from '../../src/app/modules/components/manage/components/ViewDescription.manage.component';

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

describe('Mage', () => {
  describe('Menu', () => {
    it('should have same length for menu', async function() {
      await DatabaseStorageService.initialize();
      const data = await DatabaseStorageService.getTableData('manage.menu');

      const wrap = shallow(<MenuManageComponent />, {
        context: { store }
      }).dive();
      //console.log(wrap.find('div.menu-manage-component .option').length);
      expect(wrap.find('div.menu-manage-component .option')).toHaveLength(
        data.length
      );
    });
  });

  // describe('Description', () => {
  //   it('should have description, type, sensitivity', async function() {
  //     await DatabaseStorageService.initialize();
  //     const menuData = await DatabaseStorageService.getTableData('manage.menu');
  //     const setRouteHook = jest.fn();

  //     const wrap = shallow(<Manage params={{ router: setRouteHook }} />, {
  //       context: { store }
  //     });

  //     console.log(wrap.html());

  //     //const wrapMenuManage = mount(<MenuManageComponent />);
  //     // console.log(wrapMenuManage.html());

  //     // wrapMenuManage
  //     //   .find('div.menu-manage-component .option')
  //     //   .at(0)
  //     //   .simulate('click');

  //     // expect(
  //     //   wrapMenuManage.find('div.menu-manage-component .option').at(0)
  //     // ).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('ViewDescription', () => {
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
