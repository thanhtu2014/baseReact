import React from 'react';
import { Select } from 'antd';
import PropsType from 'prop-types';

import './index.scss';

function SelectInput({
  label,
  ...props
}) {
  return (
    <div className='input-select'>
      {label && <p className='hestia-input__label'>{label}</p>}
      <Select
        {...props}
      />
    </div>
  );
};

SelectInput.propTypes = {
  label: PropsType.string,
};

export default SelectInput;