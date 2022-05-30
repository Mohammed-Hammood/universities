export const modalToggle = (action=null)=> {
    const modal = document.getElementById("modal-container");
    if(modal.className.includes('show-f')){
        modal.classList.remove('show-f');
        modal.classList.add('hidden');
    }else{modal.classList.add('show-f');
        modal.classList.remove('hidden');
    }
    if(action === 'hide'){
        modal.classList.remove('show-f');
        modal.classList.add('hidden');
    }
}
export const handleScrollAction = (firstLoad=null)=> {
    if(firstLoad){
        const scroller = document.querySelector("#scroller-container");
        if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
            scroller.classList.add("show-f");
            scroller.classList.remove("hidden");
        }else{
            scroller.classList.add("hidden");
            scroller.classList.remove("show-f");
        }

    }else{
        if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
            document.body.scrollTop = 0; //for safari
            document.documentElement.scrollTop = 0; //for IE, Firefox, chrome, Opera, 
        }
    }
}
export const updateMode = (action=null)=>{
    const container = document.querySelector(".darkMode-container");
    const button = container.querySelector("span");
    const body = document.querySelector("body");
    if(body.className === 'light'){           
      body.classList.add("dark");
      body.classList.remove("light");
      button.classList.remove("dark");
      button.classList.add("light");
      localStorage.setItem("darkMode", "dark");

  }else {
      body.classList.add("light");
      body.classList.remove("dark");
      button.classList.remove("light");
      button.classList.add("dark");
      localStorage.setItem("darkMode", "light");
  }
  if(action){
    body.classList.remove("light" && "dark");
    body.classList.add(action);
    button.classList.remove("light" && "dark");
    button.classList.add((action==='light')?"dark":"light");
    localStorage.setItem("darkMode", action);
  }
}
window.onload = ()=> {
    handleScrollAction(true);
    if(localStorage.getItem('darkMode')!== null && ['light', 'dark'].includes(localStorage.getItem('darkMode'))){
        updateMode(localStorage.getItem('darkMode'));
    }
}
export const getFullDate = ({timestamp, type='created_at'}) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemberry'];
    // const date = (type='created_at')?new Date(parseInt(timestamp * 1000)):new Date() - new Date(parseInt(timestamp * 1000));
    const date = new Date(parseInt(timestamp * 1000));
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const DISPLAY = (item)=> {return ((item < 10)?("0" + item.toString()): item.toString());  }
    return  months[month] + ' '+  DISPLAY(day).toString() + ', ' + year.toString() + ' at '+ DISPLAY(hours) + ':' + DISPLAY(minutes);
}
const endPeriodName = 'periods-to-value-lms';
const startPeriodName = 'periods-from-value-lms';

export const setLocalStorage = ({key, value})=> {
    
    if(key==='to')localStorage.setItem(endPeriodName, value);
    else if(key === 'from'){
        localStorage.setItem(startPeriodName, value);
    }else if(key === 'reset'){
        localStorage.removeItem(startPeriodName);
        localStorage.removeItem(endPeriodName);
    }
}
export const getLocalStorage = ({key})=> {
    if(key==='start'){
        if(localStorage.getItem(startPeriodName)){
            const startPeriod = localStorage.getItem(startPeriodName);
            return startPeriod;
        }
        return false;
    }
    else if(key==='end'){
        if(localStorage.getItem(startPeriodName)){
            const endPeriod = localStorage.getItem(endPeriodName);
            return endPeriod;
        }
        return false;
    }
}
window.addEventListener('scroll', ()=> handleScrollAction(true))