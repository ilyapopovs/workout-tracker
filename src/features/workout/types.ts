type StrengthExercise = {
  id: number
  exercise?: string
  sets?: string
  reps?: string
  weight?: string
}

type CardioExercise = {
  id: number
  cardioType?: string
  distance?: string
  duration?: string
  pace?: string
}

export type Exercise = StrengthExercise & CardioExercise

export type Workout = {
  id?: string
  workoutName: string
  workoutType: 'cardio' | 'strength'
  exercises: Exercise[]
}
