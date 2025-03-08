import Sidebar from './sidebar';


const Main=({children})=>{

	return(
		<div className = 'grid grid-cols-[max-content_1fr] mt-4'>
            {children}
		</div>
	);
}
export default Main;