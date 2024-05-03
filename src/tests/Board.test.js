import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Board from "../components/Board";

describe('Board Component', () => {
    it('should render the board with squares', () => {
        const squares = Array(9).fill(null);
        render(<Board squares={squares} onPlay={jest.fn()} />);

        expect(screen.getAllByRole('button', { name: '' })).toHaveLength(9);
    });

    it('should call onPlay when a square is clicked', async () => {
        const mockOnPlay = jest.fn();
        const squares = Array(9).fill(null);
        render(<Board squares={squares} onPlay={mockOnPlay} />);
        fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
        expect(mockOnPlay).toHaveBeenCalledTimes(1);
    });

    it('should display the winner when a row is filled', () => {
        const squares = ['X', 'X', 'X', null, null, null, null, null, null];
        const { getByText } = render(<Board squares={squares} onPlay={jest.fn()} />);

        expect(getByText('Winner: X')).toBeInTheDocument();
    });

});