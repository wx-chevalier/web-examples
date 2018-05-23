import React from 'react'
import { observer } from 'mobx-react'
import todosStore from 'store/todos'
const debug = require('debug')('React:ClearBtn')

function ClearBtn() {
  debug('render')
  return (
    <button onClick={ () => todosStore.clear() }>
      clear: { todosStore.items.length }
    </button>
  )
}

export default observer(ClearBtn)
