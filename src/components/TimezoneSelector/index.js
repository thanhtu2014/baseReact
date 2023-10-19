import React from 'react';
import { useTimezoneSelect, allTimezones } from 'react-timezone-select';
import SelectInput from '../Select';

const labelStyle = 'original';
const timezones = {
  ...allTimezones,
};

function TimezoneSelector({
  ...props
}) {
  const { options } = useTimezoneSelect({ labelStyle, timezones });

  return (
    <SelectInput
      showSearch
      options={options}
      {...props}
    />
  );
}

export default TimezoneSelector;
