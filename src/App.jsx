import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registry from "./pages/Registry"
import ResetPassword from "./pages/ResetPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import Projects from "./pages/Projects"
import CreateProject from "./pages/CreateProject"
import ProjectDetails from "./pages/ProjectDetails"
import EditProject from "./pages/EditProject"
import NewContributor from "./pages/NewContributor"

import AuthLayout from "./layout/AuthLayout"
import ProtectedRoute from "./layout/ProtectedRoute"

import { AuthProvider } from "./context/AuthProvider"
import { ProjectsProvider } from "./context/ProjectsProvider"


function App() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <ProjectsProvider>
            <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="/registry" element={<Registry/>}/>
                <Route path="/reset_password" element={<ResetPassword/>}/>
                <Route path="/reset_password/:token" element={<NewPassword/>}/>
                <Route path="/confirm/:token" element={<ConfirmAccount/>}/>
              </Route>

              <Route path="/projects" element={<ProtectedRoute/>}>
                <Route index element={<Projects/>}/>
                <Route path="create-project" element={<CreateProject/>}/>
                <Route path="new-contributor/:id" element={<NewContributor/>}/>
                <Route path=":id" element={<ProjectDetails/>}/>
                <Route path="edit/:id" element={<EditProject/>}/>
              </Route>

            </Routes>
          </ProjectsProvider>
        </AuthProvider>
      </BrowserRouter>
    )
}

export default App
