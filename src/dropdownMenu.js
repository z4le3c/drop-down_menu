const DDM = {}

DDM.makeDropDownMenus = () => {
  const menuContainers = document.querySelectorAll('.menu-dropdown-container')

  for (const container of menuContainers) {
    buildMenu(container)
  }
}

const buildMenu = (container) => {
  let defaultItem
  const items = []
  const menuSelect = document.createElement('div')
  menuSelect.classList.add('menu-select')
  for (const item of Array.from(container.children)) {
    if (item.classList.contains('default-item')) {
      defaultItem = item
      item.classList.remove('default-item')
    }
    // TODO add event to item menu when clicked
    item.addEventListener('click', () => {
      toggleMenuItems(menuSelect, container, items)
      menuSelect.textContent = item.textContent
    })
    items.push(item)
    item.remove()
  }
  menuSelect.addEventListener('click', () =>
    toggleMenuItems(menuSelect, container, items)
  )
  menuSelect.textContent = defaultItem.textContent
  container.append(menuSelect)
}

const toggleMenuItems = (menuSelect, container, items) => {
  if (menuSelect.classList.contains('open')) {
    menuSelect.classList.remove('open')
    for (const item of items) {
      item.remove()
    }
  } else {
    menuSelect.classList.add('open')
    for (const item of items) {
      container.append(item)
    }
  }
}

export { DDM }
