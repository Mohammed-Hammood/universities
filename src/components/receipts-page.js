import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_MODAL, UPDATE_SELECTED } from '../redux/actions';
import '../styles/pages.scss';
import useFetch from './fetch-data';
import Filter from './filter';


export default function ReceiptsPage() {
  let {loading} = useFetch({name:'receipt'});

  const receipts = useSelector(state => state.receipts);
  const dispatch = useDispatch();

  useEffect(()=> {

  }, [loading, receipts]);
  const updateSelectedReceipt = (index=null)=> {
    dispatch(UPDATE_SELECTED(index));
    dispatch(SHOW_MODAL('Receipt'));
  }
  return (
    <div className="receipts-page-container">  
        {(loading)?<div className='loader'><span></span></div>:null}
        <div className='container'>
          <Filter name='Receipts' />
        </div>
        <div className='container'>
          {(!loading && receipts.length > 0)?<div className='receipts-container'>
            {receipts.map((item, index)=> {return (<div className='receipt' key={index}>
            {item.number?<><div className='number'><span className='text'>Number</span> <span className='text-value'>{item.number}</span></div></>:null}
            {item.bonus?<><div className='bonus'><span className='text'>Bonus</span><span className='text-value'>{item.bonus}</span></div></>:null}
            {item.payment?<><div className='payment'><span className='text'>Payment</span><span className='text-value'> {item.payment}</span></div></>:null}
            {item.type?<><div className='card_uuid'><span className='text'>Type</span> <span className='text-value'>{item.type}</span></div></>:null}
            {item.total?<><div className='total'><span className='text'>Total</span> <span className='text-value'>{item.total}</span></div></>:null}
            {item.totalWithDiscount?<><div className='totalWithDiscount'><span className='text'>Total with discount</span> <span className='text-value'>{item.totalWithDiscount}</span></div></>:null}
              <span onClick={()=> updateSelectedReceipt(index)} className='detail'>More...</span>
              </div>)
            })}
          </div>:null}
        </div>
    </div>
  );
}
