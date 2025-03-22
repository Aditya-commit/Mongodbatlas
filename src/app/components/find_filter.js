import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';


import FilterIcon from '../icons/filter';
import { nunito_sans } from '../fonts/nunito_sans';




const FindFiter = ({db , col , loading , filterDocs}) => {


    const [query , setQuery] = useState('')
    const [searching , setSearching] = useState(false);
    const [reset , setReset] = useState(false);





    const handleChange = ({target : { value }}) => setQuery(value);






    const queryData = () => {

        if(!loading && !searching){

            if(!/^\s+$/.test(query)){

                setSearching(true);

                const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/filter_docs`;

                const formData = new FormData();

                formData.append('database' , db);
                formData.append('collection' , col);
                formData.append('query' , query)

                fetch(url , {
                    method : 'post',
                    body : formData,
                    credentials : 'include'
                })
                .then(res => {

                    const statusCode = res.status;
                    const contentType = res.headers.get('Content-Type');

                    if(statusCode === 200){

                        return res.json().then(data => ({statusCode : statusCode , contentType : contentType , data : data})).catch(error => ({statusCode : 500 , contentType : contentType , msg : 'Oops! Something went wrong'}));
                    }
                    else{

                        if(/text\/plain/.test(contentType)){

                            return res.text().then(msg => ({statusCode : statusCode , contentType : contentType , msg : msg})).catch(error => ({statusCode : statusCode , contentType : contentType , msg : "Oops! Something went wrong"}));
                        }
                        else{

                            return {statusCode : statusCode , contentType : contentType , msg : "Oops! Something went wrong"};
                        }
                    }
                })
                .then(({statusCode , contentType , data , msg}) => {

                    if(statusCode === 200){

                        filterDocs(data);

                        setReset(true);

                        document.querySelector('.find_btn').innerText = 'Reset';
                    }
                })
                .catch(error => {
                    
                    // HANDLE ERRORS
                })
                .finally(()=>setSearching(false));
            }
        }
    }



    const resetFunc = () => (setReset(false) , filterDocs(null) , setQuery(''));



    return(

        <>
            <div className='flex space-x-2 items-center bg-gray-100 px-4 py-2 rounded'>
                <FilterIcon style='text-lg text-gray-800' />
                <span className={`font-mono text-xl font-[700] text-gray-700`}>Filter</span>
            </div>

            <input type='text' className={`outline-none font-mono border-3 border-gray-300 rounded-lg px-3 focus-visible:border-gray-600 focus-visible:bg-white transition-colors duration-300 ease-in-out mr-14 ml-2 bg-gray-100`} placeholder='{ age : { $gt : 20 } , name : "Aditya" }' value={query} onChange={handleChange} spellCheck={false} />

            <button className={`${nunito_sans.className} ${(searching || loading) ? 'bg-gray-100 text-gray-500 border-gray-300' : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200 border-gray-500 focus-visible:border-[#ceffce] focus-visible:shadow focus-visible:shadow-[0_0_1px_3px_#008d00]'} font-[600] text-lg px-8 py-1 border-2 rounded`} onClick={reset ? resetFunc : queryData}>
                {reset ? <>Reset</> : <>Find</>}
            </button>
        </>

    )
}
FindFiter.propTypes ={
    db : PropTypes.string,
    col :PropTypes.string,
    loading : PropTypes.bool,
    filterDocs : PropTypes.func
}
export default FindFiter;