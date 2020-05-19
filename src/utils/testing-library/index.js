import React from 'react'
import { render, fireEvent, getByText, getByLabelText } from '@testing-library/react'
import App, { history } from 'App'

const withPortal = () => {
  if (document.getElementById('dialog')) { return }
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'dialog')
  document.body.appendChild(portalRoot)
}

export const mount = ({ Component = App, initialRoute = '/' } = {}) => {
  if (!Component) {
    throw new Error('Missing component in mount function')
  }
  withPortal()
  history.push(initialRoute)
  return render(<Component/>)
}

export const helpers = {
  goToCategories: container => {
    fireEvent.click(getByText(container, 'Categorías'))
  },
  goToCategory: (container, categoryName) => {
    fireEvent.click(getByText(container, categoryName))
  },
  openAllergiesDialog: (container, productName) => {
    fireEvent.click(getByLabelText(container, `${ productName }: listado de alergias`))
  },
  openMikartaDialog: container => {
    fireEvent.click(getByLabelText(container, 'Información de la iniciativa mikarta'))
  },
}
