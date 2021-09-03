import { useRef , useEffect } from 'react';
import {
    XIcon
} from '@heroicons/react/outline';

const Addcol = ({func , removefunc})=>{
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    })

    return(
        <>
            <form onSubmit={func} className='pl-3 mb-2 w-9/12'>
				<input type='text' name='colname' className='border-b-2 border-dashed border-black outline-none text-gray-600 text-sm bg-transparent w-11/12' ref={inputRef} />
				<input type='submit' className='hidden' value='Add' />
			</form>
			<XIcon width={16} height={16} className='mt-2 ml-1 text-red-600 hover:text-red-700' onClick={removefunc} />
        </>
    )
}
export default Addcol;