/* eslint-env jest */
import React from 'react';
import RequestListRequestComponent from '../../src/app/modules/components/request/RequestList.request.component';
import { mount } from 'enzyme';
import { DatabaseStorageService } from '../../src/app/shared/services/DataStorage.service';
import { DbRequest } from '../app/shared/interface/db.interface';

describe('Request Page', () => {
  describe('All Request', () => {
    it('should display pending request', async function() {
      await DatabaseStorageService.initialize();
      const wrap = mount(<RequestListRequestComponent />);
      expect(wrap.find('tbody.table-body').html()).toMatchSnapshot();
    });
  });

  describe('Filtered denied Request', () => {
    it('should display denied request', async function() {
      await DatabaseStorageService.initialize();

      const pr: DbRequest[] = DatabaseStorageService.getTableData('requests');
      const filered = pr.filter((el: any) => el.status === 'denied');

      // doenst work when Component to spy is a functional component instead of a class component
      //   const spy = jest.spyOn(
      //     RequestListRequestComponent.prototype,
      //     'handleChange'
      //   );
      const wrap = mount(<RequestListRequestComponent />);

      wrap
        .find('div.MuiTabs-flexContainer button')
        .at(3)
        .simulate('click');

      //   expect(spy).toHaveBeenCalledTimes(1);

      expect(wrap.find('tbody.table-body tr')).toHaveLength(filered.length);
      expect(wrap.find('tbody.table-body').html()).toMatchSnapshot();
    });
  });
});
