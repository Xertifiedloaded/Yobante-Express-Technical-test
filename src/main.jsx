import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bell, Check, ChevronDown, CircleHelp,
  Clock3, Package, Search, ShieldCheck, SlidersHorizontal, Truck, MapPin,
  MoreHorizontal, Plus, X, Box, CircleCheck, AlertCircle
} from 'lucide-react';
import './styles.css';


const parcels = [
  {
    id: 'YE-8042-1190', name: 'Wireless headphones', sender: 'SoundHaus Store',
    status: 'In transit', statusTone: 'blue', date: 'Expected Nov 27',
    from: 'Lagos, NG', to: 'Abuja, NG', progress: 62,
    history: 'Last update · Nov 24, 09:42 AM', icon: 'headphones',
  },
  {
    id: 'YE-7291-5834', name: 'Everyday essentials', sender: 'Mira Collections',
    status: 'Out for delivery', statusTone: 'green', date: 'Arriving today',
    from: 'Ibadan, NG', to: 'Lagos, NG', progress: 88,
    history: 'Last update · Nov 24, 08:16 AM', icon: 'box',
  },
  {
    id: 'YE-9635-2217', name: 'Sneakers · White / 42', sender: 'Streetline',
    status: 'Order confirmed', statusTone: 'amber', date: 'Est. Nov 29 – Dec 1',
    from: 'Port Harcourt, NG', to: 'Lagos, NG', progress: 18,
    history: 'Last update · Nov 23, 06:30 PM', icon: 'shoe',
  },
];

const statusFilters = ['All parcels', 'In transit', 'Out for delivery', 'Order confirmed'];

function ParcelIcon({ kind }) {
  if (kind === 'headphones') return <div className="parcel-visual headphones"><div className="earcup left"/><div className="headband"/><div className="earcup right"/></div>;
  if (kind === 'shoe') return <div className="parcel-visual shoe"><span className="shoe-body"/><span className="shoe-sole"/></div>;
  return <div className="parcel-visual box-visual"><Box size={35} strokeWidth={1.5}/></div>;
}

function StatusPill({ status, tone }) {
  const Icon = tone === 'green' ? CircleCheck : tone === 'amber' ? Clock3 : Truck;
  return <span className={`status-pill ${tone}`}><Icon size={13}/>{status}</span>;
}

function ParcelCard({ parcel, onDetails }) {
  return (
    <article className="parcel-card">
      <div className="parcel-card-top">
        <ParcelIcon kind={parcel.icon}/>
        <div className="parcel-main">
          <div className="parcel-title-row"><h3>{parcel.name}</h3><button className="icon-button small" aria-label="More options"><MoreHorizontal size={18}/></button></div>
          <p className="sender">From <span>{parcel.sender}</span></p>
          <StatusPill status={parcel.status} tone={parcel.statusTone}/>
        </div>
      </div>
      <div className="parcel-route">
        <div className="route-point"><span className="route-dot origin"/><div><small>FROM</small><strong>{parcel.from}</strong></div></div>
        <div className="route-line"><span className="route-dash"/><span className="route-plane"><Truck size={13}/></span></div>
        <div className="route-point destination"><span className="route-dot destination-dot"/><div><small>TO</small><strong>{parcel.to}</strong></div></div>
      </div>
      <div className="progress-wrap"><div className="progress-track"><div className={`progress-fill ${parcel.statusTone}`} style={{width: `${parcel.progress}%`}}/></div><span>{parcel.progress}%</span></div>
      <div className="parcel-card-footer"><div className="delivery-date"><Clock3 size={15}/><span>{parcel.date}</span></div><button className="text-button" onClick={() => onDetails(parcel)}>Details <ArrowRight size={14}/></button></div>
      <p className="last-update">{parcel.history}</p>
    </article>
  );
}
function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All parcels');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [toast, setToast] = useState('');
  const filtered = useMemo(() => parcels.filter(p => {
    const matchesQuery = `${p.id} ${p.name} ${p.sender} ${p.from} ${p.to}`.toLowerCase().includes(query.toLowerCase().trim());
    const matchesFilter = filter === 'All parcels' || p.status === filter;
    return matchesQuery && matchesFilter;
  }), [query, filter]);
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><span/><span/><span/></div><div><b>Yobante</b><small>EXPRESS</small></div></div>
        <div className="sidebar-label">MENU</div>
        <a className="nav-item active" href="#tracking"><Package size={18}/><span>Track parcels</span><span className="nav-count">3</span></a>
        <a className="nav-item" href="#shipments" onClick={(e) => {e.preventDefault();notify('Shipment history is a demo view.')}}><Box size={18}/><span>Shipment history</span></a>
        <a className="nav-item" href="#notifications" onClick={(e) => {e.preventDefault();notify('You are all caught up!')}}><Bell size={18}/><span>Notifications</span><span className="notification-dot"/></a>
        <div className="sidebar-spacer"/>
        <div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><strong>Need a hand?</strong><p>Our support team is happy to help with your delivery.</p><button onClick={() => notify('Support demo: hello@yobanteexpress.com')}>Contact support <ArrowUpRight size={14}/></button></div>
        <div className="user-profile"><div className="avatar">AO</div><div className="user-text"><strong>Alex O.</strong><span>Personal account</span></div><button className="icon-button" aria-label="Profile options"><MoreHorizontal size={18}/></button></div>
      </aside>
      <main className="main-area" id="tracking">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>Track parcels</strong></div><div className="top-actions"><button className="top-help" onClick={() => notify('Help center coming soon')}>Help center <ArrowUpRight size={14}/></button><button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify('You are all caught up!')}><Bell size={19}/><i/></button><div className="avatar top-avatar">AO</div></div></header>
        <div className="content">
          <div className="welcome-row"><div><p className="eyebrow">YOUR DELIVERY HUB</p><h1>Good afternoon, Alex <span>✦</span></h1><p className="welcome-sub">Every delivery, one place. Stay in the loop.</p></div><button className="add-parcel" onClick={() => notify('Add parcel flow is a demo.')}><Plus size={17}/> Add parcel</button></div>
          <section className="summary-grid"><div className="summary-card total"><div className="summary-icon"><Package size={18}/></div><div className="summary-value">03</div><div className="summary-label">Total parcels <span>↗</span></div></div><div className="summary-card"><div className="summary-icon orange"><Truck size={18}/></div><div className="summary-value">01</div><div className="summary-label">On the way</div></div><div className="summary-card"><div className="summary-icon green"><Check size={18}/></div><div className="summary-value">01</div><div className="summary-label">Arriving today</div></div><div className="summary-card"><div className="summary-icon purple"><ShieldCheck size={18}/></div><div className="summary-value">100<span className="percent">%</span></div><div className="summary-label">Safe & secure</div></div></section>
          <section className="tracking-section"><div className="section-heading"><div><h2>Your parcels</h2><p>Follow your deliveries from pickup to your doorstep.</p></div><button className="filter-button" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={16}/> Filter <ChevronDown size={14}/></button></div>
          <div className="toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by tracking ID, item or sender…" aria-label="Search parcels"/><kbd>⌘ K</kbd></div><div className="filter-chips">{statusFilters.map(item => <button key={item} className={`chip ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)}>{item}{item === 'All parcels' && <span className="chip-count">3</span>}</button>)}</div></div>
          {showFilters && <div className="filter-panel"><span>Show parcels:</span>{statusFilters.map(item=><button key={item} className={filter===item?'selected':''} onClick={()=>setFilter(item)}>{item}</button>)}<button className="clear-filter" onClick={()=>{setFilter('All parcels');setQuery('')}}>Reset</button></div>}
          <div className="parcel-list">{filtered.length ? filtered.map(parcel => <ParcelCard key={parcel.id} parcel={parcel} onDetails={setSelectedParcel}/>) : <div className="empty-state"><div className="empty-icon"><Search size={22}/></div><h3>No parcels found</h3><p>We couldn't find anything matching “{query || filter}”. Try another search or clear your filters.</p><button onClick={() => {setQuery('');setFilter('All parcels')}}>Clear search & filters</button></div>}</div>
          </section>
          <footer className="footer"><span>© 2026 Yobante Express</span><span>Delivering with care <span className="footer-heart">♥</span></span><span className="footer-links"><a href="#privacy" onClick={e=>{e.preventDefault();notify('Privacy information demo')}}>Privacy</a><a href="#terms" onClick={e=>{e.preventDefault();notify('Terms demo')}}>Terms</a></span></footer>
        </div>
      </main>
      {toast && <div className="toast"><Check size={15}/>{toast}</div>}
      {selectedParcel && <div className="modal-backdrop" onClick={() => setSelectedParcel(null)}><div className="detail-modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">PARCEL DETAILS</p><h2>{selectedParcel.name}</h2></div><button className="icon-button" onClick={() => setSelectedParcel(null)} aria-label="Close"><X size={18}/></button></div><StatusPill status={selectedParcel.status} tone={selectedParcel.statusTone}/><div className="detail-id"><span>Tracking number</span><strong>{selectedParcel.id}</strong></div><div className="detail-route"><div><MapPin size={16}/><span><small>From</small><b>{selectedParcel.from}</b></span></div><div><MapPin size={16}/><span><small>Destination</small><b>{selectedParcel.to}</b></span></div></div><div className="detail-progress"><div className="progress-track"><div className={`progress-fill ${selectedParcel.statusTone}`} style={{width:`${selectedParcel.progress}%`}}/></div><b>{selectedParcel.progress}% complete</b></div><div className="timeline"><div className="timeline-entry done"><span/><div><b>Parcel registered</b><small>Shipment details received</small></div><em>Nov 23</em></div><div className="timeline-entry done"><span/><div><b>Picked up</b><small>Parcel collected from sender</small></div><em>Nov 23</em></div><div className="timeline-entry current"><span/><div><b>{selectedParcel.status}</b><small>Latest shipment update</small></div><em>Today</em></div><div className="timeline-entry future"><span/><div><b>Delivered</b><small>Handed over to recipient</small></div><em>Pending</em></div></div><button className="modal-action" onClick={()=>{setSelectedParcel(null);notify('Tracking link copied to clipboard (demo)')}}>Share tracking <ArrowRight size={15}/></button></div></div>}
    </div>
  );
}


export { App };

const rootElement = document.getElementById('root');
if (rootElement) createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
