import { useContext } from 'react';
import Insertone from './crud_buttons/insertone';
// import Insertmany from './crud_buttons/insertmany';
import Updateone from './crud_buttons/update_one';
import Updatemany from './crud_buttons/update_many';
import Findone from './crud_buttons/findone';
import Find from './crud_buttons/find';
// import Deleteone from './crud_buttons/deleteone';
// import Deletemany from './crud_buttons/deletemany';
import { Style_Context } from '../pages/index';

const Crud_btn = ({opt})=>{
	// INITIALISING OUR CONTEXT SEND FROM THE INDEX.JS FILE PRESEINT INSIDE PAGES
	const Style_context = useContext(Style_Context);
	
	if(opt == 'insertOne') return <Insertone />

	// if(opt == 'insertMany') return <Insertmany />
	if(opt=='updateOne') return <Updateone />

	if(opt == 'updateMany') return <Updatemany />

	if(opt == 'findOne') return <Findone />

	if(opt == 'Find') return <Find />
	// if(opt == 'deleteOne') return <DeleteOne />
	// if(opt == 'deleteMany') return <DeleteMany />
	else{
		return null
	}
}
	
export default Crud_btn;