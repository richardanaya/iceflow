# IceFlow

IceFlow is a global data store inspired from Redux, RxJS and Freezer.js.

# Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
var IceFlow = require("iceflow");

var store = IceFlow({
  count:0
});

store("increment")
.subscribe((action)=>{
  action.state.set("count",action.state.count+1);
});

store("decrement")
.subscribe((action)=>{
  action.state.set("count",action.state.count-1);
});

function HelloWorld (props) {
  return (
    <div>
      <h1>Counter</h1>
      {props.state.count}
      <button onClick={()=>store.action("increment")}>+</button>
      <button onClick={()=>store.action("decrement")}>-</button>
    </div>
  );
}

var render = function(state){
  ReactDOM.render(<HelloWorld state={state}/>, document.querySelector('#app'));
}

store("state").subscribe(function(state){
  render(state)
})
render(store.getState())
```

# Install

`npm install iceflow`
