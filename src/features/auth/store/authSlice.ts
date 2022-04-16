import { createSlice } from '@reduxjs/toolkit'
import { supabase } from '../../../supabaseClient'

const initialState = {
  user: supabase.auth.user(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
