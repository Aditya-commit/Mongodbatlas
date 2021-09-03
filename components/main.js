import React from 'react';
import Sidebar from './sidebar';
// import Collections from './collection';
import { useState ,Suspense , useCallback } from 'react';
import Middlecontainer from './center_container';

export const Collection_name = React.createContext(); // USING THIS CONTEXT WE WILL GET THE NAME OF THE DATABASE AND THE COLLECTION CLICKED BY THE USER BY SENDING THEM FROM THE DATABASE AND COLLECTION COMPONENT

const Main=()=>{

	const [dbname , setdbName]=useState(null);
	const [collection_name , setCollectionname]=useState(null)
	
	//THIS FUNCTION WILL HOLD THE NAME OF THE Database CLICKED WHICH IS SENT FROM THE DATABASE COMPONENT
	const getDBName=(database)=>{
		setdbName(database)
		setCollectionname(null);
	}

	// THIS FUNCTION WILL HOLD THE NAME OF THE COLLECTION CLICKED WHICH IS SENT FROM THE COLECTION COMPONENT
	const getCollectionName=(cname)=>{
		setCollectionname(cname);
	}

	return(
		<div className = 'flex flex-row'>
			<Collection_name.Provider value={{'collection_Name':getCollectionName , 'db_Name':getDBName}}>
				<Sidebar />
			</Collection_name.Provider>
			<Middlecontainer collection_name={collection_name} databaseName={dbname} />
		</div>
	);
}
export default Main;