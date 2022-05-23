import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
    return (
      <>
        <main className="container md:flex md:justify-center p-5 mt-5 md:mt-20 mx-auto">
            <div className=" md:w-2/3 lg:w-2/5">
                <Outlet/>
            </div>
        </main>
      </>
    )
}

export default AuthLayout
