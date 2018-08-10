import React from 'react';
import Aux from '../../hoc/Auxiliary';

const SearchPreviewItem = (props) => {
    const { searchPreviewItem } = props;
    let placeType = '';

    switch (searchPreviewItem.placeType) {
    case 'A':
        placeType = 'Airport';
        break;
    case 'C':
        placeType = 'City';
        break;
    case 'D':
        placeType = 'District';
        break;
    case 'S':
        placeType = 'Station';
        break;
    case 'P':
        placeType = 'Place';
        break;
    default:
        placeType = 'Airport';
        break;
    }

    return (
        <Aux>
            <li>
                <div className="row d-flex align-items-center h-100">
                    <div className="col-2">
                        <span className={`tag tag-${searchPreviewItem.placeType} align-center`}>
                            {placeType}
                        </span>
                    </div>
                    <div className="col-10">
                        <span className="item-info">
                            {`${searchPreviewItem.name} ${('iata' in searchPreviewItem) ? `(${searchPreviewItem.iata})` : ''}`}
                        </span>
                        <span className="item-info">
                            {
                                ('city' in searchPreviewItem)
                                    ? `${searchPreviewItem.city}, `
                                    : `${searchPreviewItem.region}, `
                            }
                            { `${searchPreviewItem.country}` }
                        </span>
                    </div>
                </div>
            </li>
        </Aux>
    );
};

export default SearchPreviewItem;
