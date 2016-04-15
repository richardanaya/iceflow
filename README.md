# IceFlow

IceFlow is a predictable state container for JavaScript. This library is great if you:

* Like a singular global state
* Like your data immutable
* Like data flow architecture
* Like simple asynchronous data manipulation

This application is heavily inspired from Redux, RxJS and Freezer.js and features the best of these libraries:

* State exists in a single global store
* All state received from the store is immutable
* Requests to change the store state can be made at any part of immutable state
* Action-listeners are observables with all the power of RxJS data flow operations (map,reduce,filter,etc.)
* History can easily be implemented by storing past immutable states and actions
* Action-listener subscriptions are disposable allowing dynamic behavior

# Counter Example

Let's create a simple application that will increase and decrease a counter, send the new value off to a server, and while its sending to server shows a spinner box.

First lets gather some libraries

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import IceFlow from 'iceflow';
```

Now we first need to consider the state of our app.  We'll need a property for the count, and we can imagine some sort of flag for when it's saving. We define the initial state when we create an IceFlow store.:

```jsx
var store = IceFlow({
  count:0,
  isSaving: false
})
```

This state is what is going to be given to our view to render appropriately, let's create something really simple:

```jsx
function HelloWorld (props) {
  var spinner = props.state.isSaving?(<img src="spinner.png"></img>):null;
  return (
    <div>
      <h1>Counter {spinner}</h1>
      {props.state.count}
      <button>+</button>
      <button>-</button>
    </div>
  );
}

function render(){
  var state = store.getState();
  ReactDOM.render(<HelloWorld state={state}/>, document.body);
}

render()
```

This code above is enough to render buttons, the current count, and a spinner if it's saving to a server. But how do we make this interactable? The first thing we need to do is hookup a hander for when we have new state:

```
store("state").subscribe(render)
```

The next is we need to be able to dispatch actions when our buttons are clicked:

```jsx
function HelloWorld (props) {
  var spinner = props.state.isSaving?(<img src="spinner.png"></img>):null;
  return (
    <div>
      <h1>Counter {spinner}</h1>
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
```

But how do we listen to these actions at all?

```jsx
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

Using "set" notifies the store to update it's state with a new immutable value that includes the change in property.

Cool, now let's add our server functionality. We'll pretend we have a function that saves to a server and returns a promise to notify completion:

```jsx
function saveCount(count){
  fetch('/count', {
    method: 'POST',
    body: count
  })
}
saveCount(2).then(function(){
  //saveing to server complete
})
```

Let's modify our action handlers

```jsx
//Update
store("increment").subscribe(()=>{
  var state = store.getState();
  state.set("count",state.count+1);
  state.set("isSaving",true);
  saveCount(state.count).then(function(){
    var state = store.getState();
    state.set("isSaving",false);
  })
})

store("decrement").subscribe(()=>{
  var state = store.getState();
  state.set("count",state.count-1);
  state.set("isSaving",true);
  saveCount(state.count).then(function(){
    var state = store.getState();
    state.set("isSaving",false);
  })
})
```

Store state changes are easily notified now asynchronously.

# Install

`npm install iceflow`
