'use client';

interface Stat {
  value: string;
  label: string;
}

interface StatBlockProps {
  stats: Stat[];
  className?: string;
}

export default function StatBlock({ stats, className = '' }: StatBlockProps) {
  return (
    <div className={`border-2 border-[var(--ink)] bg-[var(--surface)] ${className}`}>
      <div className="grid grid-cols-3 divide-x-2 divide-[var(--ink)]">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-[var(--claret)] mb-1">
              {stat.value}
            </div>
            <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
