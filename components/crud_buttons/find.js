import axios from 'axios';
import { useContext , useState } from 'react';
import { Option_context } from '../center_container';
import {
	XIcon
} from '@heroicons/react/outline';

const Find = ()=>{
	// INITIALISING OUR CONTEXT SENT FROM THE CENTER_CONTAINER FILE
	const Options = useContext(Option_context);

	const [active , setActive] = useState(false);

	const hideDiv=()=>{
		if(active){
			setActive(false);
		}
		else{
			setActive(true);
			// RESET THE VALUE OF THE STATE TO NULL IN CENTER CONTAINER COMPONENT
			Options.resetFunc();
		}
	}

	const findDocument =(event)=>{
		event.preventDefault();
		let value = event.target.findobj.value;

		try{
			let parse_value = JSON.parse(value);
			const database = Options.database_name;
			const collection = Options.collection_name;

			axios.post('api/find/finds/',{
				'database':database,
				'collection':collection,
				'query':parse_value
			})
			.then((res) => {
				if(res.data.length == 0){
					Options.findresult('0 results found');
				}
				else{
					Options.findresult(res.data);
				}
			})
			.catch((error)=>{
				Options.findresult('Oops!Something went wrong.Please try again');
			})
		}
		catch{
			Options.findresult('It is not a valid format please enter the data just like it is given in the placeholder')
		}
		
		value= '';
		Options.resetFunc();
	}

	return(
		<div>
			<div className={`h-20 ${active && 'hidden'}`}>
				<div className='text-right'>
					<XIcon width={16} height={16} className='text-red-500 mr-1 inline hover:bg-gray-300 rounded-full ' onClick={hideDiv} />
				</div>
				<div className='pl-4 pt-0.5 flex flex-row space-x-3'>
					<span className='select-none bg-gray-200 px-6 py-0.5 font-xl text-center text-gray-500 font-bold rounded-xl'>filter</span>
					<form onSubmit={findDocument} className='bg-transparent w-3/5'>
						<input type='text' name='findobj' placeholder='{"key1" : "value1"},{"key2" : "value2"} ...' className='outline-none bg-transparent text-gray-500 placeholder-opacity-75 bg-transparent w-4/5' />
						<input type='submit' value='Find' className='float-right bg-green-500 rounded p-0.5 cursor-pointer pl-2 pr-2 text-center hover:bg-green-600' />
					</form>
				</div>
			</div>
			<hr />
		</div>
	);
}
export default Find;