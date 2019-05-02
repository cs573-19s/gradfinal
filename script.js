// global variables
// 这个array储存的是，当点击右边的button，会toggle的所有section的id
const toggleList = ['sidebarSection', 'content', 'filterSection', 'appSection']
// 这个用来储存用户选中的filter的value
const selectedFilter = {
  source: '',
  category: '',
  ranking: '',
  rate: '',
}
//这个是左边filter列表的选项
const filterList = {
  source: ['Google Play', 'Apple Store'],
  category: ['Game', 'Networking', 'Game'],
  ranking: [],
  rate: [],
}
// 选中的app
const selectedApp = {
  first: 'NA',
  second: 'NA',
}

//这边是用来存放测试用的app的，你往里面加app会显示在中间
const mockAppList = [
  {
    name: 'Minecraft',
    url: 'https://i.pinimg.com/236x/da/84/c2/da84c206c2019448521379d2ff837774--minecraft-app-mojang-minecraft.jpg',
  },
  {
    name: 'The binding of Issac',
    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/61/a0/79/61a07964-1a56-3a6e-f575-701c24510799/pr_source.png/246x0w.png',
  },
]

window.onload= function() {
  const button = document.getElementById('right_arrow')
  button.addEventListener('click', _ => forTheHorde())
  const app1 = document.getElementById('app1Icon')
  app1.addEventListener('click', _ => removeApp('first'))
  const app2 = document.getElementById('app2Icon')
  app2.addEventListener('click', _ => removeApp('second'))
  initiateFilter()
  initiateMockApp()
}

// render 测试用的在中间的app icon
function initiateMockApp() {
  const center = document.getElementById('centerSection')
  mockAppList.forEach((app, index) => {
    const div = document.createElement("DIV")
    div.classList.add('icon')
    div.style.backgroundImage = `url("${app.url}")`
    div.addEventListener('click', _ => updateApp(index))
    center.appendChild(div)
  })
}

// 更新用户选中和移除的app
function updateApp(index) {
  if (selectedApp.first === 'NA') {
    selectedApp.first = index
  } else if (selectedApp.second === 'NA') {
    selectedApp.second = index
  } else {
    selectedApp.first = index
  }
  console.log(selectedApp)
  renderCompareAppSection()
}

function removeApp(index) {
  selectedApp[index] = 'NA'
  renderCompareAppSection()
}

function renderCompareAppSection() {
  const app1 = document.getElementById('app1Icon')
  const contentapp1 = document.getElementById('contentApp1Icon')
  const app2 = document.getElementById('app2Icon')
  const contentapp2 = document.getElementById('contentApp2Icon')
  if (selectedApp.first !=='NA') {
    app1.style.backgroundImage = `url("${mockAppList[selectedApp.first].url}")`
    contentapp1.style.backgroundImage = `url("${mockAppList[selectedApp.first].url}")`
  } else {
    app1.style.backgroundImage = null
    contentapp1.style.backgroundImage = null
  }
  if (selectedApp.second !=='NA') {
    app2.style.backgroundImage = `url("${mockAppList[selectedApp.second].url}")`
    contentapp2.style.backgroundImage = `url("${mockAppList[selectedApp.second].url}")`
  } else {
    contentapp2.style.backgroundImage = null
    app2.style.backgroundImage = null
  }
}

// render filter section
function initiateFilter() {
  Object.keys(filterList).forEach(id => {
    const div = document.getElementById(id)
    filterList[id].forEach((name, index) => {
      const p = document.createElement("P")
      p.setAttribute('id', 'index')
      p.innerText = name
      p.addEventListener('click', _ => fireFromFilter(id, name))
      p.classList.add('filterTextNode')
      div.appendChild(p)
    })
  })
}

// 按下按钮后，调整所有需要变化的section的class
function forTheHorde() {
  toggleList.forEach(id => document.getElementById(id).classList.toggle('collapsed'))
  const arrow = document.getElementById('right_arrow')
  arrow.innerText === '<' ? (arrow.innerText = '>') : (arrow.innerText = '<')
}

// 当用户选中一个filter，例如souce里的google store，render label section, hide filter section
function fireFromFilter(section, name) {
  selectedFilter[section] = name
  renderLabelSection()
  // hide filter section
  showAndHideSection(section)
}

// render label section
function renderLabelSection() {
  const {source, category, ranking, rate} = selectedFilter
  const labelSection = document.getElementById('labelSection')
  while (labelSection.lastChild) {
    labelSection.removeChild(labelSection.lastChild);
  }
  const newLabelContainer = document.createElement('DIV')
  newLabelContainer.setAttribute('id', 'labelContainer')
  source && appendNewLabel(newLabelContainer, source, 'source')
  category && appendNewLabel(newLabelContainer, category, 'category')
  ranking && appendNewLabel(newLabelContainer, ranking, 'ranking')
  rate && appendNewLabel(newLabelContainer, rate, 'rate')
  labelSection.append(newLabelContainer)
}

// add label to label section
function appendNewLabel(node, value, section) {
  const div = document.createElement("DIV")
  div.classList.add('labelNode')
  const p = document.createElement("P")
  p.innerText = value
  div.appendChild(p)
  node.append(div)
  const deleteBtn = document.createElement("P")
  deleteBtn.innerText = 'X'
  deleteBtn.classList.add('deleteBtn')
  deleteBtn.addEventListener('click', _ => {
    showAndHideSection(section)
    selectedFilter[section] = ''
    renderLabelSection()
  })
  div.appendChild(deleteBtn)
}

// hide filter section
function showAndHideSection (section) {
  const removeSection = document.getElementById(section)
  removeSection.classList.toggle('hidden')
}
