import * as React from 'react';

const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};
export { useDebounce };
