import { ChangeEvent, ChangeEventHandler } from 'react'

type HTMLElementWithTargetValue = HTMLElement & { value: string }

/**
 * Helper function for generating form element `onChange` handlers
 * @param setterFn - setter function returned by the `useState` hook
 */
export function set<T extends HTMLElementWithTargetValue>(
  setterFn: Function,
): ChangeEventHandler<T> {
  return (e: ChangeEvent<T>) => setterFn(e.target.value)
}
