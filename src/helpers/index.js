import spacetime from 'spacetime';

export * as Language from './language';

export const renderTimeZoneString = (tzName) => {
  if (!tzName) {
    return null;
  }

  const tz = spacetime.now(tzName).timezone();
  const min = tz.current.offset * 60;

  // eslint-disable-next-line no-bitwise
  const hr = `${(min / 60 ^ 0)}:${min % 60 === 0 ? '00' : Math.abs(min % 60)}`;
  const result = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${tzName}`;

  return result;
};
