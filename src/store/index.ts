import { createStore, StoreEnhancer } from '@reduxjs/toolkit'
import { rootReducer } from './reducer'

let enhancer: StoreEnhancer | undefined = undefined

if (import.meta.env.ENVIRONMENT !== 'production') {
  const { composeWithDevTools } = await import('redux-devtools-extension')
  enhancer = composeWithDevTools()
}

export const store = createStore(rootReducer, undefined, enhancer)
