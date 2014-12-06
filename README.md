react-paginate
===============

A pagination component for ReactJS using Twitter Bootstrap markup

### Install

Via Bower:
```
bower install react-paginate
```

Via NPM
```
npm install react-paginate
```

### Usage

```js
var Paginate = require('react-paginate');

var App = React.createClass({
	getInitialState: function() {
		return {
			items: [...]
		}
	},
	onChangePage: function(page) {
		return request(url, {page: page}).then(function(items) {
			this.setState({items: items});
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				<h1>My App</h1>
				// Print items here
				<Paginator max={5} onChange={this.onChangePage}/>
			</div>
		);
	}
});
```
