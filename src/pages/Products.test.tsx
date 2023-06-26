import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Products', () => {

    test('it should display a heading', () => {
        render(<div>HELLO</div>)

        expect(screen.getByText('HELLO')).toBeVisible()
    })
}

)