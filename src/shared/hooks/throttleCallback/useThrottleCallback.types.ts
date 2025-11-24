interface ThrottleControlFunctions {
  isPending(): boolean;

  cancel(): void;

  flush(): void;
}

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export type ThrottledState<F extends (...args: any[]) => ReturnType<F>> = ((
  ...args: Parameters<F>
) => void) & ThrottleControlFunctions;