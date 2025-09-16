import {RefObject} from "react";

export interface IUseObserverInfiniteScroll<
    T extends HTMLElement> extends Partial<
    IntersectionObserverInit
> {
    callBack?: () => void | Promise<void>;
    triggerRef: RefObject<T>;
    wrapperRef?: RefObject<T>;
}