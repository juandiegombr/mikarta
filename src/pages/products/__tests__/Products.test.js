import { within } from '@testing-library/react'
import { mount, helpers } from 'utils/testing-library'
import { Tracker } from 'services/Tracker'

const mountProductsPage = () => mount({
  initialRoute: '/restaurant/bar-pepe/category/tapeo',
})

afterEach(() => {
  sessionStorage.clear()
  Tracker.sendInteraction.mockClear()
})

it('should send the proper events', async () => {
  const { findByText } = mountProductsPage()

  await findByText('Patatas bravas')

  expect(Tracker.sendInteraction).toHaveBeenCalledWith('products_view', { restaurantId: 'bar-pepe', categoryId: 'tapeo' })
})

it('should display the products information', async () => {
  const { container, findByText, getByLabelText } = mountProductsPage()

  await findByText('Patatas bravas')

  expect(container).toHaveTextContent('Patatas bravas')
  expect(container).toHaveTextContent('5.00 €')
  expect(getByLabelText('Patatas bravas: listado de alergias')).toBeInTheDocument()
})

it('should show the allergies dialog when clicks on the allergies dots', async () => {
  const { container, findByText, getByRole } = mountProductsPage()

  await findByText('Morro de cerdo')
  helpers.openAllergiesDialog(container, 'Morro de cerdo')

  const allergiesDialog = getByRole('dialog')
  const inAllergiesDialog = within(allergiesDialog)
  expect(inAllergiesDialog.getByRole('list')).toBeInTheDocument()
  const [ firstAllergy, secondAllergy, thirdAllergy ] = inAllergiesDialog.getAllByRole('listitem')
  expect(firstAllergy).toHaveTextContent('Gluten')
  expect(secondAllergy).toHaveTextContent('Crustáceos')
  expect(thirdAllergy).toHaveTextContent('Pescados')
})

it('should display the bottom menu information', async () => {
  const { findByText, getByRole } = mountProductsPage()

  await findByText('Patatas bravas')

  expect(getByRole('complementary')).toBeInTheDocument()
  expect(getByRole('link')).toHaveTextContent('Categorías')
})

it('should go to the categories page when click on "Categorías"', async () => {
  const { container, findByText } = mountProductsPage()

  await findByText('Categorías')
  helpers.goToCategories(container)
  await findByText('Pepe')

  expect(container).toHaveTextContent('Pepe')
  expect(container).toHaveTextContent('Restaurante')
})
