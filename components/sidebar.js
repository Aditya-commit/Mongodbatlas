import axios from 'axios';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	PlusCircleIcon,
} from '@heroicons/react/outline';
import Database from './database';
import Collections from './collection';
import Addcol from './addcollection';
// import { pluscircleicon } from '@heroicons/react/solid';

const Sidebar=()=>{

	const [dbname , setDBname]=useState(null);
	const [newcols , setNewCol] = useState(null);
	
	const passDBname=(name)=>{
		setDBname(name);
	};

	const removeContainer = ()=>{
		ReactDOM.unmountComponentAtNode(document.getElementById('addcollection'));
	}
	
	const handleSubmit = (event) =>{
		event.preventDefault();
		let value = event.target.colname.value;

		axios.post(`api/collection_info/add_col/${dbname}/${value}`)
		.then((res)=>{
			if(res.status==200){
				setNewCol(value);
				removeContainer();
			}
		})
		.catch((error)=>{
			console.log(error);
		})
	}

	const addCol = ()=>{
		if(dbname){
			let container = document.getElementById('addcollection');
			container.setAttribute('class' , 'flex flex-row');
			ReactDOM.render(<Addcol func={handleSubmit} removefunc={removeContainer} /> , container);
		}
		else{
			alert('Please select a database');
		}
	}

	return(
		<>
			<div className='sticky top-0 h-screen w-56 bg-gray-50'>
				<Database getDBname={passDBname} />
				<div className='flex pr-3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-95 bg-gray-200 antialiased hover:bg-gray-200 cursor-pointer py-4 rounded-xl px-3 mb-3'>
					<h1 className='select-none'>Collections</h1>
					<PlusCircleIcon className={'relative top-1 left-12'} width={16} height={16} onClick={addCol} />
				</div>
				{dbname != null ? <Collections name={dbname} newcol={newcols} removeAdd={removeContainer} />:null}
			</div>
		</>
	);
}
export default Sidebar;