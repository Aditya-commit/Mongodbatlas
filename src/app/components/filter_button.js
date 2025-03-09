import { useState } from 'react';
import PropTypes from 'prop-types';




import { nunito_sans } from '../fonts/nunito_sans';
import ArrowDown from '../icons/arrow_down';





const FilterButton = ({name , options}) => {

    const [show , setShow] = useState(false);


    const toggleFunc = () => setShow(!show);

    const handleBlur = event => !event.currentTarget.contains(event.relatedTarget) && setShow(false);

    return(

        <div className='relative' onBlur={handleBlur}>
            <button className={`${nunito_sans} cursor-pointer font-[600] text-lg text-gray-800 hover:text-gray-500 group flex items-center space-x-2`} onClick={toggleFunc}>
                <span>{name}</span>
                <ArrowDown style='text-gray-800 group-hover:text-gray-500' />
            </button>
            <div className={`absolute ${show ? 'h-[100px]' : 'h-0'} overflow-hidden transition-[height] duration-300 ease-in-out flex flex-col items-center justify-center space-y-3`}>
                {options.map((opt , index) => (
                    <button key={index} tabIndex={show ? '0' : '1'}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}
FilterButton.propTypes = {
    name : PropTypes.string.isRequired,
    options : PropTypes.array.isRequired
}
export default FilterButton;