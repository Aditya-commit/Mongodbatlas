import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';



import ModalHeader from './modal_header';


import { nunito_sans } from '../fonts/nunito_sans';




const DbModal = ({backFunc , updateData}) => {

    const [start , setStart] = useState(false);


    const [loading , setLoading] = useState(false);

    const [details , setDetails] = useState({'database' : '' , 'collection' : ''});


    const handleChange = ({target : { name , value }}) => setDetails({...details , [name] : value});


    const back = () => {

        setStart(false);

        setTimeout(()=>backFunc() , 500);
    }



    const createDb = () => {

        if(!loading){
            setLoading(true);


            const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/create_db`;

            const formData = new FormData();

            formData.append('database' , details.database);
            formData.append('collection' , details.collection);

            fetch(url ,{
                method : 'post',
                body : formData,
                credentials : 'include'
            })
            .then(res => {
    
                const contentType = res.headers.get('Content-Type');
                const statusCode = res.status;
    
                if(/text\/plain/.test(contentType)){
    
                    return res.text().then(msg => ({contentType : contentType , statusCode : statusCode , msg : msg }));
    
                }
                else{
    
                    return { contentType : contentType , statusCode : statusCode }
                }
    
            })
            .then(({contentType , statusCode , msg}) => {
    
                if(statusCode === 200){
                    
                    updateData('insert' , details.database);
                    back();
                }
                else{
                    
                    // ERROR HANDLING
                }
            })
            .catch(error => {
                
                // ERROR HANDLING
            })
            .finally(()=>{
                setLoading(false);
            });
        }
    }


    useEffect(()=>setStart(true), []);


    return(
        <div className={`transition-all duration-500 ease-in-out absolute ${start ? 'top-42' : '-top-100'} w-1/2 bg-white rounded-xl overflow-hidden`}>

            <ModalHeader heading='Create a database' backFunc={back} />

            <div className='grid grid-cols-2 pt-10 pb-5 px-9 gap-x-14'>

                <div className='grid grid-cols-[max-content_1fr] gap-x-3 items-center outline-none'>
                    <label htmlFor='database' className={`${nunito_sans.className} font-[600] text-lg`}>Database</label>
                    <input type='text' name='database' id='database' placeholder='test' className={`outline-none border-3 border-gray-200 focus:border-green-600 transition-border duration-300 ease-in-out rounded px-3 py-2 text-[17px] caret-green-400 ${nunito_sans.className}`} value={details.database} onChange={handleChange} />
                </div>

                <div className='grid grid-cols-[max-content_1fr] gap-x-3 items-center outline-none'>
                    <label htmlFor='collection' className={`${nunito_sans.className} font-[600] text-lg`}>Collection</label>
                    <input type='text' name='collection' id='collection' placeholder='mycollection' className={`outline-none border-3 border-gray-200 focus:border-green-600 transition-border duration-300 ease-in-out rounded px-3 py-2 text-[17px] caret-green-400 ${nunito_sans.className}`} value={details.collection} onChange={handleChange} />
                </div>

            </div>

            <div className='flex justify-center w-full px-10 pt-6 pb-10'>
                <button className={`outline-none cursor-pointer border-3 ${loading ? 'bg-green-300 border-green-300' : 'border-green-600 transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 focus-visible:shadow focus-visible:shadow-[0_0_0_3px_#01b701] focus-visible:border-green-100'} w-full ${nunito_sans.className} font-[600] text-[19px]  text-white rounded h-[50px]`} onClick={createDb}>
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
DbModal.propTypes = {
    backFunc : PropTypes.func.isRequired,
    updateData : PropTypes.func.isRequired
}
export default DbModal;