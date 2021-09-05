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
import Skeleton_Loader from './skeleton_loader';
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
}

export default React.memo(Dataresult);
