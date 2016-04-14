# IceFlow

IceFlow is a predictable state container for JavaScript. This library is great if you:

* Like a singular global state
* Like your data immutable
* Like dataflow architecture
* Like simple asynchronous data operation

This application is heavily inspired from Redux, RxJS and Freezer.js and features the best of these libraries:

* State exists in a single global store
* All state received from the store is immutable
* Requests to change the store state can be made at any part of immutable state
* Action-listeners are observables with all the power of RxJS data flow operations (map,reduce,filter,etc.)
* History can easily be implemented by storing past immutable states and actions
* Action-listener subscriptions are disposable allowing dynamic behavior

# Counter Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import IceFlow from 'iceflow';

//Model
var store = IceFlow({
  count:0
})

//View
function HelloWorld (props) {
  return (
    <div>
      <h1>Counter</h1>
      {props.state.count}
      <button onClick={()=>store.dispatch({type:"increment"})}>+</button>
      <button onClick={()=>store.dispatch({type:"decrement"})}>-</button>
    </div>
  );
}

function render(){
  var state = store.getState();
  ReactDOM.render(<HelloWorld state={state}/>, document.body);
}

render()
store("state").subscribe(render)

//Update
store("increment").subscribe(()=>{
  var state = store.getState();
  state.set("count",state.count+1);
})

store("decrement").subscribe(()=>{
  var state = store.getState();
  state.set("count",state.count-1);
})
```

# Install

`npm install iceflow`
