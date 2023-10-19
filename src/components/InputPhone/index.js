import React from 'react';
import PropsType from 'prop-types';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import InputComponent from '../Input';

import './index.scss';

function InputPhone({
  onChangeCountryCode,
  label,
  country,
  ...props
}) {
  const handleOnChange = (phone) => {
    if (onChangeCountryCode) {
      onChangeCountryCode(phone);
    }
  };

  return (
    <div className='input-phone'>
      {label && <p className="hestia-input__label">{label}</p>}
      <div className='input-phone__container'>
        <PhoneInput
          country={country || 'th'}
          // enableSearch
          searchPlaceholder='Search'
          specialLabel=''
          inputClass="input-phone"
          inputProps={{
            name: 'phone_number',
            required: true,
          }}
          countryCodeEditable={false}
          onChange={handleOnChange}
          onlyCountries={['th']}
          disableDropdown
        />
        <InputComponent
          type='number'
          label=''
          {...props}
        />
      </div>
    </div>
  );
}

InputPhone.propTypes = {
  country: PropsType.string,
  label: PropsType.string,
  onChangeCountryCode: PropsType.func,
};

export default InputPhone;
