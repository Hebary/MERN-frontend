import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";
const Task = ({ task }) => {

    const { name, description, deliveryDate, priority, state, _id } = task;
    const { handleTask, handleDeleteTask, completeTask } = useProjects();

    const admin = useAdmin();

    return (
        <div className="flex justify-between flex-wrap py-2 px-6 items-center">
            <div>
                <p className="my-2 font-semibold text-xl">{name}</p>
                <p className="my-2 uppercase font-light text-sm text-gray-500">{description}</p>
                <p className="my-2 font-semibold capitalize text-sm">{formatDate(deliveryDate)}</p>
                <p className="my-2 text-gray-700 ">Priority: {priority}</p>
                {state && <p className="my-2 font-bold text-sm" >Completed by {task.completed.name}</p>}
            </div>
            <div className="flex gap-6 flex-wrap lg:flex-nowrap my-4 mb-7 ">
                      
                    <button className={`${state ? "text-green-600 hover:border-green-500 hover:text-green-500" :"text-orange-400 hover:border-orange-500" } text-lg w-full ml-4  border-b tracking-widest`}
                        onClick={() => completeTask(_id)}
                    >
                        {state ? "Complete" : "Incomplete"}
                    </button>

                {admin &&
                    <>
                        <button className="text-lg text-gray-400 w-full ml-4  hover:text-blue-600 hover:border-blue-500 border-b tracking-widest"
                            onClick={() => handleTask(task)}
                        >
                            Edit
                        </button>
                        <button className="text-lg text-gray-400 w-full ml-4 hover:text-red-600 hover:border-red-600 border-b tracking-widest"
                            onClick={() => handleDeleteTask(task)}
                        >
                            Delete
                        </button>
                    </>
                }
            </div>
        </div>

    )
}

export default Task