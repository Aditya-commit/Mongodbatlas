import { useEffect , useRef} from 'react';
import ReactDOM from 'react-dom';
import {
	XIcon
} from '@heroicons/react/outline';
import { useSpring , animated } from 'react-spring';

const Add_db = ({handle_add , remove_NewDb}) => {
	const inputRef=useRef();

	// CREATING THE ANIMATION
	const styles = useSpring({
		from : { y: -400 },
		to : { y: 100 },
	})

	useEffect(()=>{
		inputRef.current.focus();
	})

	return ReactDOM.createPortal(
		<>
			<animated.div className='inline-block fixed z-20 bg-gray-100 text-justify inset-x-1/4 shadow-lg w-1/2 h-80 border-1 border-black' id='insertonediv' style={styles}>
				<XIcon width={18} height={18} className='float-right m-1 text-red-600 hover:bg-gray-200 rounded-full' onClick={remove_NewDb} />
				<h3 className='underline text-2xl text-gray-700 pl-20 pt-10'>Create a Database</h3>
				<form onSubmit={handle_add} className='mt-10 text-center'>
				<label>
					<span className='mx-2'>
						Database
					</span>
					<span className='mx-2'>:</span>
					<input type='text' name='dbname' className='bg-transparent px-1 focus:border-green-400 outline-none rounded-lg border-b-2 border-dashed focus:border-solid border-gray-600 focus:border-2 text-gray-700 w-1/2  focus:bg-transparent py-2 mb-5' ref={inputRef} />
				</label>
				<br />
				<label>
					<span className='mx-2'>
						Collection
					</span>
					<span className='mx-2'>
						:
					</span>
					<input type='text' name='colname' className='px-1 py-2 focus:border-green-400 outline-none rounded-lg border-b-2 border-dashed focus:border-solid border-gray-600 focus:border-2 bg-transparent text-gray-700 w-1/2  focus:bg-transparent mb-5' />
				</label>
				<br />
				<input type='submit' className='outline-none focus:bg-green-700 text-lg text-lg antialised font-mono bg-green-600 mt-3 cursor-pointer p-1 rounded-xl hover:bg-green-700 px-4' value='Add' />
			</form>
			</animated.div>
		</>
	, document.getElementById('inserts'));
}
export default Add_db;