import Image from 'next/image';

const Navbar=()=>{
	return(
		<nav className='flex w-full px-14 py-5 flex-auto bg-white brightness-100 shadow'>
			<h3 className='text-green-700 text-[22px] font-semibold'>MongoDB Atlas</h3>
			<Image src='/mongodb logo.png' alt='No image found' width={38} height={38} />
		</nav>
	);
}
export default Navbar;