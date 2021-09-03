import axios from 'axios';
import { useState , useContext , useRef , useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Option_context } from '../center_container';
import {
    XIcon
} from '@heroicons/react/outline';
import { Style_Context } from '../../pages/index';
import { useSpring , animated } from 'react-spring';

const Update = ({database , collection , id , updatekey , value , catchUpdate , cancelUpdate}) => {
    // INITIALISING OUR CONTEXT SENT FROM THE PAGES INDEX.JS FILE
    const Style_context = useContext(Style_Context);

    const [btnactive , setbtnActive] = useState(null);

    const [state_value , setStatevalue] = useState(value);

    const value_ref = useRef(null);

    // CREATING OUR ANIMATION
    const styles = useSpring({
        from : { opacity : 0 , x : '0%' },
        to : { opacity : 1 , x : '50%'}
    })

    const handleChange = (event) => {
        setStatevalue(value_ref.current.value);
        if(value != value_ref.current.value){
            setbtnActive(true);
        }
        else{
            setbtnActive(false);
        }
    }

    const updateDocument = (event) => {
        event.preventDefault();

        let updated_value = value_ref.current.value;

        if(updated_value != value){
            cancelUpdate();
            axios.post('api/update/' , {
                'database':database,
                'collection':collection,
                'id': id,
                'key':updatekey,
                'value':updated_value
            })
            .then((response)=>{
                if(response.status == 200){
                    catchUpdate(updated_value);
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    return ReactDOM.createPortal(
        <animated.div className='inline-block bg-gray-100 text-justify shadow-lg w-1/2 h-80 border-1 border-black' id='insertonediv' style={styles}>
                <XIcon width={18} height={18} className='float-right m-1 text-red-600 hover:bg-gray-200 rounded-full' onClick={()=>cancelUpdate()} />
                <h3 className='text-xl text-gray-800 pl-20 pt-10'>Update to Collection</h3>
                <form className='mt-10 pl-10' onSubmit={updateDocument}>
                    <input type='text' name='key' value={updatekey} className='bg-transparent text-black w-3/12 outline-none border-b-2 focus:bg-transparent border-dashed border-black' readOnly onChange={handleChange} />
                    <span className='m-3'>:</span>
                    <input type='text' name='value' value={state_value} ref={value_ref} className='bg-transparent w-3/12 outline-none  border-b-2 focus:bg-transparent border-dashed border-gray-600 text-gray-600 focus:border-b-0' onChange={handleChange} />
                    <input type='submit' value='Update' className={`float-right mr-10 text-black antialised text-lg font-mono text-bold w-16 h-8 text-center focus:outline-none rounded-lg cursor-pointer ${btnactive ? 'bg-green-400 hover:bg-green-500 focus:bg-green-500' : 'bg-gray-400'}`} />
                </form>
            </animated.div>
    , document.getElementById('inserts'));
}
export default Update;