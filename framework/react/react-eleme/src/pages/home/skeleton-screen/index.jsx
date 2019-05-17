

import React from 'react'
import EntrySk from '../../common-components/skeleton/entry'
import RowSk from '../../common-components/skeleton/row'

export default class SkeletionScreen extends React.PureComponent {
  render() {
    return (
      <div style={this.props.style}>
        <EntrySk />
        <div style={{ marginTop: 10 }}>
          <RowSk />
          <RowSk />
          <RowSk />
          <RowSk />
          <RowSk />
          <RowSk />
        </div>
      </div>
    )
  }
}
