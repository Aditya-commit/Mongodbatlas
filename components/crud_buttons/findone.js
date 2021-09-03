import {
	SearchIcon,
	XIcon
} from '@heroicons/react/outline';
import { useState , useEffect , useContext } from 'react';
import { Option_context } from '../center_container';
import axios from 'axios';

const Findone = ()=>{
	const [active , setActive] = useState(false);
	//INITIALISING OUR CONTEXT OF OPTIONS
	const Options = useContext(Option_context);

	const hideDiv=()=>{
		if(active){
			// RESET THE VALUE OF THE STATE TO NULL IN CENTER CONTAINER COMPONENT
			setActive(false);
		}
		else{
			setActive(true);
			Options.resetFunc();
		}
	}

	const findDocument = (event)=>{
		event.preventDefault();
		let value = event.target.findobj.value;

		try{
			// IF THE GIVEN QUERY IS SERIALIZABLE THAT IS IT IS IN JSON FORM THEN SEND THIS QUERY TO THE API TO FETCH THE DATA BASED ON THIS QUERY
			let parse_value = JSON.parse(value);
			const database = Options.database_name;
			const collection= Options.collection_name;

			axios.post('api/find/findOne' , {
				'database':database.toString(),
				'collection':collection.toString(),
				'query' : parse_value 
			})
			.then((res)=>{
				if(res.data == ""){
					Options.findresult('0 results found');
				}
				else{
					Options.findresult(res.data);
				}
			})
			.catch((error)=>{
				Options.findresult('Oops!Something went wrong');
				// HIDE THE FIND OPTIONS
				Options.resetFunc();
			});
		}
		catch(error){
			// IF THE GIVEN QUERY IS NOT SERIALIZABLE THEN DISPLAY THIS ERROR MESSAGE
			Options.findresult('It is not a valid format.Please enter the data in JSON format just like how it is given in placeholder value');
		}

		// CLEARING THE INPUT FIELD
		event.target.findobj.value='';
		// HIDE THE FIND OPTIONS
		Options.resetFunc();
	}
	
	return(
		<>
			<div className={`h-20 ${active && 'hidden'}`}>
				<div className='text-right'>
					<XIcon width={16} height={16} className='text-red-500 mr-1 inline hover:bg-gray-300 rounded-full' onClick={hideDiv} />
				</div>
				<div className='pl-4 pt-0.5 flex flex-row space-x-3'>
					<span className='select-none bg-gray-200 px-6 py-0.5 font-xl text-center text-gray-500 font-bold rounded-xl'>filter</span>
					<form onSubmit={findDocument} className='bg-transparent w-1/2'>
						<input type='text' name='findobj' placeholder='{"key" : "value"}' className='outline-none bg-transparent text-gray-500 placeholder-opacity-75 bg-transparent w-4/5' />
						<input type='submit' value='Find' className='float-right bg-green-500 rounded p-0.5 cursor-pointer pl-2 pr-2 text-center hover:bg-green-600' />
					</form>
				</div>
			</div>
			<hr />
		</>
	);
}
export default Findone;