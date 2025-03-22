import PropTypes from 'prop-types';



import { nunito_sans } from '../fonts/nunito_sans';


import FindFiter from './find_filter';




const Filter = ({db , col , loading , toggleConnModal , toggleInsertModal , filterDocs}) => {

    return(
        
        <div className='grid grid-cols-[1fr_max-content] gap-x-3 border-b border-gray-200 pt-3 pb-6 px-10 items-center'>

            <div className='grid grid-cols-[max-content_1fr_max-content_max-content] justify-center'>

                <FindFiter db={db} col={col} loading={loading} filterDocs={filterDocs} />

                <button className={`${nunito_sans.className} font-[600] text-lg bg-white text-black px-4 py-1 transition-all duration-300 ease-in-out hover:bg-gray-200 border-2 border-gray-500 focus-visible:border-[#ceffce] focus-visible:shadow focus-visible:shadow-[0_0_1px_3px_#008d00] rounded ml-4`} onClick={toggleInsertModal}>
                    Insert +
                </button>
            </div>


            <button className={`${nunito_sans.className} font-[600] text-lg bg-green-600 text-white px-4 py-1 transition-all duration-300 ease-in-out hover:bg-green-700 border-3 border-green-600 focus-visible:border-[#ceffce] focus-visible:shadow focus-visible:shadow-[0_0_1px_3px_#008d00] rounded`} onClick={toggleConnModal}>
                Connect
            </button>

        </div>
    )
}
Filter.propTypes = {
    db : PropTypes.string,
    col : PropTypes.string,
    loading : PropTypes.bool.isRequired,
    toggleConnModal : PropTypes.func.isRequired,
    toggleInsertModal : PropTypes.func.isRequired
}
export default Filter;