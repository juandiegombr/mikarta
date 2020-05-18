import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import App, { history } from 'App'

const withPortal = () => {
  if (document.getElementById('dialog')) { return }
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'dialog')
  document.body.appendChild(portalRoot)
}

const mount = () => {
  withPortal()
  history.push('/restaurant/bar-pepe')
  return render(<App/>)
}

afterEach(() => {
  sessionStorage.clear()
})

it('should display the place information', async () => {
  const { container, findByText } = mount()

  await findByText('Pepe')

  expect(container).toHaveTextContent('Restaurante')
  expect(container).toHaveTextContent('Pepe')
})

it('should display the project information', async () => {
  const message = 'Esta carta ha sido generada a través de la iniciativa solidaria Mikarta, un proyecto creado por un grupo de jóvenes valencianos para ayudar a bares y restaurantes ante la situación generada por la COVID-19, ofreciendo un servicio gratuito de cartas digitalizadas.Si quieres más información, escríbenos a mikarta.app@gmail.com'
  const { findByLabelText, getByRole } = mount()

  const infoButton = await findByLabelText('Información de la iniciativa mikarta')
  fireEvent.click(infoButton)

  const dialog = getByRole('dialog')
  expect(dialog).toBeInTheDocument()
  expect(dialog).toHaveTextContent('mikarta.app@gmail.com')
  expect(dialog).toHaveTextContent(message)
})

it('should display the categories', async () => {
  const { container, findByText } = mount()

  await findByText('Tapeo')

  expect(container).toHaveTextContent('Bocadillos')
  expect(container).toHaveTextContent('Tapeo')
  expect(container).toHaveTextContent('Bebidas')
})

it('should go to products page and dislay the proper products', async () => {
  const { container, findByText } = mount()

  const categoryButton = await findByText('Tapeo')
  fireEvent.click(categoryButton)
  await findByText('Patatas bravas')

  expect(container).toHaveTextContent('Patatas bravas')
  expect(container).toHaveTextContent('5.00 €')
  expect(container).not.toHaveTextContent('Chivito')
  expect(container).not.toHaveTextContent('Bocadillos')
  expect(container).not.toHaveTextContent('Tapeo')
  expect(container).not.toHaveTextContent('Bebidas')
})
