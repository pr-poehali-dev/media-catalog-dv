import { Blogger, SOCIALS } from '@/data/data';

export const SOCIAL_ICONS: Record<string, string> = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  tiktok: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.21 8.21 0 004.84 1.56V7.07a4.85 4.85 0 01-1.07-.38z',
  vk: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.713-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z',
  telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  youtube: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  max: 'M4 4h4l4 6 4-6h4L14 12l6 8h-4l-4-6-4 6H4l6-8z',
  ok: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 6.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm3.75 8.75l-1.5-1.5a4.5 4.5 0 01-4.5 0l-1.5 1.5L7 14l1.75-1.75A6.5 6.5 0 0012 13a6.5 6.5 0 003.25-.75L17 14l-1.25 1.25z',
};

export const SOCIAL_ICON_COLORS: Record<string, string> = {
  instagram: '#C13584',
  tiktok: '#010101',
  vk: '#0077FF',
  telegram: '#229ED9',
  youtube: '#FF0000',
  max: '#7C3AED',
  ok: '#EE8208',
};

const ORBIT_POSITIONS = [
  { top: '-14%', left: '62%' },
  { top: '74%',  left: '-4%' },
  { top: '-10%', left: '14%' },
  { top: '74%',  left: '66%' },
  { top: '38%',  left: '-12%' },
  { top: '-16%', left: '38%' },
];

const CHARLESRUS_POSITIONS: Record<string, { top: string; left: string }> = {
  tiktok:    { top: '-16%', left: '16%' },
  instagram: { top: '-16%', left: '60%' },
  youtube:   { top: '40%',  left: '90%' },
  vk:        { top: '84%',  left: '64%' },
  telegram:  { top: '84%',  left: '8%'  },
  max:       { top: '40%',  left: '-14%' },
};

export function SocialOrbit({ socials, bloggerId }: { socials: Blogger['socials']; bloggerId: string }) {
  return (
    <>
      {socials.map((s, i) => {
        const pos = bloggerId === 'vld-charlesrus'
          ? (CHARLESRUS_POSITIONS[s.social] ?? ORBIT_POSITIONS[i % ORBIT_POSITIONS.length])
          : ORBIT_POSITIONS[i % ORBIT_POSITIONS.length];
        const color = SOCIAL_ICON_COLORS[s.social] ?? '#555';
        const path = SOCIAL_ICONS[s.social];
        return (
          <div
            key={s.social}
            className="absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            style={{ top: pos.top, left: pos.left, backgroundColor: color, zIndex: 10 }}
          >
            {s.social === 'max'
              ? <img src="https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/68ec529f-8f3c-44eb-bbad-44dd455d93e1.PNG" alt="MAX" className="w-full h-full object-cover rounded-full" />
              : path
                ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d={path} /></svg>
                : <span className="text-white text-xs font-bold">{SOCIALS[s.social].label[0]}</span>
            }
          </div>
        );
      })}
    </>
  );
}

export function AvatarWithOrbit({ blogger }: { blogger: Blogger }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 148, height: 148 }}>
      <div className="w-full h-full rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10">
        {blogger.avatar
          ? <img src={blogger.avatar} alt={blogger.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-5xl">{blogger.emoji}</div>
        }
      </div>
      <SocialOrbit socials={blogger.socials} bloggerId={blogger.id} />
    </div>
  );
}

export function AvatarSimple({ blogger }: { blogger: Blogger }) {
  return (
    <div className="w-20 h-20 rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10 flex-shrink-0">
      {blogger.avatar
        ? <img src={blogger.avatar} alt={blogger.name} className="w-full h-full object-cover" />
        : <div className="w-full h-full flex items-center justify-center text-4xl">{blogger.emoji}</div>
      }
    </div>
  );
}