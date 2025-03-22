import Image from 'next/image';

const Navbar=()=>{
	return(
		<nav className='flex items-center w-full px-14 py-5 bg-white brightness-100 shadow'>
			<h3 className='text-green-700 text-[19px] font-semibold'>MongoDB Atlas</h3>
			<Image src='/mongodb logo.png' alt='No image found' width={40} height={40} />
		</nav>
	);
}
export default Navbar;