import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import Alert from '../components/Alert';


const Registry = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState({});

    
    
const handleSubmit = async e => {
    
    e.preventDefault();
    //Validating
    if( [ name, email, password, repeatPassword ].includes('') ){
        setAlert({ 
                    msg: 'All the fileds are required',
                    error: true,
                });
        return;
    }
    if( password !== repeatPassword ){
        setAlert({
                    msg:"Passwords don't match",
                    error:true,
                });
        return;
    }
    if( password.length < 6 ){
        setAlert({
                    msg:"Passwords must be at least 6 characters",
                    error:true,
                });
        return;
    }
    setAlert({});

    //creating new user
    try {
        const {data}  = await axiosClient.post("/users",{
            name,
            email,
            password
        });
        setAlert({
            msg:data.msg,
            error:false,
        });
            setTimeout(() => {
                setAlert({})
                setName("");
                setPassword("");
                setRepeatPassword("");
                setEmail("");
            }, 3000);
            
    } catch (error) {
        setAlert({
            msg:error.response.data.message,
            error:true,
        });
    }
}
const {msg} = alert;

    return (
        <div className="animate">
            <h1 className="animate text-5xl text-sky-600 font-black capitalize">Register now to manage your{' '}
                <span className="text-gray-600">projects</span>
            </h1>
            {
               msg && <Alert
                alert = {alert}
               />
            }
            <form className="mt-10 bg-white shadow-lg rounded-lg py-5 px-8"
                    onSubmit={handleSubmit}
            > 
            
                <div className="flex flex-col ">
                    <label htmlFor="name" className="text-md my-2 uppercase text-gray-600 font-bold">Name</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="shadow p-3 rounded-lg  focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>    
                <div className="flex flex-col mt-2">
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
                <div className="flex flex-col mt-2">
                    <label htmlFor="repeat_password" className="text-md my-2 uppercase text-gray-600 font-bold">Repeat Password</label>
                    <input 
                        id="repeat_password"
                        type="password"
                        placeholder="Repeat your password"
                        className="shadow p-3 rounded-lg  focus:outline-none"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>    
                
                <input
                    type="submit"
                    value="Create Account"
                    className="bg-sky-800 hover:bg-sky-700  text-white font-black py-2 px-4
                    cursor-pointer rounded-md w-full mt-7 mb-4 transition-colors duration-200"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link to='/' 
                    className="block border-b uppercase  py-2 text-center my-5 text-slate-600 hover:text-sky-800 uppercasse text-sm"
                >¿Do You Have An Account? Log in
                </Link>
                <Link to="/reset_password"
                    className="block border-b  uppercase py-2 text-center my-5 text-slate-600 hover:text-sky-800 uppercasse text-sm"
                >I forgot my password
                </Link>
            </nav>
        </div>    
    )
}

export default Registry