import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dumbbellImg from '/images/dumbbell-light.png'
import { setUser } from '../features/auth/store/authSlice'
import { supabase } from '../supabaseClient'
type Props = {}

export default function Navbar({}: Props) {
  const user = useSelector((store: any) => store.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    let { error } = await supabase.auth.signOut()
    if (!error) {
      dispatch(setUser(null))
      navigate('/')
    }
  }

  return (
    <header className="bg-at-light-green text-white">
      <nav className="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
        <Link to={'/'} className="flex items-center gap-x-4">
          <img className="w-14" src={dumbbellImg} alt="" />
          <h1 className="text-lg">Active Tracker</h1>
        </Link>
        <ul className="flex flex-1 justify-end gap-x-10">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/create">Create</Link>
              <li onClick={logout} className="cursor-pointer">
                Logout
              </li>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ul>
      </nav>
    </header>
  )
}
