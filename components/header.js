import Image from 'next/image';

const Header=()=>{
	return(
		<nav className='flex w-full p-4 py-3 flex-auto bg-green-500 brightness-100 shadow-xl'>
			<h3 className='pt-1 pr-3 text-gray-900 text-xl font-semibold'>MongoDB Atlas</h3>
			<Image src='/mongodb logo.png' alt='No image found' width={38} height={38} />
		</nav>
	);
}
export default Header;