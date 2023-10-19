import React, { useMemo, useRef, useState } from 'react';
import { Empty, Spin } from 'antd';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import SelectInput from '@/components/Select';

function DebounceSelect({
  fetchOptions,
  initOption,
  debounceTimeout = 500,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState(() => initOption ? [initOption] : []);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <SelectInput
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {...props}
      options={options}
    />
  );
}

DebounceSelect.propTypes = {
  initOption: PropTypes.object,
  fetchOptions: PropTypes.func.isRequired,
  debounceTimeout: PropTypes.number,
};

export default DebounceSelect;
