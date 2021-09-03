import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header';
import Main from '../components/main';
import ReactDOM from 'react-dom';
import React , { useState , useCallback } from 'react';

export const Style_Context = React.createContext();

const Home=()=>{

	const [insert_style , set_insertStyle] = useState(false);
	const [no , setNo] = useState(0)

	const styleChanger=(msg)=>{
		if(msg=='yes'){
			set_insertStyle(true)
		}
		else{
			set_insertStyle(false);
		}
	}

    return(
    	<div className='h-screen'>
			<Head>
				<title>MongoDB Atlas</title>
			</Head>
			<div id='inserts' className={`${insert_style ? 'fixed w-full z-10 h-full' : 'hidden'}`}></div>
			<div id='app' className={`absolute w-full h-full ${insert_style ? 'brightness-75' : '' }`}>
				<Header />
				<Style_Context.Provider value={{'style_changer':styleChanger}}>
					<Main />
				</Style_Context.Provider>
			</div>
		</div>
	);
}
export default Home;