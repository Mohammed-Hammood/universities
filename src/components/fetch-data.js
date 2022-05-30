import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_MODAL, UPDATE_CARDS, UPDATE_ERRORS, UPDATE_RECEIPTS, UPDATE_TRANSACTIONS } from '../redux/actions';

const axios = require('axios');

export default function useFetch(props) {
    const fromState  = useSelector(state => state.from);
    const toState = useSelector(state => state.to); 
    const card = useSelector(state => state.card);
    const flag = useSelector(state => state.flag);
    const cards = useSelector(state => state.cards);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(()=> {
        const fetchData =()=> {
            const accessKey = '435b7c13-ecaf-4265-83c8-186cca3242cc';
            const config = { method:'GET', headers: {'Authorization': accessKey}};
            let url = `https://bonus-test.evoapp.ru/api/3rdparty/${props.name}`;
            
            if(props.name === 'transaction' || props.name === 'receipt'){
                const to = toState?'&to=' + toState:'';
                const from = fromState?'from=' + fromState:'';
                const card_uuid = card.uuid?`&card_uuid=${card.uuid}`:'';
                const questionMark = (to || from || card_uuid)?'?':'';
                url = `https://bonus-test.evoapp.ru/api/3rdparty/${props.name}${questionMark}${from}${to}${card_uuid}`;
            }
            
            axios(url, config)
            .then(res => {
                setLoading(false);
                if(props.name === 'card' && res.status === 200){
                    dispatch(UPDATE_CARDS(res.data));
                }else if(props.name === 'receipt' && res.status === 200){
                    dispatch(UPDATE_RECEIPTS(res.data));
                }else if(props.name === 'transaction' && res.status === 200){
                    dispatch(UPDATE_TRANSACTIONS(res.data));
                }
                if(cards.length === 0){
                    axios("https://bonus-test.evoapp.ru/api/3rdparty/card", config)
                    .then(res => {dispatch(UPDATE_CARDS(res.data))});
                }
            })
            .catch(err => {
                setLoading(false);
                dispatch(SHOW_MODAL('Error'));
                dispatch(UPDATE_ERRORS({
                    code:err.code,
                    name:err.name,
                    message:err.message,
                    state:true
                }));
            });
        
        }
            
        if(props.name === 'card'){
            if(cards.length > 0){ setLoading(false);}
            else{ fetchData(); setLoading(true);}
        }else if(props.name === 'transaction'){
            setLoading(true);
            fetchData(true);
        }else if(props.name === 'receipt'){
            setLoading(true);
            fetchData(true);
        }
    }, [flag, props.name, cards, fromState, toState, dispatch, card]);
    
  return { loading }
}