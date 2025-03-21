import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './Home';

describe('animateTask Function', () => {
    it('updates the position of a task card', () => {
        //render the Home component wrapped in MemoryRouter
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        //get the first task card
        const taskCard = screen.getByText('Finish Report').parentElement;

        //check initial position
        const initialLeft = parseFloat(taskCard.style.left);
        const initialTop = parseFloat(taskCard.style.top);

        //wait for the animation to update the position
        setTimeout(() => {
            const updatedLeft = parseFloat(taskCard.style.left);
            const updatedTop = parseFloat(taskCard.style.top);

            //assert that the position has changed
            expect(updatedLeft).not.toBe(initialLeft);
            expect(updatedTop).not.toBe(initialTop);
        }, 100); //wait 100ms for the animation to run
    });
});