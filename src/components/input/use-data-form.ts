import { useMemo, useState } from 'react';

export function useDataForm<IState>(initialState: IState) {
  const [state, setState] = useState<IState>(initialState);

  const onChangeHandler = useMemo(
    () => (name: string, value: any) => {
      setState((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );

  return { state, onChangeHandler };
}
