import { Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Find from "./Find"
import useAuth from '../hooks/useAuth'

const Header = () => {

    const { handleSeeker, logOut } = useProjects();
    const { authLogOut } = useAuth();

    const handleLogOut = e => {
        e.preventDefault();
        logOut();
        authLogOut();
        localStorage.removeItem('token');
    }

    return (
        <header className="flex justify-between flex-wrap sm:h-auto from-sky-400 to-sky-600 bg-gradient-to-bl shadow-md px-5 py-3">
            <div className="flex items-center mb-4 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                ><path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5
                        0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <h2 className="text-3xl mb-2 sm:ml-0 ml-2 md:mb-0 font-black mt-2 text-black tracking-wider ">UpTask
                    <span className="font-bold relative sm:right-2 right-3 sm:top-0 top-1 text-xs uppercase block tracking-wide mb-0 md:mt-1">Manage your projects</span></h2>
            </div>

            <button type="button" className="px-4 p-1 my-4 mx-auto flex gap-2 text-lg items-center hover:text-black text-sky-900"
                onClick={handleSeeker}
            >
                Search project
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </button>

            <div className="flex flex-wrap items-center gap-10">
                <Link
                    to="/projects"
                    className=" uppercase font-bold text-xl mb-1 sm:mx-10 mx-auto hover:text-white tracking-widest"
                >All Projects
                </Link>
                <button type="button" className="px-4 p-1 mb-1 mx-auto hover:bg-sky-900 hover:text-white border rounded-full border-black font-semibold text-sm"
                    onClick={handleLogOut}
                >
                    Log out
                </button>
            </div>

            <Find />

        </header>
    )
}

export default Header