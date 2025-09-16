import type { RefObject } from 'react';

export interface IUseObserverInfiniteScroll<
  T extends HTMLElement> extends Partial<
  IntersectionObserverInit
> {
    triggerRef: RefObject<T>;
    wrapperRef?: RefObject<T>;

    callBack?(): Promise<void> | void;
}