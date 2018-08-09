/*
* PickupLocationForm component
* Renders the form where a user can
* search for a pickup location.
* */
import React, {Component} from "react";
import axios from "axios";
import { Debounce } from 'react-throttle';
import './PickupLocationForm.scss';
import SearchPreview from '../../components/SearchPreview/SearchPreview';

class PickupLocationForm extends Component {
    constructor() {
        super();

        this.state = {
            showSearchPreview: false,
            focus: false,
            searchTerm: '',
            submissionError: '',
            searchResults: null,
            isFetching: false,
        }
    }

    handleSearch = ( e ) => {
        const { history } = this.props;

        e.preventDefault();

        if (!this.state.searchTerm.length) {
            this.setState({
               submissionError: "Please enter a pickup location",
            });
        } else {
            // Make API request
            axios
                .get( `https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${10}&solrTerm=${this.state.searchTerm}` )
                .then( response => {
                    history.push( {
                        pathname: '/search-results',
                        search: `?keyword=${ this.state.searchTerm }`,
                        state: { searchResults: JSON.stringify(response.data.results.docs) },
                    } );
                })

        }
    };

    handleChange = ( e ) => {
        if ( e.currentTarget.value && e.currentTarget.value.length >= 1 ) {
            this.setState({
                submissionError: "",
            });
        }

        if (
            e.currentTarget.value &&
            e.currentTarget.value.length >= 2 &&
            !this.state.isFetching &&
            e.currentTarget.value !== this.state.searchTerm ) {
            this.setState({
                searchTerm: e.currentTarget.value,
                isFetching: true,
            });

            axios
                .get( `https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${e.currentTarget.value}` )
                .then( response => {
                    if (response.data && response.data !== "" && response.data.results) {
                        this.setState({
                            searchResults: response.data.results.docs,
                            showSearchPreview: true,
                            isFetching: false,
                        });
                    }
                });
        } else {
            this.setState( {
                searchTerm: '',
                showSearchPreview: false,
            } );
        }
    };

    handleKeyUp = (e) => {

    };

    onHover = () => {
        this.setState( {
            showSearchPreview: true,
            focus: true,
        } );
    };

    onMouseOut = () => {
        this.setState( {
            focus: false,
        } );
    };

    // onBlur = () => {
    //     if ( !this.state.focus ) {
    //         this.setState( {
    //             showSearchPreview: false,
    //         } );
    //     }
    // };

    render() {
        const { showSearchPreview } = this.state;
        return (
            <div className="pickup-location-form">
                <h1>Let's find your ideal car</h1>
                <form action="" >
                    <div className="form-group">
                        <label htmlFor="pickup-location">Pick-up Location</label>
                        <Debounce time="500" handler="onChange">
                            <input
                                type="text"
                                name="pickup-location"
                                className="form-control"
                                placeholder="city, airport, region, district..."
                                // value={ value ? value : '' }
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                autoComplete="off"
                                onBlur={ this.onBlur }
                            />
                        </Debounce>
                        {
                            this.state.isFetching &&
                                <span className="input-loader">
                                    <i className="fa fa-spinner fa-spin"></i>
                                </span>
                        }
                        {
                            this.state.submissionError &&
                                <span className="form-error">{this.state.submissionError}</span>
                        }
                        <button
                            type="submit"
                            className="btn float-right"
                            onClick={this.handleSearch}
                        >Search</button>
                        {
                            showSearchPreview &&
                                <SearchPreview searchResults={this.state.searchResults}/>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default PickupLocationForm;