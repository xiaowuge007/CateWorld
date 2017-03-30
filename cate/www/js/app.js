// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("tabs", {
				url: "/tab",
				templateUrl: "templates/tabs.html",
				controller: "ctrl"
			})
			.state("tabs.home", {
				url: "/home",
				views: {
					'tab-home': {
						templateUrl: "templates/home.html",
						controller: "ctrl1"
					}
				}
			})
			.state("tabs.sort", {
				url: "/sort",
				views: {
					'tab-home': {
						templateUrl: "templates/sort.html"
					}
				}
			})
			.state("tabs.ring", {
				url: "/ring",
				views: {
					'tab-ring': {
						templateUrl: "templates/ring.html",
						controller: "ctrl2"
					}
				}
			})
			.state("tabs.prodetails", {
				url: "/ring/:id",
				views: {
					'tab-ring': {
						templateUrl: "templates/prodetails.html",
						controller: "proCtrl"
					}
				}
			})
			.state("tabs.good", {
				url: "/good",
				views: {
					'tab-good': {
						templateUrl: "templates/good.html",
						controller: "ctrl3"
					}
				}
			})
			.state("tabs.details", {
				url: "/good/:id",
				views: {
					'tab-good': {
						templateUrl: "templates/details.html",
						controller:"detCtrl"
					}
				}
			})
			.state("tabs.car", {
				url: "/car",
				views: {
					'tab-good': {
						templateUrl: "templates/car.html",
						controller:"carCtrl"
					}
				}
			})
			.state("tabs.mine", {
				url: "/mine",
				views: {
					'tab-mine': {
						templateUrl: "templates/mine.html"
					}
				}
			})
			.state("tabs.register", {
				url: "/register",
				views: {
					'tab-mine': {
						templateUrl: "templates/register.html",
						controller: "regCtrl"
					}
				}
			})
			.state("tabs.sign", {
				url: "/sign",
				views: {
					'tab-mine': {
						templateUrl: "templates/sign.html",
						controller: "signCtrl"
					}
				}
			})
			.state("tabs.information", {
				url: "/information",
				views: {
					'tab-mine': {
						templateUrl: "templates/information.html",
						controller: "inforCtrl"
					}
				}
			})
		$urlRouterProvider.otherwise("/tab/home")
	})
	.controller("ctrl1", function($scope, $http) {
		var bannerSwiper = new Swiper('.banner', {
			autoplay: 5000,
			// 如果需要滚动条   
			scrollbar: '.swiper-scrollbar',
			scrollbarHide: false,
		})
		var canSwiper = new Swiper('.home-arr', {
			// 如果需要滚动条   
			scrollbar: '.swiper-scrollbar',
			scrollbarHide: false,
		})
		$http.get("jiekou/hgoods.json").then(function(response) {
			//console.log(response.data)
			$scope.hgoods = response.data;
		})
	})
	.controller("ctrl2", function($scope, $http) {
		var ringSwiper = new Swiper('.qbanner', {
			autoplay: 3000,
			autoplayDisableOnInteraction: false,
			// 如果需要滚动条   
			scrollbar: '.swiper-scrollbar',
			scrollbarHide: false,
		})
		$http.get("jiekou/ring.json").then(function(response) {
			//console.log(response.data)
			$scope.rgoods = response.data;
		})
		$http.get("jiekou/card.json").then(function(response) {
			//console.log(response.data)
			$scope.cards = response.data;
		})
	})
	.controller("ctrl3", function($scope, $http) {
		var goodSwiper = new Swiper('.gbanner', {
			autoplay: 4000,
			autoplayDisableOnInteraction: false,
			// 如果需要滚动条   
			pagination: '.swiper-pagination'
		})
		$http.get("jiekou/goodnav.json").then(function(response) {
			//console.log(response.data)
			$scope.gnavs = response.data;
		})
		$http.get("jiekou/goodlist.json").then(function(response) {
			//console.log(response.data)
			$scope.dls= response.data;
		})
	})
	.controller("proCtrl", function($scope, $http, $stateParams) {
		$http.get('jiekou/hgoods.json').then(function(response) {
			$scope.progood = response.data[$stateParams.id]
		})
	})
	.controller("ctrl", function($scope) {

		// 点击按钮调用方法触发，或一些其他的触发条件
		$scope.show = function() {
			var _open = document.getElementById("ping");
			_open.style.display = "block";
		}
	})
	.controller("myCtrl", function($scope) {
		$scope.close = function() {
			var _open = document.getElementById("ping");
			_open.style.display = "none";
		}
	})
	.controller("signCtrl", function($rootScope, $scope) {
		$scope.show2 = function() {
			console.log($scope.phone)
			if($scope.phone == null || $scope.phone.length<6){
				alert("手机号输入不正确")
			}else{
				document.getElementById("next-btn").href = "#/tab/information";
				$rootScope.phone = $scope.phone;	
			};			
		}
	})
	.controller("detCtrl", function($http, $scope,$stateParams) {
		$http.get('jiekou/goodlist.json').then(function(response) {
			$scope.det = response.data[$stateParams.id];
			//console.log($scope.det)
		})
		$scope.add = function(){
			var cobj = {
				"id":$scope.det.id,
				"imgUrl":$scope.det.imgUrl,
				"name":$scope.det.name,
				"price":$scope.det.price,
				"num":1
			};
			var carr=[];
			var cstr = localStorage.getItem("good");
			//console.log();
			if(cstr==null){
				carr.push(cobj);
			}else{
				carr = JSON.parse(cstr);
				var carr1 =[];
				for(var i=0;i< carr.length;i++){
					carr1.push(carr[i].name)
				};
				var cindex = carr1.indexOf(cobj.name);
				console.log(cindex);
				if(cindex>=0){
					carr[cindex].num +=1;
				}else{
					carr.push(cobj);
				};								
			}			
			localStorage.setItem("good",JSON.stringify(carr))
			
		}
	})
	.controller("inforCtrl", function($rootScope, $scope) {
		$scope.show3 = function() {
			//console.log($scope.password);
			//console.log($rootScope.phone);
			if($scope.password == null || $scope.password.length <6){
				alert("密码长度至少为六位")
			}else{
				var obj = {
					"name": $rootScope.phone,
					"password": $scope.password
				}
				var arr=[];
				var strOld = localStorage.getItem("user");
				if(strOld==null){
					arr.push(obj);
				}else{
					arr = JSON.parse(strOld);
					arr.push(obj);
				}						
				//console.log(arr);
				localStorage.setItem("user", JSON.stringify(arr));
				document.getElementById("end-btn").href="#/tab/register";
			}
			
		}
	})
	.controller("regCtrl", function($rootScope, $scope) {
		var btnReg = document.getElementById("reg-btn") 
		$scope.succeed = function() {
			var user = localStorage.getItem("user");
			user = JSON.parse(user);
			//console.log(user);
			var arr1 = [];
			for(var i = 0; i < user.length; i++) {
				arr1.push(user[i].name)
			}
			//console.log(arr1);
			var index = arr1.indexOf($scope.uname);
			//console.log(index);
			//console.log($scope.uname)
			if(index >= 0) {
					if($scope.upass == user[index].password){
						btnReg.href = "#/tab/home";
					}else{
						alert("密码错误")
					};						
			}else{
				alert("用户名不存在")
			}
		}
	})
	.controller("carCtrl",function($scope){
		var _carr = localStorage.getItem("good");		
		_carr = JSON.parse(_carr);
		//console.log(_carr)
		$scope.lis = _carr;
	})
