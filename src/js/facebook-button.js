/** @jsx React.DOM */

var FacebookButton = React.createClass({displayName: 'FacebookButton',
  handleClick: function (e) {
    // Call session change on button click.
    e.preventDefault();
    this.props.onSessionChange();
  },
  render: function () {
    var button = this.props.loggedIn ? 
      React.DOM.a({className: "logout-link", href: "#", onClick: this.handleClick}, "Log out") :
      React.DOM.a({className: "login-button", href: "#", onClick: this.handleClick}, "Log in with Facebook");
      return (
        React.DOM.div(null, button)
      );
    }
});