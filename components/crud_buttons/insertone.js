import { useState , useContext , useEffect } from 'react';
import { Option_context } from '../center_container';
import { Style_Context } from '../../pages/index';
import ReactDOM from 'react-dom';
import {
	XIcon 
} from '@heroicons/react/outline';
import { Database_Collection_context } from '../main';
import axios from 'axios';
import { useSpring , animated } from 'react-spring';

const Insertone = ()=>{
	const [hide , setHide]=useState(false);

	// INITIALISING OUR CONTEXT OF OPTIONS
	const Option = useContext(Option_context);

	//INITIALINSG OUR CONTEXT SENT FROM INDEX.JS FILE
	const Style_context = useContext(Style_Context);

	// CREATING THE ANIMATION
	const styles = useSpring({
		from : { opacity : 0 },
		to : { opacity : 1 }
	})

	const handleSubmit = (event)=>{
		event.preventDefault();
		let key = event.target.key.value;
		let value =  event.target.value.value;
		
		const database = Option.database_name;
		const collection = Option.collection_name;
		
		axios.post('api/insert/insertone/' , {
			[key] : value,
			'database':database,
			'collection':collection
		})
		.then((res)=>{
			Option.setinsertedData({'_id':res.data , [key]:value});
			// RESET THE FORM
			key='';
			value='';
		})
		.catch(error => console.log(error));

		
		// REMOVE THE POPUP MODAL
		Option.resetFunc();
		Style_context.style_changer('no');
		setHide(true)

	}

	const removeModal = ()=>{
		// IF THE USER CLICKS ON THE CROSS BUTTON THEN HIDE THE POPUP MODAL
		Option.resetFunc();
		Style_context.style_changer('no');
		setHide(true);
	}

	return ReactDOM.createPortal(
			<animated.div className='inline-block fixed z-20 bg-gray-100 object-center text-justify inset-x-1/4 bottom-1/3 shadow-lg w-1/2 h-80 border-1 border-black' id='insertonediv' style={styles}>
				<XIcon width={18} height={18} className='float-right m-1 text-red-600 hover:bg-gray-200 rounded-full' onClick={removeModal} />
				<h3 className='text-xl text-gray-800 pl-20 pt-10'>Insert to Collection</h3>
				<form className='mt-10 pl-10' onSubmit={handleSubmit}>
					<input type='text' name='key' placeholder="key" className='bg-transparent text-red-500 w-20 outline-none border-b-2 focus:bg-transparent border-dashed border-red-600 focus:border-b-0 '/>
					<span className='m-3'>:</span>
					<input type='text' name='value' placeholder="value" className='bg-transparent w-20 outline-none  border-b-2 focus:bg-transparent border-dashed border-black text-blue-400 focus:border-b-0' />
					<input type='submit' value='Add' className='float-right mr-10 bg-green-500 text-black antialised text-lg font-mono text-bold w-16 h-8 text-center rounded-lg cursor-pointer hover:bg-green-600' />
				</form>
			</animated.div>
	,document.getElementById('inserts'));
}
export default Insertone;