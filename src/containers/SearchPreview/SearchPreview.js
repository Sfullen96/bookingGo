import React, { Component } from 'react';
import SearchPreviewItem from '../../components/SearchPreviewItem/SearchPreviewItem';
import './SearchPreview.scss';

/*
* SearchPreview component
* Renders the drop-down of preview
* items based on a users input
*
* @param {Any} props - Holds the array of search previews
* */
class SearchPreview extends Component {
    // eslint-disable-next-line consistent-return
    componentDidMount() {
        const { searchResults } = this.props;

        if (!searchResults.length) {
            return (
                <h1>
                    Loading...
                </h1>
            );
        }
    }

    render() {
        const {
            searchResults,
            onClick,
            onMouseOut,
            onMouseOver,
        } = this.props;
        return (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <div
                className="search-preview"
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            >
                <ul>
                    {
                        searchResults
                            .map(result => (
                                <SearchPreviewItem
                                    key={result.bookingId}
                                    searchPreviewItem={result}
                                    onClick={onClick}
                                />
                            ))
                    }
                </ul>
            </div>
        );
    }
}

export default SearchPreview;
