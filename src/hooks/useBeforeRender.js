import { useEffect, useState } from 'react';

export const useBeforeRender = (callback, deps) => {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
    callback();
    setIsRun(true);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setIsRun(false), deps);
};