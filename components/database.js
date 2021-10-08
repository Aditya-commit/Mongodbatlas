import axios from 'axios';
import {
	PlusCircleIcon,
	XCircleIcon
} from '@heroicons/react/solid';
import React , { useState , useEffect , useContext } from 'react';
import ReactDOM from 'react-dom';
import { Collection_name } from './main';
import { Style_Context } from '../pages/index';
import DbAlertModal from './dbalert_modal';
import Add_db from './add_db';

const Database=({getDBname})=>{

	const [databaselist , setDatabaselist] = useState(null);

	const [dbmodal , showDbmodal] = useState(false);

	// THIS WILL SHOW THE ALERT POPUP MODAL FOR CONFIRMATION OF DELETING DATABASE
	const [dblaertmodal , showDbAlertModal] = useState(false);

	const [database_to_be_deleted , setDeletedDatabase] = useState(null);

	// INITIALISING OUR PROVIDER VALUE
	const collection_context = useContext(Collection_name);

	// INITIALISING OUR STYLE CONTEXT
	const Style_context = useContext(Style_Context);

	const grabDatabaseName=(event)=>{
		getDBname(event.target.id);	// SENDING THE NAME OF THE SELECTED DATABASE TO SIDEBAR COMPONENT		
		collection_context.db_Name(event.target.id); // SENDING THE NAME OF THE SELECTED DATABASE TO THE MAIN COMPONENT
	}

	const getDelDatabase = (name) => {
		Style_context.style_changer('yes')
		showDbAlertModal(true);
		setDeletedDatabase(name);
	}

	const remove_Del = (choice) => {
		if(choice == true){
			deleteDatabse(database_to_be_deleted);
		}
		showDbAlertModal(false);
		Style_context.style_changer('no');
	}

	const deleteDatabse = (name) => {
		axios.post(`api/del_database/${name}`)
		.then((res)=>{
			let del_database_list = databaselist.slice();
			del_database_list.every((item , index)=>{
				if(item['name'] == name){
					del_database_list.splice(index , 1);
					return false;
				}
				else{
					return true;
				}
			})
			setDatabaselist(del_database_list);
		})
		.catch((error)=>{
			console.log(error);
		})
	}

	const handleAdd = (event) => {
		event.preventDefault();
		let db_name = event.target.dbname.value;
		let col_name = event.target.colname.value;

		axios.post(`api/add_db/${db_name}/${col_name}`)
		.then((res)=>{
			let new_database_list = databaselist.slice();
			new_database_list.unshift({'name':db_name});
			setDatabaselist(new_database_list);
		})
		.catch((error)=>{
			console.log(error);
		})

		showDbmodal(false); 
		Style_context.style_changer('no');
	}
	
	const remove_NewDb = () =>{
		showDbmodal(false);
		Style_context.style_changer('no');
	}

	const addDatabase = () =>{
		showDbmodal(true);
		Style_context.style_changer('yes');
	}


	useEffect(()=>{
		async function fetchData(){
			let data = await fetch('api/database_list');
			let result=await data.json();
			setDatabaselist(result.databases);
		}
		fetchData();
	},[]);

	return(
		<>
			<div className='flex flex-row select-none space-x-3 bg-gray-200  transition duration-500 ease-in-out transform hover:scale-100 bg-gray-125 hover:translate-y-1 cursor-pointer hover:text-green-600 py-4 w-56 rounded-b-lg mb-4'>
				<h3 className='pl-3 text-lg'>Create a database</h3>
				<PlusCircleIcon width={20} height={20} className={'mt-1'} onClick={addDatabase} />
			</div>
			<ol className='bg-gray-50 text-sm hover:cursor-pointer mb-3 h-2/5 overflow-y-auto' id='database_list'>
				{!databaselist ?
				<h4>Loading...</h4>
				:
				<>
					{dbmodal
					?
					<>
						<Add_db handle_add={handleAdd} remove_NewDb={remove_NewDb} />
					</>
					:
					null
					}
					{dblaertmodal
					?
					<>
						<DbAlertModal db={database_to_be_deleted} remove_del_database={remove_Del} />
					</>
					:
					null
					}
					{databaselist.map((value)=>(
						<div className='flex flex-row space-x-3 select-none hover:bg-gray-200 active:border-2 active:border-green-500 active:border-dashed active:rounded-sm' key={value.name}>
							<li className='truncate pl-3 pl-3 py-2 w-40 text-gray-600' id={value.name} onClick={grabDatabaseName}>{value.name}</li>
							<XCircleIcon width={15} height={15} className={'text-gray-400 hover:text-green-600 mt-2'} onClick={()=>getDelDatabase(value.name)} />
						</div>
					))}
				</>
				}
			</ol>
		</>
	);
}
export default Database;