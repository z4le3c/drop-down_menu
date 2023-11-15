const DDM = {}

DDM.make = () => {
  const menuContainers = document.querySelectorAll('.menu-dropdown-container')

  for (const container of menuContainers) {
    buildMenu(container)
  }
}

const buildMenu = (container) => {
  let defaultItem

  const menuSelect = document.createElement('div')
  const itemContainer = document.createElement('div')

  menuSelect.classList.add('menu-select')
  itemContainer.classList.add('menu-item-container')
  for (const item of Array.from(container.children)) {
    if (item.classList.contains('default-item')) {
      defaultItem = item
      item.classList.remove('default-item')
    }
    item.addEventListener('click', () => {
      toggleMenuItems(container, itemContainer)
      menuSelect.textContent = item.textContent
      container.setAttribute('value', item.textContent)
    })
    item.remove()
    itemContainer.appendChild(item)
  }
  menuSelect.addEventListener('click', () =>
    toggleMenuItems(container, itemContainer)
  )
  menuSelect.textContent = defaultItem.textContent
  container.setAttribute('value', defaultItem.textContent)
  container.append(menuSelect)
}

const toggleMenuItems = (container, itemContainer) => {
  if (container.classList.contains('open')) {
    container.classList.remove('open')
    itemContainer.remove()
  } else {
    container.classList.add('open')
    container.appendChild(itemContainer)
  }
}

export { DDM }
