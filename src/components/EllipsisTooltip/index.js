import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

function EllipsisTooltip({
  children,
  title,
}) {
  const [visible, setVisible] = useState(false);
  const container = useRef(null);

  const handleVisibleChange = (updatedVisible) => {
    if (container.current.clientWidth < container.current.scrollWidth) {
      setVisible(updatedVisible);
    }
  };

  return (
    <Tooltip
      placement="topLeft"
      open={visible}
      onOpenChange={handleVisibleChange}
      title={title}
    >
      <div
        ref={container}
        className="ellipsis-text"
      >
        {children}
      </div>
    </Tooltip>
  );
}

EllipsisTooltip.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string]),
};

export default EllipsisTooltip;
