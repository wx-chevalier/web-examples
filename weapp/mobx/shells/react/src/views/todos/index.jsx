import React from 'react'
import { observer } from 'mobx-react'
import todosStore from 'store/todos'
import styles from 'src/css/todos'
import Todo from './item'
const debug = require('debug')('React:Todos')

/**
 * Todo列表组件
 * @type {React.Component}
 */
class TodosView extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
  }

  addTodo() {
    const input = this.refs.input
    if (todosStore.add(input.value)) {
      // 清空输入框
      input.value = ''
    }
  }

  render() {
    debug('render')

    const items = todosStore.items
    return (
      <div>
        total: { items.length }
        <ul className={ styles.todos }>
          {
            items.map(todo => <Todo key={ todo.uid } todo={ todo } />)
          }
        </ul>
        add: <input className={ styles.input } type="text" ref="input"/>
        <button className={ styles.button } onClick={ this.addTodo }>添加</button>
      </div>
    )
  }
}

export default observer(TodosView, styles)
