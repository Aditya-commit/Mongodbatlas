import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';



import ModalHeader from './modal_header';


import { nunito_sans } from '../fonts/nunito_sans';


import XCloseOutline from '../icons/xclose_outline';
import PlusOutline from '../icons/plus_outline';





const EditModal = ({data ,db , col , updateData}) => {


    const router = useRouter();


    const [start , setStart] = useState(false);
    const [loading , setLoading] = useState(false);


    const [dataObj , setDataObj] = useState(data);








    const back = () => {
        
        setStart(false);

        setTimeout(()=> router.back() , 300);
    }



    const addPairs = () => setDataObj({...dataObj , '' : ''});


    
    const deletePair = keyName => {

        let dataCopy = {...dataObj};

        delete dataCopy[keyName];

        setDataObj(dataCopy);
    }



    const submitForm = () => {

        if(!loading){

            setLoading(true);

            const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/update_doc`;

            fetch(url , {
                method : 'post',
                body : JSON.stringify({'database' : db , 'collection' : col , 'updatedDoc' : dataObj}),
                headers : {
                    "Content-Type" : 'application/json'
                },
                credentials : 'include',
            })
            .then(res => {
                
                const statusCode = res.status;
                const contentType = res.headers.get('Content-Type');


                if(statusCode === 200){

                    return { statusCode : statusCode , contentType : contentType };
                }
                else{

                    if(/text\/plain/.test(contentType)){

                        return res.text().then(msg => ({statusCode : statusCode , contentType : contentType , msg : msg})).catch(error => ({statusCode : statusCode , contentType:contentType , msg : "Oops! Something went wrong"}));
                    }
                    else{

                        return { statusCode : statusCode , contentType : contentType , msg : "Oops! Something went wrong"};
                    }
                }

            })
            .then(({statusCode : statusCode , contentType : contentType , msg : msg}) => {

                if(statusCode === 200){

                    updateData(dataObj);
                    back();
                }
                else{

                    // HANDLE ERRORS
                }
            })
            .catch(error => {
                
                // HANDLE ERRORS
            })
            .finally(()=>setLoading(false));
        }

    }



    useEffect(()=>setStart(true) , []);




    const handleKeyChange = ({target : { name , value }}) => {

        let newObj = {};


        Object.keys(dataObj).map(key => {
            if(key === name){

                newObj[value] = dataObj[name];
            }
            else{
                newObj[key] = dataObj[key];
            }
        });


        setDataObj(newObj);

    }


    const handleValueChange = ({target : {name , value}}) => {

       const updatedObj = {...dataObj , [name] : value};

       setDataObj(updatedObj);
    }






    return(
        <div className={`w-1/2 transition-transform duration-300 ease-in-out ${start ? 'scale-100' : 'scale-0'} bg-white rounded-lg overflow-hidden`}>
        
            <ModalHeader heading='Edit Document' backFunc={back} />

            <form className='flex flex-col space-y-10 pt-10 pb-4 px-10 max-h-[50vh] overflow-y-auto' style={{'scrollbarWidth' : 'thin'}}>

                <div className='border border-gray-200 px-5 py-5'>
                    <ol className='flex flex-col gap-y-9'>
                        {Object.keys(dataObj).map((keyName , index) => (
                            <li key={index} className='flex gap-x-7 items-center'>
                                {(keyName !== '_id') && (
                                    <>
                                        <input type='text' name={keyName} className={`outline-none ${nunito_sans.className} font-[600] border-b-2 border-yellow-200 focus-visible:border-yellow-500 transition-all duration-300 ease-in-out px-3 py-1.5 text-lg text-yellow-600 caret-yellow-400`} value={keyName} onChange={handleKeyChange} spellCheck={false} />
                                        <span className={`${nunito_sans.className} font-[600] text-lg`}>:</span>
                                        <input type='text' name={keyName} className={`${nunito_sans.className} font-[500] outline-none border-b-2 border-gray-300 focus-visible:border-black transition-all duration-300 ease-in-out px-3 py-2 text-lg`} value={dataObj[keyName]} onChange={handleValueChange} spellCheck={false} />
                                        <button type='button' className='group border-2 border-transparent focus-visible:border-red-500 rounded-full' title='Remove Field' onClick={()=>deletePair(keyName)}>
                                            <XCloseOutline style='text-xl text-red-500 group-hover:text-red-700' />
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                    <div className='flex justify-end items-center px-4 gap-x-7 py-3'>
                        <button type='button' className={`transition-colors duration-300 ease-in-out group focus-visible:bg-black flex items-center border border-gray-600 hover:border-black rounded-full px-4 py-1.5`} onClick={addPairs}>
                            <span className={`transition-colors duration-300 ease-in-out ${nunito_sans.className} font-[600] border-r border-gray-600 group-focus-visible:border-gray-200 pr-3 text-gray-700 group-hover:text-black group-focus-visible:text-white`}>Key Value</span>
                            <PlusOutline style='transition-colors duration-300 ease-in-out text-2xl pl-3 text-gray-700 group-hover:text-black group-focus-visible:text-white' />
                        </button>
                    </div>
                </div>

            </form>


            <div className='flex justify-center w-full px-10 py-10 '>
                <button className={`outline-none cursor-pointer border-3 ${loading ? 'bg-green-300 border-green-300' : 'border-green-500 transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 focus-visible:shadow focus-visible:shadow-[0_0_0_3px_#01b701] focus-visible:border-green-100'} w-full ${nunito_sans.className} font-[600] text-[19px]  text-white rounded h-[50px]`} onClick={submitForm}>
                    {loading
                    ?
                    <span style={{fontWeight:700}}>Updating...</span>
                    :
                    <span style={{fontWeight:700}}>Update</span>
                    }
                </button>
            </div>
        </div>
    )
}
EditModal.propTypes = {
    data : PropTypes.object.isRequired,
    db : PropTypes.string.isRequired,
    col : PropTypes.string.isRequired,
    updateData : PropTypes.func.isRequired,
}
export default EditModal;