import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { CountInitial, MsgCount } from '@/helpers/counting';

import './index.scss';

function TextAreaComponent({
  placeholder,
  label,
  showCount,
  ...props
}) {
  const [messageInfo, setMessageInfo] = useState(() => CountInitial());
  const { t } = useTranslation();

  useEffect(() => {
    if (showCount) {
      setMessageInfo(MsgCount(props.value || ''));
    }
  }, [props.value, showCount]);

  return (
    <div className="component-textarea">
      {label && <p className="component-textarea__label">{label}</p>}
      <div className="component-textarea__container">
        <Input.TextArea
          placeholder={placeholder}
          {...props}
        />
        {showCount &&
          <div className="msg-info-container">
            <div>
              {messageInfo.charsEntered}/{messageInfo.maxSegmentLength}&nbsp;
              {messageInfo.unicode ? t('common.unicode') : t('common.eng')}
            </div>
            <div className="num-of-msg">{messageInfo.Count} {t('common.message')}</div>
          </div>
        }
      </div>
    </div>
  );
};


TextAreaComponent.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  showCount: PropTypes.bool,
  value: PropTypes.string,
};

export default TextAreaComponent;
