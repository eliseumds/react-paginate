(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['react'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react'));
    } else {
        root.ReactPaginate = factory(root.React);
    }
}(this, function(React) {
    return React.createClass({
        propTypes: {
            max: React.PropTypes.number.isRequired,
            maxVisible: React.PropTypes.number,
            onChange: React.PropTypes.func.isRequired
        },
        componentDidUpdate: function(prevProps, prevState) {
            if (prevState.currentPage !== this.state.currentPage) {
                this.props.onChange(this.state.currentPage);
            }
        },
        getDefaultProps: function() {
            return {
                maxVisible: 5
            };
        },
        getInitialState: function() {
            return {
                currentPage: 1,
                items: []
            };
        },
        goTo: function(page, e) {
            if (e) {
              e.preventDefault();
            }

            this.setState({currentPage: page});
        },

        onClickNext: function(e) {
            e.preventDefault();

            var page = this.state.currentPage;

            if (page < this.props.max) {
                this.goTo(page + 1);
            }
        },
        onClickPrev: function(e) {
            e.preventDefault();

            if (this.state.currentPage > 1) {
                this.goTo(this.state.currentPage - 1);
            }
        },
        render: function() {
            var className = this.props.className || '',
                p = this.props,
                s = this.state,
                skip = 0;

            if (s.currentPage > p.maxVisible - 1 && s.currentPage < p.max) {
                skip = s.currentPage - p.maxVisible + 1;
            } else if (s.currentPage === p.max) {
                skip = s.currentPage - p.maxVisible;
            }

            var iterator = Array.apply(null, Array(p.maxVisible)).map(function(v, i) {
                return skip + i + 1;
            });

            return (
                React.createElement("nav", null,
                    React.createElement("ul", {className: 'pagination ' + className},
                        React.createElement("li", {className: s.currentPage === 1 ? 'disabled' : ''},
                            React.createElement("a", {href: "#", onClick: this.onClickPrev},
                                React.createElement("span", {'aria-hidden': "true"}, "«"),
                                React.createElement("span", {className: "sr-only"}, "Prev")
                            )
                        ),
                        iterator.map(function(page) {
                            return (
                                React.createElement("li", {key: page,
                                    onClick: this.goTo.bind(this, page),
                                    className: s.currentPage === page ? 'active' : ''},
                                    React.createElement("a", {href: "#"}, page)
                                )
                            );
                        }, this),
                        React.createElement("li", {className: s.currentPage === p.max ? 'disabled' : ''},
                            React.createElement("a", {href: "#", onClick: this.onClickNext},
                                React.createElement("span", {'aria-hidden': "true"}, "»"),
                                React.createElement("span", {className: "sr-only"}, "Next")
                            )
                        )
                    )
                )
            );
        }
    });
}));
