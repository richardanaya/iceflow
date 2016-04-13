# IceFlow

IceFlow is a predictable state container for JavaScript inspired from Redux, RxJS and Freezer.js.

# Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import IceFlow from 'iceflow';

var store = IceFlow({
  count:0
})

store("increment")
.subscribe(({state})=>{
  state.set("count",state.count+1);
})

store("decrement")
.subscribe(({state})=>{
  state.set("count",state.count-1);
})

function HelloWorld (props) {
  return (
    <div>
      <h1>Counter</h1>
      {props.state.count}
      <button onClick={()=>store.dispatch({type:"increment")})}>+</button>
      <button onClick={()=>store.dispatch({type:"decrement")})}>-</button>
    </div>
  );
}

function render(state){
  ReactDOM.render(<HelloWorld state={state}/>, document.querySelector('#app'));
}

store("state").subscribe(function(state){
  render(state)
})

render(store.getState())
```

# Install

`npm install iceflow`
