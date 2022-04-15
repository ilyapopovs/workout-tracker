import { configureStore } from '@reduxjs/toolkit'
import { isProd } from '../helpers/envHelpers'
import authReducer from '../features/auth/store/authSlice'
import workoutReducer from '../features/wourkout/store/workoutSlice'

export const store = configureStore({
  devTools: !isProd,
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
  },
})
