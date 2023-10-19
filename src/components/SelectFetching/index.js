import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import PropsType from 'prop-types';
import { debounce } from 'lodash';

import './index.scss';

// function SelectInput({
//   label,
//   ...props
// }) {
//   return (
//     <div className='input-select'>
//       {label && <p className='hestia-input__label'>{label}</p>}
//       <Select
//         {...props}
//       />
//     </div>
//   );
// };

function SelectFetching({
  label,
  fetchOptions,
  debounceTimeout = 800,
  triggerFetching,
  isDefault,
  form,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
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
        if (isDefault) {
          /* eslint-disable react/prop-types */
          form.setFieldsValue({
            [props.name]: newOptions[0]
          });
        }
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    if (triggerFetching) {
      debounceFetcher();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFetching]);
  return (
    <div className='input-select'>
      {label && <p className='hestia-input__label'>{label}</p>}
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        showSearch
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    </div>
  );
}

SelectFetching.propTypes = {
  label: PropsType.string,
  fetchOptions: PropsType.func,
  debounceTimeout: PropsType.number,
  triggerFetching: PropsType.bool,
  isDefault: PropsType.bool,
  form: PropsType.any
};

export default SelectFetching;