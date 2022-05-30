import {useSelector} from 'react-redux';
import SVG from './svg';
import '../styles/modals.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HIDE_MODAL, UPDATE_ERRORS  } from '../redux/actions';
import {  getFullDate, modalToggle} from './common';


export default function Modal() {
    const displayState = useSelector(state => state.modal.display);
    const typeState = useSelector(state => state.modal.type);
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards);
    const transactions = useSelector(state => state.transactions);
    const receipts = useSelector(state => state.receipts);
    const selectedIndex = useSelector(state => state.selected);
    const selectedCard = cards[selectedIndex];
    const selectedTransaction = transactions[selectedIndex];
    const selectedReceipt = receipts[selectedIndex];
    useEffect(()=> {
        if(displayState){
            modalToggle();
        }
        if(!displayState){
            modalToggle('hide');
        }
    }, [displayState, typeState ]);
    return (<div className='modal-page-container'>
           <div className='modal-container hidden' id='modal-container'> 
                <div className='content-container'>
                    <div className='modal-header-container'>
                        <div className='title'>{typeState}</div>
                        <div onClick={()=> {dispatch(HIDE_MODAL()); dispatch(UPDATE_ERRORS({state:false}))}}>
                            <span className='close'  title='Close'>&times;</span>
                        </div>
                    </div>
                    <div className='body-container'>
                        {(cards.length > 0 && displayState && typeState === 'Card')?<>
                            <div className='card' >
                                {selectedCard.number?<><div className='number'><span className='text'>Number</span> <span className='text-value'>{selectedCard.number}</span></div></>:null}
                                {selectedCard.status?<><div className='Status'><span className='text'>Status</span><span className='text-value'> {selectedCard.status}</span></div></>:null}
                                {selectedCard.holder?<><div className='holder'><span className='text'>Holder</span> <span className='text-value'>{selectedCard.holder}</span></div></>:null}
                                {selectedCard.phone?<><div className='phone'><span className='text'>Phone</span> <span className='text-value'>{selectedCard.phone}</span></div></>:null}
                                {selectedCard.email?<><div className='email'><span className='text'>Email</span> <span className='text-value'>{selectedCard.email}</span></div></>:null}
                                {selectedCard.birthdate?<><div className='birthday'><span className='text'>Birthdate</span> <span className='text-value'>{selectedCard.birthdate}</span></div></>:null}
                                {selectedCard.sales?<><div className='sales'><span className='text'>Sales</span> <span className='text-value'>{selectedCard.sales}</span></div></>:null}
                                {selectedCard.balance?<><div className='balance'><span className='text'>Balance</span> <span className='text-value'>{selectedCard.balance}</span></div></>:null}
                                {selectedCard.created_date?<><div className='created_date'><span className='text'>Created at</span><span className='text-value'> {getFullDate(selectedCard.created_date)}</span></div></>:null}                          
                                {selectedCard.type_uuid?<><div className='type_uuid'><span className='text'>Type uuid</span><span className='text-value'> {selectedCard.type_uuid}</span></div></>:null}
                                {selectedCard.uuid?<><div className='card_uuid'><span className='text'>Card uuid</span><span className='text-value'> {selectedCard.uuid}</span></div></>:null}
                                {selectedCard.account_id?<><div className='account_id'><span className='text'>Account id</span><span className='text-value'> {selectedCard.account_id}</span></div></>:null}
                                {selectedCard.created_user?<><div className='created_user'><span className='text'>Created User</span><span className='text-value'> {selectedCard.created_user}</span></div></>:null}
                            </div>
                        </>:null}
                        {(transactions.length > 0 && displayState && typeState === 'Transaction')?<>
                            <div className='transaction' >
                                {selectedTransaction.delta?<><div className='delta'><span className='text'>Delta</span> <span className='text-value'>{selectedTransaction.delta}</span></div></>:null}
                                {selectedTransaction.state?<><div className='state'><span className='text'>State</span><span className='text-value'> {selectedTransaction.state}</span></div></>:null}
                                {selectedTransaction.comment?<><div className='comment'><span className='text'>Comment</span><span className='text-value'> {selectedTransaction.comment}</span></div></>:null}
                                {selectedTransaction.period?<><div className='period'><span className='text'>Period</span> <span className='text-value'>{selectedTransaction.period}</span></div></>:null}
                                {selectedTransaction.period_active?<><div className='period_active'><span className='text'>Period active</span> <span className='text-value'>{selectedTransaction.period_active}</span></div></>:null}
                                {selectedTransaction.account_id?<><div className='account_id'><span className='text'>Account id</span><span className='text-value'> {selectedTransaction.account_id}</span></div></>:null}
                                {selectedTransaction.uuid?<><div className='uuid'><span className='text'>Transaction Uuid</span><span className='text-value'>{selectedTransaction.uuid}</span></div></>:null}
                                {selectedTransaction.card_uuid?<><div className='card_uuid'><span className='text'>Card uuid</span><span className='text-value'> {selectedTransaction.card_uuid}</span></div></>:null}
                                {selectedTransaction.user_uid?<><div className='user_uid'><span className='text'>User uid</span><span className='text-value'> {selectedTransaction.user_uid}</span></div></>:null}
                                {selectedTransaction.store_uuid?<><div className='store_uuid'><span className='text'>Store uuid</span><span className='text-value'> {selectedTransaction.store_uuid}</span></div></>:null}
                                {selectedTransaction.receipt_uuid?<><div className='receipt_uuid'><span className='text'>Receipt uuid</span><span className='text-value'> {selectedTransaction.receipt_uuid}</span></div></>:null}
                            </div>
                        </>:null}
                        {(receipts.length > 0 && displayState && typeState === 'Receipt')?<>
                            <div className='receipt' >
                                {selectedReceipt.number?<><div className='number'><span className='text'>Number</span> <span className='text-value'>{selectedReceipt.number}</span></div></>:null}
                                {selectedReceipt.bonus?<><div className='bonus'><span className='text'>Bonus</span> <span className='text-value'>{selectedReceipt.bonus}</span></div></>:null}
                                {selectedReceipt.payment?<><div className='payment'><span className='text'>Payment</span> <span className='text-value'>{selectedReceipt.payment}</span></div></>:null}
                                {selectedReceipt.type?<><div className='card_uuid'><span className='text'>Type</span> <span className='text-value'>{selectedReceipt.type}</span></div></>:null}
                                {selectedReceipt.period?<><div className='period'><span className='text'>Period</span> <span className='text-value'>{selectedReceipt.period}</span></div></>:null}
                                {selectedReceipt.total?<><div className='total'><span className='text'>Total</span> <span className='text-value'>{selectedReceipt.total}</span></div></>:null}
                                {selectedReceipt.totalWithDiscount?<><div className='totalWithDiscount'><span className='text'>Total with discount</span> <span className='text-value'>{selectedReceipt.totalWithDiscount}</span></div></>:null}
                                {selectedReceipt.uuid?<><div className='uuid'><span className='text'>Receipt uuid</span><span className='text-value'>{selectedReceipt.uuid}</span></div></>:null}
                                {selectedReceipt.card_uuid?<><div className='card_uuid'><span className='text'>Card uuid</span><span className='text-value'> {selectedReceipt.card_uuid}</span></div></>:null}
                                {selectedReceipt.store_uuid?<><div className='store_uuid'><span className='text'>Store uuid</span><span className='text-value'> {selectedReceipt.store_uuid}</span></div></>:null}
                                {selectedReceipt.account?<><div className='account_id'><span className='text'>Account id</span><span className='text-value'> {selectedReceipt.account_id}</span></div></>:null}
                                {selectedReceipt.user_uid?<><div className='user_uid'><span className='text'>User uid</span><span className='text-value'> {selectedReceipt.user_uid}</span></div></>:null}
                                {selectedReceipt.raw?<><div className='raw'><span className='text'>Raw</span> <span className='text-value'>{selectedReceipt.raw}</span></div></>:null}
                            </div>
                        </>:null}
                        {(errors.state && typeState === 'Error')?<div className='errors'>
                            <SVG name='triangle-exclamation' color='orange' />
                            {errors.message}
                        </div>:null}
                    </div>
            
                </div>
        </div>
    </div>)
}