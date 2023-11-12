const body = document.querySelector('body')

const DDM = {}

DDM.newDDM = (...options) => {
  const _ddMenu = {}

  const _options = []
  let _toggled = false

  for (const option of options) {
    _options.push(option)
  }

  const optionSelectContainer = document.createElement('div')
  const optionSelect = document.createElement('div')

  optionSelectContainer.classList.add('option-select-container')
  optionSelect.classList.add('option-select')

  optionSelect.textContent = `${_options[0]} <`
  optionSelect.addEventListener('click', () => {
    //  add menu options
    if (!_toggled) {
      optionSelect.textContent = `${_options[0]} >`
      for (const option of _options) {
        optionSelectContainer.appendChild(buildMenuOption(option))
      }
      _toggled = true
    } else {
      // delete menu option if menu is open
      optionSelect.textContent = `${_options[0]} <`
      for (const option of document.querySelectorAll('.menu-option')) {
        option.remove()
      }
      _toggled = false
    }
  })

  optionSelectContainer.appendChild(optionSelect)

  body.appendChild(optionSelectContainer)

  return _ddMenu
}

const buildMenuOption = (text) => {
  const menuOption = document.createElement('div')
  menuOption.classList.add('menu-option')
  menuOption.textContent = text
  // TODO add event listener
  return menuOption
}

export { DDM }
