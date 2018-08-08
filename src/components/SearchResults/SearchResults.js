/*
* SearchResults component
* Renders the list of search results
* */
import React, {Component} from "react";
import queryString from "query-string";

class SearchResults extends Component {
    componentDidMount() {
        console.log( "PROPS", this.props );
        console.log( "STATE", this.state );
    }
    
    render() {
        return(
            <div>
                <h1>SearchResults</h1>
                {
                    // console.log( "PROPS", props )
                }
            </div>
        );
    }
}

export default SearchResults;