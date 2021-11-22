
import {useState} from 'react';

export const description =
'The `Problem` component in `src/problem_2.js` accepts a list of attributes (`props`).\
 It expects three properties:\n\
 \
- `initial` represents the starting value\n\
- `min` represents the lowest value\n\
- `max` represents the highest value\n\
 \n\
 Write code that allows users to increment the value by clicking the "+" button or\
 decrement the value by clicking the "-" button. Although `src/index.js` passes in\
 `1` for `props.initial`, `0` for `props.min`, and `10` for `props.max`, your code\
 should work for any value of `initial`, `min`, and `max`. You can assume that\
 `props.min <= props.initial <= props.max`.\
 ';
export function Problem (props) {
    console.log('problem 2 initial:', props.initial);
    console.log('problem 2 min:', props.min);
    console.log('problem 2 max:', props.max);

    const [value,setValue] = useState(props.initial);
    function increament(){
        const valToDisp = value + 1;
        if(valToDisp<=props.max){
            setValue(valToDisp);
        }
    }

    function decrement(){
        const valToDisp = value - 1;
        if(valToDisp>=props.min){
            setValue(valToDisp);
        }
    }

    return <div className="btn-group">
            <button type="button" className="btn btn-primary" onClick={decrement}>-</button>
            <span id="num_sel">{value}</span>
            <button type="button" className="btn btn-primary" onClick={increament}>+</button>
        </div>;
}