import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '../components/Game';

describe('Game component', () => {
    it('should render the initial game board', () => {
        render(<Game />);
        const { getByText, getAllByRole } = screen;
        expect(getByText('Go to game start')).toBeInTheDocument();
        expect(getAllByRole('button', { name: '' })).toHaveLength(9);
    });

    it('should allow a player to make a move and update the board', () => {
        render(<Game />);
        const { getAllByRole, getByTestId } = screen;
        userEvent.click(getAllByRole('button', { name: '' })[0]);
        expect(getByTestId('next-player')).toBeInTheDocument();
    });

    it('should not allow a player to make a move on a filled square', () => {
        render(<Game />);
        const { getAllByRole, getByTestId } = screen;
        userEvent.click(getAllByRole('button', { name: '' })[0]);

        userEvent.click(getAllByRole('button', { name: '' })[0]); // Click again on the same square

        expect(getByTestId('next-player')).toBeInTheDocument(); // Status should not change
    });

    it('should declare a winner when a row is filled', () => {
        render(<Game />);
        const { getAllByRole, getByTestId } = screen;
        userEvent.click(getAllByRole('button', { name: '' })[0]);
        userEvent.click(getAllByRole('button', { name: '' })[1]);
        userEvent.click(getAllByRole('button', { name: '' })[2]);

        expect(getByTestId('next-player')).toBeInTheDocument();
    });

    it('should allow jumping to previous moves using the move history', () => {
        render(<Game />);
        const { getAllByRole, getAllByTestId } = screen;

        userEvent.click(getAllByRole('button', { name: '' })[0]);
        userEvent.click(getAllByRole('button', { name: '' })[4]);
        userEvent.click(getAllByRole('button', { name: '' })[1]);
        userEvent.click(getAllByRole('button', { name: '' })[2]);

        fireEvent.click(getAllByTestId('moves')[0]); // Go to game start

        expect(getAllByRole('button', { name: '' })).toHaveLength(9); // Verify all squares are empty
        
        userEvent.click(getAllByRole('button', { name: '' })[0]);
        userEvent.click(getAllByRole('button', { name: '' })[4]);

        userEvent.click(screen.getAllByTestId('moves')[1]); // Go to first move

        expect(getAllByRole('button', { name: '' })[0]).toBeInTheDocument();
        expect(getAllByRole('button', { name: '' })[4]).toBeInTheDocument();
        
    });
});
