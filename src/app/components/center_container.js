import { useState , useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

import Filter from './filter_container';
import DocumentSkeleton from './documen_skeleton';
import Document from './document';
import ModalContainer from './modal_container';
import InsertModal from './insert_modal';
import DeleteAlertModal from './delete_alert_modal';
import EditModal from './edit_modal';



const CenterContainer = ({toggleConnModal , db , col}) => {


    const [loading , setLoading] = useState(false);
    const [data , setData] = useState([]);
    const [filterData , setFilterData] = useState(null);


    const [showInsertModal , setShowInsertModal] = useState(false);
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [showEditModal , setShowEditModal] = useState(false);
    const [editDoc , setEditDoc] = useState(null);


    const searchParams = useSearchParams();


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




    const deleteDoc = id => {

        let dataCopy = data.slice();

        const docIndex = dataCopy.findIndex(el => el['_id'] === id);

        docIndex !== -1 && dataCopy.splice(docIndex , 1);

        setData(dataCopy);

    }



    const deleteField = (id , key) => {

        let dataCopy = data.slice();


        const docIndex = dataCopy.findIndex(el => el['_id'] === id);

        if(docIndex !== -1){

            let updatedObject = {...dataCopy[docIndex]};

            delete updatedObject[key];

            dataCopy[docIndex] = updatedObject;

            setData(dataCopy);
        }
    }



    const updateData = updatedDoc => {

        let dataCopy = data.slice();

        const docIndex = dataCopy.findIndex(el => el['_id'] === updatedDoc['_id']);

        if(docIndex !==  -1){

            dataCopy[docIndex] = updatedDoc;

            setData(dataCopy);
        }
    }



    const filterDocs = queryData => setFilterData(queryData);
    



    useEffect(()=>{

        if(db !== null && col !== null){

            fetchData();
        }
        else{
            resetData();
        }

    },[db, col]);



    useEffect(()=>{

        const id = searchParams.get('id')
        
        if(searchParams.get('delete_doc') === 'true' && (id !== '' && id !== null)){

            setShowDeleteModal(true);
            setShowEditModal(false);
            setEditDoc(null);
        }
        else if(searchParams.get('edit_doc') === 'true' &&  (id !== '' && id !== null)){
            
            setShowEditModal(true);
            setShowDeleteModal(false);

            // FIND THE DOCUMENT

            const docIndex = data.findIndex(el => el['_id'] === id);

            console.log(docIndex);

            docIndex !== -1 && setEditDoc(data[docIndex]);

        }
        else{
            setShowDeleteModal(false);
            setShowEditModal(false);
            setEditDoc(null);
        }

    },[searchParams]);





    return(
        <>
            <div className='grid grid-rows-[max-content_1fr] h-[calc(100vh-89px)]'>
                <Filter toggleConnModal={toggleConnModal} toggleInsertModal={toggleInsertModal} db={db} col={col} loading={loading} filterDocs={filterDocs} />
            
                <ol className='bg-gray-100 overflow-y-auto space-y-2 px-2 pt-3' style={{'scrollbarWidth' : 'thin'}}>
                    {loading
                    ?
                    <DocumentSkeleton />
                    :
                    <>
                        {(filterData)
                        ?
                        <>{filterData.map((row , index) => <Document key={index} data={row} db={db} col={col} deleteField={deleteField} />)}</>
                        :
                        <>{data.map((row , index) => <Document key={index} data={row} db={db} col={col} deleteField={deleteField} />)}</>
                        }
                    </>
                    }
                </ol>
            </div>
            {showInsertModal && (
                <ModalContainer>
                    <InsertModal db={db} col={col} toggleInsertModal={toggleInsertModal} insertData={insertData} />
                </ModalContainer>
            )}
            {showDeleteModal && (
                <ModalContainer>
                    <DeleteAlertModal heading='Delete Document' db={db} col={col} deleteDoc={deleteDoc} />
                </ModalContainer>
            )}
            {(showEditModal && editDoc) && (
                <ModalContainer>
                    <EditModal data={editDoc} db={db} col={col} updateData={updateData} />
                </ModalContainer>
            )}
        </>
    );
}
CenterContainer.propTypes = {
    toggleConnModal : PropTypes.func.isRequired,
    db : PropTypes.string,
    col : PropTypes.string
}
export default CenterContainer;