import {useState} from 'react';

export const description =
'In `src/problem_4.js`, write code that allows the user to increment the click counter by clicking the "Clicked" `<button />`\
 element (or reset it to `0` by clicking the "Reset" `<button />`). Then, **use\
 [the `localStorage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to make the click count\
 persistent**. When the user reloads the page, it should remember the number of clicks.\n\n\
 - *Note 1: your code should handle plural rules correctly; it should be "Clicked 1 time" and\
 "Clicked 2 time**s**".*\n\
 - *Note 2: remember that `localStorage` can only store **strings**.*\
 ';

export function Problem () {

    let clickValInStore = localStorage.getItem('inStore');
        if (clickValInStore === null || clickValInStore === "null"){
            clickValInStore = 0;
        } else {
            clickValInStore = parseInt(clickValInStore);
        }
    
    const [numClicks, setNumClicks] = useState(clickValInStore);

    function updateClicks(){
        setNumClicks(numClicks+1);
        localStorage.setItem("inStore",numClicks+1);
    }
    
    function resetClicks(){
        setNumClicks(0);
        localStorage.setItem("inStore",0);
    }

    return <div className="btn-group">
            <button className="btn btn-primary" onClick={updateClicks} >Clicked {numClicks} time{numClicks!==1 && 's'}</button>
            <button className="btn btn-secondary" onClick={resetClicks}>Reset</button>
        </div>;
    ;
}