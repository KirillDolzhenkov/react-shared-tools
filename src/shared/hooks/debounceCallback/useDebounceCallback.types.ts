interface ControlFunctions {
  isPending(): boolean;
}

export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((
  ...args: Parameters<T>
) => void) & ControlFunctions;