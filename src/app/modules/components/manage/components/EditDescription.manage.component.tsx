import React, { useState, useEffect } from 'react';
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
import { Formik, Field, FieldArray } from 'formik';
import {
  RTextField,
  RSelect,
  RCheckboxField
} from '../../../../shared/utils/formik/RenderInputs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onMenuRequest } from '../../../../shared/redux/actions/menu.actions';
import './css/EditDescription.manage.scss';

interface EditDescriptionManageProps {
  menuId: number;
  onChangeMode: (newMode: ModesAvailable) => void;
  onMenuRequest: Function;
}

const EditDescriptionManageComponent: React.SFC<
  EditDescriptionManageProps
> = props => {
  const { menuId, onChangeMode, onMenuRequest } = props;
  const [desc, setDesc] = useState<DbDescription | null>(null);

  useEffect(() => {
    const desc: DbDescription = DatabaseStorageService.getTableDataBy(
      'manage.description',
      {
        id: menuId
      }
    );

    setDesc(desc);
  }, [menuId]);

  return desc ? (
    <div className="edit-description-manage-component">
      <Formik
        initialValues={{
          keyName: desc.keyName,
          type: desc.type,
          description: desc.description,
          isPersonalData: desc.isPersonalData,
          possibleValues: desc.possibleValues
        }}
        onSubmit={(values, actions) => {
          values.possibleValues.forEach((el, i: number) => {
            if (!el.id) {
              el.id = i;
            }
          });

          // Following section could also be done in a saga method and update data manually
          // in reducer, then onMenuRequest() wouldn't be needed (like here it is needed) but you will need to find a wait
          // to know where the saga side effect is finished and state already update in order to call onChangeMode('read');
          // You can do that using 'componentDidUpdate' or 'useEffect' and checking for the updated prop from redux
          if (desc.keyName !== values.keyName) {
            DatabaseStorageService.update(
              'manage.menu',
              {
                value: menuId
              },
              {
                label: values.keyName
              }
            );
          }

          DatabaseStorageService.update(
            'manage.description',
            {
              id: menuId
            },
            {
              ...values
            }
          );

          onMenuRequest();

          onChangeMode('read');
        }}
        render={props => (
          <React.Fragment>
            <div className="top">
              <div className="input">
                <div className="title">Key Name</div>
                <div className="desc">
                  <Field
                    type="text"
                    name="keyName"
                    placeholder=""
                    style={{ margin: '0 auto', display: 'block' }}
                    component={RTextField}
                  />
                </div>
              </div>

              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    props.submitForm();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="input">
              <div className="title">Description</div>
              <div className="desc">
                <Field
                  type="text"
                  name="description"
                  style={{ margin: '0 auto', display: 'block' }}
                  component={RTextField}
                  multiline={true}
                  fullWidth={true}
                />
              </div>
            </div>

            <div className="input">
              <div className="title">Type</div>
              <div className="desc">
                <Field
                  required
                  name="type"
                  //label="Type"
                  options={desc.possibleValues}
                  selectFields={{
                    label: 'value',
                    value: 'id'
                  }}
                  className="type-select"
                  component={RSelect}
                />
              </div>
            </div>

            <div className="input">
              <div className="desc">
                <Field
                  type="checkbox"
                  name="isPersonalData"
                  style={{ margin: '0 auto', display: 'block' }}
                  label="Is this personal data?"
                  checked={!!props.values.isPersonalData}
                  component={RCheckboxField}
                />
              </div>
            </div>

            <div className="possible-values">
              <div className="table-top"> POSSIBLE VALUES</div>

              <FieldArray
                name="possibleValues"
                render={({ push, remove }) => (
                  <React.Fragment>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>VALUE</TableCell>
                          <TableCell>DESCRIPTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.values.possibleValues &&
                          props.values.possibleValues.map((pv, i: number) => (
                            <TableRow key={i}>
                              <TableCell component="th" scope="row">
                                <Field
                                  type="text"
                                  name={`possibleValues[${i}].value`}
                                  placeholder=""
                                  multiline={true}
                                  style={{ margin: '0 auto', display: 'block' }}
                                  component={RTextField}
                                />
                              </TableCell>
                              <TableCell>
                                <Field
                                  type="text"
                                  name={`possibleValues[${i}].description`}
                                  placeholder=""
                                  multiline={true}
                                  style={{ margin: '0 auto', display: 'block' }}
                                  component={RTextField}
                                />
                              </TableCell>

                              {pv.isDefault === false && (
                                <TableCell>
                                  <Button
                                    type="button"
                                    onClick={() => remove(i)} // remove a friend from the list
                                  >
                                    -
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>

                    <Button
                      color="primary"
                      onClick={() =>
                        push({ value: '', description: '', isDefault: false })
                      }
                    >
                      + Add possible value
                    </Button>
                  </React.Fragment>
                )}
              />
            </div>
          </React.Fragment>
        )}
      />
    </div>
  ) : null;
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ onMenuRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(EditDescriptionManageComponent);
