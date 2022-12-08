import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
const Sidebar = () => {
    const { auth } = useAuth();
    return (
        <aside className="md:w-1/3 lg:w-1/4 xl:w-1/5 px-5 py-10 bg-gray-100 shadow-md ">
            <h3 className="capitalize p-3 text-lg border-black">¡Welcome <span className="font-semibold font-mono">{auth.name}!</span></h3>
            <hr className="py-3" />
            <Link
                to="create-project"
                className=" flex items-center font-black  border-b text-xl py-2 hover:border-black "
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-gray-800 hover:text-black">Create Project</p>
            </Link>
        </aside>
    )
}

export default Sidebar