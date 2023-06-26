import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
    test('it should display a button', () => {
        render(<Button />)

        const btn = screen.getByRole('button', {
            name: 'Button'
        })
        expect(btn).toBeVisible()
        expect(btn).toHaveClass('bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600')
    })

    test('it should display the correct button text', () => {
    })
})