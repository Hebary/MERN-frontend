import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { useState } from 'react';
import axiosClient from '../../config/axiosClient';



const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});




    const handleSubmit = async e => {
        e.preventDefault();
        //Validating
        if (!isValidEmail(email)) {
            setAlert({
                msg: 'Email valid is required',
                error: true
            });
            handleTimeOut(3000);
            return;
        }
        try {
            const { data } = await axiosClient.post(`/users/reset_password`, { email });
            setAlert({
                msg: data.msg,
                error: false
            });
            handleTimeOut(10000, true);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
            handleTimeOut(3000);
        }
    }

    const isValidEmail = email => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
    }

    const handleTimeOut = (timeout,bool) => {
        setTimeout(() => {
            bool && setEmail("");
            setAlert({});
        }, timeout);
    }

    const { msg } = alert;


    return (

        <div className="animate">
            <h1 className="animate text-5xl text-sky-600 font-black capitalize">Enter your email to recieve{' '}
                <span className="text-gray-600">instructions</span></h1>
            {
                msg && <Alert alert={alert} />
            }
            <form className="mt-10 bg-white shadow-lg rounded-lg py-5 px-8"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col ">
                    <label htmlFor="email" className="text-md my-2 uppercase text-gray-600 font-bold">Email</label>
                    <input
                        id="email"
                        placeholder="Enter your email"
                        className="shadow p-3 rounded-lg focus:outline-none"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <input
                    type="submit"
                    value="Send instructions"
                    className="bg-sky-800 hover:bg-sky-700  text-white font-black py-2 px-4
                    cursor-pointer rounded-md w-full mt-7 mb-4 transition-colors duration-200"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link to={'/registry'}
                    className="block border-b uppercase  py-2 text-center my-5 text-slate-600 hover:text-sky-800 uppercasse text-sm"
                >Create new account
                </Link>
                <Link to='/'
                    className="block border-b uppercase  py-2 text-center my-5 text-slate-600 hover:text-sky-800 uppercasse text-sm"
                >¿Do You Have An Account? Log in
                </Link>
            </nav>

        </div>
    )
}

export default ResetPassword
