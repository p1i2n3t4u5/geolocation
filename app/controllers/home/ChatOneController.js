/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("ChatOneController", [
  "$log",
  "$scope",
  "$location",
  "$rootScope",
  "Flash",
  "UserService",
  "$state",
  "StorageService",
  "cfg",
  "$stomp",
  function (
    $log,
    $scope,
    $location,
    $rootScope,
    Flash,
    UserService,
    $state,
    StorageService,
    cfg,
    $stomp
  ) {
    var self = this;

    self.sendMessage = sendMessage;
    self.connect = connect;
    self.unsubscribe = unsubscribe;
    self.disconnect = disconnect;


    var REST_SERVICE_URI = cfg.url;
    var connectHeaders = "";
    var subscription;
    var stompClient = null;

    var messageInput;
    self.showUserNamePage = true;
    self.username = "";
    self.connectingMSG = true;
    self.lisOfPeople = [];
    self.msg1 = [];
    var connectingElement;

    self.msg = '';
    self.messages = [
      // {
      //   'user': 'Pintu',
      //   'message': 'A sample message',
      //   'time' : 'Jan 01, 2019 4:28PM',
      //   'isSender' : true
      // },
      // {
      //   'user': 'MIIM',
      //   'message': 'Different message',
      //   'time': 'Jan 01, 2019 5:28PM',
      //   'isSender': false
      // }
    ];


    var colors = [
      "#2196F3",
      "#32c787",
      "#00BCD4",
      "#ff5652",
      "#ffc107",
      "#ff85af",
      "#FF9800",
      "#39bbb0"
    ];


    $stomp.setDebug(function (args) {
      $log.debug(args);
    });


    function connect() {
      $stomp
        .connect(
          REST_SERVICE_URI + "/ws",
          connectHeaders
        )
        .then(
          onSuccess,
          onFailuer
        );
    }


    function onSuccess() {
      subscription = $stomp.subscribe(
        "/topic/public",
        onSubscription, {
          headers: "are awesome"
        }
      );

      // Tell your username to the server
      $stomp.send("/app/chat.addUser", {
        sender: self.username,
        type: 'JOIN'
      }, {
        headers: "are awesome"
      });
    }

    function onFailuer() {
      connectingElement.textContent =
        "Could not connect to WebSocket server. Please refresh this page to try again!";
      connectingElement.style.color = "red";
    }

    function onSubscription(payload, headers, res) {
      $scope.payload = payload;

      //callback method  starts
      var message = payload;

      var messageElement = document.createElement("li");

      if (message.type === "JOIN") {
        messageElement.classList.add("event-message");
        message.content = message.sender + " joined!";
      } else if (message.type === "LEAVE") {
        messageElement.classList.add("event-message");
        message.content = message.sender + " left!";
      } else {
        self.messages.push( {
              'user' : payload.sender,
              'message' : payload.content,
              'time' : Date.UTC.toString() ,
              'isSender': payload.sender == self.username ? true : false
              }
              
          );
          // self.msg1.push({
          //   'user' : payload.sender,
          //   'message' : payload.content,
          //   'time' : Date.UTC.toString() ,
          //   'isSender': payload.sender == self.username ? true : false
          //   });
          payload ='';
        
      }

      chatScreenData(payload);
      

      

      //callback method  ends
    }

    // For Second Screen ...
    function chatScreenData(data){
      if(data){
        self.showUserNamePage = false;
        self.connectingMSG = false;
        // username = data.sender;
        self.lisOfPeople.push(data.content);
        
      }
      $scope.$apply();
    }

    function unsubscribe() {
      // Unsubscribe
      subscription.unsubscribe();
    }

    function disconnect() {
      // Disconnect
      $stomp.disconnect().then(function () {
        $log.info("disconnected");
      });
    }

    // send function starts
    function sendMessage() {
      var chatMessage = {
        sender: self.username,
        content:  self.msg,
        type: "CHAT"
      };

      // Send message
      $stomp.send("/app/chat.sendMessage",
        chatMessage, {
          priority: 9,
          custom: 42 // Custom Headers
        }
      );
      self.msg = "";
    }
    // send function ends
    //////////////////////////////////////////////////////////
    function getAvatarColor(messageSender) {
      var hash = 0;
      for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
      }

      var index = Math.abs(hash % colors.length);
      return colors[index];
    }

    //////////////////////////////////////////////////////////
  }
]);