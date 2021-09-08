import React , { Fragment } from 'react';
import { useState , useEffect , useCallback , useContext } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Dataresult from './datadisplay';
import Crud_btn from './crud_btn';
import FindResult from './findresult';
import { Style_Context } from '../pages/index';

export const Option_context = React.createContext();

const Middlecontainer = ({collection_name , databaseName})=>{
	// INITIALISING OUR CONTEXT
	const Style_context = useContext(Style_Context);

	const [active , setActive] = useState();
	const [btn , setBtn] = useState();
	const [icon , setIcon] = useState();

	const [opt , setOpt] = useState(null);
	
	const [findType , setFindtype] = useState(null);
	const [findOne , setFindone] = useState(null);

	// THIS WILL HOLD THE NEWLY INSERTED DATA
	const [insertone_data , setNewInsertedData] = useState(null);

	// THIS WILL HOLD THE INFORMATION OF THE DATA WHICH IS SELECTED TO BE CHANGED OR UPDATED
	const [update , setUpdate] = useState(null);

	// THIS WILL HOLD THE VALUE OF THE DATA WHICH IS UPDATED
	const [data_updated , setData_updated] = useState(null);

	const rotateIcon=(id ,method_btn)=>{
		// STORING WHICH METHOD BUTTON IS CLICKED SUCH AS INSERT OR UPDATE OR DELETE OR FIND
		let methodbtn = document.getElementById(method_btn);
		let grab_icon = document.getElementById(id);
		
		if(active){
			// GRABBING THE PREVIOUS SELECTED ICON AND CHANGING THE CLASS OF THE ICON FROM VISIBLE TO HIDDEN
			let icon = active;

			if(icon == grab_icon){
				// IF THE SAME ICON IS SELECTED AGAIN
				icon.setAttribute('class' , 'inline transition transition-transform transform duration-300 ease-in-out rotate-360 text-gray-600 hover:text-green-500 cursor-pointer');
				methodbtn.setAttribute('class' , 'hidden')
				setActive(null);	
				setBtn(null);
				setIcon(null);
			}
			else{
				// IF THE SELECTED ICON IS DIFFERENT

				// CHANGING THE PREVIOUSLY SELECTED ICON STYLE FROM SHOW TO HIDDEN
				icon.setAttribute('class' , 'inline transition transition-transform transform duration-300 ease-in-out rotate-360 text-gray-600 hover:text-green-500 cursor-pointer');

				// HIDING THE PREVIOUSLY SELECTED ICON BUTTON LIST
				btn.setAttribute('class' , 'hidden');

				// CHANGING THE CURRENT SELECTED ICON STYLE FROM BLUR TO ACTIVE
				grab_icon.setAttribute('class' , 'inline transition transition-transform transform duration-300 ease-in-out rotate-180 text-green-500 cursor-pointer');
				// CHANGING THE STYLE OF THE NEXT SELECTED ICON BUTTON OPTIONS FROM HIDDEN TO SHOW
				methodbtn.setAttribute('class' , 'inline-block text-sm table mt-2 select-none m-0 p-0 text-gray-500 font-mono rounded-lg cursor-pointer');

				setActive(grab_icon);
				setBtn(methodbtn);
				setIcon(id);
			}
		}
		else{
			//IF THERE IS NO PREVIOUSLY SELECTED ICON THAT IS THIS IS THE VERY FIRST ICON SELECTED BY THE USER 

			// CHANGING THE CURRENT SELECTED ICON STYLE FROM BLUR TO ACTIVE
			grab_icon.setAttribute('class' , 'inline transition transition-transform transform duration-300 ease-in-out rotate-180 text-green-500 cursor-pointer');
			// CHANGING THE STYLE OF THE BUTTON LIST FROM HIDDEN TO SHOW
			methodbtn.setAttribute('class' , 'inline-block table text-sm mt-2 select-none m-0 p-0 text-gray-500 font-mono cursor-pointer');
			// STORING THE ACTIVE ICON
			setActive(grab_icon);
			// STORING THE CURRENT SLEECTED METHOD BUTTON
			setBtn(methodbtn);
			setIcon(id);
		}
	}

	const crudOpt=(opt_btn)=>{
		// CHANGINT THE STYLE OF THE CURRENT ACTIVE ICON FROM ACTIVE TO INITIAL
		active.setAttribute('class' , 'inline transition transition-transform transform duration-300 ease-in-out rotate-360 text-gray-600 hover:text-green-500 cursor-pointer');
		// HIDING THE SELECTED METHOD LIST AFTER THE USER HAS SELECTED ANY OF THE PRESENT OPTION IN THE LIST
		btn.setAttribute('class' , 'hidden');
	
		setActive(null);

		// REMOVIING THE SELECTED METHOD BUTTON STORED IN THE STATE
		setBtn(null);
		setIcon(null);
		// STORING THE SELECTED OPTIONS AVAILABLE IN THE METHOD BUTTON SUCH AS INSERTONE OR DELTEMANY AND MANY MORE
		setOpt(opt_btn);

		// CHANGE THE STYLE OF THE BACKGROUND TO BLUR
		if(opt_btn == 'insertOne'){
			Style_context.style_changer('yes')
		}

		// REMOVE IF ANY PREVIOUSLY ACTIVE OPTION CONTAINER IS PRESENT
		setFindone(null);
		// SET THE STATE TO THE SELECTED OPTION BUTTON
		setFindtype(opt_btn);
	};

	const resetState=()=>{
		// THIS FUNCTION WILL RESET THE STATE OF THE SELECTED OPTION TO NULL
		if(findOne){
			setFindone(null);
			setOpt(null);
		}
		else{
			setOpt(null);
		}
	}

	const findOne_result = (result)=>{
		setFindone(result);
	}

	const insertedData = (inserted_Data)=>{
		setNewInsertedData(inserted_Data);
	}

	const updateData = (value) => {
		setData_updated(value);
	}

	return(
		<div className='bg-gray-100 w-full h-full'>
			<div className='sticky top-0 bg-gray-50 z-10'>
				<div className='text-center mb-3'>
				{collection_name &&
					<h3 className = 'select-none font-mono font-bold bg-transparent text-gray-400 text-xl'>
						{databaseName}.{collection_name}
					</h3>
				}
				</div>
				<hr />
				<ul className = 'text-center my-5 space-x-16'>
					<div className={`inline-block py-3 px-3 rounded-lg select-none space-x-1 text-gray-500 hover:text-gray-800 font-mono cursor-pointer hover:bg-gray-100 ${icon == 'icon1'  ? 'border-b-2 border-green-500 bg-gray-100' :'border-b-0' }`} key='1'>
						<li className='inline-block'>Insert</li>
						<ChevronDownIcon width={16} height={16} id='icon1' className='inline hover:text-green-500' onClick={()=>rotateIcon('icon1' ,'insert')} />
						<div className='hidden' id='insert'>
							<hr />
							<ul className='inline space-y-2'>
								<li key='1' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('insertOne')}>
										<span>InsertOne</span>
								</li>
								<li key='2' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('insertMany')}>
										<span>InsertMany</span>
								</li>
							</ul>
						</div>
					</div>
					<div className={`inline-block py-3 px-3 rounded-lg select-none space-x-1 text-gray-500 hover:text-gray-800 font-mono cursor-pointer hover:bg-gray-100 ${icon == 'icon2'  ? 'border-b-2 border-green-500 bg-gray-100' :'border-b-0' }`} key='2'>
						<li className='inline-block'>Update</li>
						<ChevronDownIcon width={16} height={16} className='inline hover:text-green-500' id='icon2' onClick={()=>rotateIcon('icon2' ,'update')} />
						<div className='hidden' id='update'>
							<hr />
							<ul className='inline space-y-2'>
								<li key='1' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('updateOne')}>
										<span>UpdateOne</span>
									</li>
									<li key='2' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('updateMany')}>
										<span>UpdateMany</span>
									</li>
								</ul>
							</div>
						</div>
						<div className={`inline-block py-3 px-3 rounded-lg select-none space-x-1 text-gray-500 hover:text-gray-800 font-mono cursor-pointer hover:bg-gray-100 ${icon == 'icon3'  ? 'border-b-2 border-green-500 bg-gray-100' :'border-b-0' }`} key='3'>
							<li className='inline-block'>Delete</li>
							<ChevronDownIcon width={16} height={16} className='inline hover:text-green-500' id='icon3' onClick={()=>rotateIcon('icon3' ,'delete')} />
							<div className='hidden' id='delete'>
								<hr />
								<ul className='inline space-y-2'>
									<li key='1' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('deleteOne')}>
										<span>DeleteOne</span>
									</li>
									<li key='2' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('deleteMany')}>
										<span>DeleteMany</span>
									</li>
								</ul>
							</div>
						</div>
						<div className={`inline-block py-3 px-3 rounded-lg select-none space-x-1 text-gray-500 hover:text-gray-800 font-mono cursor-pointer hover:bg-gray-100 ${icon == 'icon4'  ? 'border-b-2 border-green-500 bg-gray-100' :'border-b-0' }`} key='4'>
							<li className='inline-block'>Find</li>
							<ChevronDownIcon width={16} height={16} className='inline hover:text-green-500' id='icon4' onClick={()=>rotateIcon('icon4','find')} />
							<div className='hidden' id='find'>
								<hr />
								<ul className='inline space-y-2'>
									<li key='1' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('findOne')}>
										<span>FindOne</span>
									</li>
									<li key='2' className='hover:text-green-500 hover:ring-1 hover:ring-green-500 rounded-lg hover:bg-green-400 ring-offset-2 hover:text-white' onClick={()=>crudOpt('Find')}>
										<span>Find</span>
									</li>
								</ul>
							</div>
						</div>
					</ul>
				<hr />
			<Option_context.Provider value={{'resetFunc':resetState , 'database_name':databaseName , 'collection_name':collection_name , 'findresult':findOne_result , 'setinsertedData':insertedData , 'updatedData':updateData}}>
				<Crud_btn opt={opt} />
			</Option_context.Provider>
			</div>
			{findOne ? 
				<Option_context.Provider value={{'resetFunc':resetState}}>
					<FindResult database={databaseName} collection={collection_name} data={findOne} type={findType} />
				</Option_context.Provider>
				:
				collection_name
				? 
				<Dataresult colname={collection_name} dbname={databaseName} newInsertedData={insertone_data} updated_data={data_updated}/>	
				: null
			}
		</div>
	);
}
export default Middlecontainer;