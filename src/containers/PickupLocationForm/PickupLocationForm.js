/*
* PickupLocationForm component
* Renders the form where a user can
* search for a pickup location.
* */
import React, {Component} from "react";
import axios from "axios";
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

    handleChange = ( searchTerm ) => {
        if ( searchTerm.currentTarget.value && searchTerm.currentTarget.value.length >= 1 ) {
            this.setState({
                submissionError: "",
            });
        }

        if ( searchTerm.currentTarget.value && searchTerm.currentTarget.value.length >= 2 ) {
            this.setState( {
                searchTerm: searchTerm.currentTarget.value,
                showSearchPreview: true,
            } );
        } else {
            this.setState( {
                searchTerm: '',
                showSearchPreview: false,
            } );
        }
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

    onBlur = () => {
        if ( !this.state.focus ) {
            this.setState( {
                showSearchPreview: false,
            } );
        }
    };

    render() {
        const { showSearchPreview } = this.state;
        return (
            <div className="pickup-location-form">
                <h1>Let's find your ideal car</h1>
                <form action="" >
                    <div className="form-group">
                        <label htmlFor="pickup-location">Pick-up Location</label>
                        <input
                            type="text"
                            name="pickup-location"
                            className="form-control"
                            placeholder="city, airport, region, district..."
                            // value={ value ? value : '' }
                            onChange={ this.handleChange }
                            autoComplete="off"
                            onBlur={ this.onBlur }
                            onFocus={ this.handleChange }
                        />
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
                                <SearchPreview />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default PickupLocationForm;