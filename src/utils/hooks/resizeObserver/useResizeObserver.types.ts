export type UseResizeCallback = (
    entry: ResizeObserverEntry,
    observer: ResizeObserver,
) => any;
export interface UseResizeProps {
    callback: UseResizeCallback;
    targetRef?: Element | null;
}