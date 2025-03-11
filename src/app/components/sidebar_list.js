import PropTypes from 'prop-types';
import SideBarRow from './sidebar_row';



const SidebarList = ({loading , data , selectedRow , selectFunc}) => {
    return(
        <ol className={`flex flex-col ${loading ? 'space-y-8' : 'space-y-3'} py-7 h-full overflow-y-auto px-3`}>
            {loading
            ?
            <>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
                <li className='grid grid-cols-[1fr_max-content] gap-x-5 pl-10 pr-5'>
                    <span className='py-3 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                    <span className='w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'></span>
                </li>
            </>
            :
            <>
                {data.map((row , index) => (
                    <SideBarRow key={index} name={row} selectedRow={selectedRow} selectFunc={selectFunc} />
                ))}
            </>
            }
        </ol>
    )
}
SidebarList.proTypes = {
    loading : PropTypes.bool.isRequired,
    data : PropTypes.array.isRequired,
    selectedRow : PropTypes.string.isRequired,
    selectFunc : PropTypes.func.isRequired,
}
export default SidebarList;