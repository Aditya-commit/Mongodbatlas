import axios from 'axios';
import { useState , useRef , useContext , useEffect } from 'react';
import {
	XIcon
} from '@heroicons/react/outline';

import { Option_context } from '../center_container';

const Updateone = () => {

	const Options = useContext(Option_context);

	const [active , setActive] = useState(false);

	const queryRef = useRef(null);

	const [query , setQuery] = useState('');

	const [btnactive , setBtnActive] = useState(false);

	const [success , setSuccess] = useState(false);

	const [iderror , setIdError] = useState(false);

	const [error , setError] = useState(false);

	const [noupdate , setNoUpdate] = useState(false);

	const [invalid , setInvalid] = useState(false);

	const hideDiv = () => {
		setActive(true);
		Options.resetFunc();
	}

	const handleQueryChange = (event) => {
		setQuery(queryRef.current.value);
		if(queryRef.current.value == ''){
			setBtnActive(false);
		}
		else{
			setBtnActive(true);
		}
	}

	const removeAlert = (alerts) => {
		
		if(alerts == 'Success'){
			setSuccess(false);
			Options.resetFunc();
		}

		else{
			if(alerts == 'IdError'){
				setIdError(false);
				Options.resetFunc();
			}
			else{
				if(alerts == 'Error'){
					setError(false);
					Options.resetFunc();
				}
				else{
					if(alerts == 'Invalid'){
						setInvalid(false);
						Options.resetFunc();
					}
					else{
						if(alerts == 'NoUpdate'){
							setNoUpdate(false);
							Options.resetFunc();
						}
					}
				}
			}
		}
	}

	const updateDocument = (event) => {
		event.preventDefault();

		if(query != ''){
			
			if(Options.database_name == undefined || Options.database_name == null){
				alert('Please select the database with which you want to work with');
			}
			else{
				if(Options.collection_name == undefined || Options.collection_name == null){
					alert('Please select the collection');
				}
				else{
					const regex = /^{["|']?([a-zA-Z]|\d|_)+["|']?\s?:\s?["|']\W*([a-zA-Z]|\d|[@.!#%&*()])+(\s*\W*([a-zA-Z]|\d|[@.!#%&*()])+)*\s?["|'](\s?,\s?["|']?([a-zA-Z]|\d|_)+["|']?\s?:\s?["|']([a-zA-Z]|\d|[@.!#%&*()])+((\W)*([a-zA-Z]|\d|[@.!#%&*()])*)*["|'])*}\s?,\s?{\$set\s?:\s?{["|']?([a-zA-Z]|\d|_)+(\s*([a-zA-Z]|\d)*)*["|']?\s?:\s?["|']([a-zA-Z]|\d|[@.!#%&*()])+(\s*([a-zA-Z]|\d|[@.!#%&*()])*)*["|']}}$/;
					
					if(regex.test(query)){
						const regex_obj = /{["|']?([a-zA-Z]|\d|_)+(\s+([a-zA-Z]|\d|_)*)*["|']?:\s*["|'][@.!#%&*()]*([a-zA-Z]|\d|[@.!#%&*()])*(\s+[@.!#%&*()]*([a-zA-Z]|\d|[@.!#%&*()])*)*["|'](\s?,\s?["|']?([a-zA-Z]|\d|_)+(\s+([a-zA-Z]|\d|_)*)*["|']?\s*:\s*["|'][@.!#%&*()]*([a-zA-Z]|\d|[@.!#%&*()])+(\s+([a-zA-Z]|\d|[@.!#%&*()])*)*["|'])*}/g;

						const match = query.match(regex_obj);

						let new_str_array = [];

					    match.forEach((value) => {
					        let new_str_value = '';

					        for (let i = 0; i < value.length; i++) {
					            if (value[i] == `{`) {
					                // CHECK IF THE CURRENT CHARACTER IS `{`
					                if (value[i + 1] == `"`) {
					                    // IF THE CHARACTER PRESENT AFTER { IS " THEN ADD THE CURRENT INDEXED CHARACTER
					                    new_str_value += value[i];
					                } else {
					                    // IF THE CHARACTER PRESENT AFTER { IS NOT " THEN CHECK IF THE PRECEEDING CHARACTER IS ' IF IT IS THEN REPLACE IT WITH {" AND INCREASE THE INDEX NO BY 1 SO THAT NEXT TIME IT WILL NOT COME ON THE ' CHARACTER BUT IF THERE IS ANY CHARACTER OTHER THAN "/' THEN ALSO PUT {"
					                    if (value[i + 1] == `'`) {
					                        new_str_value += `{"`
					                        i++;
					                    } else {
					                        new_str_value += `{"`;
					                    }
					                }
					            } else {
					                // IF THE PRECEEDING CHARACTER IS : THAT MEANS WE WERE ITERATING THE KEY AND WE WANT THAT OUR KEY ENDS WITH " SO IF IT IS THEN CHECK THAT WHETHER THE CURRENT INDEX CHARACTER WHICH IS THE END OF THE KEY IS HAVING " OR NOT
					                if (value[i + 1] == ":") {
					                    if (value[i] == `"`) {
					                        // IF IT IS HAVING " THEN SIMPLY ADD THAT "
					                        new_str_value += value[i];
					                    } else {
					                        // BUT IF IS HAVING ' THEN REPLACE THAT PARTICULAR CHARACTER(') WITH "
					                        if (value[i] == `'`) {
					                            new_str_value += `"`;
					                        } else {
					                            // BUT IF IT IS NOT EVEN HAVING ANY TRAILING COMMA WHETHER ' OR "
					                            // THEN ADD THE CURRENT INDEX CHARACTER WITH "
					                            let found = false;
					                            for (let j = 65; j <= 90; j++) {
					                                if (value[i] == String.fromCharCode(j)) {
					                                    new_str_value += `${value[i]}"`;
					                                    found = true;
					                                    break;
					                                }
					                            }
					                            if (!found) {
					                                for (let j = 97; j <= 122; j++) {
					                                    if (value[i] == String.fromCharCode(j)) {
					                                        new_str_value += `${value[i]}"`;
					                                        break;
					                                    }
					                                }
					                            }
					                        }
					                    }
					                } else {
					                    // IF THE CURRENT INDEX CHARACTER IS : THEN CHECK THE PRECEDDING CHARACTER WHICH WILL OBVIOUSLY BE THE VALUE OF THE KEY AND IT SHOULD BEGIN WITH "
					                    if (value[i] == ':') {
					                        if (value[i + 1] == `"`) {
					                            // IF IT IS BEGINING WITH " THEN ADD THE CURRENT INDEXED CHARACTER
					                            new_str_value += value[i]
					                        } else {
					                            // BUT IF IT IS BEGINING WITH ' THEN REPLACE IT WITH :" AND INCREASE THE COUNTER BY 1 SO THAT IT WILL NOT COME ON THE PRECEDDING CHARCTER WHICH IS ACTUALLY ' WHICH WE REPLACED 
					                            if (value[i + 1] == `'`) {
					                                new_str_value += `:"`
					                                i++;
					                            } else {
					                                // BUT IF THE USER HAS A SPACE BETWEEN THE : AND THE VALUE THEN LEAVE IT
					                                if (value[i + 1] == ' ') {
					                                    new_str_value += value[i];
					                                }
					                            }
					                        }
					                    } else {
					                        // IF THE CURRENT INDEX IS A WHITE SPACE THEN CHECK IF THE PREVIOUS INDEXED CHARACTER IS : OR NOT
					                        if (value[i] == ' ') {
					                            if (value[i - 1] == ':') {
					                                // IF IT IS THEN THIS MEANS THAT WE BEGAN ITERATING THE VALUE OF THE KEY SO REPLACE THE SPACE WITH " AND SKIP THE NEXT INDEXED CHARACTER BECAUSE IF IT WILL CONTAIN THE ' THEN ALSO IT IS FINE AND IF IT IS CONTAINING " THEN ALSO IT IS FINE BECAUSE WE HAVE ALREADY REPLACED ' WITH "
					                                new_str_value += `"`;
					                                i++;
					                            } else {

					                                // IF THE NEXT OCCURING INDEXED CHARACTER IS , OR NOT IF IT IS THEN THIS MEANS THAT WE ARE GONNA ITERATE THE NEXT KEY VALUE PAIR AND THE KEY OF THAT KEY VALUE PAIR SHOULD START WITH "
					                                if (value[i - 1] == ',') {
					                                    // IF THE NEXT OCCURING CHARACTER WHICH WILL BE THE FIRST CHARACTER OF THE KEY
					                                    if (value[i + 1] == `"`) {
					                                        // IF THE KEY IS STARTING WITH " 
					                                        new_str_value += value[i];

					                                    } else {
					                                        if (value[i + 1] == `'`) {
					                                            // IF THE FIRST INDEX OF THE KEY IS ' THEN REPLACE IT WITH " AND SKIP THE PRECEEDING INDEX
					                                            new_str_value += ` "`;
					                                            i++;
					                                        } else {
					                                            new_str_value += ` "`;
					                                        }
					                                    }
					                                } else {
					                                    // IF THE PREVIOUS CHARACTER IS NOT : THEN THIS MEANS THAT WE ARE ACTUALLY ITERATING EITHER KEY WHICH CONTAIN WHITE SPACE BETWEEN ITS CHARACTERS OR WE ARE ITERATING VALUE WHICH IS CONTAINING WHITE SPACE BETWEEN ITS CHARACTERS
					                                    new_str_value += value[i];
					                                }

					                            }

					                        } else {
					                            // IF THE NEXT PRECEDDING CHARACTER IS } THAT MEANS WE ARE AT THE END OF THE OBJECT SO THE VALUE SHOULD END WITH "
					                            if (value[i + 1] == `}`) {
					                                if (value[i] == `"`) {
					                                    // IF THE CURRENT INDEX IS " IT MEANS THAT THE VALUE OF THE KEY IS ENDING WITH " THEN SIMPLY ADD IT
					                                    new_str_value += value[i];
					                                } else {
					                                    // BUT IF IT IS ENDING WITH ' THEN REPLACE IT WITH "
					                                    if (value[i] == `'`) {
					                                        new_str_value += `"`
					                                    }
					                                }
					                            } else {
					                                // IF THE NEXT PRECEDDING CHARACTER IS CONTAING A WHITE SPACE AND THE INDEXED CHARACTER EVEN AFTER THE SPACE IS CONTAINING : THEN IT MEANS THAT WE ARE CURRENTLY AT THE END OF THE KEY WHICH IS CONTAINING THE WHITESPACE BETWEEN ITSELF AND THE COLON
					                                if (value[i + 1] == ' ' && value[i + 2] == `:`) {
					                                    if (value[i] == `"`) {
					                                        // IF IT IS CONTAINING THE " THEN SIMPLY ADD THAT "
					                                        new_str_value += value[i];
					                                    } else {
					                                        // BUT IF IT IS NOT ENDING WITH "
					                                        if (value[i] == `'`) {
					                                            // INSTEAD IT IS ENDING WITH ' THEN REPLACE IT WITH "
					                                            new_str_value += `"`;
					                                        } else {
					                                            // BUT IF IT IS NEITHER CONTAINING ' NOR " BUT AN ALPHANUMERIC CHARACTER THEN ADD THE " AFTER THE ALPHANUMERIC CHARACTER WHICH IS ACTUALLY THE END OF THE KEY
					                                            new_str_value += `${value[i]}"`;
					                                        }
					                                    }
					                                } else {
					                                    // IF THE NEXT OCCURING CHARACTER IS WHITE SPACE AND THE SUCCESIVE OCCURING INDEXED CHARACTER IS , THAT MEANS WE ARE AT THE END OF THE VALUE
					                                    if (value[i + 1] == ' ' && value[i + 2] == ',') {
					                                        if (value[i] == `"`) {
					                                            // IF THE LAST CHARACTER OF THE VALUE IS " THEN DO NOTHING
					                                            new_str_value += value[i];
					                                        } else {
					                                            if (value[i] == `'`) {
					                                                // BUT IF THE LAST INDEXED CHARACTER OF THE VALUE IS ' THEN REPLACE IT WITH "
					                                                new_str_value += `"`;
					                                            }
					                                        }
					                                    } else {
					                                        // IF THE NEXT OCCURING CHARACTER IS , AND NOT THE WHITESPACE JUST LIKE THE ABOVE ONE THAT MEANS THAT THE USER HAS NOT USED THE SPACE BETWEEN ANOTHER KEY VALUE PAIR
					                                        if (value[i + 1] == `,`) {
					                                            if (value[i] == `'`) {
					                                                // IF THE CURRENT INDEXED CHARACTER IS CONTAINING THE ' THEN REPLACE IT WITH "
					                                                new_str_value += `"`;
					                                            } else {
					                                                // ELSE IF IT IS JUST ADD THE CURRENT INDEX CHARACTER BECAUSE THEN IT WILL DEFINITELY BE CONTAINING THE LAST VALUE CHARACTER "
					                                                new_str_value += value[i];
					                                            }
					                                        } else {
					                                            // IF THE CURRENT INDEX CHARACTER IS ,
					                                            if (value[i] == ',') {
					                                                if (value[i + 1] == `"`) {
					                                                    // IF THE FIRST CHARACTER OF THE KEY OF ANOTHER KEY VALUE PAIR STARTS WITH " THEN DO NOTHING
					                                                    new_str_value += value[i];
					                                                } else {
					                                                    if (value[i + 1] == `'`) {
					                                                        // IF THE FIRST CHARACTER OF THE KEY OF ANOTHER KEY VALUE PAIR STARTS WITH ' THEN REPLACE IT WITH " AND SKIPS THE INDEX OF THE NEXT OCCURING CHARACTER WHICH IS '
					                                                        new_str_value += `${value[i]}"`;
					                                                        i++;
					                                                    } else {
					                                                        if (value[i + 1] == ' ') {
					                                                            // IF THERE IS ANOTHER WHITE SPACE BETWEEN HITE SPACE AND THE FIRST CHARACTER OF THE KEY THEN DO NOTHING
					                                                            new_str_value += value[i];

					                                                        } else {
					                                                            new_str_value += `${value[i]}"`;
					                                                        }
					                                                    }
					                                                }
					                                            } else {
					                                                new_str_value += value[i];
					                                            }
					                                        }
					                                    }
					                                }
					                            }
					                        }
					                    }
					                }
					            }
					        }
					        new_str_array.push(new_str_value);
					    });

						new_str_array.forEach((value , index)=>{
							new_str_array[index] = JSON.parse(value);
						});

						axios.post('api/updates/updateone' , {
							'database':Options.database_name,
							'collection':Options.collection_name,
							'query':new_str_array
						})
						.then((res)=>{
							console.log(res);
							if(res.data.nModified == 1 || res.data.nModified > 0){
								Options.updatedData(new_str_array[1])
								setSuccess(true);
								setActive(true);
							}
							else{
								if(res.data.nModified == 0){
									setNoUpdate(true);
									setActive(true);
								}
								else{
									if(res.data == "can't update an id field")
									setIdError(true);
									setActive(true);
								}
							}
						})
						.catch((error)=>{
							setError(true);
							setActive(true);
						});
					}
					else{
						//NOT A VALID FORMAT
						setInvalid(true);
						setActive(true);
					}
				}
			}
				
		}
	}

	useEffect(()=>{
		if(success){
			setTimeout(()=>{
				setSuccess(false);
				Options.resetFunc();
			},4000)
		}

		else{
			if(iderror){
				setTimeout(()=>{
					setIdError(false);
					Options.resetFunc();
				},4000);
			}
			else{
				if(noupdate){
					setTimeout(()=>{
						setNoUpdate(false);
						Options.resetFunc();
					},4000);
				}
				else{
					if(error){
						setTimeout(()=>{
							setError(true);
							Options.resetFunc();
						},4000)
					}
				}
			}
		}
	},[success , iderror , error , noupdate])

	return(
		<>
			{success
			?
				<div className='filter bg-green-300 text-center'>
					<div className='text-right'>
						<XIcon width={14} height={14} className='inline mr-2 text-gray-500 rounded-full hover:text-red-500 hover:bg-gray-300' onClick={()=>removeAlert('Success')} />
					</div>
					<p className='text-green-600 text-sm font-mono'>Data updated successfully</p>
				</div>
			:
			<>
				{iderror
				?
					<div className='filter bg-yellow-200 text-center'>
						<div className='text-right'>
							<XIcon width={14} height={14} className='inline mr-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-300' onClick={()=>removeAlert('IdError')} />
						</div>
						<p className='text-yellow-700 text-sm font-mono'>Can't update an _id filed</p>
					</div>
				:
				<>
					{error
					?
						<div className='filter contrast-150 saturate-150 drop-shadow-md brightness-100 backdrop-filter backdrop-contrast-75 bg-red-300'>
							<div className='text-right'>
								<XIcon width={14} height={14} className='inline mr-2 text-gray-500 hover:text-red-800 rounded-full hover:bg-gray-300' onClick={()=>removeAlert('Error')} />
							</div>
							<p className='text-red-400 text-sm font-mono'>An error has occured while updating the document</p>
						</div>
					:
					<>
						{noupdate
						?
							<div className='filter bg-gray-300 text-center'>
								<div className='text-right'>
									<XIcon width={14} height={14} className='inline mr-2 text-gray-700 hover:text-red-500 rounded-full hover:bg-gray-500' onClick={()=>removeAlert('NoUpdate')} />
								</div>
								<p className='text-grya-700 text-sm font-mono'><span className='text-lg font-bold'>0</span> data updated</p>
							</div>
						:
						<>
							{invalid
							?
								<div className='filter bg-gray-200 text-center'>
									<div className='text-right'>
										<XIcon width={14} height={14} className='inline mr-2 text-gray-700 hover:text-red-500 rounded-full hover:bg-gray-500' onClick={()=>removeAlert('Invalid')} />
									</div>
									<p className='text-grya-700 text-sm font-mono'>Invaid syntax</p>
								</div>
							:
							null
							}
						</>
						}
					</>
					}
				</>
				}
			</>
			}
			<div className={`h-20 ${active && 'hidden'}`}>
				<div className='text-right'>
					<XIcon width={16} height={16} className='text-red-500 mr-1 inline hover:bg-gray-300 rounded-full' onClick={hideDiv} />
				</div>
				<div className='pl-4 pt-0.5 flex flex-row space-x-3 w-full'>
					<span className='select-none bg-gray-200 px-6 py-0.5 font-xl text-center text-gray-500 font-bold rounded-xl'>Update</span>
					<form onSubmit={updateDocument} className='bg-transparent w-full'>
						<input type='text' name='updateone' placeholder='{<selector> , <what to update>}' value={query} ref={queryRef} className='outline-none bg-transparent text-gray-500 focus:bg-transparent placeholder-opacity-75 bg-transparent w-4/5' onChange={handleQueryChange} />
						<input type='submit' value='Update' className={`float-right rounded p-0.5 cursor-pointer pl-2 pr-2 mr-10 text-center outline-none' ${btnactive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'}`} />
					</form>
				</div>
			</div>
			<hr />
		</>
	);
}

export default Updateone;