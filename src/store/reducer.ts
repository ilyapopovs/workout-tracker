import { authReducer } from '../features/auth/store/authSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({ auth: authReducer })
