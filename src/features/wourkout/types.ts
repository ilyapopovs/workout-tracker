export type Exercise = any // todo: narrow

export type Workout = {
  id?: string
  workoutName: string
  workoutType: 'cardio' | 'strength'
  exercises: Exercise[]
}
