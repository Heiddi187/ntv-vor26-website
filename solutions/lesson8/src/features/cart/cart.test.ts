import { test, expect } from 'vitest'
import type { Product } from '../products'
import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/shared/store/appStore'

test('1 + 1 equals 2', () => {
  expect(1 + 1).toBe(2)
})

const mockProduct: Product = { id: '1', name: 'test', price: 10};

test('Add product to set quantity 1', () => {
  const { result } = renderHook(() => useCartStore());
  act(() => {
    result.current.addToCart(mockProduct);
  });

  expect(result.current.items[0].quantity).toBe(1);
})

test('add same product twice, qty is 2', () => {
  const { result } = renderHook(() => useCartStore());
  act(() => {
    result.current.addToCart(mockProduct);
  });

  expect(result.current.items[0].quantity).toBe(2);
})

test('remove item, cart should be empty', () => {
  const { result } = renderHook(() => useCartStore());
  act(() => {
    result.current.removeItem('1');
  });

  expect(result.current.items.length).toBe(0);
})

test.todo('cart calcs correctly', () => {
  //
})

test.todo('', () => {
  //
})