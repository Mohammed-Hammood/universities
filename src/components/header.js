import '../styles/header.scss';
import {Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PATHNAME } from '../redux/actions';

function Header() {
  const pathname = useSelector(state => state.pathname);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    // console.log('update', path.length, path)
  }, [pathname]);
  
  return (
    <div className="header-container">
       <header>
            <Link to="/cards" className={pathname.includes('cards')?'active':''} onClick={()=> dispatch(UPDATE_PATHNAME('/cards'))}>
               Cards
            </Link>
            <Link to="/receipts" className={pathname.includes('receipts')?'active':''} onClick={()=> dispatch(UPDATE_PATHNAME('/receipts'))} >
                Receipts
            </Link>
            <Link to="/transactions" className={pathname.includes('transactions')?'active':''} onClick={()=> dispatch(UPDATE_PATHNAME('/transactions'))} >
                Transactions
            </Link>
       </header>
    </div>
  );
}

export default Header;