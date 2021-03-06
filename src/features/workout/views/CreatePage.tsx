import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { set } from '../../../helpers/formHelpers'
import greenTrashIcon from '/images/trash-light-green.png'
import { supabase } from '../../../supabaseClient'
import { Exercise } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkout } from '../store/workoutSlice'
import type { User } from '@supabase/supabase-js'

const CreatePage = () => {
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [workoutName, setWorkoutName] = useState('')
  const [workoutType, setWorkoutType] = useState('')
  const [exercises, setExercises] = useState([] as Exercise[])
  const user = useSelector((store: any) => store.auth.user) as User
  const dispatch = useDispatch()

  const createWorkout = async (e: FormEvent) => {
    e.preventDefault()

    const response = await supabase
      .from('workouts')
      .insert([{ workoutName, workoutType, exercises, user_id: user.id }])

    if (response.error) {
      setErrorMessage('Something went wrong!')
      console.error(response.error)

      return
    }

    const responseWorkout = response.body[0]

    dispatch(addWorkout(responseWorkout))
    setStatusMessage('Success: Workout created!')
    setErrorMessage('')
    setWorkoutName('')
    setWorkoutType('')
    setExercises([])
  }

  const addExercise = () => setExercises([...exercises, { id: Date.now() }])
  const deleteExercise = (id: number) =>
    setExercises(exercises.filter((e) => e.id !== id))
  const setExerciseField =
    (exercise: Exercise, fieldName: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let modifiedArray = [
        ...exercises.filter((ex) => ex.id !== exercise.id),
        {
          ...exercise,
          [fieldName]: e.target.value,
        },
      ]
      modifiedArray.sort((a: Exercise, b: Exercise) => a.id - b.id)
      setExercises(modifiedArray)
    }

  useEffect(() => {
    setExercises([{ id: Date.now() }])
  }, [workoutType])

  return (
    <>
      <div className="max-w-screen-md mx-auto px-4 py-10">
        {(errorMessage || statusMessage) && (
          <div className="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
            <p className="text-at-light-green">{statusMessage}</p>
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )}

        <div className="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
          <form
            onSubmit={createWorkout}
            className="flex flex-col gap-y-5 w-full"
          >
            <h1 className="text-2xl text-at-light-green">Record Workout</h1>

            <div className="flex flex-col">
              <label
                htmlFor="workout-name"
                className="mb-1 text-sm text-at-light-green"
              >
                Workout Name
              </label>
              <input
                id="workout-name"
                onChange={set(setWorkoutName)}
                type="text"
                required
                className="p-2 text-gray-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="workout-type"
                className="mb-1 text-sm text-at-light-green"
              >
                Workout Type
              </label>
              <select
                id="workout-type"
                onChange={set(setWorkoutType)}
                className="p-2 text-gray-500 focus:outline-none"
                required
              >
                <option value="">Select Workout</option>
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>

            {workoutType === 'strength' && (
              <div className="flex flex-col gap-y-4">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                  >
                    <div className="flex flex-col md:w-1/3">
                      <label
                        htmlFor="exercise-name"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Exercise
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'exercise')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="sets"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Sets{' '}
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'sets')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="reps"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Reps{' '}
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'reps')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="weight"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Weight (kg / lb)
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'weight')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <img
                      onClick={() => deleteExercise(exercise.id)}
                      src={greenTrashIcon}
                      className="h-4 w-auto absolute -left-5 cursor-pointer"
                      alt=""
                    />
                  </div>
                ))}
                <button
                  onClick={addExercise}
                  type="button"
                  className="mt-6 py-2 px-6 rounded-sm self-start text-sm
                                text-white bg-at-light-green duration-200 border-solid
                                border-2 border-transparent hover:border-at-light-green hover:bg-white
                                hover:text-at-light-green"
                >
                  Add Exercise
                </button>
              </div>
            )}

            {workoutType === 'cardio' && (
              <div className="flex flex-col gap-y-4">
                {exercises.map((exercise) => (
                  <div
                    className="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                    key={exercise.id}
                  >
                    <div className="flex flex-col md:w-1/3">
                      <label
                        htmlFor="cardio-type"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Type
                      </label>
                      <select
                        id="cardio-type"
                        onChange={setExerciseField(exercise, 'cardioType')}
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      >
                        <option value="#">Select Type</option>
                        <option value="run">Runs</option>
                        <option value="walk">Walk</option>
                      </select>
                    </div>
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="distance"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Distance
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'distance')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="duration"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Duration
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'duration')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="pace"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Pace{' '}
                      </label>
                      <input
                        onChange={setExerciseField(exercise, 'pace')}
                        required
                        type="text"
                        className="p-2 w-full text-gray-500 focus:outline-none"
                      />
                    </div>
                    <img
                      onClick={() => deleteExercise(exercise.id)}
                      src={greenTrashIcon}
                      className="h-4 w-auto absolute -left-5 cursor-pointer"
                      alt=""
                    />
                  </div>
                ))}
                <button
                  onClick={addExercise}
                  type="button"
                  className="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
                >
                  Add Exercise
                </button>
              </div>
            )}
            <button
              type="submit"
              className="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
            >
              Record Workout
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePage
