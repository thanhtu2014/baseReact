import i18n from '@/i18n';

export const translationCode = code => {
  const translation = i18n.t;
  if (!code) {
    return {
      title: translation('unknown_message')
    };
  }
  return {
    title: translation(`error_code.${code}.title`),
    desc: translation(`error_code.${code}.desc`)
  };
};


export const translationMessage = code => {
  const translation = i18n.t;
  if (!code) {
    return {
      title: translation('unknown_message')
    };
  }
  return {
    title: translation(`success_code.${code}.title`),
    desc: translation(`success_code.${code}.desc`)
  };
};
