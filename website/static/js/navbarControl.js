
var $ = require('jquery');
var ko = require('knockout');

/**
    * The NavbarViewModel, for OSF wide navigation.
    * @param {Object} ... 
    */
var NavbarViewModel = function() {
    var self = this;

    self.showSearch = ko.observable(false);
    self.searchCSS = ko.observable('');
    self.query = ko.observable('');

    self.onSearchPage = ko.computed(function() {
        var path = window.location.pathname;
        var indexOfSearch = path.indexOf('search');
        return indexOfSearch === 1;
    });


    self.toggleSearch = function(){
        if(self.showSearch()){
            self.showSearch(false);
            self.searchCSS('');            
        } else {
            self.showSearch(true);
            self.searchCSS('active');            

        }
    };

    self.submit = function() {
       if(self.query() !== ''){
           window.location.href = '/search/?q=' + self.query();
       }
    };

};

function NavbarControl (selector, data, options) {
    var self = this;
    self.selector = selector;
    self.$element = $(self.selector);
    self.data = data;
    self.viewModel = new NavbarViewModel(self.data);
    self.options = $.extend({}, {}, options);
    self.init();
}

NavbarControl.prototype.init = function() {
    var self = this;
    ko.applyBindings(self.viewModel, self.$element[0]);
};

module.exports = NavbarControl;
