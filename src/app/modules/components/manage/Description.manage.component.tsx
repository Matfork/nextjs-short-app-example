import React, { useState, useEffect } from 'react';
import ViewDescriptionManageComponent from './components/ViewDescription.manage.component';
import EditDescriptionManageComponent from './components/EditDescription.manage.component';
import './css/Description.manage.scss';

interface DescriptionManageProps {
  menuId: number | null;
}

export type ModesAvailable = 'read' | 'edit';

const DescriptionManageComponent: React.SFC<DescriptionManageProps> = props => {
  const { menuId } = props;
  const [mode, setMode] = useState<ModesAvailable>('read');

  useEffect(() => {
    setMode('read');
  }, [props.menuId]);

  const handleChangeMode = (newMode: ModesAvailable) => {
    setMode(newMode);
  };

  return (
    <div className="description-manage-component">
      {menuId && (
        <React.Fragment>
          {mode === 'read' ? (
            <ViewDescriptionManageComponent
              menuId={menuId}
              onChangeMode={(newMode: ModesAvailable) =>
                handleChangeMode(newMode)
              }
            />
          ) : (
            <EditDescriptionManageComponent
              menuId={menuId}
              onChangeMode={(newMode: ModesAvailable) =>
                handleChangeMode(newMode)
              }
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default DescriptionManageComponent;
