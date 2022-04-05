import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { set } from '../../../helpers/formHelpers'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const register = (e: FormEvent) => {
    e.preventDefault()
    console.log('registering here', { email, password, confirmPassword })
  }

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-10">
      {errorMessage && (
        <div className="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={register}
        className="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
      >
        <h1 className="text-3xl text-at-light-green mb-4">Register</h1>

        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="mb-1 text-sm text-at-light-green">
            Email
          </label>
          <input
            id="email"
            onChange={set(setEmail)}
            type="text"
            required
            className="p-2 text-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="password"
            className="mb-1 text-sm text-at-light-green"
          >
            Password
          </label>
          <input
            id="password"
            onChange={set(setPassword)}
            type="password"
            required
            className="p-2 text-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="confirmPassword"
            className="mb-1 text-sm text-at-light-green"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            onChange={set(setConfirmPassword)}
            type="password"
            required
            className="p-2 text-gray-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-6 py-2 px-6 mb-2 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
        >
          Register
        </button>

        <Link to={'/login'}>
          Already have an account?{' '}
          <span className="text-at-light-green">Login</span>
        </Link>
      </form>
    </div>
  )
}

export default RegisterPage
