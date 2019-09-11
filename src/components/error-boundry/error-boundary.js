import React, { PureComponent } from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends PureComponent {
    state = {
        hasError: false,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
    }
    render() {
        const { hasError } = this.state;
        if (hasError) return <ErrorIndicator />;
        return this.props.children;
    }
}
