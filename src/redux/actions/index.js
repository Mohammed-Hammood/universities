export const SHOW_MODAL = (type='Card')=> {
    return {
        type: 'modal/show',
        payload:type
    }
}
export const HIDE_MODAL = ()=> {
    return {
        type: 'modal/hide'
    }
}
export const UPDATE_CARDS = (data=null)=> {
    return {
        type: 'cards/update',
        payload: data
    }
}
export const UPDATE_SELECTED = (selectedId=null) =>{
    return {
        type:'selected/update',
        payload: selectedId
    }
}

export const UPDATE_RECEIPTS = (receipts=null)=> {
    return {
        type: 'receipts/update',
        payload: receipts
    }
}

export const UPDATE_TRANSACTIONS = (transactions=null)=> {
    return {
        type: 'transactions/update',
        payload: transactions
    }
}
export const UPDATE_ERRORS = (errors=null)=> {
    return {
        type:'errors/update',
        payload:errors
    }
}

export const UPDATE_CARD = (data=null)=> {
    return {
        type:'card/update',
        payload:data
    }
}
export const UPDATE_START_PERIOD = (startPeriod=null)=> {
    return {
        type:'startPeriod/update',
        payload:startPeriod
    }
}
export const UPDATE_END_PERIOD= (endPeriod=null)=> {
    return {
        type:'endPeriod/update',
        payload:endPeriod
    }
}

export const UPDATE_PATHNAME = (pathname=null)=> {
    return {
        type:'pathname/update',
        payload:pathname
    }
}