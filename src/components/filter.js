import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  UPDATE_TRANSACTIONS, UPDATE_CARD, UPDATE_FROM, UPDATE_TO, UPDATE_FLAG, UPDATE_RECEIPTS } from '../redux/actions';
import '../styles/filter.scss';
import SVG from './svg';

export default function Filter(props){
    const [selectedClass, setSelectedClass] = useState('hidden');
    const cards  = useSelector(state => state.cards);
    const cardGlobally  = useSelector(state => state.card);
    const [cardLocally, setCardLocally] = useState(cardGlobally);
    const fromGlobally = useSelector(state => state.from);
    const toGlobally = useSelector(state => state.to);
    const [fromLocally, setFromLocally] = useState(fromGlobally)
    const [toLocally, setToLocally] = useState(toGlobally);

    const receipts = useSelector(state => state.receipts);
    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();
 
    const handleTransactions = ()=> {
            dispatch(UPDATE_FROM(fromLocally));
            dispatch(UPDATE_TO(toLocally));
            dispatch(UPDATE_CARD(cardLocally));
            dispatch(UPDATE_FLAG());
        }
    const resetFilter = ()=> {
            dispatch(UPDATE_TRANSACTIONS([]));
            dispatch(UPDATE_RECEIPTS([]));
            dispatch(UPDATE_FROM('0'));
            dispatch(UPDATE_TO('10000000000'));
            setToLocally('10000000000');
            setFromLocally('0');
            dispatch(UPDATE_CARD({}));
            setCardLocally({});
            setSelectedClass("hidden");
    }
    return (<div className='filter-container'>
                <label htmlFor='from-input' title='Start of selection period'>
                    <span>From</span>
                    <input type='number' className='input'  id='from-input' value={fromLocally} onInput={(event)=> setFromLocally(event.target.value)} />
                </label>
                <label htmlFor='to-input' title='End of selection period'>
                    <span>To</span>
                    <input type='number' className='input' id='to-input' value={toLocally} onInput={(event)=> setToLocally(event.target.value)} />
                </label>
                <div className='cards-selecter-container' title='Select a card or leave it blank to show all'>
                <div className='selected-card' onClick={()=> {selectedClass==='hidden'?setSelectedClass("show-f"):setSelectedClass('hidden')}}>
                        {cardLocally.uuid?<div className='card'>
                            {cardLocally.uuid?<><div className='type_uuid'><span className='text'>Uuid</span><span className='text-value'> {cardLocally.uuid}</span></div></>:null}
                            {cardLocally.status?<><div className='Status'><span className='text'>Status</span><span className='text-value'> {cardLocally.status}</span></div></>:null}
                        </div>:<span >Select a card or leave it blank to show all</span>}
                </div>
                <div className={`cards-list ${selectedClass}`}>
                    <div className={`card-shadow ${selectedClass}`} onClick={()=> setSelectedClass('hidden')}></div>
                    {(cards.length > 0)?cards.map((item, index)=> {return (
                            <div className={cardLocally.uuid===item.uuid?'card active':'card'} key={index} onClick={()=> {setCardLocally(item);setSelectedClass('hidden')}}>
                                {item.uuid?<><div className='type_uuid'><span className='text'>Uuid</span><span className='text-value'> {item.uuid}</span></div></>:null}
                                {item.status?<><div className='Status'><span className='text'>Status</span><span className='text-value'> {item.status}</span></div></>:null}
                                {item.holder?<><div className='holder'><span className='text'>Holder</span> <span className='text-value'>{item.holder}</span></div></>:null}
                        </div>)}):null}
                </div>
                </div>
                <div className='buttons-container'>
                <button type='button' onClick={()=> handleTransactions()}>
                    <SVG name='filter' color='white' />
                    <span>Filter</span>
                </button>
                <button type='button' onClick={()=> resetFilter()}>
                    <SVG name='xmark' color='white' />
                    <span>Reset</span>
                </button>
                </div>
                <div className='results'>
                        {props.name === 'Transactions'
                        ?<span><strong>Transactions</strong> {transactions.length}</span>
                        :<span><strong>Receipts</strong> {receipts.length}</span>}
                </div>
            </div>)
}