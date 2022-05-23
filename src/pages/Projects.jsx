import useProjects from "../hooks/useProjects"
import Project from "../components/Project";
import Alert from "../components/Alert";


const Projects = () => {

  const  { projects, alert }  = useProjects(); 
  
  const { msg } = alert;

  return (
    <>
      <h1 className="text-3xl font-black border-b p-4 pt-0">All Projects</h1>
      {msg && <Alert alert={alert}/>}
      <div className=" bg-white shadow-md mt-10 rounded-lg"> 
          {
            projects.length > 0 ? 
              projects.map( project => (
                <Project 
                  project={project}
                  key={project._id}/>
              ))
              : <h4 className="text-sm p-5 border-b w-1/3 mx-auto tracking-widest uppercase text-center m-5">No Projects Yet</h4>
          } 
      </div>
    </>
  )
}

export default Projects