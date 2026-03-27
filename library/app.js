const books = window.BOOKS || [];
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const sortSelect = document.getElementById('sortSelect');
const bookGrid = document.getElementById('bookGrid');
const featuredCategories = document.getElementById('featuredCategories');
const resultsText = document.getElementById('resultsText');
const emptyState = document.getElementById('emptyState');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const bookCount = document.getElementById('bookCount');
const categoryCount = document.getElementById('categoryCount');

const state = { query: '', selectedCategories: new Set(), sort: 'title-asc' };
const categories = [...new Set(books.map(book => book.category))].sort((a, b) => a.localeCompare(b));

function init() {
  bookCount.textContent = books.length;
  categoryCount.textContent = categories.length;
  renderCategoryFilters();
  renderFeaturedCategories();
  renderBooks();

  searchInput.addEventListener('input', (event) => {
    state.query = event.target.value.toLowerCase().trim();
    renderBooks();
  });

  sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderBooks();
  });

  clearFiltersBtn.addEventListener('click', () => {
    state.selectedCategories.clear();
    document.querySelectorAll('.category-checkbox').forEach(input => { input.checked = false; });
    renderBooks();
  });
}

function renderCategoryFilters() {
  categoryFilters.innerHTML = categories.map(category => `
    <label class="filter-item">
      <input class="category-checkbox" type="checkbox" value="${category}" />
      <span>${category}</span>
    </label>
  `).join('');

  document.querySelectorAll('.category-checkbox').forEach(input => {
    input.addEventListener('change', (event) => {
      const value = event.target.value;
      if (event.target.checked) state.selectedCategories.add(value);
      else state.selectedCategories.delete(value);
      renderBooks();
    });
  });
}

function renderFeaturedCategories() {
  const categoryCounts = categories.map(category => ({ category, count: books.filter(book => book.category === category).length }));
  featuredCategories.innerHTML = categoryCounts.map(item => `
    <article class="featured-tile">
      <span class="badge">${item.count} titles</span>
      <h3>${item.category}</h3>
      <p>Curated collection for ${item.category.toLowerCase()} resources.</p>
    </article>
  `).join('');
}

function getFilteredBooks() {
  let filtered = books.filter(book => {
    const hay = [book.title, book.author, book.category, ...(book.tags || []), book.description].join(' ').toLowerCase();
    const matchesQuery = !state.query || hay.includes(state.query);
    const matchesCategory = state.selectedCategories.size === 0 || state.selectedCategories.has(book.category);
    return matchesQuery && matchesCategory;
  });

  filtered.sort((a, b) => {
    if (state.sort === 'title-desc') return b.title.localeCompare(a.title);
    if (state.sort === 'category-asc') return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
    return a.title.localeCompare(b.title);
  });

  return filtered;
}

function renderBooks() {
  const filtered = getFilteredBooks();
  resultsText.textContent = `${filtered.length} of ${books.length} titles shown`;

  if (!filtered.length) {
    bookGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  bookGrid.innerHTML = filtered.map(book => `
    <article class="book-card">
      <div class="book-card__cover">
        <small>${book.category}</small>
        <h3>${book.title}</h3>
      </div>
      <div class="book-card__body">
        <div class="tags">${(book.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        <div class="meta">
          <div><strong>Author:</strong> ${book.author}</div>
          <div><strong>Shelf type:</strong> ${book.year}</div>
        </div>
        <div class="description">${book.description}</div>
        <div class="actions">
          <a class="btn btn--primary" href="${book.readUrl}" target="_blank" rel="noopener noreferrer">Open Reference</a>
          <a class="btn btn--secondary" href="${book.downloadUrl}" target="_blank" rel="noopener noreferrer">Find PDF</a>
        </div>
      </div>
    </article>
  `).join('');
}

init();
