'use strict';

//simplified version of btford angular-socket-io
//does not forward/broadcast socket events into the rootscope

angular.module('chatMdul').
factory('socketFactory', ['$window', '$q', function ($window, $q) {

  return function socketFactory(){
    //get a reference to the io global on the window object
    var io = $window.io;

    var socketurl = 'http://localhost:9000/bigmouth';

    //create socket with connection to bigmouth namespace
    var socket = io.connect(socketurl);

    //addListener/on wrapper
    var addListener = function (eventName, callback) {
      socket.on(eventName, callback);
    };

    //addOnceListener/once wrapper
    var addOnceListener = function (eventName, callback) {
      socket.once(eventName, callback);
    };

    //emit wrapper
    var emit = function (eventName, data, callback) {
      console.log('emitting from socketio.service', arguments);
      return socket.emit.apply(socket, arguments);
    };

    //removeListener wrapper
    var removeListener = function (event, callback) {
      return socket.removeListener.apply(socket, event, callback);
    };

    //removeAllListeners wrapper
    var removeAllListeners = function() {
      return socket.removeAllListeners.apply(socket, arguments);
    };

    //disconnect wrapper
    var disconnect = function () {
      socket.removeAllListeners();
      socket.io.reconnection(false);
      return socket.disconnect(true);
    };

    //connect wrapper
    var connect = function() {
      return socket.connect(socketurl);
    };

    //wrapped socket
    var wrappedSocket = {
      on: addListener,
      addListener: addListener,
      once: addOnceListener,
      emit: emit,
      removeListener: removeListener,
      removeAllListeners: removeAllListeners,
      disconnect: disconnect,
      connect: connect
    };

    return wrappedSocket;

  };


    // // when forwarding events, prefix the event name
    // var defaultPrefix = 'socket:',
    // ioSocket;
    //
    // // forces an async callback? or promise related?
    // var asyncAngularify = function (socket, callback) {
    //   return callback ? function () {
    //     var args = arguments;
    //     $timeout(function () {
    //       callback.apply(socket, args);
    //     }, 0);
    //   } : angular.noop;
    // };
    //
    //
    // return function socketFactory (options) {
    //   options = options || {};
    //   var socket = options.ioSocket || io.connect();
    //
    //   var prefix = options.prefix === undefined ? defaultPrefix : options.prefix ;
    //   var defaultScope = options.scope || $rootScope;
    //
    //   var addListener = function (eventName, callback) {
    //     socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
    //   };
    //
    //   var addOnceListener = function (eventName, callback) {
    //     socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
    //   };
    //
    //   var wrappedSocket = {
    //     on: addListener,
    //     addListener: addListener,
    //     once: addOnceListener,
    //
    //     emit: function (eventName, data, callback) {
    //       var lastIndex = arguments.length - 1;
    //       var callback = arguments[lastIndex];
    //       if(typeof callback == 'function') {
    //         callback = asyncAngularify(socket, callback);
    //         arguments[lastIndex] = callback;
    //       }
    //       return socket.emit.apply(socket, arguments);
    //     },
    //
    //     removeListener: function (ev, fn) {
    //       if (fn && fn.__ng) {
    //         arguments[1] = fn.__ng;
    //       }
    //       return socket.removeListener.apply(socket, arguments);
    //     },
    //
    //     removeAllListeners: function() {
    //       return socket.removeAllListeners.apply(socket, arguments);
    //     },
    //
    //     disconnect: function (close) {
    //       return socket.disconnect(close);
    //     },
    //
    //     connect: function() {
    //       return socket.connect();
    //     },
    //
    //     // when socket.on('someEvent', fn (data) { ... }),
    //     // call scope.$broadcast('someEvent', data)
    //     forward: function (events, scope) {
    //       if (events instanceof Array === false) {
    //         events = [events];
    //       }
    //       if (!scope) {
    //         scope = defaultScope;
    //       }
    //       events.forEach(function (eventName) {
    //         var prefixedEvent = prefix + eventName;
    //         var forwardBroadcast = asyncAngularify(socket, function () {
    //           Array.prototype.unshift.call(arguments, prefixedEvent);
    //           scope.$broadcast.apply(scope, arguments);
    //         });
    //         scope.$on('$destroy', function () {
    //           socket.removeListener(eventName, forwardBroadcast);
    //         });
    //         socket.on(eventName, forwardBroadcast);
    //       });
    //     }
    //   };
    //
    //   return wrappedSocket;
    // };
}]);
