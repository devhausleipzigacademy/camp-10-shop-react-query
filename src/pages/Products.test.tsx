import { describe, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Products } from './Products'
import * as ReactQuery from '@tanstack/react-query'

vi.mock('react-router-dom', async () => ({
    ...vi.importActual('react-router-dom'), // use actual for all non-hook parts
    useLoaderData: () => vi.mock
}));

vi.spyOn(ReactQuery, 'useQuery')
    .mockImplementation(
        vi.fn()
            .mockReturnValue({
                data: [{
                    "id": 16,
                    "name": "Running Headband",
                    "description": "Comfortable and stretchy headband, perfect for keeping hair out of your face while running.",
                    "image": "https://cdn.cepsports.com/media/catalog/product/cache/f65cb222571fee82dbd8175800c7e70e/w/y/wy12e2-1.jpg",
                    "category": "accessoires",
                    "sport": "running",
                    "price": 10,
                    "stock": 50
                }], isLoading: false, isSuccess: true
            })
    )

describe('Products', () => {
    // test('it should display a heading', () => {
    //     render(<Products />)
    //     expect(screen.getByRole('heading', {
    //         level: 2,
    //         name: 'Products'
    //     })).toBeVisible()
    // })
}
)

export default {}