import React from 'react';
import ReactDOM from 'react-dom';
import { 
	ChevronDownIcon,
	PencilIcon,
	TrashIcon as TrashIconOutline,
	PlusCircleIcon
} from '@heroicons/react/outline';
import {
	TrashIcon as TrashIconSolid
} from '@heroicons/react/solid';
import { Suspense , useState , useEffect , useCallback , useContext } from 'react';
import { Option_context } from './center_container';
import { Style_Context } from '../pages/index';
import Data_display_extract from './data_display_extract';
import axios from 'axios';
import useSWR from 'swr';

// CREATING THE FETCHER
const fetcher = url => axios.get(url).then((res)=>res.data).catch((error)=>error);

const Dataresult = ({colname , dbname , newInsertedData , updated_data})=>{
	const Option = useContext(Option_context);

	// INITIALISING OUR CONTEXT SENT FROM THE INDEXJS FILE WHICH WILL CHANGE THE STYLE OF THE BACKGROUND
	const Style_changer = useContext(Style_Context);

	const [res_data , changeData] = useState(null);

	const [jsxs , setJsx] = useState(null);
	
	const { data , error } = useSWR(`api/collection_info/${dbname}/${colname}` , fetcher);

	// useEffect(()=>{
	// 	if(jsxs){
	// 		setJsx(null);
	// 	}

	// 	console.log(data);

	// 	if(data){
	// 		changeData(data);
	// 	}
	// 	else{
	// 		if(error){
	// 			console.log(error);
	// 		}
	// 	}
		
	// },[dbname , colname])

	// useEffect(()=>{
	// 	if(updated_data){
	// 		const getdata =async()=>{
	// 			const result = await fetch(`api/collection_info/${dbname}/${colname}`);
	// 			const json_result = await result.json();
	// 			changeData(json_result);
	// 		}
	// 		getdata();
	// 	}
	// },[updated_data])

	// useEffect(()=>{
	// 	if(res_data && newInsertedData){
	// 		let original_data = res_data.slice();
	// 		original_data.unshift(newInsertedData);
	// 		changeData(original_data);
	// 	}
	// },[newInsertedData]);

	// useEffect(()=>{
	// 	if(res_data){
	// 		let new_jsx = <>
	// 			{res_data.map((value)=>(
	// 				<Data_display_extract key={value['_id']} val={value} database={dbname} collection={colname} />
	// 			))}
	// 		</>
	// 		setJsx(new_jsx);
	// 		}
	// 	},[res_data]);
	
	// return(
	// 	<>
	// 		{!colname ? null
	// 		:
	// 		!jsxs
	// 		?
	// 		<h3>Loading...</h3>
	// 		:
	// 		<>
	// 			{jsxs}
	// 		</>
	// 		}
	// 	</>
	// );

	if(error){
		return(
			<h3>Error occured</h3>
		)
	}

	if(!data){
		return(
			<h3>Loading...</h3>
		)
	}

	return(
	<>
				{data.map((value , index)=>( <Data_display_extract key={value['_id']} val={value} database={dbname} 
					collection={colname} index={index} />
				))}
			</>
	)

	// return(
	// 	<h3>Every thing is working fine</h3>
	// )

}

export default React.memo(Dataresult);
