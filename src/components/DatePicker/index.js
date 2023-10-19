import React from 'react';
import { DatePicker } from 'antd';

import './index.scss';

const { RangePicker } = DatePicker;

const dateFormat = 'DD-MM-YYYY';

function DatePickerComponent({
  ...props
}) {
  return (
    <div className="date-picker-container">
      <RangePicker
        {...props}
        format={dateFormat}
      />
    </div>
  );
};

DatePickerComponent.propTypes = {
};

export default DatePickerComponent;
