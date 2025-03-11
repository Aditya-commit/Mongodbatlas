import { useState } from 'react';
import PropTypes from 'prop-types';


import { nunito_sans } from '../fonts/nunito_sans';


import XCloseSolid from '../icons/xclose';


const SideBarRow = ({name , selectFunc , selectedRow}) => {

    return(
        <li className={`grid grid-cols-[1fr_max-content] border gap-x-3 items-center pl-5 pr-2 ${selectedRow === name ? 'bg-green-50 border-green-300' : 'border-transparent hover:bg-green-50'} rounded py-3 transition-colors duration-300 ease-in-out`}>
            <button className={`${nunito_sans.className} transition-colors duration-300 ease-in-out font-[600] ${selectedRow === name ? 'text-green-700' : 'text-black focus-visible:text-green-600'} text-left text-[18px]`} onClick={()=>selectFunc(name)}>{name}</button>
            <button className={`group`} title='Delete'>
                <XCloseSolid style='text-2xl text-gray-400 group-hover:text-red-600 group-focus-visible:text-red-600 transition-colors duration-300 ease-in-out' />
            </button>
        </li>
    )
}
SideBarRow.propTypes = {
    name : PropTypes.string.isRequired,
    selectFunc : PropTypes.func.isRequired,
    selectedRow : PropTypes.string.isRequired,
}
export default SideBarRow;