import PropTypes from 'prop-types';
import Filter from './filter_container';



const CenterContainer = ({toggleConnModal}) => {
    return(
        <div className='flex flex-col'>
            <Filter toggleConnModal={toggleConnModal} />
        </div>
    )
}
CenterContainer.propTypes = {
    toggleConnModal : PropTypes.func.isRequired,
}
export default CenterContainer;