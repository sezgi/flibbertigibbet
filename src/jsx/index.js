/** @jsx React.DOM */

// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

var FacebookButton = React.createClass({
  render: function () {
    if (Parse.User.current()) {
      return (
        <a className="logout-link" href="#">Log out</a>
      );
    } else {
      return (
        <a className="login-button" href="#">Log in with Facebook</a>
      );
    }
  }
});

React.renderComponent(<FacebookButton />, $('#main')[0]);

$('.login-button').click(function (e) {
  e.preventDefault();

  Parse.FacebookUtils.logIn("publish_actions,email", {
    success: function(user) {          
      if (!user.existed()) {
        var accessToken = user.attributes.authData.facebook.access_token,
            profile;

        $.ajax({
          url: "https://graph.facebook.com/v2.0/me",
          data: {
            access_token: accessToken
          },
          success: function (response) {
            // save facebook info to user object
            _.each(_.keys(response), function (userProp) {
              if (userProp != 'id') {
                user.set(userProp, response[userProp]);
              }
            })
            user.save();
          },
          error: function (response, errorText) {
            console.log(errorText);
          }
        });
      }

    },
    error: function(user, error) {
      console.log('User cancelled the Facebook login or did not fully authorize.');
    }
  }).then(function () {
    // TODO: rerender React component instead of reloading
    location.reload(); 
  });
});

$('.logout-link').click(function (e) {
  e.preventDefault();
  Parse.User.logOut();
  // TODO: rerender React component instead of reloading
  location.reload();
});
