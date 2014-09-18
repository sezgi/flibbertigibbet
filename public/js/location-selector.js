/** @jsx React.DOM */

var LocationSelector = React.createClass({displayName: 'LocationSelector',
  getInitialState: function () {
    return {
      cityResults: [ ],
      showCityResults: true,
      venueResults: [],
      showVenueResults: true,
      selectedCity: ''
    }
  },

  handleCitySearch: function (e) {
    var $input = $(e.target)
      , val = $input.val();

    if (!val) {
      this.setState({ showCityResults: false });
    }

    this.setState({ selectedCity: val });

    $.ajax({
      url: 'https://api.foursquare.com/v2/geo/geocode',
      data: {
        client_id: see.config.FOURSQUARE_CLIENT_ID,
        client_secret: see.config.FOURSQUARE_CLIENT_SECRET,
        v: '20140828',
        query: val,
        autocomplete: true
      },
      success: _.bind(function (payload) {
        var results = [];
        _.each(payload.response.geocode.interpretations.items, function (item) {
          results.push(item.feature.displayName);
        });
        this.setState({ cityResults: results });
        this.setState({ showCityResults: true });
      }, this),
      error: _.bind(function () {
        this.setState({ cityResults: [] });
        this.setState({ showCityResults: false });
      }, this)
    });
  },

  handleCityClick: function (city) {
    this.setState({ selectedCity: city });
    this.setState({ showCityResults: false });
  },

  handleVenueSearch: function (e) {
    var $input = $(e.target),
        val = $input.val(),
        $citySelector = $('.citySelector');

    this.setState({ selectedVenue: val });

    if (!val) {
      this.setState({ showVenueResults: false });
      return;
    }

    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/explore',
      data: {
        client_id: see.config.FOURSQUARE_CLIENT_ID,
        client_secret: see.config.FOURSQUARE_CLIENT_SECRET,
        v: see.config.FOURSQUARE_VERSION,
        near: $citySelector.val(),
        query: val,
        venuePhotos: true
      },
      success: _.bind(function (payload) {
        var results = [];
        _.each(payload.response.groups[0].items, function (item) {
          results.push(item.venue.name);
        });
        this.setState({ venueResults: results });
        this.setState({ showVenueResults: true });
      }, this),
      error: _.bind(function () {
        this.setState({ venueResults: [] });
        this.setState({ showVenueResults: false });
      }, this)
    });
  },

  handleVenueClick: function (venue) {
    this.setState({ selectedVenue: venue });
    this.setState({ showVenueResults: false });
  },

  render: function () {
    return (
      React.DOM.div({className: "location-selector"}, 
        LocationInput({handleCitySearch: this.handleCitySearch, handleVenueSearch: this.handleVenueSearch, selectedCity: this.state.selectedCity, selectedVenue: this.state.selectedVenue}), 
         this.state.showCityResults ? CityResults({results: this.state.cityResults, handleCityClick: this.handleCityClick}) : null, 
         this.state.showVenueResults ? VenueResults({results: this.state.venueResults, handleVenueClick: this.handleVenueClick}) : null
      )
    );
  }
});

var LocationInput = React.createClass({displayName: 'LocationInput',
  handleCitySearch: function (e) {
    this.props.handleCitySearch(e);
  },

  handleVenueSearch: function (e) {
    this.props.handleVenueSearch(e);
  },

  render: function () {
    return (
      React.DOM.form(null, 
        React.DOM.input({className: "citySelector", type: "text", placeholder: "Type to select a city...", value: this.props.selectedCity, onChange: this.handleCitySearch}), 
        React.DOM.input({className: "venueSelector", type: "text", placeholder: "Type to select a venue...", value: this.props.selectedVenue, onChange: this.handleVenueSearch})
      )
    );
  }
});

var CityResults = React.createClass({displayName: 'CityResults',
  handleClick: function (e) {
    var $el = $(e.target);
    this.props.handleCityClick($el.text());
  },

  render: function () {
    var cities = [];
    _.each(this.props.results, function (result) {
      cities.push(React.DOM.li({className: "search-result"}, result));
    });
    return (
      React.DOM.ul({onClick: this.handleClick}, 
        cities
      )
    );
  }
});

var VenueResults = React.createClass({displayName: 'VenueResults',
  handleClick: function (e) {
    var $el = $(e.target);
    this.props.handleVenueClick($el.text());
  },

  render: function () {
    var venues = [];
    _.each(this.props.results, function (result) {
      venues.push(React.DOM.li({className: "search-result"}, result));
    });
    return (
      React.DOM.ul({onClick: this.handleClick}, 
        venues
      )
    );
  }
});


