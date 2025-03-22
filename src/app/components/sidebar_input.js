import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';


import { nunito_sans } from '../fonts/nunito_sans';


const SideBarInput = ({updateData , db}) => {


    const [name , setName] = useState('');

    const [start , setStart] = useState(false);


    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);


    const handleChange = ({target : { value }}) => setName(value);


    const handleKeyDown = event => {

        if(event.which === 13){

            if(!loading){

                setLoading(true);
    
    
                const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/create_coll`;
    
                const formData = new FormData();
    
                formData.append('database' , db);
                formData.append('collection' , name);
    
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
                        
                        setName(''); // RESET THE INPUT
                        updateData('insert' , name);
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
    }


    useEffect(()=>setStart(true),[])

    return(
        <div className={`w-full bg-[#137c13] flex items-center my-2 px-3 transition-[height] duration-300 ease-in-out ${start ? 'h-[100px]' : 'h-0'} overflow-hidden`}>
            <input type='text' className={`w-full border-2 border-[#00b94a] shadow-[0_0_0_2px_#a5a5a5] rounded-full px-6 ${nunito_sans.className} font-[600] ${loading ? 'bg-gray-200 text-gray-500' : 'bg-white text-black'} py-1 outline-none`} placeholder='Enter collection name' onChange={handleChange} value={name} onKeyDown={handleKeyDown} readOnly={loading} />
        </div>
    );
}
SideBarInput.propTypes = {
    updateData : PropTypes.func.isRequired,
    db : PropTypes.string.isRequired,
}
export default SideBarInput;