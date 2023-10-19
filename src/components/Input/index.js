import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import './index.scss';

// type=number || password || string
function InputComponent({
  placeholder,
  label,
  type,
  info,
  ...props
}) {
  const [isShow, setIsShow] = useState(false);
  const [typePassword, setTypePassword] = useState('password');
  const blockInvalidChar = (e) =>
    ['e', 'E'].includes(e.key) && e.preventDefault();
  const renderInputNumber = (
    <Input
      type={type}
      onKeyDown={blockInvalidChar}
      placeholder={placeholder}
      {...props}
    />
  );
  const renderInputPhone = (
    <Input
      {...props}
      type='text'
      onKeyDown={blockInvalidChar}
      placeholder={placeholder}
    />
  );

  const renderInputDefault = (
    <Input type={type} placeholder={placeholder} {...props} />
  );

  const renderInputPassword = (
    <Input placeholder={placeholder} type={typePassword} {...props} />
  );

  const toggleShow = () => {
    if (isShow) {
      setTypePassword('password');
    } else {
      setTypePassword('string');
    }
    setIsShow(!isShow);
  };

  const renderInput = () => {
    switch (type) {
      case 'number':
        return renderInputNumber;
      case 'password':
        return renderInputPassword;
      case 'phone':
        return renderInputPhone;
      default:
        return renderInputDefault;
    }
  };

  const renderEyes = () => {
    if (isShow) {
      return <EyeOutlined className="hestia-input__eyes" onClick={toggleShow} />;
    }

    return (
      <EyeInvisibleOutlined className="hestia-input__eyes" onClick={toggleShow} />
    );
  };

  return (
    <div className="hestia-input">
      {
        label &&
        <div className="hestia-input__label">
          {label}
          {info &&
            <Tooltip title={info}>
              <span className='hestia-input__info-icon' />
            </Tooltip>
          }
        </div>
      }
      <div className='hestia-input__container'>
        {
          renderInput()
        }
        {
          type === 'password' && renderEyes()
        }
      </div>
    </div>
  );
}

InputComponent.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string
};

export default InputComponent;
