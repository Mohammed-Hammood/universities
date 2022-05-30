import {  UPDATE_TRANSACTIONS, UPDATE_CARD, UPDATE_START_PERIOD, UPDATE_END_PERIOD, UPDATE_RECEIPTS } from '../redux/actions';
import { setLocalStorage, getLocalStorage } from './common';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import '../styles/filter.scss';
import SVG from './svg';

export default function Filter(props){
    const [selectedClass, setSelectedClass] = useState('hidden');
    const cards  = useSelector(state => state.cards);
    const cardGlobally  = useSelector(state => state.card);
    const [cardLocally, setCardLocally] = useState(cardGlobally);
    const startPeriodGlobally = useSelector(state => state.startPeriod);
    const endPeriodGlobally = useSelector(state => state.endPeriod);
    const [startPeriodLocally, setStartPeriodLocally] = useState(getLocalStorage({key:'start'})?getLocalStorage({key:'start'}):startPeriodGlobally)
    const [endPeriodLocally, setEndPeriodLocally] = useState(getLocalStorage({key:'end'})?getLocalStorage({key:'end'}):endPeriodGlobally);

    const receipts = useSelector(state => state.receipts);
    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();
 
    const convertToUnixTimestamp = (value)=> {
        const date = new Date(value);
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        return unixTimestamp;
    }
    const handleTransactions = ()=> {
        const startPeriodUnixTimestamp = convertToUnixTimestamp(startPeriodLocally);
        const endPeriodUnixTimestamp = convertToUnixTimestamp(endPeriodLocally);
        dispatch(UPDATE_START_PERIOD(startPeriodUnixTimestamp));
        dispatch(UPDATE_END_PERIOD(endPeriodUnixTimestamp));
        dispatch(UPDATE_CARD(cardLocally));
        }
    const resetFilter = ()=> {
            dispatch(UPDATE_TRANSACTIONS([]));
            dispatch(UPDATE_RECEIPTS([]));
            dispatch(UPDATE_START_PERIOD(''));
            dispatch(UPDATE_END_PERIOD(''));
            setEndPeriodLocally('');
            setStartPeriodLocally('');
            dispatch(UPDATE_CARD({}));
            setCardLocally({});
            setSelectedClass("hidden");
            setLocalStorage({key:'reset', value:null})
    }
    const updatePeriodValues = (event)=> {
        //it will validate the input values, it will update state only when input values are valid
        const elementId = event.target.id;
        const value = event.target.value;
        const unixTimestamp = convertToUnixTimestamp(value);
        const todayUnixTimestamp = convertToUnixTimestamp(new Date());
        if(elementId.includes('to-input')){
            if(unixTimestamp <= todayUnixTimestamp){
                    setEndPeriodLocally(value);
                    setLocalStorage({key:'to', value:value});
                }
                if(convertToUnixTimestamp(startPeriodLocally) > unixTimestamp){
                    setLocalStorage({key:'to', value:value});
                    setLocalStorage({key:'from', value:value});
                    setStartPeriodLocally(value)
                }
            }else if(elementId.includes('from-input')) {
                if(unixTimestamp <= convertToUnixTimestamp(endPeriodLocally) && unixTimestamp <= todayUnixTimestamp){
                    setLocalStorage({key:'from', value:value});
                    setStartPeriodLocally(value);
                }else if(startPeriodLocally.length === 0 && endPeriodLocally.length === 0 && unixTimestamp <= todayUnixTimestamp){
                    setLocalStorage({key:'from', value:value});
                    setStartPeriodLocally(value);
                }else if(endPeriodLocally.length === 0 && unixTimestamp <= todayUnixTimestamp){
                    setLocalStorage({key:'from', value:value});
                    setStartPeriodLocally(value);
                }
        }
    }
    return (<div className='filter-container'>
                <label htmlFor='from-input' title='Start of selection period'>
                    <span>From</span>
                    <input type='date' className='input'  id='from-input' value={startPeriodLocally} onInput={(event)=> updatePeriodValues(event)} />
                </label>
                <label htmlFor='to-input' title='End of selection period'>
                    <span>To</span>
                    <input type='date' className='input' id='to-input' value={endPeriodLocally} onInput={(event)=> updatePeriodValues(event)} />
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