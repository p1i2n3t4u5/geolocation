/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("ChatTwoController", [
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

    self.getUserData = getUserData;
    var REST_SERVICE_URI = cfg.url;
    var connectHeaders = "";
    var subscription;
    var stompClient = null;
    var username = null;
    var messageInput;

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

    function getUserData() {
      console.log(StorageService.get("USER.ID"));
      console.log(StorageService.get("USER.FIRSTNAME"));
    }

    $stomp.setDebug(function (args) {
      $log.debug(args);
    });

    $stomp
      .connect(
        REST_SERVICE_URI + "/ws",
        connectHeaders
      )

      // frame = CONNECTED headers
      .then(
        function (frame) {
          subscription = $stomp.subscribe(
            REST_SERVICE_URI + "/topic/public",
            function (payload, headers, res) {
              $scope.payload = payload;

              //callback method  starts
              var message = JSON.parse(payload.body);

              var messageElement = document.createElement("li");

              if (message.type === "JOIN") {
                messageElement.classList.add("event-message");
                message.content = message.sender + " joined!";
              } else if (message.type === "LEAVE") {
                messageElement.classList.add("event-message");
                message.content = message.sender + " left!";
              } else {
                messageElement.classList.add("chat-message");

                var avatarElement = document.createElement("i");
                var avatarText = document.createTextNode(message.sender[0]);
                avatarElement.appendChild(avatarText);
                avatarElement.style["background-color"] = getAvatarColor(
                  message.sender
                );

                messageElement.appendChild(avatarElement);

                var usernameElement = document.createElement("span");
                var usernameText = document.createTextNode(message.sender);
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);
              }

              var textElement = document.createElement("p");
              var messageText = document.createTextNode(message.content);
              textElement.appendChild(messageText);

              messageElement.appendChild(textElement);

              messageArea.appendChild(messageElement);
              messageArea.scrollTop = messageArea.scrollHeight;

              //callback method  ends
            },
            {
              headers: "are awesome"
            }
          );

          // Unsubscribe
          subscription.unsubscribe();

          // Disconnect
          $stomp.disconnect().then(function () {
            $log.info("disconnected");
          });
        },
        function (frame) {
          connectingElement.textContent =
            "Could not connect to WebSocket server. Please refresh this page to try again!";
          connectingElement.style.color = "red";
        }
      );

    // send function starts
    function sendMessage() {
      var messageContent = messageInput.value.trim();
      var chatMessage = {
        sender: username,
        content: messageInput.value,
        type: "CHAT"
      };

      // Send message
      $stomp.send(
        REST_SERVICE_URI + "/app/chat.addUser",
        JSON.stringify(chatMessage),
        {
          priority: 9,
          custom: 42 // Custom Headers
        }
      );
      messageInput.value = "";
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
