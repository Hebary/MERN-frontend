import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../../config/axiosClient';



const NewPassword = () => {

    const [alert, setAlert] = useState({});
    const {token} = useParams();
    const [tokenConfirmed, setTokenConfirmed] = useState(false);
    const [ password, setPassword] = useState('');
    useEffect (() =>{
        const confirmToken = async () => {
            const url = `/users/reset_password/${token}`;
            try{
                await axiosClient(url);
                setTokenConfirmed(true);
            } catch (error) {
                setAlert({
                        msg:error.response.data.msg,
                        error:true
                });
            }
        }
        confirmToken();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();   
        if (!isValidPassword(password)) {
            setAlert({
                msg: 'Password must be at least 6 characters long, contain at least one number and one letter, and one special character', 
                error: true
            })
            return;
        }
            try{
                const url = `/users/reset_password/${token}`;
                const { data } = await axiosClient.post(url,{password});
                setAlert({ msg: data.msg, error: false });
                setTokenConfirmed(false)
            } catch (error) {
                setAlert({
                        msg:error.response.data.msg,
                        error:true
                });
            }
        }
    const isValidPassword = password => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(password);
    }
    const{msg} =alert;

    return (

        <div className="animate">
            <h1 className="animate text-5xl text-sky-600 font-black capitalize">Reset your password and keep access to your{' '}
                <span className="text-gray-600">projects</span>
            </h1>
            {
                msg && <Alert alert={alert}/>
            } 
            {
                tokenConfirmed ?
                    <form className="mt-10 bg-white shadow-lg rounded-lg py-5 px-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col mt-2">
                            <label htmlFor="newpassword" className="text-md my-2 uppercase text-gray-600 font-bold">New Password</label>
                            <input 
                                id="newpassword"
                                type="password"
                                placeholder="Enter your new password"
                                className="shadow p-3 rounded-lg  focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>    
                        <input
                        type="submit"
                        value="Reset Password"
                        className="bg-sky-800 hover:bg-sky-700  text-white font-black py-2 px-4
                        cursor-pointer rounded-md w-full mt-7 mb-4 transition-colors duration-200"
                        />
                    </form> : <Link
                            to="/"
                            className="border-b py-3 border-gray-300 w-full mt-10 hover:border-gray-400  block text-center my-5 uppercase text-sm">
                            Log in Now / Return</Link>
            }
        </div>
    )
}

export default NewPassword
