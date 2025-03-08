import PropTypes from 'prop-types';
import PlusSolid from '../icons/plus_solid';


import { nunito_sans } from '../fonts/nunito_sans';
import SidebarList from './sidebar_list';


const CollectionList = () => {

    return(

        <div className='flex flex-col bg-white'>

            <div className='w-full px-4'>
                <button className='flex justify-center items-center space-x-3 bg-gray-100 w-full py-3 rounded-full cursor-pointer hover:bg-gray-200 transition-colors duration-300 ease-in-out group'>
                    <span className={`text-gray-800 group-hover:text-green-600 ${nunito_sans.className} font-[600] text-[19px]`}>Collections</span>
                    <PlusSolid style='text-xl text-gray-800 group-hover:text-green-500' />
                </button>
            </div>
            <SidebarList />
        </div>

    )
}
export default CollectionList;