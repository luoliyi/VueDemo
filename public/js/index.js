let todoLists = []
let currentDom = null
$('todoInput').onkeydown = function (e) {
  let ev = document.all ? window.event : e
  if (ev.keyCode === 13) {
    currentDom = this.children[0]
    todoLists.push({
      content: currentDom.value,
      status: 0
    })
    if (todoLists.length > 0) {
      _className('todoCheck')[0].children[0].style.display = 'block'
      _className('navContainer')[0].style.display = 'block'
    }
    currentDom.value = ''
    render('all')
    loadCount(1)
  }
}

function render (type) {
  _className('ulContainer')[0].children[0].innerHTML = ''
  let typeList = []
  let imageSrc = ''
  if (type === 'all') {
    typeList = todoLists
    loadCount(1)
  } else if (type === 'Active') {
    typeList = todoLists.filter((item) => item.status === 0)
    loadCount(1)
  } else if (type === 'Completed') {
    typeList = todoLists.filter((item) => item.status === 1)
    loadCount(0)
  }
  for (let i = 0; i < typeList.length; i++) {
    if (typeList[i].status === 1) {
      imageSrc = 'images/bb.png'
    } else {
      imageSrc = 'images/aa.png'
    }
    $('ul').innerHTML += renderOne(i, typeList[i].content, imageSrc)
  }
  console.log(typeList)
}

// eslint-disable-next-line no-unused-vars
function changeStatus (index) {
  if (todoLists[index].status === 0) {
    todoLists[index].status = 1
  } else {
    todoLists[index].status = 0
  }

  render('all')
  loadCount(1)
}

// eslint-disable-next-line no-unused-vars
function delOne (index) {
  todoLists.splice(index, 1)
  render('all')
}

function loadCount (type) {
  // 0 未 1 已
  _className('count')[0].innerHTML = todoLists.filter((item) => item.status !== type).length.toString()
}

// eslint-disable-next-line no-unused-vars
function clearCompleted () {
  todoLists = todoLists.filter((item) => item.status === 0)
  render('all')
}

// eslint-disable-next-line no-unused-vars
function editOne (index, me) {
  todoLists[index].content = me.value
  render('all')
}

function $ (id) {
  return document.getElementById(id)
}

function _className (_className) {
  return document.getElementsByClassName(_className)
}

function renderOne (index, content, image) {
  return "<li><img src='" + image + "' onclick=changeStatus('" + index + "') />" +
    "<input type='text' class='li-value' onblur=editOne('" + index + "',this) value='" + content + "' />" +
    "<b onclick=delOne('" + index + "')>×</b></li>"
}
