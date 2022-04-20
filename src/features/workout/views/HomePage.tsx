import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Workout } from '../types'
import greenRunner from '/images/running-light-green.png'
import greenDumbbell from '/images/dumbbell-light-green.png'
import { supabase } from '../../../supabaseClient'
import { useDispatch, useSelector } from 'react-redux'
import { setWorkouts } from '../store/workoutSlice'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const workouts = useSelector(
    (store: any) => store.workout.workouts,
  ) as Workout[]
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      const { data: workouts, error } = await supabase
        .from('workouts')
        .select('*')

      if (error) {
        console.warn(error.message)

        return
      }

      dispatch(setWorkouts(workouts))
      setIsLoading(false)
    })()
  }, [])

  return isLoading ? (
    <></>
  ) : (
    <div className="container mt-10 px-4">
      {workouts.length === 0 && (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl">Looks empty here...</h1>
          <Link
            to={'/create'}
            className="mt-6 py-2 px-6 rounded-sm  text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
          >
            Create Workout
          </Link>
        </div>
      )}
      {workouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {workouts.map((workout) => (
            <Link
              to={`/workout/${workout.id}`}
              key={workout.id}
              className="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
            >
              {workout.workoutType === 'cardio' ? (
                <img src={greenRunner} className="h-24 w-auto" alt="" />
              ) : (
                <img src={greenDumbbell} className="h-24 w-auto" alt="" />
              )}
              <p className="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
                {workout.workoutType}
              </p>
              <h1 className="mt-8 mb-2 text-center text-xl text-at-light-green">
                {workout.workoutName}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
