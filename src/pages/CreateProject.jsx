import CreateProjectForm from "../components/CreateProjectForm"

const CreateProject = () => {
    return (
      <>
        <h1 className="text-3xl p-4 pt-0 font-black border-b">Create Project</h1>
            <div className="flex justify-center mt-6"> 
                <CreateProjectForm />
            </div>
      
      </>
    )
  }
  
  export default CreateProject