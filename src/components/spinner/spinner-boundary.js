import React from 'react';
import Spinner from './spinner';
const SpinnerBoundary = props => {
    if (props.isLoaded) {
        return props.children;
    }
    else
        return <Spinner />
};

export default SpinnerBoundary;
