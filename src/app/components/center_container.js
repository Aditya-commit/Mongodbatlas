import { useState , useEffect} from 'react';
import PropTypes from 'prop-types';

import Filter from './filter_container';
import DocumentSkeleton from './documen_skeleton';
import Document from './document';
import ModalContainer from './modal_container';
import InsertModal from './insert_modal';



const CenterContainer = ({toggleConnModal , db , col}) => {


    const [loading , setLoading] = useState(false);
    const [data , setData] = useState([]);


    const [showInsertModal , setShowInsertModal] = useState(false);



    const fetchData = () => {

        setLoading(true);

        const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/fetch_data/${db}/${col}`;

        fetch(url , {
            method : 'get',
            credentials : 'include',
        })
        .then(res => {

            const contentType = res.headers.get('Content-Type');
            const statusCode = res.status;


            if(statusCode === 200){

                return res.json().then(data => ({statusCode : statusCode , contentType : contentType , data : data})).catch(error => ({contentType : contentType , statusCode : 500 , 'error' : 'Oops! Something went wrong'}))
            }
            else if(/text\/plain;/.test(contentType)){

                return res.text().then(msg => ({statusCode : statusCode , contentType : contentType , error : msg})).catch(error => ({contentType : contentType , statusCode : 500 , error : error}));
            }
            else{

                return {statusCode : statusCode , contentType : contentType , error : 'Oops! Something went wrong'};
            }
        })
        .then(({statusCode , contentType , data , error}) => {

            if(statusCode === 200){

                setData(data);

            }
            else{
                // ERROR HANDLING
            }
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }



    const resetData = () => setData([]);








    const toggleInsertModal = () => setShowInsertModal(!showInsertModal);



    const insertData = newData => setData([...data , ...newData]);



    useEffect(()=>{

        if(db !== null && col !== null){

            fetchData();
        }
        else{
            resetData();
        }

    },[db, col]);





    return(
        <>
            <div className='grid grid-rows-[max-content_1fr] h-[calc(100vh-89px)]'>
                <Filter toggleConnModal={toggleConnModal} toggleInsertModal={toggleInsertModal} />
            
                <ol className='bg-gray-100 overflow-y-auto space-y-2 px-2 pt-3'>
                    {loading
                    ?
                    <DocumentSkeleton />
                    :
                    <>
                        {data.map((row , index) => <Document key={index} data={row} />)}
                    </>
                    }
                </ol>
            </div>
            {showInsertModal && (
                <ModalContainer>
                    <InsertModal db={db} col={col} toggleInsertModal={toggleInsertModal} insertData={insertData} />
                </ModalContainer>
            )}
        </>
    )
}
CenterContainer.propTypes = {
    toggleConnModal : PropTypes.func.isRequired,
    db : PropTypes.string,
    col : PropTypes.string
}
export default CenterContainer;