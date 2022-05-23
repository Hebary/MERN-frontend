import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Alert from './Alert';

const CreateProjectForm = () => {
    
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ client, setClient ] = useState("");
    const [ deliveryDate, setDeliveryDate ] = useState("");
    const [ id, setId] = useState(null);
    const { showAlert, alert, submitProject, project } = useProjects();   

    const params = useParams();
  
    useEffect(()=> {
        if(params.id) {
            setId(project._id);
            setName(project.name);
            setDescription(project.description);
            setClient(project.client);
            setDeliveryDate(project.deliveryDate?.split('T')[0]);
        }                
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if([ name, description, client, deliveryDate ].includes("")){
            
        showAlert({
            msg: "All fields are required",
            error:true,
            });
            return;
        }

        await submitProject({
            name,
            description,
            client,
            deliveryDate,
            id
        });
        //clean the form
        setId(null);
        setName("");
        setDescription("");
        setDeliveryDate("");
        setClient("");
    }

    const { msg } = alert;

    return (
        <form className="mt-10 bg-white shadow-md rounded-lg py-3 lg:w-1/2 px-8"
            onSubmit={handleSubmit}>
            {
                msg && <Alert alert={alert} />
            }
                <div className="flex flex-col mb-3 ">
                    <label htmlFor="name" className="text-md my-2 uppercase text-gray-600 font-bold tracking-wider">Project Name</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Enter the project name"
                        className="border-b p-3 bg-transparent border-gray-300 rounded focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div> 
                <div className="flex flex-col mb-3 ">
                    <label htmlFor="description" className="text-md my-2 uppercase text-gray-600 font-bold tracking-wider">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        placeholder="Enter the project description"
                        className="resize-none border-b p-3 border-gray-300 rounded-lg focus:outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div> 
                <div className="flex flex-col mb-3 ">
                    <label htmlFor="dd" className="text-md my-2 uppercase text-gray-600 font-bold tracking-wider">Delivery Date</label>
                    <input 
                        id="dd"
                        type="date"
                        className="bg-transparent border-b p-3 border-gray-300 focus:outline-none"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                </div> 
                <div className="flex flex-col mb-3 ">
                    <label htmlFor="client" className="text-md my-2 uppercase text-gray-600 font-bold tracking-wider">Client</label>
                    <input 
                        id="client"
                        type="text"
                        placeholder="Enter the client name"
                        className="bg-transparent rounded border-gray-300 focus:bg-transparent border-b p-3 focus:outline-none"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />
                    <input
                        value={`${id ? "Save changes" : "Create Project"}`}
                        type="submit"
                        className="from-sky-400 to-sky-800 text-lg hover:to-sky-500 bg-gradient-to-r text-white font-black tracking-wide
                        mt-7 cursor-pointer py-2 px-4 rounded focus:outline-none transition-colors duration-500 "
                    />
                </div> 
        </form>
    )
}

export default CreateProjectForm