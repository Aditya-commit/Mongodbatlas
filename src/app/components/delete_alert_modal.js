import { useEffect, useState } from 'react';
import { useRouter , useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';




import ModalHeader from './modal_header';
import { nunito_sans } from '../fonts/nunito_sans';
import AlertCircle from '../icons/alert_circle_solid';





const DeleteAlertModal = ({heading , db , col , deleteDoc}) => {

    const [start , setStart] = useState(false);



    const router = useRouter();
    const searchParams = useSearchParams();



    const [enable , setEnable] = useState(false);
    const [inputValue , setInputValue] = useState('');
    const [loading , setLoading] = useState(false);



    const back = () => {

        setStart(false);

        setTimeout(()=> router.back(),300);
    }




    const reset = () => (setLoading(false) , setEnable(false) , setInputValue(''));



    const deleteDocument = () => {

        if(!loading && enable){

            setLoading(true);


            const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/delete_doc/${db}/${col}/${searchParams.get('id')}`;

            fetch(url , {
                method : 'delete',
                credentials : 'include'
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

                    deleteDoc(searchParams.get('id'));
                    back();
                }
                else{

                    // HANDLE ERRORS
                }
            })
            .catch(error => {
                
                // HANDLE ERRORS
            })
            .finally(()=>reset());
        }
    }



    const handleChange = ({target : { value }}) => {

        value === 'permanently delete' ? setEnable(true) : setEnable(false);

        setInputValue(value);
    }



    useEffect(()=> setStart(true) , []);





    return(

        <div className={`w-1/2 transition-transform duration-300 ease-in-out ${start ? 'scale-100' : 'scale-0'} bg-white rounded-lg overflow-hidden`}>
            <ModalHeader heading={heading} backFunc={back} />

            <div className='px-7 py-6'>
                
                <h1 className='flex items-center gap-x-2 px-3 border border-yellow-100 py-4 bg-yellow-50'>
                    <AlertCircle style='text-yellow-600 text-xl' />
                    <span className={`${nunito_sans.className} text-yellow-600 font-[600]`}>Confirming this will permanently delete the document</span>
                </h1>

                <div className='pt-10 flex flex-col gap-y-3'>
                    
                    <p className={`text-[15px] px-0.5 ${nunito_sans.className} text-gray-800 font-[500]`}>Enter <i>permanently delete</i> to confirm deletion of document with _id <b>{searchParams.get('id')}</b></p>

                    <input type='text' placeholder='permanently delete' className={`outline-none border-2 border-gray-200 rounded px-3 w-full py-1.5 transition-colors duration-300 ease-in-out ${nunito_sans.className} focus-visible:border-black font-[500] text-[15px]`} value={inputValue} onChange={handleChange} />

                    <button className={`${nunito_sans.className} font-[600] border-2 mt-10 w-full text-center ${(loading || !enable) ? 'bg-red-300 border-transparent' : 'bg-red-500 border-transparent focus-visible:shadow-[0_0_1px_3px_red] focus-visible:border-white hover:bg-red-700 transiton-all duration-300 ease-in-out'} text-white py-2 rounded`} onClick={deleteDocument}>
                        {loading
                        ?
                        <>Deleting...</>
                        :
                        <>Delete</>
                        }
                    </button>

                </div>

                <div>

                </div>
            </div>
        </div>
    )
}
DeleteAlertModal.propTypes = {
    heading : PropTypes.string.isRequired,
    db : PropTypes.string,
    col : PropTypes.string,
    deleteDoc : PropTypes.func.isRequired,
}
export default DeleteAlertModal;