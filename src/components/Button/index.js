import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

// type= 'primary' || 'black' || 'default'

function ButtonComponent({
  children,
  ...props
}) {
  return (
    <div className="button-container">
      <Button
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

ButtonComponent.propTypes = {
  children: PropTypes.any,
};

export default ButtonComponent;
