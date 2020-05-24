import { mount, helpers } from 'utils/testing-library'
import { Tracker } from 'services/Tracker'

const mountCategoriesPage = () => mount({
  initialRoute: '/restaurant/bar-pepe',
})

afterEach(() => {
  sessionStorage.clear()
})

it('should send the proper events', async () => {
  const { findByText } = mountCategoriesPage()

  await findByText('Pepe')

  expect(Tracker.sendInteraction).toHaveBeenCalledWith('categories_view', { restaurantId: 'bar-pepe' })
})

it('should display the place information', async () => {
  const { container, findByText } = mountCategoriesPage()

  await findByText('Pepe')

  expect(container).toHaveTextContent('Restaurante')
  expect(container).toHaveTextContent('Pepe')
})

it('should display the project information', async () => {
  const message = 'Esta carta ha sido generada a través de la iniciativa solidaria Mikarta, un proyecto creado por un grupo de jóvenes valencianos para ayudar a bares y restaurantes ante la situación generada por la COVID-19, ofreciendo un servicio gratuito de cartas digitalizadas.Si quieres más información, escríbenos a mikarta.app@gmail.com'
  const { container, findByLabelText, getByRole } = mountCategoriesPage()

  await findByLabelText('Información de la iniciativa mikarta')
  helpers.openMikartaDialog(container)

  const dialog = getByRole('dialog')
  expect(dialog).toBeInTheDocument()
  expect(dialog).toHaveTextContent('mikarta.app@gmail.com')
  expect(dialog).toHaveTextContent(message)
})

it('should display the categories', async () => {
  const { container, findByText } = mountCategoriesPage()

  await findByText('Tapeo')

  expect(container).toHaveTextContent('Bocadillos')
  expect(container).toHaveTextContent('Tapeo')
  expect(container).toHaveTextContent('Bebidas')
})

it('should go to products page and dislay the proper products', async () => {
  const { container, findByText } = mountCategoriesPage()

  await findByText('Tapeo')
  helpers.goToCategory(container, 'Tapeo')
  await findByText('Patatas bravas')

  expect(container).toHaveTextContent('Patatas bravas')
  expect(container).toHaveTextContent('5.00 €')
  expect(container).not.toHaveTextContent('Chivito')
  expect(container).not.toHaveTextContent('Bocadillos')
  expect(container).not.toHaveTextContent('Tapeo')
  expect(container).not.toHaveTextContent('Bebidas')
})
