import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_MODAL, UPDATE_PATHNAME, UPDATE_SELECTED } from '../redux/actions';
import '../styles/pages.scss';
import useFetch from './fetch-data';

export default function CardsPage() {
  let {loading} = useFetch({name:'card'});
  const cards = useSelector(state => state.cards);
  const pathname = useSelector(state => state.pathname);
  const dispatch = useDispatch();
  useEffect(()=> {
    //this will solve problem when Navigate redirects to CardsPage 
    if(pathname.length !== document.location.pathname.length){
        dispatch(UPDATE_PATHNAME(window.location.pathname))
      }
      
  }, [loading, cards, dispatch, pathname]);
const updateSelected = (index)=> {
    dispatch(UPDATE_SELECTED(index));
    dispatch(SHOW_MODAL('Card'));
}
  return (
    <div className="cards-page-container">  
        {(loading)?<div className='loader'><span></span></div>:null}
        <div className='container'>
          {(!loading && cards.length > 0)?<div className='cards-container'>
            {cards.map((item, index)=> {return (<div className='card' key={index}>
                {item.number?<><div className='number'><span className='text'>Number</span> <span className='text-value'>{item.number}</span></div></>:null}
                {item.holder?<><div className='holder'><span className='text'>Holder</span> <span className='text-value'>{item.holder}</span></div></>:null}
                {item.phone?<><div className='phone'><span className='text'>Phone</span> <span className='text-value'>{item.phone}</span></div></>:null}
                {item.status?<><div className='Status'><span className='text'>Status</span><span className='text-value'> {item.status}</span></div></>:null}
                {item.sales?<><div className='sales'><span className='text'>Sales</span><span className='text-value'> {item.sales}</span></div></>:null}
                {item.balance?<><div className='balance'><span className='text'>Balance</span><span className='text-value'> {item.balance}</span></div></>:null}
                <span onClick={()=> updateSelected(index)} className='detail'>More...</span> 
              </div>)
            })}
          </div>:null}
        </div>
    </div>
  );
}
