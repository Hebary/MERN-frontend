import React from 'react'
import  { Link } from 'react-router-dom';    
import useAuth from '../hooks/useAuth';
const Project = ({project}) => {
    
    const { auth } = useAuth();
    const { name, client, _id, creator }=project;

    return (
        <div className="flex justify-between hover:from-sky-400 flex-wrap hover:to-sky-600 rounded-md bg-gradient-to-r px-6 py-4 border-b">
            <p className="flex-1 mt-1 text-lg font-semibold">
                {name}
                <span className="font-light uppercase py-2 text-gray-700">
                    {' '}{client}
                </span>
            </p>

            <p className={`${auth._id !== creator ? "text-green-600":"text-sky-600" } flex justify-center w-1/2 text-xs font-bold uppercase tracking-widest p-3`}>{`${auth._id!==creator ? "Contributor" : "Creator" } `}</p>
            
            <Link
            to={`${_id}`}
            className="px-5 py-2 border-b text-gray-600 font-semibold text-center md:w-auto w-full uppercase hover:border-gray-700">see project</Link>
        </div>
    )
}

export default Project
