import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';




import SidebarList from './sidebar_list';




import PlusSolid from '../icons/plus_solid';


import { nunito_sans } from '../fonts/nunito_sans';


const CollectionList = ({selectedDb , selectedColl , selectColFunc}) => {


    const [loading , setLoading] = useState(false);
    const [data , setData] = useState([]);



    const fetchCollections = () => {

        const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/show_cols/${selectedDb}`;

        fetch(url , {
            method : 'get',
            credentials : 'include'
        })
        .then(res => {

            const contentType = res.headers.get('Content-Type');
            const statusCode = res.status;


            if(statusCode === 200){

                return res.json().then(data => ({statusCode : statusCode , contentType : contentType , data : data})).catch(error => ({contentType : contentType , statusCode : 500 , 'error' : 'Oops! Something went wrong'}))
            }
            else if(/text\/plain;/.test(contentType)){

                return res.text().then(msg => ({statusCode : statusCode , contentType : contentType , error : msg})).catch(error => ({contentType : contentType , statusCode : 500 , error : error}));
            }
            else{

                return {statusCode : statusCode , contentType : contentType , error : 'Oops! Something went wrong'};
            }
        })
        .then(({statusCode , contentType , data , error}) => {

            if(statusCode === 200){

                setData(data);

            }
            else{
                
                

            }
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }



    useEffect(()=>{

        if(selectedDb !== null){

            setLoading(true);
            fetchCollections();
        }

    },[selectedDb])


    return(

        <div className='flex flex-col bg-white pt-5'>

            <div className='w-full grid grid-cols-[1fr_max-content] items-center space-x-3 bg-gray-100 w-full px-6 py-3 border border-r-0 border-l-0 border-gray-300'>
                <span className={`text-gray-800 justify-self-center ${nunito_sans.className} font-[700] text-[19px]`}>Collections</span>
                <button className='group' title='Add Collection'>
                    <PlusSolid style='text-2xl text-gray-800 group-hover:text-green-500 group-focus-visible:text-green-500' />
                </button>
            </div>
            <SidebarList loading={loading} data={data} selectedRow={selectedColl} selectFunc={selectColFunc} />
        </div>

    )
}
CollectionList.propTypes = {
    selectedDb : PropTypes.string.isRequired,
    selectedColl : PropTypes.string.isRequired,
    selectColFunc : PropTypes.func.isRequired,
}
    
export default CollectionList;