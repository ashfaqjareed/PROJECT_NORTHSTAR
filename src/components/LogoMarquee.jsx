import React from 'react';
import { 
  SiReact, 
  SiVite, 
  SiTailwindcss, 
  SiFirebase, 
  SiFigma, 
  SiNodedotjs, 
  SiVercel, 
  SiTypescript,
  SiNotion,
  SiZoom,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNextdotjs,
  SiMongodb,
} from 'react-icons/si';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const LOGOS = [
  { Icon: SiHtml5,         name: 'HTML5'       },
  { Icon: SiCss,           name: 'CSS3'        },
  { Icon: SiJavascript,    name: 'JavaScript'  },
  { Icon: SiReact,         name: 'React'       },
  { Icon: SiNextdotjs,     name: 'Next.js'     },
  { Icon: SiVite,          name: 'Vite'        },
  { Icon: SiTailwindcss,   name: 'Tailwind'    },
  { Icon: SiFirebase,      name: 'Firebase'    },
  { Icon: SiMongodb,       name: 'MongoDB'     },
  { Icon: SiFigma,         name: 'Figma'       },
  { Icon: SiNotion,        name: 'Notion'      },
  { Icon: SiZoom,          name: 'Zoom'        },
  { Icon: FaWhatsapp,      name: 'WhatsApp'    },
  { Icon: FaTelegramPlane, name: 'Telegram'    },
  { Icon: SiNodedotjs,     name: 'Node.js'     },
  { Icon: SiVercel,        name: 'Vercel'      },
  { Icon: SiTypescript,    name: 'TypeScript'  },
];

export default function LogoMarquee() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 0', position: 'relative', background: 'var(--bg)' }}>
      
      {/* Edge fade */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '6rem', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '6rem', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 10, pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)' }}>
          Technologies &amp; Tools We Use
        </span>
      </div>

      <div style={{ display: 'flex', width: '100%' }}>
        <div className="marquee-track">
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((item, idx) => {
            const { Icon, name } = item;
            return (
              <div 
                key={idx} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '120px', gap: '0.5rem', opacity: 0.5, cursor: 'default', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
              >
                <Icon style={{ width: '2rem', height: '2rem', color: 'var(--text)' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, color: 'var(--text)' }}>
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
