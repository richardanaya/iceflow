// iceflow.js
// repo    : https://github.com/richardanaya/iceflow
// license : MIT

(function (window, module, pubsub, Freezer) {
  "use strict";

  var IceFlow = function(data){
    var freezer = new Freezer(data);
    var state = freezer.get();
    var eventbus = pubsub.create();
    freezer.on('update', function( newState ){
      state = newState;
      eventbus.publish("state",state);
    });
    var f =  function(name,stateTransformer){
      if(stateTransformer==undefined){
        return eventbus(name);
      }
      else {
        return eventbus(name).map((action)=>{
          action.state = stateTransformer(action);
          return action;
        });
      }
    }
    f.action = function(type,params){
      eventbus.publish(type,{state:state,params:params})
    };
    f.getState = function(){
      return state;
    };
    return f;
  }

  window.IceFlow = module.exports = IceFlow
})(
  typeof window !== "undefined" ? window : {},
  typeof module !== "undefined" ? module : {},
  typeof require !== "undefined" ? require("rxjs-pubsub") : pubsub,
  typeof require !== "undefined" ? require("freezer-js") : Freezer
);
