import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IMenuState } from '../../../shared/redux/reducers/menu.reducer';
import './css/Menu.manage.scss';

interface MenuManageProps {
  onKeySelected: (key: number) => void;
  menu: IMenuState;
  onMenuRequest: Function;
}

const MenuManageComponent: React.SFC<MenuManageProps> = props => {
  const { onKeySelected, menu } = props;
  const [selected, setSelected] = useState<number | null>();

  const handleClick = (value: number) => {
    onKeySelected(value);
    setSelected(value);
  };

  return (
    <div className="menu-manage-component">
      {menu.data &&
        menu.data.map((el, i: number) => (
          <div
            key={i}
            className={`option ${selected === el.value ? 'selected' : ''}`}
            onClick={() => handleClick(el.value)}
          >
            {el.label}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    menu: state.menu
  };
};

 export default connect(
  mapStateToProps,
  null
)(MenuManageComponent);
