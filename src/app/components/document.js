import PropTypes from 'prop-types';




import { nunito_sans } from '../fonts/nunito_sans';


import ArrowDown from '../icons/arrow_down';
import Pencil from '../icons/pencil';
import Dustbin from '../icons/dustbin';




const Document = ({data}) => {

    return(

        <li className='bg-white rounded-lg px-5 py-4'>

            <ol className='space-y-3'>
                {Object.keys(data).map((key , index) => (
                    <li key={index} className='grid grid-cols-[max-content_max-content_1fr_max-content_max-content] gap-x-3 group'>
                        <span className={`${nunito_sans.className} font-[700] text-gray-900 text-[17px]`}>{key}</span>
                        <span className={`${nunito_sans.className} text-[17px] font-[600]`}>:</span>
                        {(typeof(data[key]) === 'object' || Array.isArray(data[key]))
                        ?
                        <button className='flex space-x-1 items-center'>
                                {typeof(data[key]) === 'object' && (
                                    <span className={`${nunito_sans.className} text-[17px] text-gray-700 font-[600]`}>Object</span>
                                )}
                                {Array.isArray(data[key]) && (
                                    <span className={`${nunito_sans.className} text-[17px] text-gray-700 font-[600]`}>Array</span>
                                )}
                            <ArrowDown style='text-lg' />
                        </button>
                        :
                        <span className={`${nunito_sans.className} text-[16.9px] font-[500] ${key === '_id' ? 'text-yellow-600' : typeof(data[key]) === 'number' ? 'text-blue-600' : 'text-gray-800'}`}>{data[key]}</span>
                        }

                        <button className='invisible group-hover:visible px-1 border-2 border-transparent focus-visible:border-yellow-600 rounded text-yellow-600 hover:text-yellow-400' title='Edit'>
                            <Pencil style='text-xl' />
                        </button>
                        <button className='invisible group-hover:visible px-1 border-2 border-transparent focus-visible:border-yellow-600 rounded text-red-600 hover:text-red-400' title='Delete'>
                            <Dustbin style='text-xl' />
                        </button>
                    </li>
                ))}
            </ol>

        </li>
    );
}
Document.propTypes = {
    data : PropTypes.object.isRequired
}
export default Document;