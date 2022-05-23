import { useParams } from "react-router-dom"
import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import NewContributorForm from "../components/NewContributorForm"
import Alert from "../components/Alert"

const NewContributor = () => {

    const params = useParams();
    const { getOneProject, project, loading, contributor, addContributor } = useProjects();

    useEffect(() => {
        getOneProject(params.id)
    }, [])

    if(!contributor) return "Loading...";
    return (
        <>
            <h1 className="text-3xl px-3 font-black">{` Add a new contributor to project ${project.name}`}</h1>

            <div className="flex justify-center">

                <NewContributorForm />

            </div>

            {contributor?._id &&

                <div className="flex justify-center mx-auto  ">
                    <div className="bg-white mt-5 rounded-lg px-5 py-7 w-full lg:w-1/2 shadow-md ">
                        <h2 className="tracking-wider text-center text-lg p-2 mb-2 uppercase  font-black">Results:</h2>
                        <div className=" flex justify-between flex-wrap">
                            <p className="text-2xl mx-auto sm:m-0 p-2 font-semibold">{`${contributor.name}`}</p>
                            <button
                                type="button"
                                className="px-5 border-b text-slate-400 mx-auto sm:m-0 hover:text-sky-800 hover:border-gray-500 font-semibold text-lg tracking-widest "
                                onClick={ ()=>addContributor({
                                    email:contributor.email,
                                }) }
                            >
                                Add Contributor
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NewContributor
