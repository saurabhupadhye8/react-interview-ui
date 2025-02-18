import { render, waitFor } from '@testing-library/react'
import App from './App'

import WidgetList from './components/WidgetList'

jest.mock('./components/WidgetList')

describe('App', () => {
  it('renders WidgetList', async () => {
    render(<App />)

    await waitFor(() => {
      expect(WidgetList).toHaveBeenCalled()
    })
  })
})
