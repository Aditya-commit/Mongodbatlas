import PropTypes from 'prop-types';



const SidebarList = ({loading}) => {
    return(
        <ol className='flex flex-col space-y-8 py-10 h-full overflow-y-auto'>
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
            </>
            }
        </ol>
    )
}
SidebarList.proTypes = {
    loading : PropTypes.bool.isRequired,
}
export default SidebarList;