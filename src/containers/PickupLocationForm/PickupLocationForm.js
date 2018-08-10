/* eslint-disable jsx-a11y/label-has-for */
/*
* PickupLocationForm component
* Renders the form where a user can
* search for a pickup location.
* */
import React, { Component } from 'react';
import axios from 'axios';
import { Debounce } from 'react-throttle';
import './PickupLocationForm.scss';
import SearchPreview from '../../components/SearchPreview/SearchPreview';

class PickupLocationForm extends Component {
    constructor() {
        super();

        this.state = {
            showSearchPreview: false,
            searchTerm: '',
            submissionError: '',
            searchResults: null,
            isFetching: false,
        };
    }

    handleSearch = (e) => {
        const { history } = this.props;
        const { searchTerm } = this.state;

        e.preventDefault();

        if (!searchTerm.length) {
            this.setState({
                submissionError: 'Please enter a pickup location',
            });
        } else {
            // Make API request
            axios
                .get(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${10}&solrTerm=${searchTerm}`)
                .then((response) => {
                    history.push({
                        pathname: '/search-results',
                        search: `?keyword=${searchTerm}`,
                        state: { searchResults: JSON.stringify(response.data.results.docs) },
                    });
                });
        }
    };

    handleChange = (e) => {
        const { searchTerm, isFetching } = this.state;
        if (e.currentTarget.value && e.currentTarget.value.length >= 1) {
            this.setState({
                submissionError: '',
            });
        }

        if (
            e.currentTarget.value
            && e.currentTarget.value.length >= 2
            && !isFetching
            && e.currentTarget.value !== searchTerm) {
            this.setState({
                searchTerm: e.currentTarget.value,
                isFetching: true,
            });

            axios
                .get(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${e.currentTarget.value}`)
                .then((response) => {
                    if (response.data && response.data !== '' && response.data.results) {
                        this.setState({
                            searchResults: response.data.results.docs,
                            showSearchPreview: true,
                            isFetching: false,
                        });
                    }
                });
        } else {
            this.setState({
                searchTerm: '',
                showSearchPreview: false,
            });
        }
    };

    // handleKeyUp = (e) => {
    //
    // };

    // onBlur = () => {
    //     if ( !this.state.focus ) {
    //         this.setState( {
    //             showSearchPreview: false,
    //         } );
    //     }
    // };

    render() {
        const {
            showSearchPreview,
            isFetching,
            submissionError,
            searchResults,
        } = this.state;
        return (
            <div className="pickup-location-form">
                <h1>
                    Let&apos;s find your ideal car
                </h1>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="pickup-location">
                            Pick-up Location
                        </label>
                        <Debounce time="500" handler="onChange">
                            <input
                                id="pickup-location"
                                type="text"
                                name="pickup-location"
                                className="form-control"
                                placeholder="city, airport, region, district..."
                                // value={ value ? value : '' }
                                onChange={this.handleChange}
                                // onKeyUp={this.handleKeyUp}
                                autoComplete="off"
                                // onBlur={ this.onBlur }
                            />
                        </Debounce>
                        {
                            isFetching
                            && (
                                <span className="input-loader">
                                    <i className="fa fa-spinner fa-spin" />
                                </span>
                            )
                        }
                        {
                            submissionError
                            && (
                                <span className="form-error">
                                    {submissionError}
                                </span>
                            )
                        }
                        <button
                            type="submit"
                            className="btn float-right"
                            onClick={this.handleSearch}
                        >
                            Search
                        </button>
                        {
                            showSearchPreview
                            && (
                                <SearchPreview searchResults={searchResults} />
                            )
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default PickupLocationForm;
