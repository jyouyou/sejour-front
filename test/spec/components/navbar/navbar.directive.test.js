'use strict';

describe('Directive : navbar', function () {

	var $httpBackend, elm, $scope, $translate;

	beforeEach(function () {
		// load the controller's module
		module('sejourFrontApp');

		// Initialize the controller and a mock scope
		inject(function (_$httpBackend_, $compile, $rootScope, _$translate_) {
	        $scope = $rootScope.$new();
	        elm = angular.element('<li active-menu="fr"></li>');
	        $compile(elm)($scope);

	        $translate = _$translate_;

	        $httpBackend = _$httpBackend_;
        	$httpBackend.whenGET(new RegExp('i18n\/.*\/global.json')).respond({});
        	$httpBackend.whenGET(new RegExp('i18n\/.*\/main.json')).respond({});
        	$httpBackend.whenGET('scripts/components/navbar/navbar.html').respond({});
        	$httpBackend.whenGET('scripts/views/main/main.html').respond({});
		});
	});

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('activeMenu', function () {

    	it('Should be active when language is in use', function () {
    		$scope.$apply(function () {
    			$translate.use('fr');
    		});

    		expect(elm.hasClass('active')).toBeTruthy();
	    });

    	it('Should not be active when language is not in use', function () {
    		$scope.$apply(function () {
    			$translate.use('en');
    		});
            
    		expect(elm.hasClass('active')).toBeFalsy();
	    });
    });
});