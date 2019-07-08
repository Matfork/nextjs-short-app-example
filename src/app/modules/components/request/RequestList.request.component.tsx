import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab
} from '@material-ui/core';
import { DatabaseStorageService } from '../../../shared/services/DataStorage.service';
import { DbRequest } from '../../../shared/interface/db.interface';
import './css/RequestList.request.scss';

interface RequestListRequestProps {}

const getStatusBackground = (status: string) => {
  let background;
  switch (status) {
    case 'denied':
      background = 'red';
      break;
    case 'approved':
      background = '#556cd6';
      break;
    default:
      background = '#000';
      break;
  }
  return background;
};

const RequestListRequestComponent: React.SFC<RequestListRequestProps> = () => {
  const [pendingRequests, setPendingRequests] = useState<DbRequest[]>([]);
  const [filtered, setFiltered] = useState<DbRequest[]>([]);
  const [value, setValue] = React.useState('all');

  useEffect(() => {
    const pr: DbRequest[] = DatabaseStorageService.getTableData('requests');
    setPendingRequests(pr);
    setFiltered(pr);
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    let filered = [];
    switch (newValue) {
      case 'denied':
        filered = pendingRequests.filter((el: any) => el.status === 'denied');
        break;
      case 'pending':
        filered = pendingRequests.filter((el: any) => el.status === 'pending');
        break;
      case 'approved':
        filered = pendingRequests.filter((el: any) => el.status === 'approved');
        break;
      default:
        filered = pendingRequests;
        break;
    }

    setValue(newValue);
    setFiltered(filered);
  };

  return (
    <div className="request-list-component">
      <div className="tabs">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab value="all" label="ALL" />
          <Tab value="pending" label="PENDING" />
          <Tab value="approved" label="APPROVED" />
          <Tab value="denied" label="DENIED" />
        </Tabs>
      </div>
      <div className="request-table">
        <div className="table-top"> PENDING REQUEST</div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DATE</TableCell>
              <TableCell>REASON</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {filtered.map(pr => (
              <TableRow key={pr.id}>
                <TableCell component="th" scope="row">
                  {pr.date}
                </TableCell>
                <TableCell>{pr.reason}</TableCell>
                <TableCell>
                  <span
                    className="status"
                    style={{ backgroundColor: getStatusBackground(pr.status) }}
                  >
                    {pr.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RequestListRequestComponent;
