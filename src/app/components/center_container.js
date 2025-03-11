import { useState , useEffect} from 'react';
import PropTypes from 'prop-types';

import Filter from './filter_container';


const CenterContainer = ({toggleConnModal , db , col}) => {


    const [loading , setLoading] = useState(false);
    const [data , setData] = useState([]);



    const fetchData = () => {

        setLoading(true);
    }



    const resetData = () => setData([]);



    useEffect(()=>{

        if(db !== null && col !== null){

            fetchData();
        }
        else{
            resetData();
        }

    },[db, col])

    return(
        <div className='flex flex-col'>
            <Filter toggleConnModal={toggleConnModal} />
        
            <div>
                {loading && (
                    <span>Loading...</span>
                )}
            </div>
        </div>
    )
}
CenterContainer.propTypes = {
    toggleConnModal : PropTypes.func.isRequired,
}
export default CenterContainer;