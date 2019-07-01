import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import './App.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planetResults: [],
            planetDetails: null,
            count: 0,
            showLoader: false,
            errorMessage: false,
            countSearchHits: 0,
            countTime: false,
            currentSearchQuery: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleFullDetails = this.handleFullDetails.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }


    handleTime() {
        var myTimer = setInterval(function () {
            if (this.state.countSearchHits > 5 && localStorage.getItem('userName') != "Luke Skywalker")
                window.location.reload();
            else {
                this.setState({ countSearchHits: 0 });
                clearInterval(myTimer);
            }
        }.bind(this), 60000);
    }


    handleSubmit = debounce((e, value) => {
        this.setState({ showLoader: true, countSearchHits: this.state.countSearchHits + 1, currentSearchQuery: value });
        if (this.state.countSearchHits == 1) {
            this.handleTime();
        }
        fetch('https://swapi.co/api/planets/?search=' + value)
            .then(responseJson => responseJson.json())
            .then(result => {
                this.setState({ count: result.count });
                result = result.results
                if (result.length > 0) {
                    this.setState({ planetResults: result, showLoader: false, errorMessage: false });
                }
                else {
                    this.setState({ planetResults: [], showLoader: false, errorMessage: true });
                }
            });
    }, 750);

    handleFullDetails(e, itemName) {
        e.preventDefault();
        for (var i = 0; i < this.state.planetResults.length; i++) {
            if (itemName == this.state.planetResults[i].name) {
                this.setState({ planetDetails: this.state.planetResults[i] });
            }
        }
    }

    handleLoadMore() {
        var searchPage = this.state.planetResults.length / 10;
        if (this.state.planetResults.length < this.state.count) {
            fetch('https://swapi.co/api/planets/?search=' + this.state.currentSearchQuery + '&page=' + (searchPage + 1))
                .then(responseJson => responseJson.json())
                .then(result => {
                    result = result.results
                    if (result.length > 0) {
                        var a = this.state.planetResults.concat(result);
                        this.setState({ planetResults: a });
                    }
                });
        }

    }

    handleLogout() {
        localStorage.removeItem('loggedIn');
        localStorage.setItem('location', "/");
        this.props.history.push("/");
    }

    render() {
        if (localStorage.getItem('loggedIn') == "false" || localStorage.getItem('loggedIn') == null)
            this.props.history.push("/");

        if (this.state.planetDetails != null) {
            this.props.history.push({
                pathname: 'planetDetails',
                state: { planetDetailsJson: this.state.planetDetails }
            });
        }

        var arrProper = this.state.planetResults;
        if (arrProper.length == 2) {
        }
        var arrUnknown = [];
        var arrFinalProper = [];
        for (var i = 0; i < arrProper.length; i++) {
            if (arrProper[i].population === "unknown") {
                arrUnknown.push(arrProper[i]);
            }
            else {
                arrFinalProper.push(arrProper[i]);
            }
        }
        var unknownPopulationPlanets = arrUnknown.map((item, index) => {
            var count = 1 + index;
            return (
                <i>
                <div style={{ display: "flex", flex: 1, flexGrow: 0, flexDirection: "column", width: `600px` }}>
                    <span onClick={e => this.handleFullDetails(e, item.name)} style={{ display: "flex", flex: 1, flexGrow: 0, width: `300px` }}>{count}) Name: {item.name}</span>
                    <span style={{ display: "flex", flex: 1, flexGrow: 0, width: `250px`, backgroundColor: "red",  borderRadius: "5px", margin:"10px" }}>Population: {item.population}</span>
                </div>
                </i>
            );
        }
        );

        arrFinalProper.sort((a, b) => (Number(a.population) > Number(b.population)) ? 1 : -1);
        var knownPopulationPlanets = arrFinalProper.map((item, index) => {
            var temp = (index + 10) * 30;
            var count = (unknownPopulationPlanets.length + 1) + index;
            return (
                <i>
                <div style={{ display: "flex", flex: 1, flexGrow: 0, flexDirection: "column", width: `600px` }}>
                    <span onClick={e => this.handleFullDetails(e, item.name)} style={{ display: "flex", flex: 1, flexGrow: 0, width: `300px` }}>{count}) Name: {item.name}</span>
                    <span style={{ display: "flex", flex: 1, flexGrow: 0, width: `${temp}px`, backgroundColor: "green",  borderRadius: "5px", margin:"5px" }}>Population: {Number(item.population)}</span>
                </div>
                </i>
            );
        }
        );

        return (
            <div className="App">
                <header className="App-header">
                    <input type="button" name="logoutButton" value="Logout" onClick={this.handleLogout} className="button2"/>
                    <h1><i style={{ fontSize: "35px" }}>Search Planets</i></h1>
                    {this.state.countSearchHits > 5 && this.state.countTime == false && localStorage.getItem('userName') != "Luke Skywalker" ?
                        <div style={{ width: `600px`, height: `500px` }}>You have searched more than 5 times in one minute. Please wait for some time.</div> :
                        <div style={{ width: `1600px`, height: `5000px` }}>
                            <form>
                                <div><i>Enter Planet Name : </i>
                                    <input style={{
                                        marginLeft: "50px", padding: "6px 15px", boxSizing: "border-box",
                                        border: "2px solid grey", borderRadius: "4px"
                                    }} type="text" name="planetName" onChange={e => this.handleSubmit(e, e.target.value)} /></div>
                            </form>
                            {this.state.showLoader == true ? <div style={{ width: `600px`, height: `500px`, marginLeft: "500px", marginTop: "50px" }}>Loading...</div> :
                                this.state.errorMessage == true ? <div style={{ width: `600px`, height: `500px`, marginLeft: "500px", marginTop: "50px" }}>No Results found</div> :
                                    <div style={{ width: `1600px`, height: `5000px`, marginTop: "50px" }}>
                                        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                            {unknownPopulationPlanets}
                                            {knownPopulationPlanets}
                                        </div>
                                        {this.state.planetResults.length < this.state.count &&
                                            <input type="button" value="Load More" onClick={this.handleLoadMore} className="button_load_more"/>}
                                    </div>
                            }
                        </div>
                    }
                </header>
            </div>
        );
    }
}

export default Search;