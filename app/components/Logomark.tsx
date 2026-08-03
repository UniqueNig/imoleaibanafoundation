export default function Logomark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="iaf-logo-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#5b7dff" />
          <stop offset="55%" stopColor="#2b56f5" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" stroke="url(#iaf-logo-gradient)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="20" cy="20" r="8.5" fill="url(#iaf-logo-gradient)" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 20 + Math.cos(angle) * 12.5;
        const y1 = 20 + Math.sin(angle) * 12.5;
        const x2 = 20 + Math.cos(angle) * 17.5;
        const y2 = 20 + Math.sin(angle) * 17.5;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#iaf-logo-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
