
const Alert = ({alert})=>{
    return ( 
            <p 
                className={`${alert.error ? "from-red-400 to-red-700" : "from-sky-400 to-sky-600"} bg-gradient-to-r
                    uppercase lg:w-full p-2 text-md font-bold m-3 animate text-white md:1/3 w-full text-center 
                    rounded-lg shadow-md mx-auto`}>
                {alert.msg}
            </p>
    )
}

export default Alert