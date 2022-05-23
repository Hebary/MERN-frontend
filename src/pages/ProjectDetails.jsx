import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import ModalTask from '../components/ModalTask';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';
import Task from "../components/Task.jsx";
import ModalDeleteTask from '../components/ModalDeleteTask';
import Alert from '../components/Alert';
import Contributor from '../components/Contributor'
import ModalDeleteContributor from '../components/ModalDeleteContributor';

import io from "socket.io-client";

let socket;

const ProjectDetails = () => {

    const params = useParams();
    const { getOneProject, project, handleModal, alert, addTaskSocket, deleteTaskState, editTaskState, completeTaskState } = useProjects();
    const admin = useAdmin();

    useEffect(() => {
        getOneProject(params.id);
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('open project', params.id);
    }, []);

    useEffect(() => {
        socket.on('task added', (newTask) => {
            newTask.project === project._id && addTaskSocket(newTask);
        });

        socket.on('task deleted', (task) => {
            task.project === project._id && deleteTaskState(task)
        });

        socket.on('updated task', (task) => {
            task.project._id === project._id && editTaskState(task)
        });

        socket.on("completed task", (task) => {
            task.project === project._id && completeTaskState(task)
        });

    });


    const { name } = project;
    const { msg } = alert;

    return (
        <div className="flex justify-between flex-wrap" >

            <h1 className="font-black text-3xl border-b w-full md:w-auto p-4 pt-0">{name}</h1>
            {admin && (
                <button className="flex items-center justify-center w-full md:w-auto border-b gap-3 ">
                    <Link
                        to={`/projects/edit/${params.id}`}
                        className=" text-lg p-3 text-gray-400 hover:text-black hover:border-gray-500 tracking-widest"
                    >
                        Edit
                    </Link>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            )}

            {admin && (
                <button type="button"
                    className="flex gap-1 items-center text-xl tracking-widest p-5 font-bold py-2 border-b-2 border-orange-200 w-full justify-center md:w-auto hover:border-orange-500"
                    onClick={handleModal}
                >Add Task
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
            <p className="text-2xl tracking-wider py-3 px-5  border-b font-mono font-black w-full flex justify-center items-center gap-3 text-center my-6 uppercase">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Project Tasks
            </p>

            <div className="flex md:w-1/3 mx-auto sm:w-2/3 ">
                {msg && !alert.error && <Alert alert={alert} />}
            </div>

            {project.tasks?.length > 0 ?
                <div className="w-full mt-10 bg-white shadow rounded-lg">
                    {project.tasks?.map(task => (
                        <div className="border-b hover:bg-sky-200" key={task._id}>
                            <Task task={task} />
                        </div>
                    ))}
                </div>

                : <p className=" border-b font-light text-lg w-full text-center pb-5 ">No tasks for this project</p>
            }

            {admin && (
                <>
                    <div className="flex justify-center flex-wrap items-center w-full mt-10">
                        <p className="text-2xl flex text-center items-center gap-3 font-mono uppercase font-bold tracking-widest px-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Contributors
                        </p>
                        <Link to={`/projects/new-contributor/${project._id}`}
                            className="text-gray-400 flex items-center gap-2 mt-4 uppercase mx-auto md:w-full hover:text-black font-semibold ">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add a new contributor

                        </Link>
                    </div>

                    {project.contributors?.length > 0 ?
                        <div className="w-full mt-10 hover:bg-sky-200 p-5 bg-white shadow rounded-lg">
                            {project.contributors?.map(contributor => (
                                <Contributor contributor={contributor} key={contributor?._id} />
                            ))}
                        </div>

                        : <p className=" border-b font-light my-5 text-lg w-full text-center p-5 ">No contributors for this project</p>
                    }
                </>
            )}
            <ModalTask />
            <ModalDeleteTask />
            <ModalDeleteContributor />
        </div>

    )
}

export default ProjectDetails
