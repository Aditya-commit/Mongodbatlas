import PropTypes from 'prop-types';


const Command = () => {
    return(

        <input type='text' className={`outline-none font-mono border-3 border-gray-300 rounded-lg px-3 focus-visible:border-gray-600 focus-visible:bg-white transition-colors duration-300 ease-in-out mr-14 ml-2 bg-gray-100`} placeholder='Enter commands' spellCheck={false} />

    )
}
Command.propTypes ={
    
}
export default Command;