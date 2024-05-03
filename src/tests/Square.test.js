import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Square from "../components/Square";

describe('Square Component', () => {
    it('should render the initial value', () => {
        const { getByText } = render(<Square value="X" />);

        expect(getByText('X')).toBeInTheDocument();
    });

    it('should call the onSquareClick prop when clicked', () => {
        const mockOnSquareClick = jest.fn();
        const { getByText } = render(<Square value="0" onSquareClick={mockOnSquareClick} />);

        fireEvent.click(getByText('0'));

        expect(mockOnSquareClick).toHaveBeenCalledTimes(1);
    });
});