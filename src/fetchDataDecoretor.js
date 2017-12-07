import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';

const fetchData = () => {
  return (WrappedComponent) => {
    class Enhance extends React.Component {
      componentDidMount() {
        if (WrappedComponent.fetchData instanceof Function) {
          WrappedComponent.fetchData({
            dispatch: this.props.dispatch,
            match: this.props.match
          });
        }
      }
      render() {
        return React.createElement(
          WrappedComponent,
          this.props
        );
      }
    }

    return connect()(hoistNonReactStatic(Enhance, WrappedComponent));
  };
};

export default fetchData;
