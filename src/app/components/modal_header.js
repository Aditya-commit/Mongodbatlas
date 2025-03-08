import PropTypes from 'prop-types';


import ArrowLeft from '../icons/arrow_left';



const ModalHeader = ({heading , backFunc}) => {

    return(
        <div className='flex items-center space-x-3 py-7 border-b border-gray-100 px-6 bg-white'>
            
            <button className='transition-border duration-300 ease-in-out outline-none group border-2 border-transparent focus-visible:border-green-600 rounded-full cursor-pointer' title='Back' onClick={backFunc}>
                <ArrowLeft style='text-black group-hover:text-gray-500 transition-color duration-300 ease-in-out text-2xl' />
            </button>
            <h4 className='font-nunito-sans text-[21px] font-semibold text-gray-800'>{heading}</h4>

        </div>
    )
}
ModalHeader.propTypes = {
    heading : PropTypes.string.isRequired,
    backFunc : PropTypes.func.isRequired,
}
export default ModalHeader;