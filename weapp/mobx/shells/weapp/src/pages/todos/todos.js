import { store } from '../../lib/logic'
import mobxPage from '../../utils/mobxPage'

const todos = store.todos
mobxPage({
  data: {
    todoInput: ''
  },

  /**
   * 从store获取数据，这部分数据将和store一直一致
   * @return {Object} 返回数据将被setData
   */

  autoData() {
    return {
      items: todos.items
    }
  },

  /**
   * 添加一个todo
   */

  addTodo() {
    if (todos.add(this.data.todoInput)) {
      this.setData({
        todoInput: ''
      })
    }
  },

  bindinput(event) {
    this.setData({
      todoInput: event.detail.value
    })
  },

  todoToggle(event) {
    const uid = event.target.dataset.uid
    const todo = todos.items.find(todo => todo.uid === uid)
    if (todo) {
      todo.toggle()
    }
  }
})
