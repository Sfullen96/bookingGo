/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
* SearchPreviewItem - Renders a single results
* drop-down item
* */
import React from 'react';
import Aux from '../../hoc/Auxiliary';

const SearchPreviewItem = (props) => {
    const { searchPreviewItem, onClick } = props;
    let placeType = '';
    let placeTypeIcon = '';

    if (searchPreviewItem && searchPreviewItem.placeType) {
        // Switch the placeType to get the correct string to display in the tag
        switch (searchPreviewItem.placeType) {
        case 'A':
            placeType = 'Airport';
            placeTypeIcon = 'plane';
            break;
        case 'C':
            placeType = 'City';
            placeTypeIcon = 'building';
            break;
        case 'D':
            placeType = 'District';
            placeTypeIcon = 'compass';
            break;
        case 'S':
            placeType = 'Station';
            placeTypeIcon = 'train';
            break;
        case 'P':
            placeType = 'Place';
            placeTypeIcon = 'map-market-alt';
            break;
        default:
            placeType = 'Airport';
            placeTypeIcon = 'plane';
            break;
        }
    }

    if (searchPreviewItem) {
        return (
            <Aux>
                <li onClick={() => onClick(searchPreviewItem)}>
                    <div className="row d-flex align-items-center h-100">
                        <div className="col-1 col-sm-2">
                            <span
                                className={`tag tag-${searchPreviewItem && searchPreviewItem.placeType && searchPreviewItem.placeType} align-center d-none d-sm-block`}
                            >
                                {placeType}
                            </span>
                            <span
                                className="align-center d-block d-sm-none"
                            >
                                <i className={`fa fa-${placeTypeIcon}`} />
                            </span>
                        </div>
                        <div className="col-10">
                            <span className="item-info">
                                {`${searchPreviewItem && searchPreviewItem.name && searchPreviewItem.name} ${('iata' in searchPreviewItem) ? `(${searchPreviewItem.iata})` : ''}`}
                            </span>
                            <span className="item-info">
                                {
                                    ('city' in searchPreviewItem)
                                        ? `${searchPreviewItem.city}, `
                                        : `${searchPreviewItem.region}, `
                                }
                                {`${searchPreviewItem.country}`}
                            </span>
                        </div>
                    </div>
                </li>
            </Aux>
        );
    }
};

export default SearchPreviewItem;
