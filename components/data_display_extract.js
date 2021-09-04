// This file is present in skeleton_loader branch
import { 
	ChevronDownIcon,
	PencilIcon,
	TrashIcon as TrashIconOutline,
	PlusCircleIcon
} from '@heroicons/react/outline';
import {
	TrashIcon as TrashIconSolid
} from '@heroicons/react/solid';
import { useState , useEffect , useCallback , useContext } from 'react';
import { Option_context } from './center_container';
import { Style_Context } from '../pages/index';
import Update from './crud_buttons/update';
import axios from 'axios';

const Data_display_extract = ({val , database , collection , index}) => {

	// INITIALISNG OUR CONTEXT SENT FROM THE TOP MOST LEVEL COMPONENT (PAGES INDEX FILE);
	const Stylecontext = useContext(Style_Context);

	const [single_jsx , setSingleJsx] = useState(null);
	const [active , setActive]=useState(null);
	const [new_data , setNewData] = useState(null);
	const [form_key , setNewFormKey] = useState(null);

	const [update_key , setUpdateKey] = useState(null);

	const arrowDown = (key) => {
		if(active){
			// IF ANY PREVIOUSLY SELECTED ICON IS ALREADY PRESENT
			if(active == key){
				// IF THE SAME ICON IS PRESSED AGAIN
				setActive(null);
			}
			else{
				// IF DIFFREENT ICON IS PRESSED
				setActive(key);
			}
		}
		else{
			// IF THERE IS NOT ANY PREVIOUSLY SELECTED ICON
			setActive(key);
		}

	}

	const handleAdd = (event , id) => {
		event.preventDefault();
		// setNewFormKey(null);
		
		let textarea_key = event.target.key.value;
		let textarea_value = event.target.value.value;

		axios.post('api/insert/insertfield' , {
			'database':database,
			'collection':collection,
			'id':id,
			'data':{[textarea_key]:textarea_value}
		})
		.then((res)=>{
			if(res.status==200){
				let original_data = JSON.parse(JSON.stringify(new_data));
				original_data[textarea_key] = textarea_value;
				setNewData(original_data);
			}
		})
		.catch((error)=>{
			console.log(error);
		})

	}

	const updatedata = (id , obj_key , value)=>{
		setUpdateKey(obj_key)

		// MAKING THE STYLE OF THE BACKGROUND BLUR
		Stylecontext.style_changer('yes');
	}

	const catchUpdate = (update_value) => {
		let original_data = JSON.parse(JSON.stringify(new_data));
		original_data[update_key] = update_value;
		Stylecontext.style_changer('no');
		setNewData(original_data);
	}

	const cancelUpdate = () =>{
		setUpdateKey(null);
		Stylecontext.style_changer('no');
	}

	const addField = (key)=>{
		setNewFormKey(key);
	}

	const cancelAdd =() => {
		setNewFormKey(null);
	}

	const deleteField = (id , obj_key , value) =>{
		axios.post('api/delete/deleteField' , {
			'database':database,
			'collection':collection,
			'_id':id,
			'obj_key':obj_key,
			'value':value
		})
		.then((res)=>{
			if(res.status == 200){
				let original_data = JSON.parse(JSON.stringify(new_data));
				delete original_data[obj_key];
				setNewData(original_data);
			}
		})
		.catch((error)=>{
			console.log(error);
		});
	}

	const deleteDoc =(id)=>{
		axios.post('api/delete/deletedoc' , {
			'database':database,
			'collection':collection,
			'_id':id
		})
		.then((res)=>{
			if(res.status == 200){
				setSingleJsx(null);
			}
		})
		.catch((error)=>{
			console.log(error);
		});
	}

	const expandObj = (id , value) => {
	}

	useEffect(()=>{
		setNewData(val);
	},[val])
	
	useEffect(()=>{
		if(new_data){
			let single_component = <div className='bg-white mb-3 rounded-lg'>
							<ul className='pt-3 pl-6 pb-5'>
								{Object.keys(new_data).map((obj_key , index)=>(
									typeof(new_data[obj_key]) == 'object' ?
										<React.Fragment key={obj_key}>
										{index == Object.keys(new_data).length-1 ?
											<>
												<div className={`group flex flex-row ${form_key ? '' : 'mb-3'}`}>
													<ChevronDownIcon width={14} height={14} className={`transition tansform transition-transform duration-300 ease-in-out right-4 mt-1 cursor-pointer group-hover:w-3.5 group-hover:h-3.5 ${active == obj_key ? 'rotate-180 text-green-500' : 'rotate-360 text-gray-600  hover:text-green-500'}`} onClick={()=>{
														arrowDown(obj_key)
														expandObj(new_data['_id'] , new_data[obj_key])
													}} />
													<div id='expandable' />
													<PlusCircleIcon width={16} height={16} className='invisible mt-1 text-yellow-500 hover:text-yellow-600 cursor-pointer group-hover:visible' onClick={()=>addField(obj_key)} />
													<li className='inline text-black text-sm w-full'>
														<span className='mr-3'>{obj_key} :</span>
														<span>array</span>
													</li>
													<PencilIcon width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right' onClick={()=>updatedata(new_data['_id'] , obj_key , new_data[obj_key])} />
													<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(new_data['_id'] , obj_key , new_data[obj_key])} />
												</div>
												<div  className={`${form_key ? 'block flex flex-col my-3' : 'hidden'}`}>
													<form className='ml-6' onSubmit={()=>handleAdd(event , new_data['_id'])}>
														<textarea rows="4" cols="15" name='key' placeholder='key' className='p-1 resize bg-transparent text-black text-sm' />
														<span className='mx-1'>:</span>
														<textarea rows="4" cols="15" name='value' placeholder='value' className='p-1 resize bg-transparent text-blue-700 text-sm' />
														<div className='flex flex-row-reverse'>
															<input type='submit' value="Add" className='inline w-20 mx-1 outline-none cursor-pointer font-bold bg-yellow-200 hover:bg-yellow-300 focus:bg-yellow-300 p-1 rounded-lg text-base font-mono text-gray-800' />
															<button type='button' className='inline w-20 font-bold outline-none bg-yellow-200 hover:bg-yellow-300 focus:bg-yellow-300 p-1 rounded-lg text-base font-mono text-gray-800' onClick={cancelAdd}>Cancel</button>
														</div>
													</form>
												</div>
											</>
											:
											<div className='group flex flex-row mb-3'>
												<ChevronDownIcon width={14} height={14} className={`transition tansform transition-transform duration-300 ease-in-out right-4 mt-1 cursor-pointer group-hover:w-3.5 group-hover:h-3.5 ${active == obj_key ? 'rotate-180 text-green-500' : 'rotate-360 text-gray-600  hover:text-green-500'}`} id={obj_key} onClick={()=>{
													arrowDown(obj_key)
													expandObj(new_data['_id'] , new_data[obj_key])
												}} />
												<li className='inline text-black text-sm pl-3 w-full'>
													<span className='mr-3'>{obj_key} :</span>
													<span>array</span>
												</li>
												<PencilIcon width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right' onClick={()=>updatedata(obj_key)} />
												<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(new_data['_id'] , obj_key , new_data[obj_key])} />
											</div>
										}
										</React.Fragment>
										:
										<React.Fragment key={obj_key}>
											{obj_key == '_id' ?
												<div className='group flex flex-row mb-3'>
													<li className='text-gray-500 text-sm ml-6 w-full'>
														<span className='mr-3 text-black'>{obj_key} :</span>
														<span className=' truncate text-red-600'>{new_data[obj_key]}</span>
													</li>
													<TrashIconSolid width={22} height={22} className='text-gray-500 hover:text-gray-600 cursor-pointer object-right mr-1' onClick={()=>deleteDoc(new_data[obj_key])} />
												</div>
												:
												<>
												{index == Object.keys(new_data).length-1 ?
													<>
														<div className={`group flex flex-row ${form_key ? '' : 'mb-3'}`}>
															<PlusCircleIcon width={16} height={16} className='invisible mt-1 text-yellow-500 hover:text-yellow-600 cursor-pointer group-hover:visible' onClick={()=>addField(new_data['_id'])} />
															<li className='text-gray-500 text-sm ml-2 w-full'>
																<span className='mr-3 text-black'>{obj_key} :</span>
																<span className='break-all'>{new_data[obj_key]}</span>
															</li>
															<PencilIcon width={20} height={20} className='invisible text-gray-400 cursor-pointer group-hover:visible hover:text-gray-500' onClick={()=>updatedata(new_data['_id'] , obj_key , new_data[obj_key])} />
															<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(new_data['_id'] , obj_key , new_data[obj_key])} />
														</div>
														<div className={`${form_key ? 'block flex flex-col my-3' : 'hidden'}`}>
															<form className='ml-6' onSubmit={()=>handleAdd(event , new_data['_id'])}>
																<textarea rows="4" cols="15" name='key' placeholder='key' className='p-1 resize bg-transparent text-black text-sm' />
																<span className='mx-1'>:</span>
																<textarea rows="4" cols="15" name='value' placeholder='value' className='p-1 resize bg-transparent text-blue-700 text-sm' />
																<div className='flex flex-row-reverse text-right'>
																	<input type='submit' className='inline w-20 mx-1 outline-none font-bold cursor-pointer bg-yellow-200 hover:bg-yellow-300 focus:bg-yellow-300 p-1 rounded-lg text-base font-mono text-gray-800' value="Add" />
																	<button type='button' className='inline w-20 outline-none font-bold bg-yellow-200 hover:bg-yellow-300 focus:bg-yellow-300 p-1 rounded-lg text-base font-mono text-gray-800' onClick={()=>cancelAdd(new_data['_id'])}>Cancel</button>
																</div>
															</form>
														</div>
													</>
													:
													<div className='group flex flex-row mb-3'>
														<li className='text-gray-500 text-sm ml-6 w-full'>
															<span className='mr-3 text-black'>{obj_key} :</span>
															<span className='break-all'>{new_data[obj_key]}</span>
														</li>
														<PencilIcon width={20} height={20} className='invisible text-gray-400 cursor-pointer group-hover:visible hover:text-gray-500' onClick={()=>updatedata(new_data['_id'] , obj_key , new_data[obj_key])} />
														<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(new_data['_id'] , obj_key , new_data[obj_key])} />
													</div>
												}
												</>
											}
										</React.Fragment>
								))}						
							</ul>
							{update_key
							?
							<Update datbase={database} collection={collection} id={new_data['_id']} updatekey={update_key} value={new_data[update_key]} catchUpdate={catchUpdate} cancelUpdate={cancelUpdate} />
							:
							null
							}
						</div>

			setSingleJsx(single_component);
		}
	},[new_data , active , form_key , update_key]);

	return(
		<>
			{index == 1 ?
				single_jsx
				?
				<>
					{single_jsx}
				</>
				:
				<h3>Loading...</h3>
			:
				<>
					{single_jsx}
				</>
			}
		</>
	);
}

export default Data_display_extract;