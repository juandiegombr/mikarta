import React from 'react'
import { render } from '@testing-library/react'
import App, { history } from 'App'
import { KEYS } from 'services/Storage'

test('renders learn react link', async () => {
  sessionStorage.setItem(KEYS.GAPI_REF, '1YKELqnmwQO8J7nD5p-IlovH4hYwA_smnvCW_bqrzxwc')
  const { findByText } = render(<App />)
  history.push('/restaurant/bar-pepe')

  await findByText('Tapeo')
})
