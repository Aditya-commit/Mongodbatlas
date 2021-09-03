import { 
	ChevronDownIcon,
	PencilIcon,
	TrashIcon as TrashIconOutline,
	PlusCircleIcon,
	XIcon
} from '@heroicons/react/outline';
import {
	TrashIcon as TrashIconSolid
} from '@heroicons/react/solid';
import { useState , useContext , useEffect } from 'react';
import { Option_context } from './center_container';
import { Style_Context } from '../pages/index';
import Update from './crud_buttons/update';

const FindResult= ({database , collection , data , type})=>{
	const [active , setActive] = useState(null);
	const [nestedactive , setNestedactive] = useState([]);

	const [new_data , setNewData] = useState(null);

	const [update_key , setUpdateKey] = useState(null);

	// INITIALISING OUR CONTEXT SENT FROM CENTER_CONTAINER FILE
	const Options = useContext(Option_context);

	const Style_context = useContext(Style_Context);

	const rotateIcon = (key , data , findtype , id)=>{

		if(findtype == 'findone'){
			console.log(`findtype = ${findtype}`)
			const icon = document.getElementById(key);
			if(!active){
				// IF THERE IS NOT ANY PREVIOUSLY SELECTED ICON 

				// SET THE STYLE OF THE CURRENTLY SELECTED ICON TO ACTIVE(ROTATE-180)
				icon.setAttribute('class' , 'transition transform transition-transform duration-300 ease-in-out text-green-500 rotate-180 cursor-pointer');
				setActive(icon);
			}
			else{
				// IF THERE IS PREVIOUSLY SELECTED ICON 
				if(active != icon){
					// IF THE NEXT SELECTED ICON IS NOT THE SAME ONE 

					// SET THE STYLE OF THE PREVIOUSLY SELECTED ICON TO NORMAL(ROTATE-360)
					active.setAttribute('class' , 'transition transform transition-transform duration-300 ease-in-out text-gray-600 hover:text-green-500 rotate-360 cursor-pointer ');
					// SET THE STYLE OF THE CURRENT SELECTED ICON TO ACTIVE(ROTATE-180)
					icon.setAttribute('class' , 'transition transform transition-transform duration-300 ease-in-out text-green-500 rotate-180 cursor-pointer');
					setActive(icon);
				}
				else{
					// IF THE NEXT SELECTED ICON IS THE SAME ONE AS THE NEXT SELECTED ICON
					active.setAttribute('class' , 'transition transform transition-transform duration-300 ease-in-out rotate-360 text-gray-600 hover:text-green-500 cursor-pointer')
					setActive(null);
				}
			}
		}
		else{
			const icon = document.getElementById(`${id}_${key}`);
			
			if(!active){
				// IF THERE IS NOT ANY PREVIOUSLY SELECTED ICON
				icon.setAttribute('class' , 'transition transform transition-transform duration-300 ease-in-out rotate-180 text-green-500 cursor-pointer');
				setActive(icon);
			}
			else{
				// IF THERE IS PREVIOUSLY SELECTED ICON 

				// CHECK IF THE PREVIOUSLY SELECTED ICON IS SAME AS THE CURRENT SELECTED ICON
				if(active == icon){
					// IF THE PREVIOUSLY SELECTED ICON IS THE SAME AS THE CURRENT SELECTED ICON

					// SET THE CURRENT SELECTED ICON TO NORMAL 
					active.setAttribute('class' , 'transition transform transition-tranform duration-300 ease-in-out rotate-360 text-gray-600 hover:text-green-500 cursor-pointer');
	
					// REPLACE THE PREVIOUS SELECTED ICON FROM THE CURRENT SELECTED ICON
					setActive(null);
				}
				else{
					// IF THE CURRENT SELECTED ITEM IS NOT AS THE SAME ONE

					// SET THE PREVIOUS SELECTED ICON TO NORMAL(ROTATE-360)
					active.setAttribute('class' , 'transition transform transition-transform duration-300 ease-in-out rotate-360 text-gray-600 hover:text-green-500 cursor-pointer');

					// SET THE CURRENT SELECTED ITEM TO ACTIVE(ROTATE-180)
					icon.setAttribute('class' , 'transition transform transition-tranform duration-300 ease-in-out rotate-180 cursor-pointer text-green-500');
					// REMOVE THE PREVIOUS SELECTED ICON
					setActive(icon);
				}
			}
		}
	}

	const selectCross = ()=>{
		setActive(null);
		Options.resetFunc();
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

	const updateData = (id , key , value) => {
		setUpdateKey(key);
	}

	const deleteField = (id , key , value) => {
		console.log('delete field')
	}

	const deleteDoc = (id) => {
		console.log(`${id} to be deleted`);
	}

	useEffect(()=>{
		setNewData(data);
	},[data]);

	if(type == 'findOne'){
		if(typeof(new_data) == 'object'){
			return(
				<>
				{new_data
				?
				<div className='pt-3 bg-white'>
					<div className='float-right'>
						<XIcon width={16} height={16} className='text-red-600 mr-2 rounded-full hover:bg-gray-200' onClick={selectCross}/>
					</div>
					<ul className='pl-4'>
						{Object.keys(new_data).map((key)=>(
							typeof(new_data[key]) == 'object' ? 
								<div className='flex flex-row'>
									<ChevronDownIcon width={14} height={14} className='right-4 text-gray-600 hover:text-green-500 cursor-pointer' id={key} onClick={()=>rotateIcon(key , new_data[key] , 'findone')} />
									<li className='inline text-black text-sm pl-3 mb-2'>
										<span className='mr-3'>{key}</span>
										<span>:</span>
										<span>array</span>
									</li>
									<PencilIcon width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right' onClick={()=>updateData(new_data['_id'] , key , new_data[key])} />
									<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(new_data['_id'] , key , new_data[key])} />
								</div>
							:
							<>
								{key == '_id' ?
									<div className='group flex flex-row mb-3'>
										<li className='text-gray-500 text-sm ml-6 w-full'>
											<span className='mr-3 text-black'>{key} :</span>
											<span className=' truncate text-red-600'>{new_data[key]}</span>
										</li>
										<TrashIconSolid width={22} height={22} className='text-gray-500 hover:text-gray-600 cursor-pointer object-right mr-1' onClick={()=>deleteDoc(new_data[key])} />
									</div>
								:
								<div className='group flex flex-row mb-3'>
									<li className='text-gray-500 text-sm ml-6 w-full'>
										<span className='mr-3 text-black'>{key} :</span>
										<span className='break-all'>{new_data[key]}</span>
									</li>
									<PencilIcon width={20} height={20} className='invisible text-gray-400 cursor-pointer group-hover:visible hover:text-gray-500' onClick={()=>updateData(new_data['_id'] , key , new_data[key])} />
									<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(new_data['_id'] , key , new_data[key])} />
								</div>
								}
							</>
						))}
					</ul>
					{update_key
					?
					<Update datbase={database} collection={collection} id={new_data['_id']} updatekey={update_key} value={new_data[update_key]} catchUpdate={catchUpdate} cancelUpdate={cancelUpdate} />
					:
					null
					}
				</div>
				:
				null
				}
				</>
			);
		}
		else{
			return(
				<div className='mt-3 bg-white'>
					<div className='float-right'>
						<XIcon width={16} height={16} className='text-red-500 mr-2 rounded-full hover:bg-gray-200' onClick={()=>Options.resetFunc()} />
					</div>
					<p className='text-sm text-gray-800 ml-6'>{new_data}</p>
				</div>
			)
		}
	}
	else{
		if(typeof(new_data) == 'object'){
			return(
				<>
					{new_data
					?
					<div className='mt-3'>
						<div className='float-right'>
							<XIcon width={16} height={16} className='text-red-600 mr-2 rounded-full hover:bg-gray-200' onClick={selectCross}/>
						</div>
						{new_data.map((value)=>(
							<ul className='mb-3 p-2 bg-white pl-4'>
								{Object.keys(value).map((key)=>(
									typeof(value[key]) == 'object' ?
										<div className='flex flex-row'>
											<ChevronDownIcon width={14} height={14} className='right-4 text-gray-600 hover:text-green-500 cursor-pointer' id={`${value['_id']}_${key}`} onClick={()=>rotateIcon(key , value , 'find' , value['_id'])} />
											<li className='inline text-black text-sm pl-3 mb-2'>
												<span className='mr-3'>{key}</span>
												<span>:</span>
												<span>array</span>
											</li>
											<PencilIcon width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right' onClick={()=>updateData(value['_id'] , key , value[key])} />
											<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(value['_id'] , key , value[key])} />
										</div>
									:
									<>
										{key == '_id' ?
											<div className='group flex flex-row mb-3'>
												<li className='text-gray-500 text-sm ml-6 w-full'>
													<span className='mr-3 text-black'>{key} :</span>
													<span className=' truncate text-red-600'>{new_data[key]}</span>
												</li>
												<TrashIconSolid width={22} height={22} className='text-gray-500 hover:text-gray-600 cursor-pointer object-right mr-1' onClick={()=>deleteDoc(value[key])} />
											</div>
										:
										<div className='flex flex-row'>
											<li className = 'text-gray-500 text-sm ml-2 w-full'>
												<span className='mr-3 text-black'>{key}</span>
												<span>:</span>
												<span className='break-all'>{value[key]}</span>
											</li>
											<PencilIcon width={20} height={20} className='invisible text-gray-400 cursor-pointer group-hover:visible hover:text-gray-500' onClick={()=>updateData(value['_id'] , key , value[key])} />
											<TrashIconOutline width={20} height={20} className='invisible group-hover:visible hover:text-gray-500 text-gray-400 cursor-pointer object-right mx-1' onClick={()=>deleteField(value['_id'] , key , value[key])} />
										</div>
										}
									</>
								))}
							</ul>
						))}					
						{update_key
							?
							<Update datbase={database} collection={collection} id={new_data['_id']} updatekey={update_key} value={new_data[update_key]} catchUpdate={catchUpdate} cancelUpdate={cancelUpdate} />
							:
							null
						}
					</div>
					:
					null
					}
				</>
			);
		}
		else{
			return(
				<div className='mt-3 bg-white'>
					<div className='float-right'>
						<XIcon width={16} height={16} className='text-red-500 mr-2 rounded-full hover:bg-gray-200' onClick={selectCross} />
					</div>
					<p className='text-sm text-gray-800 ml-6'>{new_data}</p>
				</div>
			);
		}
	}
}
export default FindResult;