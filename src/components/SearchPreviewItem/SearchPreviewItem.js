import React from "react";
import Aux from "../../hoc/Auxiliary";

const SearchPreviewItem = (props) => {
    const { searchPreviewItem } = props;
    let placeType = "";

    switch (searchPreviewItem.placeType) {
        case "A":
            placeType = "Airport";
            break;
        case "C":
            placeType = "City";
            break;
        case "D":
            placeType = "District";
            break;
        case "S":
            placeType = "Station";
            break;
        case "P":
            placeType = "Place";
            break;
        default:
            placeType = "Airport";
            break;
    }

    return (
        <Aux>
            <li>
                <div className="row">
                    <div className="col-2">
                        <span className={`tag-${searchPreviewItem.placeType} align-center`}>
                            {placeType}
                        </span>
                    </div>
                    <div className="col-10">
                        <p>{`${searchPreviewItem.name} ${("iata" in searchPreviewItem) ? `(${searchPreviewItem.iata})` : ''}`}
                            <br />
                            {
                                ("city" in searchPreviewItem) ?
                                    `${searchPreviewItem.city}, `
                                    :
                                    `${searchPreviewItem.region}, `
                            }
                            { `${searchPreviewItem.country}` }
                        </p>
                    </div>
                </div>
            </li>
        </Aux>
    );
};

export default SearchPreviewItem;