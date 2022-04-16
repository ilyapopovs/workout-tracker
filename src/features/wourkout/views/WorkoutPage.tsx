import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Exercise } from '../types'
import { supabase } from '../../../supabaseClient'
import pencilIcon from '/images/pencil-light.png'
import trashIcon from '/images/trash-light.png'
import greenTrashIcon from '/images/trash-light-green.png'
import greenRunnerIcon from '/images/running-light-green.png'
import greenDumbbellIcon from '/images/dumbbell-light-green.png'
import { set } from '../../../helpers/formHelpers'

const WorkoutPage = () => {
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [workoutName, setWorkoutName] = useState('')
  const [workoutType, setWorkoutType] = useState('')
  const [exercises, setExercises] = useState([] as Exercise[])
  const user = useSelector((state: any) => state.auth.user)

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

  const { workoutId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const { data: workouts, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('id', workoutId)

      if (error) {
        setErrorMessage('Something went wrong!')
        console.log(error.message)
      } else {
        setWorkoutName(workouts[0].workoutName)
        setWorkoutType(workouts[0].workoutType)
        setExercises(workouts[0].exercises)
        setIsLoading(false)
      }
    })()
  }, [])

  const deleteWorkout = async () => {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId)

    if (error) {
      setErrorMessage('Something went wrong!')
      console.error(error.message)
    } else {
      navigate('/')
    }
  }

  const updateWorkout = async () => {
    setErrorMessage('')
    const { error } = await supabase
      .from('workouts')
      .update({
        workoutName,
        exercises,
      })
      .eq('id', workoutId)

    if (error) {
      setErrorMessage('Something went wrong!')
      console.error(error.message)
    } else {
      setStatusMessage('Success: Workout updated!')
      setIsEditing(false)
    }
  }

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-10">
      {(statusMessage || errorMessage) && (
        <div className="mb-10 p-4 rounded-md shadow-md bg-light-grey">
          <p className="text-at-light-green">{statusMessage}</p>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
      {!isLoading && (
        <div>
          <div
            className="flex flex-col items-center p-8 rounded-md shadow-md
      bg-light-grey relative"
          >
            {user && (
              <div className="flex absolute left-2 top-2 gap-x-2">
                <div
                  onClick={() => setIsEditing(true)}
                  className="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-at-light-green shadow-lg"
                >
                  <img className="h-3.5 w-auto" src={pencilIcon} alt="" />
                </div>
                <div
                  onClick={deleteWorkout}
                  className="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
            bg-at-light-green shadow-lg"
                >
                  <img className="h-3.5 w-auto" src={trashIcon} alt="" />
                </div>
              </div>
            )}

            {workoutType === 'cardio' ? (
              <img className="h-24 w-auto" src={greenRunnerIcon} alt="" />
            ) : (
              <img className="h-24 w-auto" src={greenDumbbellIcon} alt="" />
            )}

            <span
              className="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green
        rounded-lg shadow-md"
            >
              {workoutType}
            </span>

            <div className="w-full mt-6">
              {isEditing ? (
                <input
                  type="text"
                  className="p-2 w-full text-gray-500 focus:outline-none"
                  onChange={set(setWorkoutName)}
                  value={workoutName}
                />
              ) : (
                <h1 className="text-at-light-green text-2xl text-center">
                  {workoutName}
                </h1>
              )}
            </div>
          </div>

          <div
            className="mt-10 p-8 rounded-md flex flex-col item-center
      bg-light-grey shadow-md"
          >
            {workoutType === 'strength' ? (
              <div className="flex flex-col gap-y-4 w-full">
                {exercises.map((exercise) => (
                  <div
                    className="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                    key={exercise.id}
                  >
                    <div className="flex flex-2 flex-col md:w-1/3">
                      <label
                        htmlFor="exercise-name"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Exercise
                      </label>
                      {isEditing ? (
                        <input
                          id="exercise-name"
                          onChange={setExerciseField(exercise, 'exercise')}
                          value={exercise.exercise}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.exercise}</p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="sets"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Sets
                      </label>
                      {isEditing ? (
                        <input
                          id="sets"
                          onChange={setExerciseField(exercise, 'sets')}
                          value={exercise.sets}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.sets}</p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="reps"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Reps
                      </label>
                      {isEditing ? (
                        <input
                          id="reps"
                          onChange={setExerciseField(exercise, 'reps')}
                          value={exercise.reps}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.reps}</p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="weight"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Weight (kg / lb)
                      </label>
                      {isEditing ? (
                        <input
                          id="weight"
                          onChange={setExerciseField(exercise, 'weight')}
                          value={exercise.weight}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.weight}</p>
                      )}
                    </div>
                    {isEditing && (
                      <img
                        onClick={() => deleteExercise(exercise.id)}
                        className="absolute h-4 w-auto -left-5 cursor-pointer"
                        src={greenTrashIcon}
                        alt=""
                      />
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addExercise}
                    type="button"
                    className="py-2 px-6 rounded-sm self-start text-sm text-white
    bg-at-light-green duration-200 border-solid border-2 border-transparent
    hover:border-at-light-green hover:bg-white hover:text-at-light-green"
                  >
                    Add Exercise
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-y-4 w-full">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                  >
                    <div className="flex flex-2 flex-col md:w-1/3">
                      <label
                        htmlFor="cardioType"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Type
                      </label>
                      {isEditing ? (
                        <select
                          id="cardioType"
                          onChange={setExerciseField(exercise, 'cardioType')}
                          value={exercise.cardioType}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                        >
                          <option value="#">Select Type</option>
                          <option value="run">Runs</option>
                          <option value="walk">Walk</option>
                        </select>
                      ) : (
                        <p>{exercise.cardioType}</p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="distance"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Distance
                      </label>
                      {isEditing ? (
                        <input
                          id="distance"
                          onChange={setExerciseField(exercise, 'distance')}
                          value={exercise.distance}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.distance}</p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="duration"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Duration
                      </label>
                      {isEditing ? (
                        <input
                          id="duration"
                          onChange={setExerciseField(exercise, 'duration')}
                          value={exercise.duration}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.duration}</p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="pace"
                        className="mb-1 text-sm text-at-light-green"
                      >
                        Pace
                      </label>
                      {isEditing ? (
                        <input
                          id="pace"
                          onChange={setExerciseField(exercise, 'pace')}
                          value={exercise.pace}
                          className="p-2 w-full text-gray-500 focus:outline-none"
                          type="text"
                        />
                      ) : (
                        <p>{exercise.pace}</p>
                      )}
                    </div>
                    {isEditing && (
                      <img
                        onClick={() => deleteExercise(exercise.id)}
                        className="absolute h-4 w-auto -left-5 cursor-pointer"
                        src={greenTrashIcon}
                        alt=""
                      />
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addExercise}
                    type="button"
                    className="py-2 px-6 rounded-sm self-start text-sm text-white
  bg-at-light-green duration-200 border-solid border-2 border-transparent
  hover:border-at-light-green hover:bg-white hover:text-at-light-green"
                  >
                    Add Exercise
                  </button>
                )}
              </div>
            )}
          </div>
          {isEditing && (
            <button
              onClick={updateWorkout}
              type="button"
              className="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
  bg-at-light-green duration-200 border-solid border-2 border-transparent
  hover:border-at-light-green hover:bg-white hover:text-at-light-green"
            >
              Update Workout
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default WorkoutPage
