import { useState } from "react";
import {
  MapPin, Star, Search, Calendar, Users, ChevronDown, ArrowRight, Heart, Anchor,
  Sun, Wind, Phone, Mail, Instagram, Facebook, Twitter, Menu, X, Clock, Waves,
  Wifi, Coffee, Car, Utensils, Shield, ChevronLeft, ChevronRight, Check,
  BarChart3, TrendingUp, Package, MessageSquare, Settings, LogOut, Bell,
  Plus, Eye, Edit2, Trash2, AlertCircle, DollarSign, Activity, User,
  Grid, List, Filter, Download, Upload, ToggleLeft, ToggleRight, Home,
  Flame, Award, Zap, Globe, CreditCard, Lock, Info, Minus, CheckCircle2,
  FileText, PieChart, Bed, Bath, Maximize2, Image, Flag, UserCheck, Layers
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "hotel"
  | "restaurant"
  | "activity"
  | "booking"
  | "owner"
  | "admin";

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  hero:        "https://images.unsplash.com/photo-1755545760275-abd2f1b8ed2c?w=1800&h=900&fit=crop&auto=format",
  beach:       "https://images.unsplash.com/photo-1755545414327-36524febb5b6?w=800&h=600&fit=crop&auto=format",
  resort:      "https://images.unsplash.com/photo-1722264222007-3e4f1808db3e?w=800&h=600&fit=crop&auto=format",
  coral:       "https://images.unsplash.com/photo-1760556415132-533affdd9ccf?w=800&h=600&fit=crop&auto=format",
  desert:      "https://images.unsplash.com/photo-1662714605538-da61402784ef?w=800&h=600&fit=crop&auto=format",
  lighthouse:  "https://images.unsplash.com/photo-1755545745583-334a6398c61b?w=800&h=600&fit=crop&auto=format",
  palm:        "https://images.unsplash.com/photo-1724069907417-0b21a3f16a16?w=800&h=600&fit=crop&auto=format",
  room1:       "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=900&h=600&fit=crop&auto=format",
  room2:       "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=900&h=600&fit=crop&auto=format",
  room3:       "https://images.unsplash.com/photo-1611971263023-105938ce12ed?w=900&h=600&fit=crop&auto=format",
  pool:        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&h=600&fit=crop&auto=format",
  seafood1:    "https://images.unsplash.com/photo-1762631882592-25bc08678af6?w=800&h=600&fit=crop&auto=format",
  seafood2:    "https://images.unsplash.com/photo-1762631934367-aba7cfbf9f59?w=800&h=600&fit=crop&auto=format",
  seafood3:    "https://images.unsplash.com/photo-1762631882087-ab1b3060c61b?w=800&h=600&fit=crop&auto=format",
  boat:        "https://images.unsplash.com/photo-1560477936-d27e03b6cb55?w=900&h=600&fit=crop&auto=format",
  tour:        "https://images.unsplash.com/photo-1602867612779-3aaf54b425c2?w=900&h=600&fit=crop&auto=format",
};

// ─── Shared helpers ───────────────────────────────────────────────────────────
const S = {
  serif:  { fontFamily: "'Playfair Display', serif" },
  mono:   { fontFamily: "'DM Mono', monospace" },
};

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < n ? "fill-amber-400 stroke-amber-400" : "stroke-muted-foreground fill-none"}
        />
      ))}
    </div>
  );
}

function Badge({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "accent" | "muted" | "green" | "red" | "amber" }) {
  const styles: Record<string, string> = {
    primary: "bg-secondary text-primary border-secondary",
    accent:  "text-white border-transparent",
    muted:   "bg-muted text-muted-foreground border-muted",
    green:   "bg-emerald-50 text-emerald-700 border-emerald-100",
    red:     "bg-red-50 text-red-700 border-red-100",
    amber:   "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${styles[variant]}`}
      style={variant === "accent" ? { background: "var(--accent)" } : {}}
    >
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", className = "", size = "md" }: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "accent" | "ghost" | "outline"; className?: string; size?: "sm" | "md" | "lg";
}) {
  const base = "font-semibold rounded-full transition-all inline-flex items-center gap-2 cursor-pointer";
  const sizes = { sm: "text-xs px-4 py-2", md: "text-sm px-5 py-2.5", lg: "text-sm px-7 py-3.5" };
  const vars: Record<string, string> = {
    primary: "bg-primary text-white hover:opacity-90",
    accent:  "text-white hover:opacity-80",
    ghost:   "bg-transparent text-foreground hover:bg-muted",
    outline: "border border-border text-foreground hover:bg-muted",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${sizes[size]} ${vars[variant]} ${className}`}
      style={variant === "accent" ? { background: "var(--accent)" } : {}}
    >
      {children}
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ current, nav }: { current: Page; nav: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => nav("home")} className="flex items-center gap-2">
          <Waves className="text-primary" size={22} strokeWidth={2} />
          <span className="text-lg font-bold tracking-tight" style={{ ...S.serif, color: "var(--primary)" }}>
            Hurghada<span style={{ color: "var(--accent)" }}>Hub</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {(["home", "hotel", "restaurant", "activity"] as Page[]).map((p) => (
            <button key={p} onClick={() => nav(p)}
              className={`text-sm font-medium transition-colors capitalize ${current === p ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
            >
              {p === "home" ? "Discover" : p === "hotel" ? "Hotels" : p === "restaurant" ? "Restaurants" : "Activities"}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => nav("owner")} className="text-sm font-medium px-4 py-2 rounded-full text-primary border border-primary/30 hover:bg-secondary transition-colors">
            Owner Portal
          </button>
          <button onClick={() => nav("admin")} className="text-sm font-medium px-4 py-2 rounded-full text-white transition-colors" style={{ background: "var(--accent)" }}>
            Admin
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-3">
          {(["home","hotel","restaurant","activity","booking","owner","admin"] as Page[]).map(p => (
            <button key={p} onClick={() => { nav(p); setOpen(false); }}
              className="text-left text-sm font-medium text-foreground/70 capitalize py-1"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
const places = [
  { id: 1, name: "Sahl Hasheesh Beach", category: "Beaches", rating: 4.9, reviews: 1284, price: "Free", duration: "Full day", image: IMG.beach, tags: ["Snorkeling","Sunset","Calm waters"], description: "A crescent of powder-white sand with crystal-clear shallows, ideal for families and snorkelers.", featured: true },
  { id: 2, name: "Oberoi Sahl Hasheesh", category: "Resorts",  rating: 4.8, reviews: 892,  price: "From $180/night", duration: "Multi-night", image: IMG.resort, tags: ["Luxury","Private beach","Spa"], description: "A palatial resort rising from the dunes, with private lagoons and Arabesque architecture.", featured: true },
  { id: 3, name: "Giftun Island Reef Dive", category: "Diving",  rating: 4.9, reviews: 2103, price: "$65/person", duration: "Full day", image: IMG.coral, tags: ["PADI certified","Coral","Marine life"], description: "Dive into a living mosaic of coral gardens teeming with parrotfish, moray eels, and sea turtles.", featured: true },
  { id: 4, name: "Eastern Desert Safari",  category: "Safari",  rating: 4.7, reviews: 654,  price: "$45/person", duration: "Half day", image: IMG.desert, tags: ["4x4 jeep","Bedouin camp","Stargazing"], description: "Race across golden dunes, visit an authentic Bedouin village, and sip mint tea under stars.", featured: false },
  { id: 5, name: "Hurghada Marina Promenade", category: "Dining", rating: 4.6, reviews: 3201, price: "$10–$40", duration: "Evening", image: IMG.palm, tags: ["Seafood","Waterfront","Live music"], description: "Stroll past yacht-lined quays and settle into a terrace restaurant for fresh Red Sea catch.", featured: false },
  { id: 6, name: "El Dahar Old Quarter",   category: "Dining",  rating: 4.5, reviews: 782,  price: "$5–$15",  duration: "2–3 hrs", image: IMG.lighthouse, tags: ["Local food","Spice bazaar","Culture"], description: "Wander through narrow alleys sampling koshari and feteer from legendary street stalls.", featured: false },
];

const cats = ["All","Beaches","Resorts","Diving","Safari","Dining","Nightlife"];

function HomePage({ nav }: { nav: (p: Page) => void }) {
  const [cat, setCat] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);
  const [q, setQ] = useState("");

  const filtered = places.filter(p =>
    (cat === "All" || p.category === cat) &&
    (p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-end pb-20">
        <div className="absolute inset-0 bg-primary">
          <img src={IMG.hero} alt="Hurghada coastline" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e2b] via-[#071e2b]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "var(--accent)", ...S.mono }}>Red Sea — Egypt</p>
            <h1 className="text-5xl md:text-7xl font-black leading-none text-white mb-6" style={S.serif}>
              Your gateway to<br /><em className="not-italic" style={{ color: "var(--accent)" }}>Hurghada</em>
            </h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-xl">
              Discover sun-bleached beaches, electric coral reefs, and golden desert horizons — with a local advisor by your side.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl max-w-3xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search size={18} className="text-muted-foreground" />
              <input type="text" placeholder="Where do you want to go?" value={q} onChange={e => setQ(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none" />
            </div>
            <div className="hidden md:block w-px bg-border self-stretch my-2" />
            <div className="flex items-center gap-3 px-4 py-2"><Calendar size={18} className="text-muted-foreground" /><span className="text-sm text-muted-foreground">Add dates</span></div>
            <div className="hidden md:block w-px bg-border self-stretch my-2" />
            <div className="flex items-center gap-3 px-4 py-2"><Users size={18} className="text-muted-foreground" /><span className="text-sm text-muted-foreground">Guests</span><ChevronDown size={14} className="text-muted-foreground" /></div>
            <Btn variant="accent" size="md"><Search size={15} />Search</Btn>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white/50 text-xs" style={S.mono}><MapPin size={12} />27.2579° N, 33.8116° E</div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[["400+","Places listed"],["38K","Happy travelers"],["97%","Satisfaction rate"],["12","Local advisors"]].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ ...S.serif, color: "var(--accent)" }}>{v}</div>
              <div className="text-white/60 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)", ...S.mono }}>— Explore Hurghada</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={S.serif}>Discover places<br />worth visiting</h2>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-10">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
              style={{ background: cat === c ? "var(--primary)" : "transparent", color: cat === c ? "white" : "var(--muted-foreground)", borderColor: cat === c ? "var(--primary)" : "var(--border)" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => nav(p.category === "Diving" || p.category === "Safari" ? "activity" : p.category === "Dining" ? "restaurant" : "hotel")}>
              <div className="relative h-52 bg-muted overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={e => { e.stopPropagation(); setSaved(s => s.includes(p.id) ? s.filter(x => x !== p.id) : [...s, p.id]); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white">
                  <Heart size={15} className={saved.includes(p.id) ? "fill-red-500 stroke-red-500" : "stroke-foreground/60"} />
                </button>
                {p.featured && <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ background: "var(--accent)" }}>Featured</span>}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1" style={S.mono}>{p.category}</p>
                    <h3 className="font-semibold text-foreground text-base leading-snug" style={S.serif}>{p.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Star size={13} className="fill-amber-400 stroke-amber-400" />
                    <span className="text-xs font-semibold">{p.rating}</span>
                    <span className="text-xs text-muted-foreground">({p.reviews.toLocaleString()})</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>)}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-sm font-semibold">{p.price}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><Clock size={11} />{p.duration}</div>
                  </div>
                  <Btn variant="primary" size="sm">Book Now</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #0e6a96 100%)" }}>
        <div className="absolute inset-0 opacity-10"><img src={IMG.beach} alt="" className="w-full h-full object-cover" /></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <Wind size={36} className="mx-auto mb-6 text-white/40" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={S.serif}>Ready to discover Hurghada?</h2>
          <p className="text-white/65 text-lg mb-8 leading-relaxed">Talk to a local advisor today and build your perfect itinerary — for free.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Btn variant="accent" size="lg" onClick={() => nav("booking")}>Start Planning</Btn>
            <button className="px-7 py-3.5 rounded-full font-semibold text-white text-sm border border-white/30 hover:bg-white/10 transition-colors">Browse All Places</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4"><Waves size={20} style={{ color: "var(--accent)" }} /><span className="font-bold text-lg" style={S.serif}>Hurghada<span style={{ color: "var(--accent)" }}>Hub</span></span></div>
              <p className="text-white/50 text-sm leading-relaxed">Your trusted local guide to Hurghada's beaches, reefs, and desert adventures since 2018.</p>
            </div>
            {[["Explore",["Beaches","Resorts","Diving","Safari","Dining"]],["Company",["About Us","Our Advisors","Blog","Press","Careers"]]].map(([title, links]) => (
              <div key={title as string}>
                <h4 className="font-semibold text-sm mb-4 text-white/80">{title as string}</h4>
                <ul className="space-y-2 text-sm text-white/50">{(links as string[]).map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}</ul>
              </div>
            ))}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/80">Contact</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><Mail size={13} /> hello@hurghada.hub</li>
                <li className="flex items-center gap-2"><Phone size={13} /> +20 65 346 7000</li>
                <li className="flex items-center gap-2"><MapPin size={13} /> Hurghada Marina, Egypt</li>
              </ul>
              <div className="flex gap-3 mt-5">{[Instagram,Facebook,Twitter].map((Icon,i) => <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Icon size={14} /></a>)}</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
            <span>© 2026 HurghadaHub. All rights reserved.</span>
            <span style={S.mono}>Built with ❤ in the Red Sea</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── HOTEL DETAILS ────────────────────────────────────────────────────────────
const hotelPhotos = [IMG.resort, IMG.pool, IMG.room1, IMG.room2, IMG.room3, IMG.beach];
const hotelAmenities = [
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Coffee, label: "Breakfast included" },
  { icon: Car, label: "Free valet parking" },
  { icon: Utensils, label: "3 Restaurants" },
  { icon: Waves, label: "Private beach" },
  { icon: Shield, label: "24h concierge" },
];
const roomTypes = [
  { name: "Superior Sea View", size: "42 m²", beds: "1 King", guests: 2, price: 180, image: IMG.room1, features: ["Sea view","Balcony","Rain shower"] },
  { name: "Deluxe Pool Suite", size: "68 m²", beds: "1 King + Sofa", guests: 3, price: 295, image: IMG.room2, features: ["Pool access","Lounge area","Butler service"] },
  { name: "Royal Penthouse", size: "140 m²", beds: "2 King", guests: 4, price: 620, image: IMG.room3, features: ["Panoramic terrace","Private pool","VIP transfers"] },
];
const hotelReviews = [
  { name: "Amira Khalil", date: "March 2026", rating: 5, text: "The most serene place I've ever stayed. The private beach at sunrise is something else entirely." },
  { name: "Marco Bianchi", date: "February 2026", rating: 5, text: "Service rivaling any 5-star I've visited in Europe. The Arabesque architecture is stunning." },
  { name: "Sophie Laurent", date: "January 2026", rating: 4, text: "Exceptional overall — rooms are immaculate and the reef snorkeling is right off the beach." },
];

function HotelPage({ nav }: { nav: (p: Page) => void }) {
  const [photo, setPhoto] = useState(0);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"overview"|"rooms"|"reviews">("overview");

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => nav("home")} className="hover:text-foreground transition-colors">Discover</button>
          <ChevronRight size={14} />
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-primary">Hotel</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Oberoi Sahl Hasheesh</span>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden mb-10">
          <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setPhoto((photo + 1) % hotelPhotos.length)}>
            <img src={hotelPhotos[photo]} alt="Hotel main" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-white transition-colors">
              <Image size={13} /> {hotelPhotos.length} photos
            </button>
          </div>
          {hotelPhotos.slice(1, 5).map((src, i) => (
            <div key={i} className="cursor-pointer overflow-hidden" onClick={() => setPhoto(i + 1)}>
              <img src={src} alt={`Hotel photo ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent">5 Star Resort</Badge>
                  <Badge variant="green">Open now</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" style={S.serif}>Oberoi Sahl Hasheesh</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} />Sahl Hasheesh Bay, Hurghada</span>
                  <span>·</span>
                  <div className="flex items-center gap-1"><Stars n={5} size={13} /><span className="font-semibold text-foreground ml-1">4.8</span><span>(892 reviews)</span></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSaved(!saved)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <Heart size={15} className={saved ? "fill-red-500 stroke-red-500" : ""} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <Globe size={15} />Share
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border mb-8">
              {(["overview","rooms","reviews"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-5 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <div>
                <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
                  Rising from the pristine shores of Sahl Hasheesh Bay, the Oberoi is one of Egypt's most iconic luxury retreats. Inspired by Arabesque palace design, its whitewashed domes and columned arcades frame a private lagoon, a championship spa, and over 200 metres of uncrowded beachfront. Every detail — from the hand-laid mosaic floors to the locally sourced reef fish on the menu — reflects the hotel's commitment to place.
                </p>

                <h3 className="font-semibold text-foreground mb-5" style={S.serif}>Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {hotelAmenities.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <Icon size={18} className="text-primary flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{label}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-foreground mb-4" style={S.serif}>Location</h3>
                <div className="rounded-2xl overflow-hidden h-52 bg-secondary border border-border flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin size={32} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Sahl Hasheesh Bay</p>
                    <p className="text-xs" style={S.mono}>27.1083° N, 33.8717° E</p>
                  </div>
                </div>
              </div>
            )}

            {tab === "rooms" && (
              <div className="space-y-6">
                {roomTypes.map(r => (
                  <div key={r.name} className="flex flex-col md:flex-row gap-5 bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:w-48 h-40 md:h-auto flex-shrink-0 bg-muted">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground" style={S.serif}>{r.name}</h4>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary" style={S.serif}>${r.price}</div>
                          <div className="text-xs text-muted-foreground">per night</div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Maximize2 size={12} />{r.size}</span>
                        <span className="flex items-center gap-1"><Bed size={12} />{r.beds}</span>
                        <span className="flex items-center gap-1"><Users size={12} />Up to {r.guests} guests</span>
                      </div>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {r.features.map(f => <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{f}</span>)}
                      </div>
                      <Btn variant="accent" size="sm" onClick={() => nav("booking")}>Book this room <ArrowRight size={13} /></Btn>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div>
                <div className="flex items-center gap-6 mb-8 p-6 bg-muted rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-1" style={S.serif}>4.8</div>
                    <Stars n={5} size={16} />
                    <div className="text-xs text-muted-foreground mt-1">892 reviews</div>
                  </div>
                  <div className="flex-1">
                    {[["Cleanliness",98],["Location",95],["Service",97],["Value",88]].map(([l,v]) => (
                      <div key={l} className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground w-24 flex-shrink-0">{l}</span>
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${v}%`, background: "var(--accent)" }} />
                        </div>
                        <span className="text-xs font-medium w-8 text-right">{v}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  {hotelReviews.map(r => (
                    <div key={r.name} className="p-5 bg-card rounded-2xl border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--primary)" }}>
                            {r.name.split(" ").map(w => w[0]).join("")}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-foreground">{r.name}</div>
                            <div className="text-xs text-muted-foreground">{r.date}</div>
                          </div>
                        </div>
                        <Stars n={r.rating} size={13} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-bold text-foreground" style={S.serif}>$180</span>
                <span className="text-muted-foreground text-sm">/ night</span>
              </div>
              <div className="flex items-center gap-1 mb-5">
                <Stars n={5} size={12} />
                <span className="text-xs text-muted-foreground ml-1">4.8 · 892 reviews</span>
              </div>
              <div className="border border-border rounded-xl overflow-hidden mb-3">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-3">
                    <div className="text-xs font-semibold text-foreground mb-0.5">CHECK-IN</div>
                    <div className="text-sm text-muted-foreground">Jul 14, 2026</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-semibold text-foreground mb-0.5">CHECK-OUT</div>
                    <div className="text-sm text-muted-foreground">Jul 19, 2026</div>
                  </div>
                </div>
                <div className="border-t border-border p-3">
                  <div className="text-xs font-semibold text-foreground mb-0.5">GUESTS</div>
                  <div className="text-sm text-muted-foreground">2 adults · 0 children</div>
                </div>
              </div>
              <Btn variant="accent" className="w-full justify-center mb-3" size="lg" onClick={() => nav("booking")}>
                Reserve Now
              </Btn>
              <p className="text-xs text-center text-muted-foreground mb-4">You won't be charged yet</p>
              <div className="space-y-2 text-sm">
                {[["$180 × 5 nights","$900"],["Resort fee","$75"],["Service fee","$48"]].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-muted-foreground"><span>{l}</span><span>{v}</span></div>
                ))}
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                  <span>Total before taxes</span><span>$1,023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESTAURANT DETAILS ───────────────────────────────────────────────────────
const menuSections = [
  { section: "Starters", items: [
    { name: "Red Sea Calamari", desc: "Lightly battered, harissa aioli, lemon", price: 18 },
    { name: "Mezze Platter", desc: "Hummus, baba ganoush, fattoush, pita", price: 22 },
    { name: "Grilled Octopus", desc: "Charred, olive oil, smoked paprika, herbs", price: 26 },
  ]},
  { section: "Mains", items: [
    { name: "Catch of the Day", desc: "Grilled whole fish, garlic butter, seasonal greens", price: 42 },
    { name: "Lobster Thermidor", desc: "Cognac cream, gruyère crust, saffron rice", price: 78 },
    { name: "Reef Prawn Tagine", desc: "Chermoula, preserved lemon, couscous", price: 48 },
    { name: "Lamb Kofta", desc: "Spiced lamb, tahini, roasted eggplant, flatbread", price: 36 },
  ]},
  { section: "Desserts", items: [
    { name: "Umm Ali", desc: "Egyptian bread pudding, rose water, pistachios", price: 14 },
    { name: "Baklava Cheesecake", desc: "Honey, walnut, orange blossom", price: 16 },
  ]},
];

function RestaurantPage({ nav }: { nav: (p: Page) => void }) {
  const [activeSection, setActiveSection] = useState("Starters");
  const [saved, setSaved] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const photos = [IMG.seafood1, IMG.seafood2, IMG.seafood3, IMG.palm];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => nav("home")} className="hover:text-foreground">Discover</button>
          <ChevronRight size={14} />
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-primary">Restaurant</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Coral Terrace</span>
        </div>

        {/* Gallery strip */}
        <div className="flex gap-2 h-72 rounded-2xl overflow-hidden mb-10">
          <div className="flex-1 cursor-pointer relative" onClick={() => setSelectedPhoto((selectedPhoto + 1) % photos.length)}>
            <img src={photos[selectedPhoto]} alt="Restaurant main" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Image size={12} />{photos.length} photos
            </div>
          </div>
          <div className="w-48 flex flex-col gap-2">
            {photos.slice(0,3).map((src,i) => (
              <div key={i} className="flex-1 cursor-pointer overflow-hidden rounded-lg" onClick={() => setSelectedPhoto(i)}>
                <img src={src} alt={`Photo ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="accent">Fine Dining</Badge>
                  <Badge variant="green">Open · Closes 23:00</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" style={S.serif}>Coral Terrace</h1>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} />Hurghada Marina, Pier 3</span>
                  <span>·</span>
                  <div className="flex items-center gap-1"><Stars n={5} size={13} /><span className="font-semibold text-foreground ml-1">4.7</span><span>(1,204 reviews)</span></div>
                  <span>·</span>
                  <span>Mediterranean · Seafood · Egyptian</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setSaved(!saved)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <Heart size={15} className={saved ? "fill-red-500 stroke-red-500" : ""} />{saved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* About */}
            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              Perched on a floating terrace at the tip of Hurghada Marina, Coral Terrace specialises in Red Sea catch served the same day it's landed. The kitchen draws from Egyptian, Levantine, and Mediterranean traditions — a reflection of Hurghada's own cosmopolitan character. On warm evenings the terrace glows over still water; live oud music drifts from 20:00 onward.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[["Cuisine","Mediterranean · Egyptian"],["Price Range","$$$ · $25–$80"],["Hours","12:00 – 23:00"],["Dress Code","Smart casual"]].map(([l,v]) => (
                <div key={l} className="p-4 bg-muted rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1" style={S.mono}>{l}</div>
                  <div className="text-sm font-medium text-foreground">{v}</div>
                </div>
              ))}
            </div>

            {/* Menu */}
            <h2 className="text-2xl font-bold text-foreground mb-5" style={S.serif}>Menu</h2>
            <div className="flex gap-2 flex-wrap mb-6">
              {menuSections.map(s => (
                <button key={s.section} onClick={() => setActiveSection(s.section)}
                  className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                  style={{ background: activeSection === s.section ? "var(--primary)" : "transparent", color: activeSection === s.section ? "white" : "var(--muted-foreground)", borderColor: activeSection === s.section ? "var(--primary)" : "var(--border)" }}>
                  {s.section}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {menuSections.find(s => s.section === activeSection)?.items.map(item => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow">
                  <div>
                    <div className="font-medium text-foreground mb-0.5">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  <div className="text-lg font-bold text-foreground ml-6 flex-shrink-0" style={S.serif}>${item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Reservation widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-foreground mb-5" style={S.serif}>Make a Reservation</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">DATE</label>
                  <div className="flex items-center gap-2 p-3 border border-border rounded-xl text-sm text-muted-foreground">
                    <Calendar size={15} />Jul 14, 2026
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">TIME</label>
                  <select className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none">
                    <option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">GUESTS</label>
                  <div className="flex items-center gap-3 p-3 border border-border rounded-xl">
                    <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><Minus size={14} /></button>
                    <span className="flex-1 text-center text-sm font-medium">2 guests</span>
                    <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><Plus size={14} /></button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">SPECIAL REQUESTS</label>
                  <textarea rows={3} placeholder="Allergies, seating preference…" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none resize-none placeholder:text-muted-foreground" />
                </div>
              </div>
              <Btn variant="accent" className="w-full justify-center" size="lg" onClick={() => nav("booking")}>
                Confirm Reservation
              </Btn>
              <p className="text-xs text-center text-muted-foreground mt-3">Free cancellation up to 24h before</p>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-sm text-foreground mb-3">Contact</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Phone size={13} />+20 65 346 8823</div>
                  <div className="flex items-center gap-2"><Mail size={13} />reservations@coral-terrace.eg</div>
                  <div className="flex items-center gap-2"><MapPin size={13} />Hurghada Marina, Pier 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ACTIVITY DETAILS ─────────────────────────────────────────────────────────
const scheduleItems = [
  { time: "06:30", label: "Hotel pickup from Hurghada Marina" },
  { time: "07:15", label: "Boat departs for Giftun Island" },
  { time: "08:00", label: "First snorkeling session at Abu Ramada Reef" },
  { time: "10:00", label: "Dolphin spotting cruise & light breakfast" },
  { time: "11:30", label: "Second dive at Shaab El Erg coral garden" },
  { time: "13:00", label: "BBQ lunch on the island beach" },
  { time: "14:30", label: "Free time — beach, kayaking, paddleboards" },
  { time: "16:30", label: "Return sail, sunset views from the deck" },
  { time: "17:30", label: "Drop-off at Hurghada Marina" },
];

const pricingTiers = [
  { name: "Snorkel Only", price: 65, features: ["Equipment included","Lunch","Guide","2 reef stops"] },
  { name: "Dive + Snorkel", price: 95, features: ["Everything in Snorkel","1 guided scuba dive","Dive master","Underwater camera"] },
  { name: "Private Boat", price: 420, features: ["Private charter","Custom itinerary","5-course lunch","Transfers included","Up to 8 guests"] },
];

function ActivityPage({ nav }: { nav: (p: Page) => void }) {
  const [selectedTier, setSelectedTier] = useState(1);
  const [guests, setGuests] = useState(2);
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero banner */}
      <div className="relative h-80 bg-primary mt-16">
        <img src={IMG.boat} alt="Boat snorkeling excursion" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e2b]/80 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
            <button onClick={() => nav("home")} className="hover:text-white">Discover</button>
            <ChevronRight size={14} />
            <span className="text-white/90">Activities</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Giftun Island Day Cruise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={S.serif}>Giftun Island Day Cruise</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1"><Star size={14} className="fill-amber-400 stroke-amber-400 text-amber-400" />4.9 (2,103 reviews)</span>
            <span className="flex items-center gap-1"><Clock size={14} />Full day · ~11 hours</span>
            <span className="flex items-center gap-1"><Users size={14} />Max 24 per boat</span>
            <span className="flex items-center gap-1"><MapPin size={14} />Departs Hurghada Marina</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="accent">Best Seller</Badge>
              <Badge variant="green">Instant Confirmation</Badge>
              <button onClick={() => setSaved(!saved)} className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
                <Heart size={15} className={saved ? "fill-red-500 stroke-red-500" : ""} />{saved ? "Saved" : "Save"}
              </button>
            </div>

            {/* Photo strip */}
            <div className="flex gap-2 h-52 rounded-2xl overflow-hidden mb-8">
              <img src={IMG.boat} alt="Snorkeling" className="flex-1 object-cover" />
              <div className="w-44 flex flex-col gap-2">
                <img src={IMG.coral} alt="Reef" className="flex-1 object-cover rounded-lg" />
                <img src={IMG.tour} alt="Boat tour" className="flex-1 object-cover rounded-lg" />
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              Board a traditional Egyptian felucca and sail south along the Hurghada coast to Giftun Island, one of Egypt's most pristine marine protected areas. Two dedicated snorkel stops showcase the National Park's coral gardens — encounter parrotfish, moray eels, and with luck, spinner dolphins. Lunch is a fresh-grilled seafood BBQ on the island's white-sand beach, included in every ticket.
            </p>

            {/* What's included */}
            <h2 className="text-xl font-bold text-foreground mb-4" style={S.serif}>What's included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {["Snorkeling equipment","Life jackets","Freshwater showers","Sunfish & paddleboards","Professional dive guide","BBQ seafood lunch","Soft drinks & water","Hotel pick-up & drop-off"].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />{item}
                </div>
              ))}
            </div>
            {["Alcoholic beverages","Personal travel insurance","Underwater camera (available for hire)"].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <X size={16} className="text-red-400 flex-shrink-0" />{item}
              </div>
            ))}

            {/* Schedule */}
            <h2 className="text-xl font-bold text-foreground mt-8 mb-5" style={S.serif}>Day schedule</h2>
            <div className="relative">
              <div className="absolute left-[52px] top-4 bottom-4 w-px bg-border" />
              <div className="space-y-4">
                {scheduleItems.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-16 text-right text-xs font-medium text-muted-foreground pt-0.5 flex-shrink-0" style={S.mono}>{s.time}</div>
                    <div className="w-5 h-5 rounded-full border-2 border-primary bg-background flex-shrink-0 mt-0.5 relative z-10" />
                    <div className="text-sm text-foreground pt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews snapshot */}
            <h2 className="text-xl font-bold text-foreground mt-10 mb-5" style={S.serif}>Traveler reviews</h2>
            {[
              { name: "Fatima Al-Rashid", date: "April 2026", rating: 5, text: "Absolutely magical. The dolphins stayed with us for twenty minutes — my kids still talk about it." },
              { name: "David Chen", date: "March 2026", rating: 5, text: "Best day of our entire Egypt trip. The reef is in surprisingly good condition and the crew is warm and professional." },
            ].map(r => (
              <div key={r.name} className="p-5 bg-card rounded-2xl border border-border mb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--accent)" }}>
                      {r.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div><div className="font-medium text-sm">{r.name}</div><div className="text-xs text-muted-foreground">{r.date}</div></div>
                  </div>
                  <Stars n={r.rating} size={13} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>

          {/* Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="mb-5">
                <h3 className="font-bold text-foreground mb-4" style={S.serif}>Choose your package</h3>
                <div className="space-y-3">
                  {pricingTiers.map((t, i) => (
                    <div key={t.name} onClick={() => setSelectedTier(i)}
                      className="p-4 rounded-xl border-2 cursor-pointer transition-all"
                      style={{ borderColor: selectedTier === i ? "var(--primary)" : "var(--border)", background: selectedTier === i ? "var(--secondary)" : "transparent" }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: selectedTier === i ? "var(--primary)" : "var(--border)" }}>
                            {selectedTier === i && <div className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />}
                          </div>
                          <span className="font-semibold text-sm text-foreground">{t.name}</span>
                        </div>
                        <span className="font-bold text-foreground" style={S.serif}>${t.price}<span className="text-xs text-muted-foreground font-normal">/pp</span></span>
                      </div>
                      <div className="flex flex-wrap gap-1 pl-6">
                        {t.features.map(f => <span key={f} className="text-xs text-muted-foreground">· {f}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">DATE</label>
                <div className="flex items-center gap-2 p-3 border border-border rounded-xl text-sm text-muted-foreground">
                  <Calendar size={15} />Jul 14, 2026
                </div>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">GUESTS</label>
                <div className="flex items-center gap-3 p-3 border border-border rounded-xl">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><Minus size={14} /></button>
                  <span className="flex-1 text-center text-sm font-medium">{guests} {guests === 1 ? "guest" : "guests"}</span>
                  <button onClick={() => setGuests(Math.min(24, guests + 1))} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><Plus size={14} /></button>
                </div>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>${pricingTiers[selectedTier].price} × {guests} guests</span>
                <span className="font-semibold text-foreground">${pricingTiers[selectedTier].price * guests}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                <span>Service fee</span><span>$12</span>
              </div>
              <div className="flex justify-between font-bold text-foreground border-t border-border pt-3 mb-4">
                <span>Total</span><span>${pricingTiers[selectedTier].price * guests + 12}</span>
              </div>
              <Btn variant="accent" className="w-full justify-center" size="lg" onClick={() => nav("booking")}>
                Book Now
              </Btn>
              <p className="text-xs text-center text-muted-foreground mt-3">Free cancellation up to 48h before</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
const bookingSteps = ["Details", "Guests", "Payment", "Confirm"];

function BookingPage({ nav }: { nav: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16 px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "var(--secondary)" }}>
            <CheckCircle2 size={40} style={{ color: "var(--primary)" }} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3" style={S.serif}>Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Booking reference: <span className="font-semibold text-foreground" style={S.mono}>HHB-2026-08841</span></p>
          <p className="text-muted-foreground text-sm mb-8">A confirmation has been sent to your email. Your local advisor Karim will be in touch within 2 hours.</p>
          <div className="flex flex-col gap-3">
            <Btn variant="primary" size="lg" className="justify-center" onClick={() => nav("home")}>Back to Discover</Btn>
            <Btn variant="outline" size="lg" className="justify-center" onClick={() => { setDone(false); setStep(0); }}>Book another</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <button onClick={() => nav("activity")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronLeft size={16} />Back to activity
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8" style={S.serif}>Complete your booking</h1>

        {/* Progress */}
        <div className="flex items-center mb-10">
          {bookingSteps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{ background: i <= step ? "var(--primary)" : "var(--muted)", color: i <= step ? "white" : "var(--muted-foreground)" }}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs mt-1 text-muted-foreground hidden md:block">{s}</span>
              </div>
              {i < bookingSteps.length - 1 && <div className="flex-1 h-0.5 mx-2" style={{ background: i < step ? "var(--primary)" : "var(--border)" }} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-card border border-border rounded-2xl p-7">
                <h2 className="font-bold text-foreground text-xl mb-6" style={S.serif}>Trip Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">ACTIVITY</label>
                    <div className="p-3 border border-border rounded-xl text-sm text-foreground font-medium">Giftun Island Day Cruise</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">PACKAGE</label>
                    <select className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none">
                      <option>Dive + Snorkel — $95/pp</option>
                      <option>Snorkel Only — $65/pp</option>
                      <option>Private Boat — $420</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">DATE</label>
                    <div className="flex items-center gap-2 p-3 border border-border rounded-xl text-sm text-muted-foreground"><Calendar size={15} />July 14, 2026</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">TIME</label>
                    <div className="flex items-center gap-2 p-3 border border-border rounded-xl text-sm text-muted-foreground"><Clock size={15} />06:30 departure</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">HOTEL / PICKUP LOCATION</label>
                    <input type="text" placeholder="Enter hotel name or address" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">SPECIAL REQUESTS</label>
                    <input type="text" placeholder="Dietary, medical notes…" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none placeholder:text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="bg-card border border-border rounded-2xl p-7">
                <h2 className="font-bold text-foreground text-xl mb-6" style={S.serif}>Guest Information</h2>
                <div className="space-y-5">
                  {[1, 2].map(n => (
                    <div key={n} className="p-5 bg-muted rounded-xl">
                      <h4 className="font-semibold text-sm text-foreground mb-4">Guest {n} {n === 1 ? "(Lead)" : ""}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-xs font-semibold text-muted-foreground mb-1 block">FIRST NAME</label><input type="text" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div>
                        <div><label className="text-xs font-semibold text-muted-foreground mb-1 block">LAST NAME</label><input type="text" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div>
                        <div><label className="text-xs font-semibold text-muted-foreground mb-1 block">NATIONALITY</label><input type="text" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div>
                        <div><label className="text-xs font-semibold text-muted-foreground mb-1 block">DATE OF BIRTH</label><input type="date" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div>
                        {n === 1 && <><div><label className="text-xs font-semibold text-muted-foreground mb-1 block">EMAIL</label><input type="email" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div>
                        <div><label className="text-xs font-semibold text-muted-foreground mb-1 block">PHONE</label><input type="tel" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div></>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card border border-border rounded-2xl p-7">
                <h2 className="font-bold text-foreground text-xl mb-6" style={S.serif}>Payment</h2>
                <div className="flex gap-3 mb-6">
                  {["Credit Card","PayPal","Apple Pay"].map((m, i) => (
                    <div key={m} className="flex-1 p-3 border-2 rounded-xl text-center text-xs font-semibold cursor-pointer transition-all"
                      style={{ borderColor: i === 0 ? "var(--primary)" : "var(--border)", color: i === 0 ? "var(--primary)" : "var(--muted-foreground)", background: i === 0 ? "var(--secondary)" : "transparent" }}>
                      {m}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">CARD NUMBER</label>
                    <div className="flex items-center gap-2 p-3 border border-border rounded-xl">
                      <CreditCard size={16} className="text-muted-foreground" />
                      <input type="text" placeholder="4242 4242 4242 4242" className="flex-1 text-sm bg-transparent text-foreground outline-none placeholder:text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">EXPIRY</label><input type="text" placeholder="MM / YY" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none placeholder:text-muted-foreground" /></div>
                    <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">CVV</label>
                      <div className="flex items-center gap-2 p-3 border border-border rounded-xl">
                        <input type="text" placeholder="123" className="flex-1 text-sm bg-transparent text-foreground outline-none placeholder:text-muted-foreground" />
                        <Lock size={14} className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">NAME ON CARD</label><input type="text" className="w-full p-3 border border-border rounded-xl text-sm bg-background text-foreground outline-none" /></div>
                </div>
                <div className="flex items-center gap-2 mt-5 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Shield size={15} className="text-emerald-600" />
                  <span className="text-xs text-emerald-700">Your payment is secured with 256-bit SSL encryption</span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card border border-border rounded-2xl p-7">
                <h2 className="font-bold text-foreground text-xl mb-6" style={S.serif}>Confirm Booking</h2>
                <div className="space-y-3 mb-6">
                  {[["Activity","Giftun Island Day Cruise"],["Package","Dive + Snorkel"],["Date","July 14, 2026"],["Time","06:30 departure"],["Guests","2 adults"],["Pickup","Oberoi Sahl Hasheesh"],["Payment","Visa ···· 4242"]].map(([l,v]) => (
                    <div key={l} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                      <span className="text-muted-foreground">{l}</span>
                      <span className="font-medium text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 mb-6">
                  <button onClick={() => setAgreed(!agreed)} className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${agreed ? "border-primary bg-primary" : "border-border"}`}>
                    {agreed && <Check size={12} className="text-white" />}
                  </button>
                  <p className="text-sm text-muted-foreground">I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Cancellation Policy</a>. I understand that free cancellation applies up to 48 hours before departure.</p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(Math.max(0, step - 1))} className={`flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors ${step === 0 ? "opacity-30 pointer-events-none" : ""}`}>
                <ChevronLeft size={16} />Previous
              </button>
              {step < bookingSteps.length - 1
                ? <Btn variant="accent" size="md" onClick={() => setStep(step + 1)}>Continue <ChevronRight size={15} /></Btn>
                : <Btn variant="accent" size="md" onClick={() => { if (agreed) setDone(true); }}>Confirm & Pay <Check size={15} /></Btn>
              }
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-foreground mb-4" style={S.serif}>Booking Summary</h3>
              <div className="rounded-xl overflow-hidden mb-4 h-36 bg-muted">
                <img src={IMG.boat} alt="Activity" className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold text-foreground mb-1">Giftun Island Day Cruise</div>
              <div className="text-sm text-muted-foreground mb-4">Dive + Snorkel · Jul 14, 2026 · 2 guests</div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground"><span>$95 × 2 guests</span><span>$190</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Service fee</span><span>$12</span></div>
                <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-2"><span>Total</span><span>$202</span></div>
              </div>
              <div className="mt-5 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2">
                <Info size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">Free cancellation until July 12, 2026 at 06:30.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OWNER DASHBOARD ──────────────────────────────────────────────────────────
const ownerListings = [
  { id: 1, name: "Coral Terrace Restaurant", type: "Restaurant", status: "active", views: 4821, bookings: 128, revenue: 14200, rating: 4.7, image: IMG.seafood1 },
  { id: 2, name: "Red Sea Sunset Cruise",    type: "Activity",   status: "active", views: 2903, bookings: 84,  revenue: 7980,  rating: 4.9, image: IMG.boat },
  { id: 3, name: "Desert Jeep Safari",       type: "Activity",   status: "draft",  views: 0,    bookings: 0,   revenue: 0,     rating: 0,   image: IMG.desert },
];
const ownerBookings = [
  { id: "HHB-08841", guest: "Marco Bianchi",   listing: "Red Sea Sunset Cruise",    date: "Jul 14", guests: 2, amount: 202, status: "confirmed" },
  { id: "HHB-08820", guest: "Sophie Laurent",  listing: "Coral Terrace Restaurant", date: "Jul 13", guests: 4, amount: 148, status: "confirmed" },
  { id: "HHB-08801", guest: "Amira Khalil",    listing: "Red Sea Sunset Cruise",    date: "Jul 12", guests: 3, amount: 297, status: "completed" },
  { id: "HHB-08779", guest: "David Chen",      listing: "Coral Terrace Restaurant", date: "Jul 11", guests: 2, amount: 98,  status: "cancelled" },
];

function OwnerPage({ nav }: { nav: (p: Page) => void }) {
  const [ownerTab, setOwnerTab] = useState<"overview"|"listings"|"bookings"|"messages">("overview");

  const statusStyle = (s: string) => ({ confirmed: "green", completed: "primary", cancelled: "red", draft: "amber" } as Record<string, string>)[s] || "muted";

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 min-h-screen bg-primary text-white fixed left-0 top-0 pt-16 flex flex-col">
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2 mb-0.5"><Waves size={18} style={{ color: "var(--accent)" }} /><span className="font-bold" style={S.serif}>HurghadaHub</span></div>
            <div className="text-xs text-white/50">Owner Portal</div>
          </div>
          <nav className="flex-1 px-3 py-5 space-y-1">
            {[
              { id: "overview",  icon: BarChart3,     label: "Overview" },
              { id: "listings",  icon: Package,        label: "My Listings" },
              { id: "bookings",  icon: Calendar,       label: "Bookings" },
              { id: "messages",  icon: MessageSquare,  label: "Messages" },
              { id: "settings",  icon: Settings,       label: "Settings" },
            ].map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => ownerTab !== id && setOwnerTab(id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${ownerTab === id ? "bg-white/15 text-white" : "text-white/50 hover:text-white hover:bg-white/10"}`}>
                <Icon size={16} />{label}
              </button>
            ))}
          </nav>
          <div className="px-3 py-5 border-t border-white/10 space-y-1">
            <button onClick={() => nav("home")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Home size={16} />Back to Hub
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <LogOut size={16} />Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 ml-60 pt-16 min-h-screen">
          <div className="px-8 py-8">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={S.serif}>
                  {ownerTab === "overview" ? "Dashboard Overview" : ownerTab === "listings" ? "My Listings" : ownerTab === "bookings" ? "Bookings" : ownerTab === "messages" ? "Messages" : "Settings"}
                </h1>
                <p className="text-sm text-muted-foreground">Welcome back, Karim · Last updated just now</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors relative">
                  <Bell size={16} />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                </button>
                <Btn variant="accent" size="sm" onClick={() => setOwnerTab("listings")}><Plus size={14} />New listing</Btn>
              </div>
            </div>

            {ownerTab === "overview" && (
              <div>
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Revenue", value: "$22,180", delta: "+18%", icon: DollarSign, color: "var(--primary)" },
                    { label: "Total Bookings", value: "212", delta: "+9%", icon: Calendar, color: "var(--accent)" },
                    { label: "Avg Rating", value: "4.8", delta: "+0.1", icon: Star, color: "#10b981" },
                    { label: "Profile Views", value: "7,724", delta: "+31%", icon: Eye, color: "#8b5cf6" },
                  ].map(s => (
                    <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: s.color + "20" }}>
                          <s.icon size={16} style={{ color: s.color }} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1" style={S.serif}>{s.value}</div>
                      <div className="text-xs text-emerald-600 font-medium">{s.delta} this month</div>
                    </div>
                  ))}
                </div>

                {/* Recent bookings */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                    <h2 className="font-bold text-foreground" style={S.serif}>Recent Bookings</h2>
                    <button onClick={() => setOwnerTab("bookings")} className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight size={14} /></button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-border">{["Ref","Guest","Listing","Date","Guests","Amount","Status"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>)}</tr></thead>
                      <tbody>
                        {ownerBookings.slice(0,4).map(b => (
                          <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 font-medium" style={S.mono}>{b.id}</td>
                            <td className="px-6 py-4">{b.guest}</td>
                            <td className="px-6 py-4 text-muted-foreground">{b.listing}</td>
                            <td className="px-6 py-4 text-muted-foreground">{b.date}</td>
                            <td className="px-6 py-4 text-center">{b.guests}</td>
                            <td className="px-6 py-4 font-semibold">${b.amount}</td>
                            <td className="px-6 py-4"><Badge variant={statusStyle(b.status) as any}>{b.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {ownerTab === "listings" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ownerListings.map(l => (
                    <div key={l.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40 bg-muted">
                        <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3"><Badge variant={l.status === "active" ? "green" : "amber"}>{l.status}</Badge></div>
                      </div>
                      <div className="p-5">
                        <div className="text-xs text-muted-foreground mb-1" style={S.mono}>{l.type}</div>
                        <h3 className="font-semibold text-foreground mb-3" style={S.serif}>{l.name}</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                          {[["Views", l.views.toLocaleString()],["Bookings", l.bookings],["Revenue", l.revenue ? `$${(l.revenue/1000).toFixed(1)}k` : "—"]].map(([lbl, val]) => (
                            <div key={lbl} className="bg-muted rounded-lg py-2">
                              <div className="text-sm font-bold text-foreground">{val}</div>
                              <div className="text-xs text-muted-foreground">{lbl}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"><Edit2 size={12} />Edit</button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"><Eye size={12} />Preview</button>
                          <button className="flex items-center justify-center px-3 py-2 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors"><Trash2 size={12} /></button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add new */}
                  <button className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center py-16 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus size={28} className="mb-2" />
                    <span className="text-sm font-medium">Add new listing</span>
                  </button>
                </div>
              </div>
            )}

            {ownerTab === "bookings" && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <div className="flex gap-2">
                    {["All","Confirmed","Completed","Cancelled"].map(f => (
                      <button key={f} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border hover:bg-muted transition-colors">{f}</button>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Download size={14} />Export</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border">{["Ref","Guest","Listing","Date","Guests","Amount","Status","Actions"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>)}</tr></thead>
                    <tbody>
                      {ownerBookings.map(b => (
                        <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-xs" style={S.mono}>{b.id}</td>
                          <td className="px-6 py-4 font-medium">{b.guest}</td>
                          <td className="px-6 py-4 text-muted-foreground">{b.listing}</td>
                          <td className="px-6 py-4 text-muted-foreground">{b.date}</td>
                          <td className="px-6 py-4 text-center">{b.guests}</td>
                          <td className="px-6 py-4 font-semibold">${b.amount}</td>
                          <td className="px-6 py-4"><Badge variant={statusStyle(b.status) as any}>{b.status}</Badge></td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Eye size={13} className="text-muted-foreground" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><MessageSquare size={13} className="text-muted-foreground" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {ownerTab === "messages" && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden flex" style={{ height: "60vh" }}>
                <div className="w-72 border-r border-border flex flex-col">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 text-sm text-muted-foreground"><Search size={14} />Search conversations…</div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {[["Marco Bianchi","Great, see you at 06:30!","2m","2"],["Sophie Laurent","Can we change to 4 guests?","1h",""],["Amira Khalil","Thank you for a wonderful trip","3h",""],["David Chen","Refund received, thanks","1d",""]].map(([name,msg,time,unread]) => (
                      <div key={name} className="flex items-center gap-3 px-4 py-3 hover:bg-muted cursor-pointer border-b border-border last:border-0">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "var(--primary)" }}>
                          {(name as string).split(" ").map(w => w[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{name}</span>
                            <span className="text-xs text-muted-foreground">{time}</span>
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{msg}</div>
                        </div>
                        {unread && <span className="w-5 h-5 rounded-full text-xs text-white flex items-center justify-center" style={{ background: "var(--accent)" }}>{unread}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--primary)" }}>MB</div>
                    <div><div className="font-medium text-sm">Marco Bianchi</div><div className="text-xs text-emerald-500">Online</div></div>
                  </div>
                  <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                    {[["MB","Hi Karim! We're excited about tomorrow's cruise. Will there be equipment for beginners?",true],["KM","Of course! We have full snorkeling sets and our guide will give a 15-min orientation before entering the water.",false],["MB","Perfect. My partner hasn't snorkeled before. Is that okay?",true],["KM","Absolutely — beginners are very welcome. The reef at Abu Ramada is calm and shallow. She'll love it!",false],["MB","Great, see you at 06:30!",true]].map(([sender,msg,isGuest],i) => (
                      <div key={i} className={`flex ${isGuest ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${isGuest ? "bg-muted text-foreground" : "text-white"}`} style={!isGuest ? { background: "var(--primary)" } : {}}>
                          {msg}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border flex items-center gap-3">
                    <input type="text" placeholder="Type a message…" className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground" />
                    <Btn variant="primary" size="sm">Send</Btn>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const adminListings = [
  { id: 1, name: "Coral Terrace",         type: "Restaurant", owner: "Karim Mansour",  status: "active",  submissions: "Jan 2026", rating: 4.7 },
  { id: 2, name: "Reef Explorer Divers",  type: "Activity",   owner: "Nadia El-Sayed", status: "pending", submissions: "Jun 2026", rating: 0 },
  { id: 3, name: "Hurghada Plaza Hotel",  type: "Hotel",      owner: "Ahmed Farouk",   status: "active",  submissions: "Mar 2025", rating: 4.3 },
  { id: 4, name: "Bedouin Night Camp",    type: "Activity",   owner: "Youssef Hatem",  status: "flagged", submissions: "May 2026", rating: 3.8 },
  { id: 5, name: "Desert Rose Spa",       type: "Hotel",      owner: "Laila Mostafa",  status: "pending", submissions: "Jun 2026", rating: 0 },
];

const adminUsers = [
  { name: "Karim Mansour",  email: "karim@coral-terrace.eg", role: "Owner",  joined: "Jan 2024", bookings: 212, status: "active" },
  { name: "Marco Bianchi",  email: "marco@example.com",      role: "Traveler", joined: "Feb 2025", bookings: 4,  status: "active" },
  { name: "Sophie Laurent", email: "sophie@example.com",     role: "Traveler", joined: "Dec 2024", bookings: 2,  status: "active" },
  { name: "Ahmed Farouk",   email: "ahmed@plaza-hgh.eg",     role: "Owner",  joined: "Mar 2025", bookings: 88, status: "suspended" },
];

function AdminPage({ nav }: { nav: (p: Page) => void }) {
  const [adminTab, setAdminTab] = useState<"overview"|"listings"|"users"|"reports">("overview");
  const [listingFilter, setListingFilter] = useState("All");

  const statusStyle = (s: string): any => ({ active: "green", pending: "amber", flagged: "red", suspended: "red" })[s] || "muted";

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 min-h-screen fixed left-0 top-0 pt-16 flex flex-col border-r border-border" style={{ background: "#0d0d14" }}>
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2 mb-0.5"><Shield size={18} style={{ color: "var(--accent)" }} /><span className="font-bold text-white" style={S.serif}>Admin Panel</span></div>
            <div className="text-xs text-white/40">HurghadaHub · Super Admin</div>
          </div>
          <nav className="flex-1 px-3 py-5 space-y-1">
            {[
              { id: "overview",  icon: BarChart3,   label: "Platform Overview" },
              { id: "listings",  icon: Layers,      label: "Listings" },
              { id: "users",     icon: UserCheck,   label: "Users" },
              { id: "reports",   icon: Flag,        label: "Reports & Flags" },
              { id: "settings",  icon: Settings,    label: "System Settings" },
            ].map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setAdminTab(id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${adminTab === id ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/8"}`}>
                <Icon size={16} />{label}
              </button>
            ))}
          </nav>
          <div className="px-3 py-5 border-t border-white/10 space-y-1">
            <button onClick={() => nav("home")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/8 transition-colors">
              <Home size={16} />Back to Hub
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 ml-60 pt-16 min-h-screen">
          <div className="px-8 py-8">
            {/* Top */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={S.serif}>
                  {adminTab === "overview" ? "Platform Overview" : adminTab === "listings" ? "All Listings" : adminTab === "users" ? "User Management" : "Reports & Flags"}
                </h1>
                <p className="text-sm text-muted-foreground">Hurghada Hub · Admin · June 27, 2026</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />All systems operational
                </div>
                <button className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors relative">
                  <Bell size={16} />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                </button>
              </div>
            </div>

            {adminTab === "overview" && (
              <div>
                {/* KPIs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Revenue", value: "$184,320", delta: "+23%", icon: DollarSign, color: "#0a4a6b" },
                    { label: "Active Listings", value: "412", delta: "+14 this month", icon: Package, color: "var(--accent)" },
                    { label: "Registered Users", value: "38,441", delta: "+1,204 this month", icon: Users, color: "#10b981" },
                    { label: "Bookings (June)", value: "1,892", delta: "+31% vs May", icon: Calendar, color: "#8b5cf6" },
                  ].map(s => (
                    <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground">{s.label}</span>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: s.color + "20" }}>
                          <s.icon size={16} style={{ color: s.color }} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1" style={S.serif}>{s.value}</div>
                      <div className="text-xs text-emerald-600 font-medium">{s.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pending approvals */}
                  <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                      <h2 className="font-bold text-foreground" style={S.serif}>Pending Approvals</h2>
                      <Badge variant="amber">2 pending</Badge>
                    </div>
                    <div className="divide-y divide-border">
                      {adminListings.filter(l => l.status === "pending").map(l => (
                        <div key={l.id} className="flex items-center gap-4 px-6 py-4">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-sm mb-0.5">{l.name}</div>
                            <div className="text-xs text-muted-foreground">{l.type} · {l.owner} · Submitted {l.submissions}</div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-colors">
                              <Check size={12} />Approve
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-medium hover:bg-red-100 transition-colors">
                              <X size={12} />Reject
                            </button>
                            <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors">
                              <Eye size={13} className="text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="font-bold text-foreground mb-5" style={S.serif}>Platform Health</h2>
                    <div className="space-y-4">
                      {[["Active listings","412","100%","#10b981"],["Avg. response time","1.4h","92% within 2h","var(--accent)"],["Flagged listings","1","Needs review","#ef4444"],["Owner satisfaction","4.6 / 5","Excellent","#0a4a6b"]].map(([label,val,sub,color]) => (
                        <div key={label} className="flex items-center gap-4">
                          <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ background: color }} />
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground">{label}</div>
                            <div className="font-bold text-foreground text-sm">{val}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {adminTab === "listings" && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between flex-wrap gap-3">
                  <div className="flex gap-2 flex-wrap">
                    {["All","Active","Pending","Flagged"].map(f => (
                      <button key={f} onClick={() => setListingFilter(f)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                        style={{ background: listingFilter === f ? "var(--primary)" : "transparent", color: listingFilter === f ? "white" : "var(--muted-foreground)", borderColor: listingFilter === f ? "var(--primary)" : "var(--border)" }}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Filter size={14} />Filter</button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Download size={14} />Export</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border">{["Name","Type","Owner","Submitted","Rating","Status","Actions"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>)}</tr></thead>
                    <tbody>
                      {adminListings.filter(l => listingFilter === "All" || l.status === listingFilter.toLowerCase()).map(l => (
                        <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">{l.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{l.type}</td>
                          <td className="px-6 py-4 text-muted-foreground">{l.owner}</td>
                          <td className="px-6 py-4 text-muted-foreground">{l.submissions}</td>
                          <td className="px-6 py-4">{l.rating ? <div className="flex items-center gap-1"><Star size={12} className="fill-amber-400 stroke-amber-400" />{l.rating}</div> : <span className="text-muted-foreground">—</span>}</td>
                          <td className="px-6 py-4"><Badge variant={statusStyle(l.status)}>{l.status}</Badge></td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Eye size={13} className="text-muted-foreground" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Edit2 size={13} className="text-muted-foreground" /></button>
                              {l.status === "pending" && <button className="p-1.5 rounded-lg hover:bg-emerald-50 transition-colors"><Check size={13} className="text-emerald-500" /></button>}
                              {l.status === "flagged" && <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={13} className="text-red-500" /></button>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab === "users" && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 text-sm text-muted-foreground w-64">
                    <Search size={14} /><input className="bg-transparent outline-none text-foreground text-sm placeholder:text-muted-foreground" placeholder="Search users…" />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-border rounded-xl text-xs bg-background text-foreground outline-none">
                      <option>All roles</option><option>Owners</option><option>Travelers</option>
                    </select>
                    <Btn variant="accent" size="sm"><Plus size={14} />Add user</Btn>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border">{["User","Role","Joined","Bookings","Status","Actions"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>)}</tr></thead>
                    <tbody>
                      {adminUsers.map(u => (
                        <tr key={u.email} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "var(--primary)" }}>
                                {u.name.split(" ").map(w => w[0]).join("")}
                              </div>
                              <div><div className="font-medium text-foreground">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                            </div>
                          </td>
                          <td className="px-6 py-4"><Badge variant={u.role === "Owner" ? "primary" : "muted"}>{u.role}</Badge></td>
                          <td className="px-6 py-4 text-muted-foreground">{u.joined}</td>
                          <td className="px-6 py-4 text-center font-medium">{u.bookings}</td>
                          <td className="px-6 py-4"><Badge variant={statusStyle(u.status)}>{u.status}</Badge></td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Eye size={13} className="text-muted-foreground" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Edit2 size={13} className="text-muted-foreground" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={13} className="text-red-500" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab === "reports" && (
              <div className="space-y-5">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Flag size={18} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-red-900">Bedouin Night Camp — Misleading pricing</h3>
                      <Badge variant="red">Flagged</Badge>
                    </div>
                    <p className="text-sm text-red-700 mb-3">2 separate guests reported that on-site prices differed significantly from advertised rates. One complaint included photographs.</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 border border-red-200 text-xs font-medium hover:bg-red-200 transition-colors"><Eye size={12} />Review evidence</button>
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-foreground border border-border text-xs font-medium hover:bg-muted transition-colors"><MessageSquare size={12} />Contact owner</button>
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"><Trash2 size={12} />Suspend listing</button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={18} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-amber-900">Ahmed Farouk — Account suspended</h3>
                      <Badge variant="amber">Under review</Badge>
                    </div>
                    <p className="text-sm text-amber-700 mb-3">Account suspended pending investigation into duplicate booking charges. Owner notified on June 24, 2026. Awaiting documentation.</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 border border-amber-200 text-xs font-medium hover:bg-amber-200 transition-colors"><FileText size={12} />View case file</button>
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-colors"><Check size={12} />Reinstate account</button>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 opacity-60">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">Reef Explorer Divers — Safety complaint</h3>
                      <Badge variant="green">Resolved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Dive guide certification verified. Complaint dismissed. Listing reinstated June 10, 2026.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const isFullscreen = page === "owner" || page === "admin";

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {!isFullscreen && <Navbar current={page} nav={setPage} />}
      {isFullscreen && (
        <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 flex items-center justify-end px-6" style={{ background: page === "admin" ? "#0d0d14" : "var(--primary)" }}>
          <div className="flex gap-2">
            <button onClick={() => setPage("owner")} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${page === "owner" ? "bg-white/20 text-white" : "text-white/50 hover:text-white"}`}>Owner</button>
            <button onClick={() => setPage("admin")} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${page === "admin" ? "bg-white/20 text-white" : "text-white/50 hover:text-white"}`}>Admin</button>
            <button onClick={() => setPage("home")} className="text-xs px-3 py-1.5 rounded-full font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><Home size={12} />Hub</button>
          </div>
        </div>
      )}

      {page === "home"       && <HomePage       nav={setPage} />}
      {page === "hotel"      && <HotelPage      nav={setPage} />}
      {page === "restaurant" && <RestaurantPage nav={setPage} />}
      {page === "activity"   && <ActivityPage   nav={setPage} />}
      {page === "booking"    && <BookingPage    nav={setPage} />}
      {page === "owner"      && <OwnerPage      nav={setPage} />}
      {page === "admin"      && <AdminPage      nav={setPage} />}
    </div>
  );
}
