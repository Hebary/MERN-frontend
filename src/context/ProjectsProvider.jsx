import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import io from "socket.io-client";
import useAuth from '../hooks/useAuth'; 

const ProjectsContext = createContext();

let socket;

const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalTask, setModalTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [contributor, setContributor] = useState({});
    const [modalDeleteContributor, setModalDeleteContributor] = useState(false);
    const [seeker, setSeeker] = useState(false);

    const navigate = useNavigate()

    const { auth } = useAuth();
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await axiosClient('/projects', config);
                setProjects(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchProjects()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])


    const showAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => { setAlert({}) }, 2000);
    }

    const submitProject = async project => {
        if (project.id) {
            editProject(project)
        } else {
            createProject(project)
        }
    }


    //CREATE A NEW PROJECT
    const createProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/projects', project, config);

            setProjects([...projects, data]);

            showAlert({
                msg: 'Project created successfully',
                error: false
            });

            setTimeout(() => {
                navigate("/projects");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    //GET ONE PROJECT
    const getOneProject = async id => {
        setLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient(`/projects/${id}`, config);
            setProject(data)
        } catch (error) {
            navigate("projects")
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false);
        }
    }
    
     //EDIT A PROJECT
     const editProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.put(`/projects/${project.id}`, project, config)

            const editedProject = projects.map(projectState => projectState._id === data._id ? data : projectState);

            setProjects(editedProject);

            showAlert({
                msg: 'Project edition successfully',
                error: false
            });

            setTimeout(() => {
                navigate("/projects");
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }
   
    //DELETE ONE PROJECT
    const deleteProject = async (id) => {
        try {

            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/projects/${id}`, config)
            showAlert({
                msg: data.msg,
                error: false
            });

            const projectsState = projects.filter(projectState => projectState._id !== id);
            setProjects(projectsState);

            setTimeout(() => {
                navigate("/projects");
            }, 3000);

        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModal = () => {
        setModalTask(!modalDeleteTask);
        setTask({});
    }

    const submitTask = async task => {
        if (task?.id) {
            await editTask(task);
        } else {
            await createTask(task);
        }
    }

    const handleTask = (task) => {
        setTask(task)
        setModalTask(!modalTask)
    }


    //Create Task
    const createTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/task', task, config);
            setModalTask(false);
            //SOCKET.IO
            socket.emit('add task', data)

        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }
    //Edit Task
    const editTask = async task => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.put(`/task/${task.id}`, task, config)
            setModalTask(false)

            //SOCKET.IO
            socket.emit('update task', data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleDeleteTask = task => {
        setTask(task);
        setModalDeleteTask(!modalDeleteTask);
    }


    //Delete Task
    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.delete(`/task/${task._id}`, config);
            showAlert({
                msg: data.msg,
                error: false
            })

            setModalDeleteTask(false)
            //SOCKET.IO
            socket.emit('delete task', task)

        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally{
            setTask({})
        }
    }

    //find contributor
    const submitContributor = async email => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/projects/contributors', { email }, config);
            setContributor(data);

        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false);
        }
    }

    //addContributor

    const addContributor = async email => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`/projects/contributors/${project._id}`, email, config)
            showAlert({
                msg: data.msg,
                error: false
            });
            setTimeout(() => {
                navigate(`/projects/${project._id}`);
            }, 3000);

        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        } finally {
            setContributor({});
        }
    }

    const handleModalDeleteContributor = (contributor) => {
        setModalDeleteContributor(!modalDeleteContributor)
        setContributor(contributor)
    }

    const deleteContributor = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`/projects/delete-contributor/${project._id}`, { id: contributor._id }, config)
            const projectUpdated = { ...project }
            projectUpdated.contributors = projectUpdated.contributors.filter(contributorState => contributorState._id !== contributor._id)
            setProject(projectUpdated)
            showAlert({
                msg: data.msg,
                error: false
            });

        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true,
            })
        } finally {
            setContributor({})
            setModalDeleteContributor(false);
        }
    }

    const completeTask = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/task/state/${id}`, {}, config);
            //SOCKET.IO
            socket.emit('complete task', data);
        } catch (error) {
            console.log(error.response)
        } finally {
            setTask({})
        }
    }

    const handleSeeker = () => {
        setSeeker(!seeker);
    }

    //socket.io
    const addTaskSocket = task => {
        const projectState = { ...project };
        projectState.tasks = [...projectState.tasks, task];
        setProject(projectState);
    }

    const deleteTaskState = task => {
        const projectState = { ...project };
        projectState.tasks = projectState.tasks.filter(taskState => taskState._id !== task._id);
        setProject(projectState);
    }

    const editTaskState = task => {
        const projectState = { ...project };
        projectState.tasks = projectState.tasks.map(taskState => taskState?._id === task._id ? task : taskState);
        setProject(projectState);
    }

    const completeTaskState = task => {
        const updatedProject = { ...project }
        updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProject(updatedProject)
    }

    //Log out

    const logOut = () => {
        setProjects([]);
        setProject({});
        setAlert({});
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getOneProject,
                project,
                loading,
                deleteProject,
                handleModal,
                modalTask,
                submitTask,
                handleTask,
                task,
                modalDeleteTask,
                handleDeleteTask,
                deleteTask,
                submitContributor,
                contributor,
                addContributor,
                handleModalDeleteContributor,
                modalDeleteContributor,
                deleteContributor,
                completeTask,
                seeker,
                handleSeeker,
                addTaskSocket,
                deleteTaskState,
                editTaskState,
                completeTaskState,
                logOut

            }}

        >
            {children}

        </ProjectsContext.Provider>
    )
}

export default ProjectsContext

export {
    ProjectsProvider
}