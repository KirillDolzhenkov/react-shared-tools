interface ControlFunctions {
  isPending(): boolean;
  cancel(): void;
  flush(): void;
}

export type DebouncedState<F extends (...args: any[]) => ReturnType<F>> = ((
  ...args: Parameters<F>
) => void) & ControlFunctions;