import useProjects from "../hooks/useProjects";

const Contributor = ({contributor}) => {

    const { handleModalDeleteContributor } = useProjects();

    const {name,email} =contributor;
    return (
        <div className="flex justify-between flex-wrap items-center ">
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-gray-400 text-sm mb-3 font-light">{email}</p>
            </div>
            <div>
            <button className="text-lg text-gray-400 hover:text-red-500 hover:border-red-600 border-b tracking-widest"
                    onClick={()=>handleModalDeleteContributor(contributor)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Contributor
