import PropTypes from 'prop-types';


import ArrowLeft from '../icons/arrow_left';



const ModalHeader = ({heading , backFunc}) => {

    return(
        <div className='flex items-center gap-x-1 py-5 border-b border-gray-100 px-6 bg-white'>
            
            <button className='transition-border duration-300 ease-in-out outline-none group border-2 border-transparent focus-visible:border-gray-800 rounded-full cursor-pointer' title='Back' onClick={backFunc}>
                <ArrowLeft style='text-black group-hover:text-gray-500 transition-color duration-300 ease-in-out text-[19px]' />
            </button>
            <h4 className='font-nunito-sans text-[17px] font-semibold text-gray-800'>{heading}</h4>

        </div>
    )
}
ModalHeader.propTypes = {
    heading : PropTypes.string.isRequired,
    backFunc : PropTypes.func.isRequired,
}
export default ModalHeader;