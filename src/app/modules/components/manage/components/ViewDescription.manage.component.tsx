import React, { useState, useEffect } from 'react';
import './css/ViewDescription.manage.scss';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button
} from '@material-ui/core';
import { DatabaseStorageService } from '../../../../shared/services/DataStorage.service';
import { ModesAvailable } from '../Description.manage.component';

interface ViewDescriptionManageProps {
  menuId: number;
  onChangeMode: (newMode: ModesAvailable) => void;
}

const ViewDescriptionManageComponent: React.SFC<
  ViewDescriptionManageProps
> = props => {
  const { menuId, onChangeMode } = props;

  const [desc, setDesc] = useState<DbDescription | null>(null);
  const [type, setType] = useState<string | null>(null);
  useEffect(() => {
    const desc: DbDescription = DatabaseStorageService.getTableDataBy(
      'manage.description',
      {
        id: menuId
      }
    );

    const type = desc.possibleValues
      ? desc.possibleValues.find(el => el.id === desc.type)
      : null;

    setType(type ? type.value : null);
    setDesc(desc);
  }, [menuId]);

  return desc ? (
    <div className="view-description-manage-component">
      <div className="top">
        <h1>{desc.keyName}</h1>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onChangeMode('edit')}
          >
            Edit This
          </Button>
        </div>
      </div>
      <div className="input">
        <div className="title">Description</div>
        <div className="desc">{desc.description}</div>
      </div>

      <div className="input">
        <div className="title">Type</div>
        <div className="desc">{type}</div>
      </div>

      <div className="input">
        <div className="title">Sensitivity</div>
        <div className="desc">
          {!!desc.isPersonalData
            ? 'This is personal data, and cannot be distributed in raw form'
            : 'This is general data'}
        </div>
      </div>

      <div className="possible-values">
        <div className="table-top"> POSSIBLE VALUES</div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>VALUE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {desc.possibleValues &&
              desc.possibleValues.map((pv, i: number) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {pv.value !== 'null' ? (
                      <span className="value-italic">
                        &#123;{pv.value}&#125;
                      </span>
                    ) : (
                      pv.value
                    )}
                  </TableCell>
                  <TableCell>{pv.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ) : null;
};

export default ViewDescriptionManageComponent;
