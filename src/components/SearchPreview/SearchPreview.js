import React from "react";
import SearchPreviewItem from "../SearchPreviewItem/SearchPreviewItem";
import "./SearchPreview.scss";

/*
* SearchPreview component
* Renders the drop-down of preview
* items based on a users input
*
* @param {Any} props - Holds the array of search previews
* */
const SearchPreview = props => {
    if (!props.searchResults.length) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="search-preview">
            <ul>
                {
                    props
                        .searchResults
                        .map( (result, index)=> {
                            return (
                                <SearchPreviewItem key={index} searchPreviewItem={result} />
                            );
                        })
                }
            </ul>
        </div>
    );
};

export default SearchPreview;