import { Counter } from "./Counter";
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe('Counter tests', () => {
    it('should increment the counter', async () => {
        const user = userEvent.setup();
        render(<Counter />);
        await user.click(screen.getByRole('button', { name: 'Hækka'}));
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveTextContent('1')
    })

    it('should decrease the counter', async () => {
        const user = userEvent.setup();
        render(<Counter />);
        await user.click(screen.getByRole('button', { name: 'Minnka'}));
        expect(screen.getByText('-1')).toBeInTheDocument();
    })

    it('should reset the counter', async () => {
        const user = userEvent.setup();
        render(<Counter />);
        await user.click(screen.getByRole('button', { name: 'Hækka'}));
        expect(screen.getByText('1')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Hækka'}));
        expect(screen.getByText('2')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Endurstilla'}));
        expect(screen.getByText('0')).toBeInTheDocument();
    })
});
