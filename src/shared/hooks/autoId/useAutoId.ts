import { useId } from 'react';

const useAutoId = (id?: string) => {
  const generatedId = useId();

  return id ?? generatedId;
};

export default useAutoId;
