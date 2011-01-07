var users = require("google/appengine/api/users");

exports.Wrap = function (app) {
    return function (request) {
        // This middleware wraps all actions, add code here, 
        // to be executed on every request.
        var response = app(request);
        
        if (response.data) {
            var currentUser = users.getCurrentUser();
            response.data.userMenu = currentUser ? 'Hello ' + currentUser.nickname + ' | <a href="' + users.createLogoutURL("/")+'">Sign out</a>' : '<a href="/signin">Sign in</a>';
        }

        return response;
    }
}

var Tag = require("content/tag").Tag;

exports.Aside = function (app) {
    return function (request) {
        var response = app(request);
        response.data.asideTags = Tag.all().order("-count").fetch(10).map(function (t) {
            return {
                label: t.label,
                count: t.count
            }                
        });
        return response;
    }        
}
