var anime = angular.module('anime',['ngRoute','ngAnimate']);

anime.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){



  $routeProvider
  .when('/home',{
    templateUrl: 'view/home.html',
    controller:'animeController'
  })
  .when('/contact',{
    templateUrl: 'view/contact.html',
    controller: 'contactController'
  })
  .when('/contact-success',{
    templateUrl: 'view/contact-success.html',
    controller: 'contactController'
  })
  .when('/directory',{
    templateUrl: 'view/directory.html',
    controller: 'animeController'
  }).otherwise({
    redirectTo: '/home'
  });
}]);

anime.directive('randomAnime',[function(){

  return{
    restrict: 'E',
    scope: {
      names: '=',
      title: '='
    },
    templateUrl: 'view/random.html',
    transclude: true,
    replace:true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 3);
    }
  };
}]);

anime.controller('animeController',['$scope','$http',function($scope, $http){

$scope.removeAnime = function(name){
  var removedAnime = $scope.names.indexOf(name);
  $scope.names.splice(removedAnime , 1 );
}

$scope.addanime = function(){
$scope.names.push({
  name:$scope.newanime.name,
  rank:parseInt($scope.newanime.rank),
  color: $scope.newanime.color,
  available: true
});
$scope.newanime.name="";
$scope.newanime.rank="";
$scope.newanime.color="";
};

$scope.removeAll = function(){
  $scope.names =[];
};

$http.get('data/anime.json').then(function(response){
  $scope.names = response.data;
  console.log(data);
});

}]);

anime.controller('contactController',['$scope','$location',function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success');
  };
}]);
