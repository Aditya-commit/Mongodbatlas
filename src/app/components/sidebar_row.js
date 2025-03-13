import { useState } from 'react';
import PropTypes from 'prop-types';


import { nunito_sans } from '../fonts/nunito_sans';


import XCloseSolid from '../icons/xclose';
import Spinner from '../icons/spinner';


const SideBarRow = ({name , selectFunc , db , category , updateData , selectedRow}) => {


    const [loading , setLoading] = useState(false);


    const deleteFunc = () => {

        if(!loading){

            setLoading(true);

            const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/${category === 'database' ? `drop_db/${name}` : `drop_col/${db}/${name}`}`;
    
    
            fetch(url , {
                method : 'delete',
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
                    
                    updateData('delete' , name);
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

    return(
        <li className={`grid grid-cols-[1fr_max-content] border gap-x-3 items-center pl-5 pr-2 ${selectedRow === name ? 'bg-green-50 border-green-300' : 'border-transparent hover:bg-green-50'} rounded py-3 transition-colors duration-300 ease-in-out`}>
            <button className={`${nunito_sans.className} transition-colors duration-300 ease-in-out font-[600] ${selectedRow === name ? 'text-green-700' : 'text-black focus-visible:text-green-600'} text-left text-[18px]`} onClick={()=>selectFunc(name)}>{name}</button>
            {loading
            ?
            <Spinner style='text-green-700 animate-spin text-2xl' />
            :
            <button className={`group`} title='Delete' onClick={deleteFunc}>
                <XCloseSolid style='text-2xl text-gray-400 group-hover:text-red-600 group-focus-visible:text-red-600 transition-colors duration-300 ease-in-out' />
            </button>
            }
        </li>
    );
}
SideBarRow.propTypes = {
    name : PropTypes.string.isRequired,
    selectFunc : PropTypes.func.isRequired,
    selectedRow : PropTypes.string.isRequired,
    updateData : PropTypes.func.isRequired,
    category : PropTypes.oneOf(['database' ,'collection']),
}
export default SideBarRow;