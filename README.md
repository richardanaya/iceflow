# IceFlow

IceFlow is a predictable state container for JavaScript. This library is great if you:

* Like a singular global state
* Like your data immutable
* Like dataflow architecture

This application is heavily inspired from Redux, RxJS and Freezer.js and features the best of these libraries:

* State exists in a single global store
* All state received from the store is immutable
* Requests to change the immutable state can be made at any point
* Action-listeners are observables with all the power of RxJS data flow operations (map,reduce,filter,etc.)
* History can easily be implemented by storing past immutable states
* Action-listener subscriptions are disposable allowing dynamic behavior

# Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import IceFlow from 'iceflow';

var store = IceFlow({
  count:0
})

store("increment").subscribe(({state})=>{
  state.set("count",state.count+1);
})

store("decrement").subscribe(({state})=>{
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
