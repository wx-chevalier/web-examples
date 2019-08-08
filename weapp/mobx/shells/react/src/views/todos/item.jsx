import React from 'react'
import { observer } from 'mobx-react'
import styles from 'src/css/todos'
import classnames from 'classnames'
const debug = require('debug')('React:Todos:item')

export default observer(function Todo ({ todo }) {
  debug('Todo:todo.uid = ' + todo.uid)
  return (
    <li className={ classnames(styles.todo, { [styles.isFinish]: todo.isFinish }) } onClick={ () => todo.toggle() } >
      <a href="#" className={ styles.toggle } ></a>
      { todo.content }
    </li>
  )
})
