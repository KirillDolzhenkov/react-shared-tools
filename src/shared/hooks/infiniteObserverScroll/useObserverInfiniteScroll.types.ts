import type { RefObject } from 'react';

export interface IUseObserverInfiniteScroll<
  T extends HTMLElement> extends Partial<
  IntersectionObserverInit
> {
    triggerRef: RefObject<T | null>;
    wrapperRef?: RefObject<T | null>;

    callBack?(): Promise<void> | void;
}