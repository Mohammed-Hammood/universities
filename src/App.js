import { updateMode, handleScrollAction } from './components/common';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import CardsPage from './components/cards-page';
import Modal from './components/modals';
import ReceiptsPage from './components/receipts-page';
import TransactionsPage from './components/transations-page';
import SVG from './components/svg';
import './styles/main.scss';


function App() {
  return (
    <div className="App">
       <Header />
       <Routes>
         <Route path='/' element={<Navigate to='/cards' />} />
         <Route path='/cards' element={<CardsPage />} />
         <Route path='/receipts' element={<ReceiptsPage />} />
         <Route path='/transactions' element={<TransactionsPage />} />
       </Routes>
       <Modal />
       <div className='scroller-container hidden' id="scroller-container" onClick={()=>handleScrollAction()} >
        <SVG name='angle-up' color='black' />
      </div>
      <div onClick={()=>updateMode()} className='darkMode-container' title='Toggle between light/dark mode'><span className='dark'></span></div>
    </div>
  );
}

export default App;
