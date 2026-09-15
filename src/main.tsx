import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const normalizeItemCategory = (label: string) => {
  if (label.startsWith('아우터')) return '아우터';
  if (label.startsWith('상의')) return '상의';
  if (label.startsWith('하의')) return '하의';
  if (label.startsWith('신발')) return '신발';
  if (label.startsWith('악세서리')) return '악세서리';
  return '';
};

const decorateCoupangItemRows = () => {
  const heading = Array.from(document.querySelectorAll('h3')).find((el) =>
    el.textContent?.includes('착용 아이템 상세 명세서'),
  );
  const modal = heading?.closest('.fixed');
  if (!modal) return;

  const labels = ['아우터', '상의', '하의', '신발', '악세서리'];
  const rows = Array.from(modal.querySelectorAll<HTMLElement>('div.flex.justify-between'));

  rows.forEach((row) => {
    const spans = row.querySelectorAll('span');
    if (spans.length < 2) return;
    const label = spans[0].textContent?.trim() || '';
    const itemName = spans[1].textContent?.trim() || '';
    if (!itemName || !labels.some((name) => label.startsWith(name))) return;

    const category = normalizeItemCategory(label);
    const searchQuery = `${category} ${itemName}`.trim();

    row.dataset.coupangItem = itemName;
    row.dataset.coupangQuery = searchQuery;
    row.classList.add('coupang-item-row');
    row.setAttribute('role', 'link');
    row.setAttribute('tabindex', '0');
    row.setAttribute('title', `쿠팡에서 '${searchQuery}' 검색`);

    if (!row.querySelector('.coupang-search-hint')) {
      const hint = document.createElement('span');
      hint.className = 'coupang-search-hint';
      hint.textContent = '쿠팡에서 보기 ↗';
      row.appendChild(hint);
    }
  });
};

const openCoupangSearch = (searchQuery: string) => {
  const url = `https://www.coupang.com/np/search?q=${encodeURIComponent(searchQuery)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const setupCoupangItemLinks = () => {
  const observer = new MutationObserver(() => decorateCoupangItemRows());
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const row = target?.closest<HTMLElement>('[data-coupang-query]');
    if (!row?.dataset.coupangQuery) return;
    openCoupangSearch(row.dataset.coupangQuery);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target as HTMLElement | null;
    const row = target?.closest<HTMLElement>('[data-coupang-query]');
    if (!row?.dataset.coupangQuery) return;
    event.preventDefault();
    openCoupangSearch(row.dataset.coupangQuery);
  });
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

setupCoupangItemLinks();
