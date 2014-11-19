// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic', 'todo.services'])

.controller('TodoCtrl',function($scope, $ionicModal, $ionicPopup, SQLService){
    
    SQLService.setup();

    $scope.loadTask = function(){
      SQLService.all().then(function(results){
          $scope.tasks = results;
      });
    }

    $scope.loadTask(); 

    $ionicModal.fromTemplateUrl('new-task.html', function(modal){
        $scope.taskModal = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.newTask = function(){
        $scope.taskModal.show();
    }

    $scope.closeNewTask = function(){
        $scope.taskModal.hide();
    }

    $scope.createTask = function(task){
          SQLService.set(task.title);
          $scope.loadTask();
          $scope.taskModal.hide();
          task.title = "";
    }

    $scope.onItemDelete = function(taskid){
          $ionicPopup.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this task?'
         }).then(function(res){
            if(res){
              //del task
              SQLService.del(taskid);
              $scope.loadTask();
            }
          });
    }

    $scope.onItemEdit = function(taskid){
          $ionicPopup.prompt({
              title: 'Update task',
              subtitle: 'Enter new task'
          }).then(function(res){
              //edit task
              SQLService.edit(res, taskid);
              $scope.loadTask();
          });
    }

    $scope.moveItem = function(item, fromIndex, toIndex){
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    }

}); 

