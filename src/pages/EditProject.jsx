import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import CreateProjectForm from "../components/CreateProjectForm";
const EditProject = () => {

    const { id } = useParams();
    const { getOneProject, project, loading, deleteProject } = useProjects();

    useEffect(() => {
        getOneProject(id);
    }, [])
    const handleClick = () => {
        if ( confirm("Are you sure you want to delete this project?") ) {
            deleteProject(id);
        }
    }
    const { name } = project;

   if(loading) return "Loading...";
    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-semibold border-b p-4 pt-0 tracking-widest text-2xl">Edit the project:{' '}
                    <span className="font-black tracking-normal text-2xl">{name}</span>
                </h1>
                <div className="flex items-center gap-3 ">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <button
                        className="border-b text-md py-3 text-gray-400 hover:text-black hover:border-gray-500 tracking-widest"
                        onClick={handleClick}
                        >Delete
                    </button>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <CreateProjectForm />
            </div>
        </>
    );
}

export default EditProject;