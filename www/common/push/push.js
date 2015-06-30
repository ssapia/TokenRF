
angular
  .module('app.push', ['ngCordova','app.service.push', 'app.service.users'])
  .service('PushService', function PushService($cordovaPush) {

    var config = null;

    if (ionic.Platform.isAndroid()) {

      config = {
        "senderID": "898506163583"
      };

    } else if (ionic.Platform.isIOS()) {
      config = {
        "badge": "true",
        "sound": "true",
        "alert": "true"
      }
    }

    this.register = function() {

      $cordovaPush.register(config).then(function(result) {
        //alert('register' + result);
      }, function(err) {
        alert('register error' + err);
      });

    }
  })
  .controller('PushController', function ($rootScope, $scope, UsersService, PushModel, $ionicModal, NotificacoesService) {

    var vm = this;

    $ionicModal.fromTemplateUrl('common/push/push.tmpl.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function() {
      $scope.modal.hide();
    };


    // Notification Received
    $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
      console.log(JSON.stringify([notification]));
      if (ionic.Platform.isAndroid()) {
        handleAndroid(notification);
      }
      else if (ionic.Platform.isIOS()) {
        handleIOS(notification);
        $rootScope.$apply(function () {
          $rootScope.notifications.push(JSON.stringify(notification.alert));
        })
      }
    });

    // Android Notification Received Handler
    function handleAndroid(notification) {
      // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
      //             via the console fields as shown.
      console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
      if (notification.event == "registered") {

        UsersService.setRegId(notification.regid);

        storeDeviceToken("android");

      } else if (notification.event == "message") {

        vm.pushModel = PushModel;
        vm.pushModel.setMessage(notification.payload.message);
        vm.pushModel.setTitle(notification.payload.title);

        console.log("PushNotificacao: " + notification.payload.message);
        var notificacao = {
          titulo: notification.payload.title,
          corpo: notification.payload.message
        };

        NotificacoesService.addNotificacao(notificacao);

        $scope.modal.show();

        //$rootScope.$apply(function () {
        //  $rootScope.notifications.push(JSON.stringify(notification.message));
        //})

      } else if (notification.event == "error") {
        alert(notification.msg + " Push notification error event");
      } else {
        alert(notification.event + " Push notification handler - Unprocessed Event");
      }
    }


    // IOS Notification Received Handler
    function handleIOS(notification) {
      // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
      // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
      // the notification when this code runs (weird).
      if (notification.foreground == "1") {
        // Play custom audio if a sound specified.

        // if (notification.sound) {
        //     var mediaSrc = $cordovaMedia.newMedia(notification.sound);
        //     mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
        // }

        if (notification.body && notification.messageFrom) {
          alert(notification.body + " " + notification.messageFrom);

        } else {
          alert(notification.alert + " " + "Push Notification Received");
        }

        if (notification.badge) {
          $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
            console.log("Set badge success " + result)
          }, function (err) {
            console.log("Set badge error " + err)
          });
        }
      }
      // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
      // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
      // the data in this situation.
      else {
        if (notification.body && notification.messageFrom) {
          alert(notification.body + " (RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
        }
        else alert(notification.alert + " (RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
      }
    }

    // type:  Platform type (ios, android etc)
    function storeDeviceToken(type) {

      // Create a random userid to store with it
      var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $rootScope.regId };
      console.log("Post token for registered device with data " + JSON.stringify(user));
      //alert(JSON.stringify(user));
    }
  });

