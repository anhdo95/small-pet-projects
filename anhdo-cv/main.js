var app = angular.module("cvApp", []);
app.controller("cvCtrl", function($scope, $http) {
  $scope.getWidthStyle = function(width) {
    return {
      width: width + "%"
    };
  };

  $http
    .get("assets/data.json")
    .then(function(response) {
      return response.data;
    })
    .then(function(data) {
      $scope.summary = data.summary;
      $scope.skills = data.skills;
      $scope.languages = data.languages;
      $scope.workingExperiences = data.workingExperiences;
      $scope.education = data.education;
      $scope.qualitification = data.qualitification;
    });
});
