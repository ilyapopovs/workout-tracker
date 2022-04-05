import { ChangeEvent, ChangeEventHandler } from 'react'

/**
 * Helper function for generating form element `onChange` handlers
 * @param setterFn - setter function returned by the `useState` hook
 */
export function set(setterFn: Function): ChangeEventHandler<HTMLInputElement> {
  return (e: ChangeEvent<HTMLInputElement>) => setterFn(e.target.value)
}
