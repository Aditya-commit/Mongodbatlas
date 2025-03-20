import PropTypes from 'prop-types';



import Field from './field';




const Document = ({db , col , data , deleteField}) => {

    return(

        <li className='bg-white rounded-lg px-5 py-4'>

            <ol className='space-y-3'>
                {Object.keys(data).map((key , index) => <Field key={index} db={db} col={col} keyName={key} value={data[key]} id={data['_id']} deleteField={deleteField} />)}
            </ol>

        </li>
    );
}
Document.propTypes = {
    db : PropTypes.string.isRequired,
    col : PropTypes.string.isRequired,
    data : PropTypes.object.isRequired,
    deleteField : PropTypes.func.isRequired,
}
export default Document;