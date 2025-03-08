'use client';

import { useState , useCallback } from 'react';



import Navbar from './components/navbar';
import Main from './components/main';
import Sidebar from './components/sidebar';
import DatabaseList from './components/database_list';
import CollectionList from './components/collection_list';
import CenterContainer from './components/center_container';
import ModalContainer from './components/modal_container';
import ConnectionModal from './components/connection_ modal';




const Home=()=>{

  const [connected , setConnected]  = useState(null); // TELLS WHETHER THE DATABASE CONNECTION IS ESTABLISHED OR NOT

  const [selectedDb , setSelectedDbb] = useState(null); // STORES WHICH DATABASE IS SELECTED
  const [selectedColl , setSelectedColl] = useState(null); // STORES WHICH COLLECTION IS STORED



  const [showConnModal , setShowConnModal] = useState(true);



  const toggleConnModal = useCallback(()=>setShowConnModal(!showConnModal),[showConnModal]);



  return(
    <>

      {showConnModal && (
        <ModalContainer>
          <ConnectionModal toggleConnModal={toggleConnModal} />
        </ModalContainer>
      )}

      <Navbar />
      <Main>
        <Sidebar>
          <DatabaseList connected={connected} />
          <CollectionList />
        </Sidebar>
        <CenterContainer toggleConnModal={toggleConnModal} />
      </Main>
    </>
	);
}
export default Home;