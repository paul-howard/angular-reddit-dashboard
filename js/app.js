var redditApp = angular.module('RedditApp', ['ui.bootstrap']);

redditApp.controller('SearchController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

  $scope.selectedSearchTerm = 0;
  $scope.searchTerm = '';
  $scope.results = [];

  try {
    $scope.searchHistory = JSON.parse(window.localStorage.searchHistory) || [];
  } catch (e) {
    console.log('error: ', e);
    $scope.searchHistory = [];
  }

  $scope.search = function() {

    if ($scope.searchTerm.length === 0) {
      return;
    }

    var req = {
        url: 'http://www.reddit.com/search.json',
        params: {
          q: $scope.searchTerm
        }
      };

    $http(req).success(function(results) {

      console.log('search term: ', $scope.searchTerm);
      console.log('request: ', req);
      console.log('search returned: ', results);

      if ($scope.searchHistory.indexOf($scope.searchTerm) < 0) {
        $scope.searchHistory.unshift($scope.searchTerm);
      }

      console.log($scope.searchHistory);

      $scope.posts = results.data.children;
      console.log('$scope.posts: ', $scope.posts);

      // $scope.loading = false;

      window.localStorage.searchHistory = JSON.stringify($scope.searchHistory);

      $scope.thumbedPosts = [];
      $scope.posts.forEach(function(element, index) {
        if (element.data.thumbnail.indexOf('http') === 0) $scope.thumbedPosts.push(element);
      });

      console.log('$scope.thumbedPosts: ', $scope.thumbedPosts);
    });
  };

  $scope.$watch('searchTerm', function(newVal, oldVal) {
      if (newVal) {
        window.localStorage.searchTerm = $scope.searchTerm;
      }
    });

  $scope.searchFromHistory = function(index) {
    $scope.searchTerm = $scope.searchHistory[index];
    $scope.search();
  };

  $scope.isCurrentSearch = function(index) {
    if ($scope.searchHistory[index] == $scope.searchTerm) {
      return true;
    } else {
      return false;
    }
  };

  $scope.delete = function(index) {
    console.log('delete() called on index: ', index);
    $scope.searchHistory.splice(index, 1);
    window.localStorage.searchHistory = JSON.stringify($scope.searchHistory);
  };

  $scope.showAbout = function() {
    var aboutModal = $modal.open({
      templateUrl:'aboutModal.html',
      controller:'AboutModalCtrl',
      size:'md'
    });
  };

  // -------------------------------------------------------------------------
  // Modal window code (stolen from: https://angular-ui.github.io/bootstrap/ )
  // -------------------------------------------------------------------------
  //   $scope.open = function (size) {

  //     var modalInstance = $modal.open({
  //       templateUrl: 'myModalContent.html',
  //       controller: 'ModalInstanceCtrl',
  //       size: size,
  //       resolve: {
  //         items: function () {
  //           return $scope.items;
  //         }
  //       }
  //     });

  //     modalInstance.result.then(function (selectedItem) {
  //       $scope.selected = selectedItem;
  //     }, function () {
  //       $log.info('Modal dismissed at: ' + new Date());
  //     });
  //   };
  // });

  // // Please note that $modalInstance represents a modal window (instance) dependency.
  // // It is not the same as the $modal service used above.

  // angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  //   $scope.items = items;
  //   $scope.selected = {
  //     item: $scope.items[0]
  //   };

  //   $scope.ok = function () {
  //     $modalInstance.close($scope.selected.item);
  //   };

  //   $scope.cancel = function () {
  //     $modalInstance.dismiss('cancel');
  //   };

  // });

}]);

redditApp.controller('AboutModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
  $scope.howdy = 'hey.';
}]);
