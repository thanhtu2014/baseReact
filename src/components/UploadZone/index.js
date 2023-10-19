import React, { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { MAX_FILE_SIZE } from '@/constants';
import './index.scss';

const { Dragger } = Upload;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function UploadZone({
  onChangeFile
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const { t } = useTranslation();
  
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const props = {
    name: 'file',
    className: 'upload-zone',
    accept: '.jpg, .jpeg, .gif, .png',
    onPreview: handlePreview,
    listType: 'picture',
    maxCount: 1,
    multiple: false,
    beforeUpload: async (file) => {
      onChangeFile(file);
      const isJpgOrPng = file.type === 'image/jpeg'
        || file.type === 'image/png'
        || file.type === 'image/jpg'
        || file.type === 'image/gif';

      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }

      const isLtMFS = file.size / 1024 / 1024 < MAX_FILE_SIZE;

      if (!isLtMFS) {
        message.error(`Image must smaller than ${MAX_FILE_SIZE}MB!`);
      }

      return false;
    }
  };

  return (
    <div>
      <Dragger
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <span className='upload-zone__icon' />
        </p>
        <p className="upload-zone__text">{t('subcribe_payment.click_or_drag')}</p>
        <p className="upload-zone__hint">
          {`*Accepted file types: .jpg, .jpeg, .gif, .png, file size up to ${MAX_FILE_SIZE} MB`}
        </p>
      </Dragger>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

UploadZone.propTypes = {
  onChangeFile: PropTypes.func
};

export default UploadZone;
