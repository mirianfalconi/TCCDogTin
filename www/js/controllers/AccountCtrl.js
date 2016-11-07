angular.module('starter.AccountCtrl', [])
.controller('AccountCtrl', function ($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, $window) {
  $scope.image = null;
    $scope.token = $window.localStorage;

  // Present Actionsheet for switch beteen Camera / Library
  $scope.loadImage = function() {
    var options = {
      title: 'Selecione uma Imagem',
      buttonLabels: ['Galeria', 'Camera'],
      addCancelButtonWithLabel: 'Cancelar',
      androidEnableCancelButton : true,
    };
    $cordovaActionSheet.show(options).then(function(btnIndex) {
      var type = null;
      if (btnIndex === 1) {
        type = Camera.PictureSourceType.PHOTOLIBRARY;
      } else if (btnIndex === 2) {
        type = Camera.PictureSourceType.CAMERA;
      }
      if (type !== null) {
        $scope.selectPicture(type);
      }
    });
  };

  // Take image with the camera or from library and store it inside the app folder
  // Image will not be saved to users Library.
  $scope.selectPicture = function(sourceType) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imagePath) {
      // Grab the file name of the photo in the temporary directory
      var currentName = imagePath.replace(/^.*[\\\/]/, '');

      //Create a new name for the photo
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";

      // If you are trying to load image from the gallery on Android we need special treatment!
      if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        window.FilePath.resolveNativePath(imagePath, function(entry) {
          window.resolveLocalFileSystemURL(entry, success, fail);
          function fail(e) {
            console.error('Error: ', e);
          }

          function success(fileEntry) {
            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
            // Only copy because of access rights
            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
              $scope.image = newFileName;
            }, function(error){
              $scope.showAlert('Error', error.exception);
              console.log(err);
            });
          };
        }
      );
      } else {
        var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // Move the file to permanent storage
        $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
          $scope.image = newFileName;
        }, function(error){
          $scope.showAlert('Error', error.exception);
          console.log(err);
        });
      }
    },
    function(err){
      console.log(err);
    })
  };


  $scope.pathForImage = function(image) {
    if (image === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + image;
    }
  };

  $scope.uploadImage = function() {

    if ($scope.pathForImage($scope.image) === null) {
      console.log('error1');
    }

    var url = "http://192.168.1.7:5000/pet";


    var targetPath = $scope.pathForImage($scope.image);


    var filename = $scope.image;
    var name = $scope.name;
    var gender = $scope.gender;
    var kind = $scope.kind;
    var breed = $scope.breed;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
                'fileName': filename,
                'name'    : name,
                'gender'  : gender,
                'kind'    : kind,
                'breed'   : breed
               }
    };

    $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
      $scope.showAlert('Successo', 'Imagem Atualizada.');
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });
  }

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
});
