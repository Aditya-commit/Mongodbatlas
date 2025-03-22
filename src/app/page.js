'use client';

import { useState , useCallback, Suspense } from 'react';



import Navbar from './components/navbar';
import Main from './components/main';
import Sidebar from './components/sidebar';
import DatabaseList from './components/database_list';
import CollectionList from './components/collection_list';
import CenterContainer from './components/center_container';
import ModalContainer from './components/modal_container';
import ConnectionModal from './components/connection_ modal';




const Home=()=>{

  const [connected , setConnected]  = useState(false); // TELLS WHETHER THE DATABASE CONNECTION IS ESTABLISHED OR NOT

  const [selectedDb , setSelectedDb] = useState(null); // STORES WHICH DATABASE IS SELECTED
  const [selectedColl , setSelectedColl] = useState(null); // STORES WHICH COLLECTION IS STORED



  const [showConnModal , setShowConnModal] = useState(false);



  const toggleConnModal = useCallback(()=>setShowConnModal(!showConnModal),[showConnModal]);

  const updateConnection = status => setConnected(status);



  const selectDbFunc = dbName => (setSelectedDb(dbName) , setSelectedColl(null)); // RESET THE SELECTED COLLECTION WHEN SELECTED DATABASE IS CHANGED
  const selectColFunc = colName => setSelectedColl(colName);


  return(
    <>

      {showConnModal && (
        <ModalContainer>
          <ConnectionModal toggleConnModal={toggleConnModal} updateConnection={updateConnection} />
        </ModalContainer>
      )}

      <Navbar />
      <Main>
        <Sidebar>
          <DatabaseList connected={connected} selectedDb={selectedDb} selectDbFunc={selectDbFunc} />
          <CollectionList selectedDb={selectedDb} selectedColl={selectedColl} selectColFunc={selectColFunc} />
        </Sidebar>
        <Suspense>
          <CenterContainer toggleConnModal={toggleConnModal} db={selectedDb} col={selectedColl} />
        </Suspense>
      </Main>
    </>
	);
}
export default Home;