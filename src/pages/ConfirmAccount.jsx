import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';


const ConfirmAccount = () => {
    const [alert, setAlert] = useState({});
    const [confirmedAccount, setConfirmedAccount] = useState(false);
    const { token } = useParams();

    useEffect(() => {
        const confirmByToken = async () => {
            const url = `http://localhost:3800/api/users/confirm/${token}`;
            try {
                const { data } = await axios(url);
                setAlert({
                    msg: data.msg,
                    error: false,
                });
                setConfirmedAccount(true);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        confirmByToken()
    }, [])

    const { msg } = alert;

    return (
        <div className="animate">
            <h1 className="animate text-5xl text-sky-600 font-black capitalize">{`${confirmedAccount ? "Confirm your Account and manage your" : ""}`}{" "}
                <span className="text-gray-600"><br />{`${confirmedAccount ? "Projects" : "It's not a valid token..."}`}</span>
            </h1>
            <div>
                {msg && <Alert alert={alert} />}
                <Link
                    to="/"
                    className="border-b py-3 border-gray-300 w-full mt-10 hover:border-gray-400  block text-center my-5 uppercase text-sm">
                    Log in Now </Link>
            </div>
        </div>
    )
}

export default ConfirmAccount
