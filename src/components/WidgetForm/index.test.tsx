import {render, screen} from '@testing-library/react'
import WidgetForm from './index'

jest.mock('react-router', () => ({
    useParams: () => ({}),
    useNavigate: jest.fn(),
}))

describe('WidgetDisplay', () => {
    it('should render create form', async () => {
        render(<WidgetForm />)

        expect(screen.getByText("Create New Widget")).toBeInTheDocument()
        expect(screen.getByText("Name")).toBeInTheDocument()
        expect(screen.getByText("Price")).toBeInTheDocument()
        expect(screen.getByText("Description")).toBeInTheDocument()
        expect(screen.getByText("Create")).toBeInTheDocument()
        expect(screen.getByText("Cancel")).toBeInTheDocument()
    })
})
