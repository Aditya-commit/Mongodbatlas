import { useState , useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';


import ModalHeader from './modal_header';



import { nunito_sans } from '../fonts/nunito_sans';


import { v4 as uuid4 } from 'uuid';
import FormKeyValue from './form_key_value';
import PlusSolid from '../icons/plus_solid';
import PlusOutline from '../icons/plus_outline';
import { jsx } from 'react/jsx-runtime';



const InsertModal = ({db , col , toggleInsertModal , insertData}) => {

    const [start , setStart] = useState(false);
    const [loading , setLoading] = useState(false);


    const [data , setData] = useState([]);



    const back = () => {

        setStart(false);
        setTimeout(()=> toggleInsertModal() , 300);
    }



    const addDoc = () => {

        const id = uuid4();


        const keyValueId = uuid4();

        const keyName = `${id}_${keyValueId}_key`
        const valueName = `${id}_${keyValueId}_value`

        setData([...data , {'id' : id , pairs : [{[keyName] : '' , [valueName] : ''}]}]);
    }


    const addPairs = id => {

        let dataCopy = data.slice();

        const foundIndex = dataCopy.findIndex(el => el.id === id);

        if(foundIndex !== -1){

            const keyValueId = uuid4();

            const keyName = `${id}_${keyValueId}_key`;
            const valueName = `${id}_${keyValueId}_value`;

            const updatedObject = {...dataCopy[foundIndex] , pairs : [...dataCopy[foundIndex]['pairs'] , {[keyName] : '' , [valueName] : ''}]};

            dataCopy[foundIndex] = updatedObject;

            setData(dataCopy);
        }
    }



    const handleKeyChange = ({target : {name , value}}) => {


        const splitName = name.split('_');

        const id = splitName[0];
        const pairId = splitName[1];


        let dataCopy = data.slice();

        // FIND THE DOC
        const foundIndex = dataCopy.findIndex(el => el.id === id);

        if(foundIndex !== -1){

            // FIND THE PAIRS

            const pairIndex = dataCopy[foundIndex].pairs.findIndex(pair => Object.keys(pair)[0].split('_')[1] === pairId);

            if(pairIndex !== -1){

                dataCopy[foundIndex]['pairs'][pairIndex] = {...dataCopy[foundIndex]['pairs'][pairIndex] , [name] : value };
            
                setData(dataCopy);
            }
        }

    }

    const handleValueChange = ({target : {name , value}}) => {

        const splitName = name.split('_');

        const id = splitName[0];
        const pairId = splitName[1];


        let dataCopy = data.slice();

        // FIND THE DOC
        const foundIndex = dataCopy.findIndex(el => el.id === id);

        if(foundIndex !== -1){

            // FIND THE PAIRS

            const pairIndex = dataCopy[foundIndex].pairs.findIndex(pair => Object.keys(pair)[1].split('_')[1] === pairId);

            if(pairIndex !== -1){

                dataCopy[foundIndex]['pairs'][pairIndex] = {...dataCopy[foundIndex]['pairs'][pairIndex] , [name] : value };

                setData(dataCopy);
            }
        }

    }

    
    const deleteDoc = id => {

        let dataCopy = data.slice();


        const docIndex = dataCopy.findIndex(el => el.id === id);

        if(docIndex !== -1){

            dataCopy.splice(docIndex , 1);

            setData(dataCopy);
        }
    }


    const deletePair = name => {

        let dataCopy = data.slice();


        const id = name.split('_')[0];
        const pairId = name.split('_')[1];


        // FIND THE INDEX OF THE DOCUMENT
        const docIndex = dataCopy.findIndex(el => el.id === id);

        if(docIndex !== -1){

            // FIND THE PAIR INDEX
            const pairIndex = dataCopy[docIndex]['pairs'].findIndex(pair => Object.keys(pair)[0].split('_')[1] === pairId);

            if(pairIndex !== -1){

                dataCopy[docIndex]['pairs'].splice(pairIndex , 1);


                if(dataCopy[docIndex]['pairs'].length === 0){
                    // IF ALL THE KEYS HAVE BEEN REMOVED THEN REMOVE THAT DOCUMENT

                    dataCopy.splice(docIndex , 1);
                }
            
                setData(dataCopy);
            }
        }
    }



    const submitForm = () => {

        if(!loading){

            setLoading(true);

            let processedData = [];

            data.map(rows => {

                if(rows.pairs.length > 0){

                    let object = {};

                    rows.pairs.map(row => {

                        object[row[Object.keys(row)[0]]] = row[Object.keys(row)[1]]
                        
                    });

                    processedData.push(object);
                }
            });

            
            const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/insert_doc`;

            fetch(url , {
                method : 'post',
                body : JSON.stringify({db : db , col : col , data : processedData}),
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include'
            })
            .then(res => {

                const statusCode = res.status;
                const contentType = res.headers.get("Content-Type");


                if(res.status === 200){

                    return res.json().then(responseData => ({statusCode : statusCode , responseData : responseData , contentType : contentType}));
                }
                else{

                    if(/text\plain/.test(contentType)){

                        return res.text().then(msg => ({statusCode : statusCode , statusCode : statusCode , msg : msg}))
                    }
                    else{

                        return {
                            statusCode : statusCode,
                            contentType : contentType,
                            msg : 'Oops! Something went wrong'
                        }
                    }
                }
            })
            .then(({statusCode , contentType , responseData , msg}) => {

                if(statusCode === 200){

                    responseData.map((row , index)=> (processedData[index] = {"_id" : row , ...processedData[index]}));

                    insertData(processedData);

                    setStart(false);

                    setTimeout(()=>toggleInsertModal() , 300);
                }
                else{

                    // HANDLE ERRORS
                }
            })
            .catch(error => console.log(error))
            .finally(()=>setLoading(false));

        }
    }


    useEffect(()=>setStart(true) , []);

    return(
        <div className={`w-1/2 transition-transform duration-300 ease-in-out ${start ? 'scale-100' : 'scale-0'} bg-white rounded-lg overflow-hidden`}>

            <ModalHeader heading='Insert Documents' backFunc={back} />

            <form className='flex flex-col space-y-10 pt-10 pb-4 px-10 max-h-[50vh] overflow-y-auto' style={{'scrollbarWidth' : 'thin'}}>

                {data.map((rows , index) => (
                    <div key={rows.id} className='border border-gray-200 px-5 py-5'>
                        <div className='flex flex-row flex-wrap gap-x-3 gap-y-9'>
                            {rows.pairs.map((pair , index) => (
                                <FormKeyValue key={index} id={rows.id} keyName={Object.keys(pair)[0]} keyValue={pair[Object.keys(pair)[0]]} valueName={Object.keys(pair)[1]} valueData={pair[Object.keys(pair)[1]]} handleKeyChange={handleKeyChange} handleValueChange={handleValueChange} deletePair={deletePair} />
                            ))}
                        </div>
                        <div className='flex justify-end items-center px-4 gap-x-7 py-3'>
                            <button type='button' className={`transition-colors duration-300 ease-in-out group focus-visible:bg-black flex items-center border border-gray-600 hover:border-black rounded-full px-4 py-1.5`} onClick={()=>addPairs(rows.id)}>
                                <span className={`transition-colors duration-300 ease-in-out ${nunito_sans.className} font-[600] border-r border-gray-600 group-focus-visible:border-gray-200 pr-3 text-gray-700 group-hover:text-black group-focus-visible:text-white`}>Key Value</span>
                                <PlusOutline style='transition-colors duration-300 ease-in-out text-2xl pl-3 text-gray-700 group-hover:text-black group-focus-visible:text-white' />
                            </button>
                            <button className={`transiton-all duration-200 ease-in-out px-6 border-2 border-transparent ${nunito_sans.className} font-[600] bg-red-500 hover:bg-red-600 focus-visible:shadow-[0_0_1px_3px_red] focus-visible:border-white text-white rounded-full py-1.5`} onClick={()=>deleteDoc(rows.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

            </form>

            <div className='flex justify-end w-full pr-10 pt-10'>
                <button className={`transition-border duration-300 ease-in-out border-2 border-transparent focus-visible:border-yellow-600 rounded px-3 py-1 ${nunito_sans.className} font-[600] text-yellow-600 hover:text-yellow-400 text-[17px]`} onClick={addDoc}>Add Document +</button>
            </div>

            <div className='flex justify-center w-full px-10 pt-10 pb-18'>
                <button className={`outline-none cursor-pointer border-3 ${loading ? 'bg-green-300 border-green-300' : 'border-green-500 transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 focus-visible:shadow focus-visible:shadow-[0_0_0_3px_#01b701] focus-visible:border-green-100'} w-full ${nunito_sans.className} font-[600] text-[19px]  text-white rounded h-[50px]`} onClick={submitForm}>
                    {loading
                    ?
                    <span style={{fontWeight:700}}>Inserting...</span>
                    :
                    <span style={{fontWeight:700}}>Insert</span>
                    }
                </button>
            </div>
        </div>
    );
}
InsertModal.propTypes = {
    toggleInsertModal : PropTypes.func.isRequired,
    db : PropTypes.string.isRequired,
    col : PropTypes.string.isRequired,
    insertData : PropTypes.func.isRequired
}
export default InsertModal;