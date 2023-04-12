import { useRef, useEffect } from 'react';

/**
 * usePrevious hook
 *
 * This hook is used to track the previous version of a variable from a prior
 * render for the purposes of conditionally updating aspects of a component based on
 * whether particular variables have changed.
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export const usePrevious = <T extends {}>(value: T): T | undefined => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef<T>();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
};
