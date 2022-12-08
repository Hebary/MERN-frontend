import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        //Validating
        if ([email, password].includes('')) {
            setAlert({
                msg: "Required fields",
                error: true
            });
            return;
        }
        try {
            const { data } = await axiosClient.post("/users/login", { email, password });
            localStorage.setItem("token", data.token);
            setAuth(data);
            navigate("/projects");
        } catch (error) {
            setAlert({
                msg: error.response.data?.msg,
                error: true
            })
        }
    }

   
    return (
        <div className="animate">
            <h1 className="animate text-5xl text-center text-sky-600 font-black capitalize">Log in and manage your{' '}
                <span className="text-gray-600">projects</span></h1>

            {
                alert?.msg && <Alert alert={alert} />
            }

            <form className="mt-10 bg-white shadow-lg rounded-lg py-5 px-8"
                onSubmit={e=>handleSubmit(e)}
            >
                <div className="flex flex-col ">
                    <label htmlFor="email" className="text-md my-2 uppercase text-gray-600 font-bold">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="shadow p-3 rounded-lg  focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="password" className="text-md my-2 uppercase text-gray-600 font-bold">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="shadow p-3 rounded-lg  focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Log in"
                    className="bg-sky-800 hover:bg-sky-700  text-white font-black py-2 px-4
                    cursor-pointer rounded-md w-full mt-7 mb-4 transition-colors duration-200"
                />
            </form>
            <nav className="lg:flex lg:justify-center">
                <Link to={'/create-account'}
                    className="block border-b uppercase  py-2 text-center my-5 text-slate-600 hover:text-sky-800 uppercasse text-sm"
                >Create new account
                </Link>
                {/* <Link to="/reset_password"
                    className="block border-b  uppercase py-2 text-center my-5 text-slate-600 hover:text-sky-800 uppercasse text-sm"
                >I forgot my password
                </Link> */}
            </nav>
        </div>
    )
}

export default Login