import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dumbbellImg from '/images/dumbbell-light.png'
import { setUser } from '../features/auth/store/authSlice'
type Props = {}

export default function Navbar({}: Props) {
  const user = useSelector((store: any) => store.auth.user)
  const dispatch = useDispatch()
  const onLogout = () => dispatch(setUser(null))

  return (
    <header className="bg-at-light-green text-white">
      <nav className="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
        <div className="flex items-center gap-x-4">
          <img className="w-14" src={dumbbellImg} alt="" />
          <h1 className="text-lg">Active Tracker</h1>
        </div>
        <ul className="flex flex-1 justify-end gap-x-10">
          <Link to="/">Home</Link>
          {user ? (
            <li onClick={onLogout} className="cursor-pointer">
              Logout
            </li>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/create">Create</Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
