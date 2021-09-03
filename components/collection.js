import axios from 'axios';
import {
	ChevronDoubleDownIcon,
	XIcon,
	PlusCircleIcon
} from '@heroicons/react/outline';
import { useState , useEffect , useContext } from 'react';
import ReactDOM from 'react-dom';
import { Collection_name } from './main';

const Collections=({name , newcol , removeAdd})=>{
	// INITIALISING OUR CONTEXT PROVIDER VALUE
	const Collectioncontext=useContext(Collection_name);

	const [collection_list , setList]=useState(null);

	const handleClick=(colname)=>{
		// SENDING THE NAME OF THE COLLECTION CLICKED TO THE MAIN COMPONENT
		Collectioncontext.collection_Name(colname);
	}

	const deleteCol = (col) =>{
		axios.post(`api/collection_info/deletecol/${name}/${col}`)
		.then((res)=>{
			let delete_collection_list = collection_list.slice();
			delete_collection_list.every((item , index)=>{
				if(item['name'] == col){
					delete_collection_list.splice(index , 1);
					return false;
				}
				else{
					return true;
				}
			});
			setList(delete_collection_list);
		})
		.catch((error)=>{
			console.log(error);
		})
	}

	useEffect(()=>{
		if(collection_list){
			setList(null);
		}
		async function collection(){
			const result = await fetch(`api/collection_info/${name}`);
			const data = await result.json();
			setList(data);				
			try{
				removeAdd();
			}
			catch(error){
			}
		}
		collection();
	},[name]);

	useEffect(()=>{
		if(collection_list){
			let new_collection_list = collection_list.slice();
			new_collection_list.push({'name':newcol});
			setList(new_collection_list);
		}
	},[newcol]);

	return(
		<>
			{!name
			?
			<div className='h-1/4 bg-gray-50' />
			:
			!collection_list
			?
			<div className='bg-gray-50 h-1/4 overflow-y-auto'>
				<h3>Loading...</h3>
			</div>
			:
			<div className='bg-gray-50 h-1/4 overflow-y-auto'>
				<div id='addcollection' />
				{collection_list.map((value)=>(
					<div key={value.name} className='flex flex-row hover:bg-gray-200 active:border-2 active:border-green-500 active:border-dashed'>
						<div className='select-none hover:text-gray-900 hover:cursor-pointer pl-3 py-2' onClick={()=>handleClick(value.name)}>
							<h4 className='truncate text-gray-800  text-sm text-gray-600 w-40 hover:text-black'>{value.name}</h4>
						</div>
						<XIcon width={16} height={16} className='mt-2.5 cursor-pointer text-gray-400 hover:text-green-500' onClick={()=>deleteCol(value.name)}/>
					</div>
				))}
			</div>
			}
		</>
	);
}
export default Collections;