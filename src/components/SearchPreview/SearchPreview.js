// @flow
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

type searchResult = {
    country: string,
    bookingId: number,
    city: string,
    iata: ?string,
    name: string,
    placeType: ?string,
    region: ?string,
};

type Props = {
    searchResults: Array<searchResult>,
    onClick: Function,
    onMouseOut: Function,
    onMouseOver: Function,
};

const SearchPreview = (props: Props) => {
    const {
        searchResults,
        onClick,
        onMouseOut,
        onMouseOver,
    } = props;

    if (searchResults && !searchResults.length) {
        return (
            <h1>
                Loading...
            </h1>
        );
    }

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
                    && searchResults
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
};

export default SearchPreview;
