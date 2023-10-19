export const getLanguageName = (code) => {
  switch (code) {
    case 'en_US':
      return 'English';
    case 'th':
      return 'Thailand';
    default:
      return null;
  }
};
