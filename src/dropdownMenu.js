const DDM = {}

const defaultFontSize = 2.4
const defaultMenuItemHeight = 3.8
const defaultMenuItemContainerWidth = 25
const defaultMenuItemContainerTop = 4

let _fontSize

// rem fontsize
DDM.make = (fontSize) => {
  _fontSize = fontSize
  const menuContainers = document.querySelectorAll('.menu-dropdown-container')

  for (const container of menuContainers) {
    buildMenu(container)
  }
}

const buildMenu = (container) => {
  container.style.cssText = `
    display: flex;
    font-size: ${_fontSize}rem;
    flex-direction: column;
    position: relative;
  `
  let defaultItem

  const menuSelect = document.createElement('div')
  const itemContainer = document.createElement('div')

  menuSelect.classList.add('menu-select')
  menuSelect.style.cssText = `
    display: flex;
    align-items: center;
    border: 1px solid rgb(177, 177, 177);
    box-sizing: border-box;
    height: ${(_fontSize * defaultMenuItemHeight) / defaultFontSize}rem;
    border-radius: 5px;
    padding: .8rem 1.6rem;
    user-select: none;
  `

  itemContainer.classList.add('menu-item-container')
  itemContainer.style.cssText = `
    display: flex;
    background-color: white;
    flex-direction: column;
    border: 1px solid rgb(177, 177, 177);
    padding: .8rem 0rem;
    border-radius: 5px;
    width: ${(_fontSize * defaultMenuItemContainerWidth) / defaultFontSize}rem;
    top:${(_fontSize * defaultMenuItemContainerTop) / defaultFontSize}rem;
    position: absolute;
  `

  for (const item of Array.from(container.children)) {
    item.style.cssText = `
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: ${(_fontSize * defaultMenuItemHeight) / defaultFontSize}rem;
      user-select: none;
      padding: .8rem 1.6rem;
    `

    if (item.classList.contains('default-item')) {
      defaultItem = item
      item.classList.remove('default-item')
    }
    item.addEventListener('click', () => {
      toggleMenuItems(container, itemContainer)
      menuSelect.textContent = item.textContent
      container.setAttribute('value', item.textContent)
    })
    item.addEventListener('mouseover', () => {
      item.style.backgroundColor = 'rgba(0, 0, 0, 0.144)'
    })
    item.addEventListener('mouseout', () => {
      item.style.backgroundColor = 'white'
    })
    item.remove()
    itemContainer.appendChild(item)
  }
  menuSelect.addEventListener('click', () =>
    toggleMenuItems(container, itemContainer)
  )
  menuSelect.addEventListener('mouseover', () => {
    menuSelect.style.backgroundColor = 'rgba(0, 0, 0, 0.144)'
  })
  menuSelect.addEventListener('mouseout', () => {
    menuSelect.style.backgroundColor = 'white'
  })
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
