import type { Workout } from '../types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  workouts: [] as Workout[],
}

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkouts(state, action: { payload: Workout[]; type: string }) {
      state.workouts = action.payload
    },
    addWorkout(state, action: { payload: Workout; type: string }) {
      state.workouts.push(action.payload)
    },
  },
})

export const { setWorkouts, addWorkout } = workoutSlice.actions
export default workoutSlice.reducer
