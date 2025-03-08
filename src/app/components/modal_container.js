import PropTypes from 'prop-types';



const ModalContainer = ({children}) => {
    return(

        <div className='fixed top-0 left-0 w-full h-screen z-20 flex justify-center items-center backdrop-brightness-50'>
            {children}
        </div>

    )
}
ModalContainer.propTypes = {

}
export default ModalContainer;