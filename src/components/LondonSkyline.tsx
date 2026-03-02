'use client';

interface LondonSkylineProps {
  className?: string;
  variant?: 'hero' | 'subtle';
}

export default function LondonSkyline({ className = '', variant = 'hero' }: LondonSkylineProps) {
  // Hero variant: warm golden hour silhouette
  // Subtle variant: faint background decoration
  const fillColor = variant === 'hero' ? '#1C2632' : 'currentColor';
  const opacity = variant === 'hero' ? 0.12 : 0.08;

  return (
    <div className={`pointer-events-none ${className}`} style={{ opacity }}>
      <svg
        viewBox="0 0 1200 200"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMax slice"
        fill={fillColor}
      >
        {/* Sky gradient for hero variant */}
        {variant === 'hero' && (
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        )}

        {/* Ground / base line with gradient */}
        <rect x="0" y="185" width="1200" height="15" fill={variant === 'hero' ? '#E8E4DD' : fillColor} opacity="0.5" />

        {/* Big Ben / Elizabeth Tower */}
        <g transform="translate(50, 0)">
          <rect x="0" y="60" width="24" height="125" />
          <rect x="-3" y="52" width="30" height="12" />
          <polygon points="12,52 -5,52 12,20 29,52" />
          <rect x="9" y="12" width="6" height="10" />
          {/* Clock face hint */}
          <circle cx="12" cy="85" r="8" fill="none" stroke={fillColor} strokeWidth="2" />
        </g>

        {/* Houses of Parliament */}
        <g transform="translate(80, 0)">
          <rect x="0" y="85" width="100" height="100" />
          <rect x="10" y="70" width="12" height="20" />
          <rect x="35" y="60" width="20" height="30" />
          <rect x="70" y="70" width="12" height="20" />
          <rect x="85" y="75" width="10" height="15" />
        </g>

        {/* Westminster Bridge */}
        <rect x="185" y="165" width="100" height="20" rx="3" />

        {/* London Eye */}
        <g transform="translate(340, 0)">
          <circle cx="0" cy="100" r="70" fill="none" stroke={fillColor} strokeWidth="4" />
          <rect x="-3" y="170" width="6" height="15" />
          <rect x="-15" y="180" width="30" height="5" />
          {/* Capsules hint */}
          <circle cx="0" cy="30" r="4" />
          <circle cx="60" cy="70" r="4" />
          <circle cx="60" cy="130" r="4" />
          <circle cx="-60" cy="70" r="4" />
          <circle cx="-60" cy="130" r="4" />
        </g>

        {/* South Bank buildings */}
        <g transform="translate(450, 0)">
          <rect x="0" y="110" width="40" height="75" />
          <rect x="50" y="85" width="35" height="100" />
          <rect x="95" y="100" width="45" height="85" />
        </g>

        {/* Millennium Bridge hint */}
        <path d="M 590 175 Q 620 165 650 175" fill="none" stroke={fillColor} strokeWidth="3" />

        {/* St Paul's Cathedral */}
        <g transform="translate(670, 0)">
          <rect x="0" y="100" width="80" height="85" />
          {/* Main dome */}
          <ellipse cx="40" cy="100" rx="35" ry="20" />
          <ellipse cx="40" cy="75" rx="25" ry="30" />
          {/* Lantern */}
          <rect x="35" y="40" width="10" height="15" />
          <ellipse cx="40" cy="40" rx="8" ry="5" />
          {/* Cross */}
          <rect x="38" y="25" width="4" height="18" />
          <rect x="33" y="30" width="14" height="3" />
          {/* Side towers */}
          <rect x="-5" y="90" width="15" height="40" />
          <rect x="70" y="90" width="15" height="40" />
        </g>

        {/* City of London buildings */}
        <g transform="translate(780, 0)">
          <rect x="0" y="65" width="30" height="120" />
          <rect x="35" y="85" width="25" height="100" />
          <rect x="65" y="50" width="35" height="135" />
        </g>

        {/* The Gherkin (30 St Mary Axe) */}
        <g transform="translate(870, 0)">
          <ellipse cx="20" cy="120" rx="20" ry="65" />
          {/* Pattern hints */}
          <path d="M 5 90 Q 20 85 35 90" fill="none" stroke={variant === 'hero' ? '#F5F2ED' : 'white'} strokeWidth="1" opacity="0.3" />
          <path d="M 3 120 Q 20 115 37 120" fill="none" stroke={variant === 'hero' ? '#F5F2ED' : 'white'} strokeWidth="1" opacity="0.3" />
          <path d="M 5 150 Q 20 145 35 150" fill="none" stroke={variant === 'hero' ? '#F5F2ED' : 'white'} strokeWidth="1" opacity="0.3" />
        </g>

        {/* Leadenhall Building (Cheesegrater) */}
        <g transform="translate(920, 0)">
          <polygon points="0,185 0,60 40,25 40,185" />
        </g>

        {/* 20 Fenchurch Street (Walkie Talkie) */}
        <g transform="translate(970, 0)">
          <path d="M 0 185 Q 0 100 10 60 L 40 60 Q 50 100 50 185 Z" />
        </g>

        {/* The Shard */}
        <g transform="translate(1040, 0)">
          <polygon points="0,185 0,165 22,0 44,165 44,185" />
          {/* Glass panel hints */}
          <line x1="22" y1="0" x2="22" y2="185" stroke={variant === 'hero' ? '#F5F2ED' : 'white'} strokeWidth="1" opacity="0.2" />
          <line x1="11" y1="90" x2="11" y2="185" stroke={variant === 'hero' ? '#F5F2ED' : 'white'} strokeWidth="1" opacity="0.2" />
          <line x1="33" y1="90" x2="33" y2="185" stroke={variant === 'hero' ? '#F5F2ED' : 'white'} strokeWidth="1" opacity="0.2" />
        </g>

        {/* Tower Bridge */}
        <g transform="translate(1100, 0)">
          {/* Left tower */}
          <rect x="0" y="80" width="30" height="105" />
          <rect x="-2" y="72" width="34" height="12" />
          <polygon points="15,72 -2,72 15,55 32,72" />
          {/* Right tower */}
          <rect x="70" y="80" width="30" height="105" />
          <rect x="68" y="72" width="34" height="12" />
          <polygon points="85,72 68,72 85,55 102,72" />
          {/* Upper walkway */}
          <rect x="30" y="85" width="40" height="8" />
          {/* Lower road */}
          <rect x="30" y="110" width="40" height="6" />
          {/* Suspension cables hint */}
          <path d="M 15 72 Q 50 60 85 72" fill="none" stroke={fillColor} strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
