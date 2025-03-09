import PropTypes from 'prop-types';
import FilterButton from './filter_button';
import { nunito_sans } from '../fonts/nunito_sans';


const Filter = ({toggleConnModal}) => {
    
    return(
        <div className='grid grid-cols-[1fr_max-content] gap-x-3 border-b border-gray-200 pt-3 pb-6 px-10 items-center'>

            <div className='flex space-x-14 justify-center'>

                <FilterButton name='Insert' options={['Insert One' , 'Insert Many']} />
                <FilterButton name='Update' options={['Update One' , 'Update Many']} />
                <FilterButton name='Find' options={['Find One' , 'Find Many']} />

            </div>

            <button className={`${nunito_sans} font-[600] text-lg bg-green-600 text-white px-4 py-1 transition-all duration-300 ease-in-out hover:bg-green-700 border-3 border-green-600 focus-visible:border-[#ceffce] focus-visible:shadow focus-visible:shadow-[0_0_1px_3px_#008d00] rounded`} onClick={toggleConnModal}>
                Connect
            </button>

        </div>
    )
}
Filter.propTypes = {
    toggleConnModal : PropTypes.func.isRequired
}
export default Filter;