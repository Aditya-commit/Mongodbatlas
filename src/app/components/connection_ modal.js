import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';


import { nunito_sans } from '../fonts/nunito_sans';

import ModalHeader from './modal_header';


const ConnectionModal = ({toggleConnModal}) => {

    let timeoutid = null;

    const [start , setStart] = useState(false);



    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);


    const back = () => {

        setTimeout(()=>toggleConnModal() , 320);

        setStart(false);
    }



    const connectToDb = () => {

    }



    useEffect(()=>{
        timeoutid = setTimeout(()=>setStart(true), 200)

        return function cleanup(){
            clearTimeout(timeoutid);
        }
    },[]);
        
    return(
        <div className={`w-1/2 transition-transform duration-300 ease-in-out ${start ? 'scale-100' : 'scale-0'} bg-white rounded-lg overflow-hidden`}>
            <ModalHeader heading='Connect To MongoDB' backFunc={back} />

            <div className='grid grid-cols-2 gap-x-10 gap-y-20 pt-10 px-10'>

                <div className='grid grid-cols-[max-content_1fr] gap-x-3 items-center outline-none'>
                    <label htmlFor='host' className={`${nunito_sans.className} font-[600] text-lg`}>Host</label>
                    <input type='text' name='host' id='host' placeholder='127.0.0.1' className={`outline-none border-3 border-gray-200 focus:border-green-600 transition-border duration-300 ease-in-out rounded px-3 py-2 text-[17px] caret-green-400 ${nunito_sans.className}`} />
                </div>

                <div className='grid grid-cols-[max-content_1fr] gap-x-3 items-center outline-none'>
                    <label htmlFor='port' className={`${nunito_sans.className} font-[600] text-lg`}>Port</label>
                    <input type='numbee' name='port' id='port' placeholder='8000' className={`outline-none border-3 border-gray-200 focus:border-green-600 transition-border duration-300 ease-in-out rounded px-3 py-2 text-[17px] caret-green-400 ${nunito_sans.className}`} />
                </div>

                <div className='grid grid-cols-[max-content_1fr] gap-x-3 items-center outline-none'>
                    <label htmlFor='User' className={`${nunito_sans.className} font-[600] text-lg`}>User</label>
                    <input type='text' name='user' id='user' placeholder='Enter username' className={`outline-none border-3 border-gray-200 focus:border-green-600 transition-border duration-300 ease-in-out rounded px-3 py-2 text-[17px] caret-green-400 ${nunito_sans.className}`} />
                </div>

                <div className='grid grid-cols-[max-content_1fr] gap-x-3 items-center outline-none'>
                    <label htmlFor='password' className={`${nunito_sans.className} font-[600] text-lg`}>Pass</label>
                    <input type='password' name='password' id='password' placeholder='Enter password' className={`outline-none border-3 border-gray-200 focus:border-green-600 transition-border duration-300 ease-in-out rounded px-3 py-2 text-[17px] caret-green-400 ${nunito_sans.className}`} />
                </div>

            </div>

            <div className='flex justify-center w-full px-10 py-18'>
                <button className={`outline-none cursor-pointer border-3 ${loading ? 'bg-green-300 border-green-300' : 'border-green-600 transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 focus-visible:shadow focus-visible:shadow-[0_0_0_3px_#01b701] focus-visible:border-green-100'} w-full ${nunito_sans.className} font-[600] text-[19px]  text-white rounded h-[50px]`}>
                    {loading
                    ?
                    <span style={{fontWeight:700}}>Connecting...</span>
                    :
                    <span style={{fontWeight:700}}>Connect</span>
                    }
                </button>
            </div>
        </div>
    )
}
ConnectionModal.propTypes = {

}
export default ConnectionModal;