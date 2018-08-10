/* eslint-disable jsx-a11y/label-has-for */
/*
* PickupLocationForm component
* Renders the form where a user can
* search for a pickup location.
* */
import React, { Component } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import SearchPreview from '../../components/SearchPreview/SearchPreview';
import './PickupLocationForm.scss';

class PickupLocationForm extends Component {
    constructor() {
        super();

        this.state = {
            showSearchPreview: false,
            submissionError: '',
            submissionSuccess: false,
            searchResults: null,
            isFetching: false,
            value: '',
            previewHover: false,
        };
    }

    /*
    * OnBlur - called when the input field is blurred
    * (user clicks out of it). As long as the user is not
    * currently hovering over the dropdown box of results
    * the search results dropdown will be hidden
    * */
    onBlur = () => {
        const { previewHover } = this.state;
        // If not hovering over the dropdown
        if (!previewHover) {
            // Hide the dropdown
            this.setState({
                showSearchPreview: false,
            });
        }
    };

    /*
    * onFocus - called when a user clicks into
    * the input field. Used to re-show the results
    * if they've been hidden by the blur function
    *
    * @param {Event} e - The triggered event
    * */
    onFocus = (e) => {
        // If the length of the inputted string is greater than 2 characters
        if (e.target.value.length > 2) {
            // Show the results again
            this.setState({
                showSearchPreview: true,
            });
        } else {
            // Manually trigger the onchange event
            this.handleChange(e);
        }
    };

    /*
    * onPreviewHover - called when the onMouseOver
    * event is triggered on the search preview dropdown
    * it sets in state that the user is currently hovering
    * over the dropdown so that if the user clicks a result
    * (which triggers the blur event) the onblur function
    * knows not to hide the dropdown.
    * */
    onPreviewHover = () => {
        this.setState({
            previewHover: true,
        });
    };

    /*
    * onPreviewMouseOut - called when the onMouseOut
    * event is triggered on the search preview dropdown.
    * sets in state that the user has finished hovering over
    * the dropdown so in the event that blur is called the
    * onblur function knows to hide the dropdown.
    * */
    onPreviewMouseOut = () => {
        this.setState({
            previewHover: false,
        });
    };

    /*
    * handleSearch - triggered when the user clicks the search
    * button to submit the form. Checks if there is a value in
    * the input, and rejects with an error if so, if there is a
    * value the form submission would continue.
    *
    * @param {Event} e
    * */
    handleSearch = (e) => {
        const { value } = this.state;

        e.preventDefault();

        // If nothing entered in the input
        if (!value.length) {
            this.setState({
                submissionError: 'Please enter a pickup location',
            });
        } else {
            this.setState({
                submissionSuccess: `Successfully submitted search for: ${value}`,
            });
        }
    };

    /*
    * handleChange - called when the onChange event
    * is triggered on the input. The module 'react-debounce-input'
    * handles the debouncing of the API request on change.
    *
    * @param {Event} e
    * */
    handleChange = (e) => {
        // Keep the controlled input's value consistent in state
        this.setState({
            value: e.target.value,
        });

        const { isFetching } = this.state;

        // reset the submission error as soon as someone has started typing
        if (e.target.value && e.target.value.length >= 1) {
            this.setState({
                submissionError: '',
            });
        }

        if (
            e.target.value // If there is a value set
            && e.target.value.length > 2 // and that value is greater than 2 characters
            && !isFetching // and not already fetching
        ) {
            this.setState({
                isFetching: true,
            });

            // Make the API request with axios
            axios
                .get(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${e.target.value}`)
                .then((response) => {
                    // Make sure some data is returned
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
                showSearchPreview: false,
            });
        }
    };

    /*
    * handleSearchResultClick - called when a user
    * clicks a search result. Handles changing the
    * input value in state to the user's selection
    *
    * @param {Object} item - the search result item
    * */
    handleSearchResultClick = (item) => {
        // create the string to be displayed
        const string = `${item.name}${('iata' in item) ? ` (${item.iata})` : ''}, ${('city' in item) ? `${item.city},` : `${item.region},`} ${item.country}`;

        this.setState({
            value: string,
            showSearchPreview: false,
            previewHover: false,
        });
    };

    render() {
        const {
            showSearchPreview,
            isFetching,
            submissionError,
            searchResults,
            value,
            submissionSuccess,
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
                        <DebounceInput
                            id="pickup-location"
                            type="text"
                            name="pickup-location"
                            className="form-control"
                            debounceTimeout={300}
                            placeholder="city, airport, region, district..."
                            // onBlur={this.onBlur}
                            onChange={this.handleChange}
                            autoComplete="off"
                            value={value}
                            forceNotifyOnBlur={false}
                            onFocus={this.onFocus}
                        />
                        {
                            // If currently fetching from the API show spinner
                            isFetching
                            && (
                                <span className="input-loader">
                                    <i className="fa fa-spinner fa-spin" />
                                </span>
                            )
                        }
                        {
                            // If there was an error on submission, show it
                            submissionError
                            && (
                                <span className="form-error">
                                    {submissionError}
                                </span>
                            )
                        }
                        {
                            // If the submission was successful, show it
                            submissionSuccess
                            && (
                                <span className="form-error">
                                    {submissionSuccess}
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
                                /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
                                <SearchPreview
                                    searchResults={searchResults}
                                    onClick={this.handleSearchResultClick}
                                    onMouseOver={this.onPreviewHover}
                                    onMouseOut={this.onPreviewMouseOut}
                                />
                            )
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default PickupLocationForm;
