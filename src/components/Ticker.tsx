'use client';

interface TickerProps {
  items: string[];
  className?: string;
}

export default function Ticker({ items, className = '' }: TickerProps) {
  const tickerContent = items.join(' \u25C6 ');

  return (
    <div className={`bg-[var(--claret)] overflow-hidden py-3 ${className}`}>
      <div className="animate-ticker whitespace-nowrap">
        <span className="font-label text-sm uppercase tracking-[0.1em] text-white">
          {tickerContent} \u25C6 {tickerContent} \u25C6 {tickerContent} \u25C6 {tickerContent}
        </span>
      </div>
    </div>
  );
}
