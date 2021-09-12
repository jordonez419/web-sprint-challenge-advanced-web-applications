import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen } from "@testing-library/react";
import BubblePage from './BubblePage';

test("Renders without errors", async () => {
    mockFetch.mockResolvedValueOnce([])
    render(<BubblePage />);
    await waitFor(() => {
        const colors = screen.getByText(/colors/i)
        const bubbles = screen.getByText(/bubbles/i)
        expect(colors).toHaveTextContent('Colors')
        expect(bubbles).toHaveTextContent('Bubbles')
    });
});


test("Renders appropriate number of colors passed in through mock", async () => {
    //Keep in mind that our service is called on mount for this component.
    mockFetch.mockResolvedValueOnce(colors);
    render(<BubblePage />);
    await waitFor(() => []);
    const list = screen.getAllByTestId('color');
    const lilac = screen.getByText(/lilac/i);
    expect(list).toHaveLength(5);
    expect(lilac).toBeInTheDocument();
});