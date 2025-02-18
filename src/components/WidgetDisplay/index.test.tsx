import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Widget } from '../../lib/apiConnect'
import WidgetDisplay from './index'

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}))

describe('WidgetDisplay', () => {
  it('displays all widget information', async () => {
    const widget: Widget = { description: 'German movie star', name: 'Widget von Hammersmark', price: 19.45 }

    render(<WidgetDisplay widget={widget} handleDelete={jest.fn()} />)

    expect(screen.getByText(widget.description, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(widget.name, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(widget.price, { exact: false })).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
    expect(screen.getByText("Edit")).toBeInTheDocument()
  })

  it('should call delete function on delete button click', async () => {
    const widget: Widget = { description: 'German movie star', name: 'Widget von Hammersmark', price: 19.45 }
    const handleDelete = jest.fn()

    render(<WidgetDisplay widget={widget} handleDelete={handleDelete} />)

    expect(screen.getByText(widget.name, { exact: false })).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()

    userEvent.click(screen.getByText("Delete"))

    expect(handleDelete).toHaveBeenLastCalledWith(widget.name)
  })
})
