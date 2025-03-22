import PropTypes from 'prop-types';


import { nunito_sans } from '../fonts/nunito_sans';


import XCloseOutline from '../icons/xclose_outline';


const FormKeyvalue = ({id , keyName , keyValue , valueName , valueData , handleKeyChange , handleValueChange , deletePair}) => {

    return(

        <div className='grid grid-cols-[200px_max-content_200px_max-content] items-center space-x-3'>

            <input type='text' name={keyName} className={`text-yellow-600 ${nunito_sans.className} font-[600] border-b-2 border-gray-300 px-3 py-1 outline-none focus-visible:border-yellow-500`} placeholder='key' value={keyValue} onChange={handleKeyChange} />
            <span>:</span>
            <input type='text' name={valueName} className={`text-black ${nunito_sans.className} font-[600] border-b-2 border-gray-300 px-3 py-1 outline-none focus-visible:border-black`} placeholder='value' value={valueData} onChange={handleValueChange} />
            <button type='button' className='group border-2 border-transparent focus-visible:border-red-500 rounded-full' title='Remove Field' onClick={()=>deletePair(keyName)}>
                <XCloseOutline style='text-red-500 group-hover:text-red-700' />
            </button>
        </div>

    );
}
FormKeyvalue.PropTypes = {
    id : PropTypes.string.isRequired,
    keyName : PropTypes.string.isRequired,
    keyValue : PropTypes.string.isRequired,
    valueName : PropTypes.string.isRequired,
    valueData : PropTypes.string.isRequired,
    handleKeyChange : PropTypes.func.isRequired,
    handleValueChange : PropTypes.func.isRequired,
    deletePair : PropTypes.func.isRequired,
}
export default FormKeyvalue;