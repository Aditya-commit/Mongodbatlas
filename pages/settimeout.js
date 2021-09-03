import { useState , useEffect } from 'react';

const Settimeout = () => {
	const [success , setSuccess] = useState(false);
	// const [active , setActive] = useState(true);

	const handleSuccess = () => {
		setSuccess(true);
	}

	useEffect(()=>{
		if(success){
			setTimeout(()=>{
				setSuccess(false);
			},3000);
		}
	},[success])

	return(
		<>
			{success
			?
				<div className='filter contrast-150 saturate-150 drop-shadow-md brightness-100 backdrop-filter backdrop-contrast-75 bg-red-300'>
					<p className='text-red-400 text-sm'>This will hide after 5 seconds</p>
				</div>
			:
			null
			}
			<div>
				<div>
					<h3>These all are another thing</h3>
					<button onClick={handleSuccess} className='p-1 bg-blue-300'>Ok</button>
				</div>
			</div>
		</>
	);
}
export default Settimeout;