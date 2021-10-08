import { useState , useEffect , useContext } from 'react';
import ReactDOM from 'react-dom';
import {
	XIcon
} from '@heroicons/react/outline';

const DbAlertModal = ({db , remove_del_database}) => {

	const delConfirm = (choice) => {
		remove_del_database(choice);
	}

	return ReactDOM.createPortal(
		<div className='h-full text-center'>
			<div className='inline-block fixed top-1/4 left-1/4 p-14 shadow-inner bg-gray-100'>
				<h2 className='mb-2 w-full text-lg break-words font-bold text-gray-700 font-sans'>Deleting {db} will also delete its content</h2>
				<hr className='mb-5'/>
				<h4 className='mb-7'>Are you sure you want to delete</h4>
				<div className='space-x-4'>
					<button className='bg-green-400 hover:bg-green-500 font-semibold p-1 rounded font-mono text-lg px-5' onClick={()=>delConfirm(true)}>Yes</button>
					<button className='bg-gray-300 hover:bg-gray-400 p-1 rounded font-mono text-lg px-5' onClick={()=>delConfirm(false)}>No</button>
				</div>
			</div>
		</div>
	,document.getElementById('inserts'));
}
export default DbAlertModal;

 