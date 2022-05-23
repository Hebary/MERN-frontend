import { useState } from "react"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"

const NewContributorForm = () => {

    const [email, setEmail] = useState('')
    const {alert, showAlert, submitContributor} = useProjects();
    
    const handleSubmit = (e)=>{
        e.preventDefault();
            if (email === "") {
                showAlert({
                    msg: "Email is required",
                    error: true
                });
                return;
            }
        submitContributor(email)
    }

    const { msg } = alert;

    return (
        <form
            className="bg-white px-5 py-7 rounded-lg lg:w-1/2 mx-auto shadow-md mt-10"
            onSubmit={handleSubmit}
            >
                {msg && <Alert alert={alert}/>}
            <div>
                <label
                    className="text-gray-700 text-lg px-2 my-10 tracking-wider font-bold"
                    htmlFor="email">Email Contributor</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter contributor email"
                    className="w-full bg-gray-100 shadow-md rounded-lg p-3 mt-2 focus:outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="submit" 
                  className=" w-full from-sky-400 to-sky-800 text-lg hover:to-sky-500 bg-gradient-to-r text-white font-black tracking-wide
                  mt-7 cursor-pointer py-2 px-4 rounded focus:outline-none transition-colors duration-500 "
                 value={"Find Contributor"}
                />
            </div>
        </form>
    )
}

export default NewContributorForm