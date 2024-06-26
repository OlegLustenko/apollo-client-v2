import { useEffect } from 'react';

export const useOnBeforeUnloadEffect = (
  invariant: boolean,
  text?: 'Your data will be lost, are you sure?',
) => {
  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!invariant) {
        return;
      }

      event?.preventDefault();
      return text;
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [invariant, text]);
};
