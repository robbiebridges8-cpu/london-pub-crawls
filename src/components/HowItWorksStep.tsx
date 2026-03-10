'use client';

interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
}

export default function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <div className="text-center">
      {/* Large muted number */}
      <div className="font-display text-6xl md:text-7xl font-bold text-[var(--muted)] opacity-30 mb-4">
        {number}
      </div>

      {/* Step title */}
      <h3 className="font-label text-sm uppercase tracking-[0.1em] text-[var(--ink)] mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}
