const mockBooks = Array.from({ length: 24 }).map((_, i) => {
  const price = 9.99 + (i % 8) * 2;
  const compareAt = i % 3 === 0 ? price + 5 : null;
  return {
    id: `b${i+1}`,
    title: `The Great Adventure ${i+1}`,
    author: ['Jane Doe', 'John Smith', 'A. Writer'][i % 3],
    cover: `https://picsum.photos/seed/book${i}/400/600`,
    rating: 3.5 + (i % 15) / 10,
    reviews: 100 + i * 7,
    price,
    compareAt,
    badge: i % 5 === 0 ? 'Bestseller' : (i % 7 === 0 ? '-25%' : ''),
    categories: ['All', 'Fiction', 'Sci-Fi', 'Mystery', 'Romance'][i % 5],
    description: 'A captivating tale that explores themes of courage and discovery. Placeholder description to be replaced with real copy.'
  };
});

// PUBLIC_INTERFACE
export async function fetchCatalog({ q = '', category = 'All', sort = 'Featured', page = 1, pageSize = 12 }) {
  /** Returns a paginated, filtered mock catalog. */
  await delay(200);
  let data = mockBooks.filter(b => (category === 'All' || b.categories === category));
  if (q) {
    const qq = q.toLowerCase();
    data = data.filter(b => b.title.toLowerCase().includes(qq) || b.author.toLowerCase().includes(qq));
  }
  if (sort === 'Price: Low to High') data.sort((a,b)=> a.price - b.price);
  if (sort === 'Price: High to Low') data.sort((a,b)=> b.price - a.price);
  if (sort === 'Rating') data.sort((a,b)=> b.rating - a.rating);
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = data.slice((page-1)*pageSize, page*pageSize);
  return { items, total, page, totalPages };
}

// PUBLIC_INTERFACE
export async function fetchBook(id) {
  /** Return mock book detail by id. */
  await delay(150);
  const book = mockBooks.find(b => b.id === id);
  if (!book) throw new Error('Not found');
  return book;
}

// PUBLIC_INTERFACE
export async function createCheckoutSession({ items, customer }) {
  /** Placeholder for Stripe checkout session creation; replace with backend call. */
  await delay(300);
  // Emulate a client secret or redirect URL
  return { clientSecret: 'pi_mock_secret', redirectUrl: '/orders' };
}

// PUBLIC_INTERFACE
export async function fetchOrders(userId) {
  /** Mock order history. */
  await delay(200);
  return [
    { id: 'ord_001', date: new Date().toISOString(), total: 42.50, items: itemsFromIndices([0,2]) },
    { id: 'ord_002', date: new Date(Date.now()-86400000*7).toISOString(), total: 19.99, items: itemsFromIndices([5]) },
  ];
}

function itemsFromIndices(idxs) {
  return idxs.map(i => ({ ...mockBooks[i], quantity: (i % 2) + 1 }));
}

function delay(ms) { return new Promise(res => setTimeout(res, ms)); }
