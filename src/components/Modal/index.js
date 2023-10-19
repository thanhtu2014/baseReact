import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { ReactComponent as CloseIcon } from '@/assets/images/icons/close.svg';

import './index.scss';

function ModalComponent({
  children,
  ...props
}) {
  const modalId = uniqueId('modal-container-');

  return (
    <div className="modal-container" id={modalId}>
      <Modal
        {...props}
        centered
        closeIcon={<CloseIcon />}
        getContainer={() => document.getElementById(modalId)}
        keyboard={false}
        destroyOnClose
        maskClosable={false}
      >
        {children}
      </Modal>
    </div>
  );
}

ModalComponent.propTypes = {
  children: PropTypes.element
};

export default ModalComponent;
