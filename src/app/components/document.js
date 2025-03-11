import PropTypes from 'prop-types';
import ArrowDown from '../icons/arrow_down';
import { nunito_sans } from '../fonts/nunito_sans';



const Document = ({data}) => {

    return(

        <li className='bg-white rounded-lg px-5 py-4'>

            <ol className='space-y-3'>
                {Object.keys(data).map((key , index) => (
                    <li key={index} className='flex space-x-3'>
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