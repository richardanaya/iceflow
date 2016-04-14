// iceflow.js
// repo    : https://github.com/richardanaya/iceflow
// license : MIT

(function (window, module, pubsub, Freezer) {
  "use strict";

  var IceFlow = function(data){
    var freezer = new Freezer(data);
    var eventbus = pubsub.create();
    freezer.on('update', function( newState ){
      eventbus.publish("state");
    });
    var f =  function(name){
      return eventbus(name);
    }
    f.dispatch = function(o){
      eventbus.publish(o.type,o);
    };
    f.setState = function(state){
      return freezer.set(state);
    };
    f.getState = function(){
      return freezer.get();
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
