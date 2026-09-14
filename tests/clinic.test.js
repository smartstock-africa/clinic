import { describe, expect, test } from 'vitest';
import { sortTable } from '../docs/index.js';

describe('Sorting The Table', () => {
  test('Sort Numbers in Ascending Order', () => {
    const products = [{ price: 300 }, { price: 200 }, { price: 100 }];

    sortTable('price', products, 'ascending');
    expect(products).toEqual([{ price: 100 }, { price: 200 }, { price: 300 }]);
  });

  test('Sort Numbers in Descending Order', () => {
    const products = [{ price: 100 }, { price: 200 }, { price: 300 }];

    sortTable('price', products, 'descending');
    expect(products).toEqual([{ price: 300 }, { price: 200 }, { price: 100 }]);
  });

  test('updates sorting UI', () => {
    document.body.innerHTML = `
        <div class="sortVisible"></div>

        <div class="sortInvisible animate__fadeInDown"></div>
    `;

    const products = [{ price: 200 }, { price: 100 }];

    sortTable('price', products, 'ascending');

    expect($('.sortVisible').hasClass('activated')).toBe(true);

    expect($('.sortInvisible').hasClass('animate__fadeInDown')).toBe(false);

    expect($('.sortInvisible').hasClass('animate__fadeOutUp')).toBe(true);
  });
});
