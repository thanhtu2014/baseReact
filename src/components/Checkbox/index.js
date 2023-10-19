import { Checkbox } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function CheckboxInput({
  children,
  ...props
}) {
  return (
    <div className='checkbox-input'>
      <Checkbox
        {...props}
      >
        {children}
      </Checkbox>
    </div>
  );
}

CheckboxInput.propTypes = {
  children: PropTypes.any,
};

export default CheckboxInput;