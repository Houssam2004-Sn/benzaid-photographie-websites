type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'stacked';
  admin?: boolean;
  showTagline?: boolean;
  className?: string;
};

const sizeMap = {
  sm: {
    mark: 'h-10 w-10',
    brand: 'text-base',
    sub: 'text-[9px]',
    gap: 'gap-2.5',
    spacing: 'tracking-[0.35em]',
  },
  md: {
    mark: 'h-14 w-14',
    brand: 'text-xl',
    sub: 'text-[10px]',
    gap: 'gap-3.5',
    spacing: 'tracking-[0.45em]',
  },
  lg: {
    mark: 'h-24 w-24',
    brand: 'text-4xl md:text-5xl',
    sub: 'text-xs',
    gap: 'gap-5',
    spacing: 'tracking-[0.6em]',
  },
} as const;

function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const markClass = sizeMap[size].mark;

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${markClass} shrink-0 overflow-visible`}
      role="img"
      aria-label="Benzaid logo mark"
    >
      <defs>
        <linearGradient id="benzaidLogoTone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2ECE2" />
          <stop offset="55%" stopColor="#E2D6C6" />
          <stop offset="100%" stopColor="#C8A45A" />
        </linearGradient>
        <radialGradient id="benzaidLensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="65%" stopColor="#070707" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>

      <path
        d="M20 18 H44 C61 18 74 31 74 47 C74 63 61 76 44 76 H34 V96 H20 Z M34 30 V64 H44 C54 64 61 57 61 47 C61 37 54 30 44 30 Z"
        fill="url(#benzaidLogoTone)"
      />
      <path d="M50 90 L86 30 L95 30 L59 90 Z" fill="url(#benzaidLogoTone)" />
      <path
        d="M38 91 H85 C97 91 106 82 106 70 C106 58 97 48 85 48 H67 L73 38 H85 C103 38 116 51 116 69 C116 87 103 100 85 100 H27 Z"
        fill="url(#benzaidLogoTone)"
      />

      <circle cx="76" cy="71" r="16" fill="url(#benzaidLensGlow)" stroke="#1E1E1E" strokeWidth="2" />
      <circle cx="76" cy="71" r="11.5" fill="none" stroke="#2F2F2F" strokeWidth="1.5" />
      <circle cx="76" cy="71" r="7.5" fill="none" stroke="#4B4B4B" strokeWidth="1.2" />
      <circle cx="81" cy="66" r="1.7" fill="#C8A45A" opacity="0.95" />
    </svg>
  );
}

export function BrandLogo({
  size = 'md',
  layout = 'horizontal',
  admin = false,
  showTagline = true,
  className = '',
}: BrandLogoProps) {
  const styles = sizeMap[size];
  const horizontal = layout === 'horizontal';

  return (
    <div
      className={[
        'text-[#F5F5F0]',
        horizontal ? `flex items-center ${styles.gap}` : 'flex flex-col items-center text-center gap-3',
        className,
      ].join(' ')}
    >
      <BrandMark size={size} />

      <div className={horizontal ? 'min-w-0' : ''}>
        <div
          className={[
            'font-["Cormorant_Garamond"] font-semibold leading-none text-[#F4EEE5]',
            styles.brand,
            styles.spacing,
            horizontal ? 'mb-1' : 'mb-2',
          ].join(' ')}
        >
          BENZAID
        </div>

        <div className="flex items-center justify-center gap-2">
          {showTagline && !admin && <span className="h-px w-8 bg-[#C8A45A]/45" />}
          <span
            className={[
              'uppercase text-[#C8A45A] whitespace-nowrap',
              styles.sub,
              horizontal ? 'tracking-[0.35em]' : 'tracking-[0.5em]',
            ].join(' ')}
          >
            {admin ? 'Admin Panel' : 'Pictures That Speak'}
          </span>
          {showTagline && !admin && <span className="h-px w-8 bg-[#C8A45A]/45" />}
        </div>
      </div>
    </div>
  );
}
