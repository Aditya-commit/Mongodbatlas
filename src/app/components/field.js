import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';



import { nunito_sans } from '../fonts/nunito_sans';


import ArrowDown from '../icons/arrow_down';
import Pencil from '../icons/pencil';
import Dustbin from '../icons/dustbin';
import Spinner from '../icons/spinner';




const Field = ({db , col , id , keyName , value , deleteField}) => {


    const [loading , setLoading] = useState(false);



    const handleFieldDeletion = () => {

        if(!loading){

            setLoading(true);


            const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/delete_field/${db}/${col}/${id}/${keyName}`;

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

                    deleteField(id , keyName);
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


    return(

        <li className={`grid ${keyName === '_id' ? 'grid-cols-[max-content_max-content_1fr_max-content_max-content]' : 'grid-cols-[max-content_max-content_1fr_max-content]'} gap-x-3 group`}>
            <span className={`${nunito_sans.className} font-[700] text-gray-900 text-[17px]`}>{keyName}</span>
            <span className={`${nunito_sans.className} text-[17px] font-[600]`}>:</span>
            {(typeof(value) === 'object' || Array.isArray(value))
            ?
            <button className='flex space-x-1 items-center'>
                    {typeof(value) === 'object' && (
                        <span className={`${nunito_sans.className} text-[17px] text-gray-700 font-[600]`}>Object</span>
                    )}
                    {Array.isArray(value) && (
                        <span className={`${nunito_sans.className} text-[17px] text-gray-700 font-[600]`}>Array</span>
                    )}
                <ArrowDown style='text-lg' />
            </button>
            :
            <span className={`${nunito_sans.className} text-[16.9px] font-[500] ${keyName === '_id' ? 'text-yellow-600' : typeof(value) === 'number' ? 'text-blue-600' : 'text-gray-800'}`}>{value}</span>
            }
            {keyName === '_id'
            ?
                <>
                    <button className='px-1 border-2 border-transparent focus-visible:border-yellow-600 rounded text-gray-500 hover:text-yellow-400 focus-visible:text-yellow-400' title='Edit'>
                        <Pencil style='text-2xl' />
                    </button>
                    <Link href={`?delete_doc=true&id=${id}`} className='px-1 border-2 border-transparent focus-visible:border-yellow-600 rounded text-gray-500 hover:text-red-400 focus-visible:text-red-400' title='Delete'>
                        <Dustbin style='text-2xl' />
                    </Link>
                </>
            :
            <button className={`${loading ? 'border-transparent text-green-500' : 'invisible group-hover:visible border-transparent focus-visible:border-yellow-600 rounded text-red-500 hover:text-red-400'} px-1 border-2 `} title={loading ? 'Deleting' : 'Delete'} onClick={handleFieldDeletion}>
                {loading
                ?
                <Spinner style='text-xl animate-spin' />
                :
                <Dustbin style='text-xl' />
                }
            </button>
            }
        </li>
    )
}
Field.propTypes = {
    id : PropTypes.string.isRequired,
    db : PropTypes.string.isRequired,
    col : PropTypes.string.isRequired,
    keyName : PropTypes.string.isRequired,
    value : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object,
        PropTypes.array
    ])
}
export default Field;