import React from 'react';
import SearchPreviewItem from '../SearchPreviewItem/SearchPreviewItem';
import './SearchPreview.scss';

/*
* SearchPreview component
* Renders the drop-down of preview
* items based on a users input
*
* @param {Any} props - Holds the array of search previews
* */
const SearchPreview = ({ searchResults }) => {
    if (!searchResults.length) {
        return (
            <h1>
                Loading...
            </h1>
        );
    }

    return (
        <div className="search-preview">
            <ul>
                {
                    /* eslint-disable max-len */
                    searchResults
                        .map(result => <SearchPreviewItem key={result.bookingId} searchPreviewItem={result} />)
                }
            </ul>
        </div>
    );
};

export default SearchPreview;
