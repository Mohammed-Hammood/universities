import { SHOW_MODAL, UPDATE_SELECTED } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from './fetch-data';
import Filter from './filter';
import '../styles/pages.scss';

export default function TransactionsPage() {
 
  let {loading} = useFetch({name:'transaction'});
  const transactions = useSelector(state => state.transactions);
  const dispatch = useDispatch();
  const updateSelectedTransaction = (index)=> {
      dispatch(UPDATE_SELECTED(index));
      dispatch(SHOW_MODAL('Transaction'));
  }
  return (
    <div className="transactions-page-container">  
        {(loading)?<div className='loader'><span></span></div>:null}
        <div className='container'>
          <Filter name='Transactions' />
        </div>
        <div className='container'>
          {(!loading && transactions.length > 0)?<div className='transactions-container'>
            {transactions.map((item, index)=> {return (<div className='transaction' key={index}>
                {item.delta?<><div className='delta'><span className='text'>Delta</span> <span className='text-value'>{item.delta}</span></div></>:null}
                {item.state?<><div className='state'><span className='text'>State</span><span className='text-value'> {item.state}</span></div></>:null}
                {item.comment?<><div className='comment'><span className='text'>Comment</span><span className='text-value'> {item.comment}</span></div></>:null}
                {item.account_id?<><div className='account_id'><span className='text'>Account id</span><span className='text-value'>{item.account_id}</span></div></>:null}
                <span onClick={()=> updateSelectedTransaction(index)} className='detail'>More...</span>
              </div>)
            })}
          </div>:null}
        </div>
    </div>
  );
}
