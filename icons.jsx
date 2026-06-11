/* Icons — minimal stroke style matching Lucide */

const Icon = ({ d, size = 20, fill, stroke = 'currentColor', strokeWidth = 1.75, children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill={fill || 'none'} stroke={stroke} strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round">
    {d && <path d={d} />}
    {children}
  </svg>
);

const I = {
  Dashboard: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></Icon>,
  Agenda: (p) => <Icon {...p}><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 3v4M15 3v4M9 12h6M9 16h4"/></Icon>,
  Assessment: (p) => <Icon {...p}><path d="M9 4h6a2 2 0 0 1 2 2v0H7v0a2 2 0 0 1 2-2Z"/><rect x="5" y="6" width="14" height="15" rx="2"/><path d="M9 12l2 2 4-4"/></Icon>,
  History: (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></Icon>,
  Logout: (p) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></Icon>,
  Check: (p) => <Icon {...p}><path d="M5 12l5 5L20 7"/></Icon>,
  ChevronRight: (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>,
  ChevronLeft: (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>,
  ChevronDown: (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>,
  Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Target: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></Icon>,
  Spark: (p) => <Icon {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></Icon>,
  Flag: (p) => <Icon {...p}><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></Icon>,
  Bolt: (p) => <Icon {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-3.5 6.5L8 14l3.5-6.5L15 9z"/></Icon>,
  Users: (p) => <Icon {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 18a4.5 4.5 0 0 0-6-4"/></Icon>,
  Star: (p) => <Icon {...p}><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8z"/></Icon>,
  Heart: (p) => <Icon {...p}><path d="M20.5 8a5 5 0 0 0-8.5-3.5A5 5 0 0 0 3.5 8c0 7 8.5 12 8.5 12s8.5-5 8.5-12Z"/></Icon>,
  MessageQuote: (p) => <Icon {...p}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 18l3 3v-3M8 10h2v2c0 1-1 2-2 2M14 10h2v2c0 1-1 2-2 2"/></Icon>,
  Sparkles: (p) => <Icon {...p}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/></Icon>,
  Upload: (p) => <Icon {...p}><path d="M12 16V4M7 9l5-5 5 5M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></Icon>,
  Clock: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  Lock: (p) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>,
  Info: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v0M12 11v6"/></Icon>,
  Send: (p) => <Icon {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></Icon>,
  Doc: (p) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></Icon>,
  ArrowRight: (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>,
  AdjustmentsH: (p) => <Icon {...p}><circle cx="14" cy="6" r="2"/><path d="M4 6h8M16 6h4"/><circle cx="8" cy="12" r="2"/><path d="M4 12h2M10 12h10"/><circle cx="17" cy="18" r="2"/><path d="M4 18h11M19 18h1"/></Icon>,
  Eye: (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></Icon>,
  Sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Icon>,
};

window.I = I;
window.Icon = Icon;
