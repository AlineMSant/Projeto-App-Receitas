import React, { Component } from 'react';

export class provider extends Component {
  render() {
    return (
      <div>provider</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(provider);
