// ./src/index.jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import { Router, Route, browserHistory, Link } from 'react-router';
import axios from 'axios';


class Main extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Places</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/" activeClassName="active">Home</Link></li>
                                <li><Link to="/places" activeClassName="active">Places</Link></li>
                                <li><Link to="/about" activeClassName="active">About Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class Home extends Component {
    render() {
        return (<h1>Home Page</h1>);
    }
}

// More components
class Places extends Component {
    constructor() {
        super();
        this.state = {
        }
    };

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/87ohp')
            .then(res => {
                this.setState({ places: res.data.places })
            })
            .catch(err => console.log('some err', err))
    }

    render() {
        return (
            <div>
                <h1>Places page</h1>
                {this.state.places ?

                    <table className="table-bordered">
                        <thead>
                            <th>Business ID</th>
                            <th>Business Name</th>
                            <th>Website</th>
                            <th>Address</th>
                        </thead>
                        {this.state.places.map((place, i) =>
                            <tbody key={i}>
                                <td>{place.id}</td>
                                <td><Link to={"/places/" + place.id} className="list-group-item" key={place.id}>{place.name}</Link></td>
                                <td>{place.website_url}</td>
                                <td>{place.address}</td>
                            </tbody>
                        )}
                    </table>

                    : ''}
            </div>
        );
    };
};



class PlaceDetail extends Component {

    constructor() {
        super();
        this.state = {
        }
    };

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/87ohp')
            .then(res => {
                this.setState({ places: res.data.places })
            })
            .catch(err => console.log('some err', err))
    }

    _localHandleClick() {
        browserHistory.push('/places');
    };

    render() {
        const places = this.state.places;
        const place_id = this.props.params.id;
        const place = places ? places.filter(place => place.id == place_id) : null;

        return (
            <div>
                {place ?
                    <div>
                        <div>
                            <button className="btn btn-default" onClick={this._localHandleClick}>Go to Places</button>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <div className="thumbnail">
                                    <img src={place[0].logo_url} alt={place[0].name} />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <ul>
                                    <li><strong>Business Name</strong>: {place[0].name}</li>
                                    <li><strong>Address</strong>: {place[0].address}</li>
                                    <li><strong>Website</strong>: {place[0].website_url}</li>
                                    <li><strong>Hours</strong>: {JSON.stringify(place[0].hours)}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    };
}



class About extends Component {
    render() {
        return (<h1>About page</h1>);
    }
}



render(
    <Router history={browserHistory}>
        <Route component={Main}>
            <Route path="/" component={Home} />
            <Route path="/places" component={Places} />
            <Route path="/places/:id" component={PlaceDetail} />
            <Route path="/about" component={About} />
        </Route>
    </Router>,
    document.getElementById('container')
);