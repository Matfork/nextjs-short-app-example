import React from 'react';
import * as _ from 'lodash';
import { FieldProps } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import './css/RenderInputs.scss';
import { CheckboxProps } from '@material-ui/core/Checkbox';

export const RTextField: React.SFC<FieldProps<any> & TextFieldProps> = ({
  label,
  field,
  form: { dirty, touched, errors },
  margin = 'none',
  fullWidth = false,
  ...other
}) => {
  const errorText = errors[field.name];
  const hasError = dirty && touched[field.name] && errorText !== undefined;
  return (
    <TextField
      label={label}
      error={hasError}
      helperText={hasError ? errorText : ''}
      margin={margin}
      fullWidth={fullWidth}
      {...field}
      {...other}
    />
  );
};

export class RSelect extends React.PureComponent<
  FieldProps<any> &
    SelectProps & {
      options: any[];
      label?: string;
      selectFields?: {
        label: string;
        value: string;
      };
    }
> {
  render() {
    const {
      required = false,
      label,
      form: { dirty, touched, errors },
      field: { name, onChange, value },
      options,
      fullWidth = false,
      margin = 'none',
      selectFields = {
        label: 'label',
        value: 'value'
      },
      ...other
    } = this.props;
    const id = `sel_${name}`;
    const errorText = errors[name];
    const hasError = dirty && touched[name] && errorText !== undefined;

    return (
      <FormControl
        fullWidth={fullWidth}
        margin={margin}
        required={required}
        error={hasError}
      >
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <Select
          onChange={onChange}
          value={value}
          required={required}
          inputProps={{
            name,
            id: `input_${id}`
          }}
          {...other}
        >
          {options.map((item: any) => (
            <MenuItem
              key={`${id}_${item[selectFields.value]}`}
              value={item[selectFields.value]}
            >
              {item[selectFields.label]}
            </MenuItem>
          ))}
        </Select>
        {hasError && <FormHelperText>{errorText}</FormHelperText>}
      </FormControl>
    );
  }
}

export const RCheckboxField: React.SFC<
  FieldProps<any> &
    CheckboxProps & {
      label?: string;
      fullWidth: boolean;
      margin: 'none' | 'dense' | 'normal';
    }
> = ({
  required = false,
  fullWidth = false,
  margin = 'none',
  label,
  field,
  form: { dirty, touched, errors },
  ...other
}) => {
  const errorText = errors[field.name];
  const hasError = dirty && touched[field.name] && errorText !== undefined;

  return (
    <FormControl
      fullWidth={fullWidth}
      margin={margin}
      required={required}
      error={hasError}
    >
      <FormControlLabel
        control={
          <Checkbox
            value="checkedA"
            inputProps={{
              'aria-label': label
            }}
            {...field}
            {...other}
          />
        }
        label={label}
      />
    </FormControl>
  );
};
