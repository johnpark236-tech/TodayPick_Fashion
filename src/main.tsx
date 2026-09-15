import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

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
    const itemName = spans[spans.length - 1].textContent?.trim() || '';
    if (!itemName || !labels.some((name) => label.startsWith(name))) return;

    row.dataset.coupangItem = itemName;
    row.classList.add('coupang-item-row');
    row.setAttribute('role', 'link');
    row.setAttribute('tabindex', '0');
    row.setAttribute('title', `쿠팡에서 '${itemName}' 검색`);

    if (!row.querySelector('.coupang-search-hint')) {
      const hint = document.createElement('span');
      hint.className = 'coupang-search-hint';
      hint.textContent = '쿠팡에서 보기 ↗';
      row.appendChild(hint);
    }
  });
};

const openCoupangSearch = (itemName: string) => {
  const url = `https://www.coupang.com/np/search?q=${encodeURIComponent(itemName)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const setupCoupangItemLinks = () => {
  const observer = new MutationObserver(() => decorateCoupangItemRows());
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const row = target?.closest<HTMLElement>('[data-coupang-item]');
    if (!row?.dataset.coupangItem) return;
    openCoupangSearch(row.dataset.coupangItem);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target as HTMLElement | null;
    const row = target?.closest<HTMLElement>('[data-coupang-item]');
    if (!row?.dataset.coupangItem) return;
    event.preventDefault();
    openCoupangSearch(row.dataset.coupangItem);
  });
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

setupCoupangItemLinks();
