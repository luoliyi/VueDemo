<template>
  <div id="app">
    <section class="todoApp">
      <header class="header">
        <h1>todoLists</h1>
        <input class="new-todo" placeholder="请输入您的任务?" autofocus @keyup.enter="addOne" v-model="newTask">
      </header>
      <section class="main">
        <input class="toggle-all" type="checkbox" @change="toggleAll" v-model="all">
        <label>Mark all as complete</label>
        <ul class="todo-list">
          <li v-for="(item,index) in myTasks" :key="index" :class="{completed:item.isCompleted,editing:index === myIndex}">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.isCompleted">
              <label @dblclick="edit(index)">{{item.name}}</label>
              <button class="destroy" @click="delOne(index)"></button>
            </div>
            <input class="edit" v-model="item.name" @keyup.enter="save">
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count"><strong>{{count}}</strong> item left</span>
        <ul class="filters">
          <li>
            <a :class="{selected:myShow === 1}"  href="#/" @click="myShowList(1)">All</a>
          </li>
          <li>
            <a  :class="{selected:myShow === 2}" href="#/active" @click="myShowList(2)">Active</a>
          </li>
          <li>
            <a :class="{selected:myShow === 3}" href="#/completed" @click="myShowList(3)">Completed</a>
          </li>
        </ul>
        <a-button size="small" class="clear-completed" type="primary" @click="clearCompleted">Clear completed</a-button>
      </footer>
    </section>
    <Test/>
  </div>
</template>
<script>
import { Button, Message } from 'ant-design-vue'
import Test from './views/Test'
export default {
  name: 'app',
  // eslint-disable-next-line vue/no-unused-components
  components: { Test, AButton: Button, Message },
  data () {
    return {
      tasks: [
        { name: '学习react', isCompleted: false },
        { name: '学习vue', isCompleted: false },
        { name: '学习http协议', isCompleted: true },
        { name: '学习浏览器渲染过程', isCompleted: false }
      ],
      newTask: '',
      all: false,
      myShow: 1,
      myIndex: -1
    }
  },
  computed: {
    count () {
      return this.tasks.filter(item => item.isCompleted === false).length
    },
    myTasks () {
      if (this.myShow === 1) { // 全选
        return this.tasks
      } else if (this.myShow === 2) { // 只显示未完成
        return this.tasks.filter(item => item.isCompleted === false)
      } else { // 只显示已完成
        return this.tasks.filter(item => item.isCompleted === true)
      }
    }
  },
  methods: {
    delOne (index) {
      this.tasks.splice(index, 1)
    },
    addOne () {
      if (this.newTask === '') {
        return false
      }
      this.tasks.push({ name: this.newTask, isCompleted: false })
      this.newTask = ''
    },
    toggleAll () {
      let that = this
      this.tasks = this.tasks.map((item) => {
        item.isCompleted = that.all
        return item
      })
    },
    // 清空已完成
    clearCompleted () {
      this.tasks = this.tasks.filter(item => item.isCompleted === false)
      Message.success('清空历史数据成功', 3)
    },
    // 按状态进行切换数据
    myShowList (type) {
      this.myShow = type
    },
    edit (index) {
      this.myIndex = index
    },
    save () {
      this.myIndex = -1
    }
  }
}
</script>
<style>
</style>
