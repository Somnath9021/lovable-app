import React, { useState } from "react";
import {
  Camera,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Award,
  MapPin,
  Calendar,
  Instagram,
  Mail,
  Phone,
  Send,
  X,
  ChevronRight,
  User,
  Check,
  Star,
  Image as ImageIcon
} from "lucide-react";

interface Photo {
  id: string;
  title: string;
  category: "Landscape" | "Portrait" | "Street" | "Wildlife" | "Architecture";
  url: string;
  likes: number;
  location: string;
  camera: string;
  lens: string;
  settings: string;
  featured?: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
}

const INITIAL_PHOTOS: Photo[] = [
  {
    id: "1",
    title: "Mist over the Norwegian Fjords",
    category: "Landscape",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    likes: 342,
    location: "Lofoten Islands, Norway",
    camera: "Sony A7R IV",
    lens: "16-35mm f/2.8 GM",
    settings: "ISO 100, f/11, 1/125s",
    featured: true
  },
  {
    id: "2",
    title: "Solitude in Neon Alley",
    category: "Street",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    likes: 215,
    location: "Shinjuku, Tokyo",
    camera: "Fujifilm X-T5",
    lens: "35mm f/1.4",
    settings: "ISO 1600, f/2, 1/250s",
    featured: true
  },
  {
    id: "3",
    title: "Golden Hour Silhouette",
    category: "Portrait",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    likes: 489,
    location: "Big Sur, California",
    camera: "Canon EOS R5",
    lens: "85mm f/1.2 L",
    settings: "ISO 200, f/1.4, 1/1000s",
    featured: true
  },
  {
    id: "4",
    title: "Geometric Brutalism",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    likes: 184,
    location: "Berlin, Germany",
    camera: "Sony A7R IV",
    lens: "24-70mm f/2.8 GM",
    settings: "ISO 64, f/8, 1/30s"
  },
  {
    id: "5,",
    title: "The Monarch of the Highlands",
    category: "Wildlife",
    url: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80",
    likes: 512,
    location: "Glencoe, Scotland",
    camera: "Sony A1",
    lens: "200-600mm f/5.6-6.3",
    settings: "ISO 800, f/6.3, 1/800s",
    featured: true
  },
  {
    id: "6",
    title: "Alpine Mirror Lake",
    category: "Landscape",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    likes: 390,
    location: "Banff National Park, Canada",
    camera: "Canon EOS R5",
    lens: "15-35mm f/2.8 L",
    settings: "ISO 50, f/11, 2s"
  },
  {
    id: "7",
    title: "Urban Symphony",
    category: "Street",
    url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
    likes: 276,
    location: "New York City, USA",
    camera: "Leica M11",
    lens: "50mm f/2 Summicron",
    settings: "ISO 400, f/4, 1/500s"
  },
  {
    id: "8",
    title: "Timeless Expression",
    category: "Portrait",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    likes: 310,
    location: "Paris Studio, France",
    camera: "Sony A7R IV",
    lens: "135mm f/1.8 GM",
    settings: "ISO 100, f/2, 1/320s"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Elena Rostova",
    role: "Art Director, Vogue Living",
    comment: "Aperture & Soul captured the emotional essence of our architectural showcase with breathtaking precision and moody cinematic lighting.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Private Collector",
    comment: "Purchasing the Norwegian Fjord print was seamless. The museum-grade Hahnemühle paper quality exceeded all my expectations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "3",
    name: "Sophie & David",
    role: "Wedding Clients",
    comment: "Looking back at our gallery brings tears of joy every single time. Every candid moment was frozen in its absolute perfection.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>(INITIAL_PHOTOS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>([]);
  
  // Booking & Contact state
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingService, setBookingService] = useState("Portrait Session");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const categories = ["All", "Landscape", "Street", "Portrait", "Wildlife", "Architecture"];

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isLiked = likedPhotoIds.includes(id);
    
    setLikedPhotoIds(prev => isLiked ? prev.filter(i => i !== id) : [...prev, id]);
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p));
    
    if (activePhoto && activePhoto.id === id) {
      setActivePhoto(prev => prev ? { ...prev, likes: prev.likes + (isLiked ? -1 : 1) } : null);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingName("");
      setBookingEmail("");
      setBookingDate("");
      setBookingMessage("");
    }, 4000);
  };

  const filteredPhotos = selectedCategory === "All" 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">Aperture & Soul</span>
            <span className="block text-[10px] tracking-widest text-amber-400 font-medium uppercase">Fine Art Photography</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#gallery" className="hover:text-amber-400 transition">Gallery</a>
          <a href="#about" className="hover:text-amber-400 transition">About</a>
          <a href="#prints" className="hover:text-amber-400 transition">Prints</a>
          <a href="#testimonials" className="hover:text-amber-400 transition">Reviews</a>
          <a href="#contact" className="hover:text-amber-400 transition">Book Session</a>
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-bold tracking-wider uppercase hover:opacity-95 transition shadow-lg shadow-amber-500/20"
          >
            Inquire Now
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0a0a0c]/40 to-[#0a0a0c]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-300 text-xs font-medium tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Award-Winning Visual Storyteller</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.1]">
            Capturing the <span className="italic font-light text-amber-400">soul</span> of the moment.
          </h1>

          <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Documenting the raw beauty of untamed wilderness, moody urban geometry, and intimate human portraits across the globe.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#gallery"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-amber-400 transition duration-300 shadow-xl"
            >
              Explore Gallery
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-widest uppercase backdrop-blur-md border border-white/10 transition duration-300"
            >
              Book a Commission
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 max-w-3xl mx-auto border-t border-white/10 mt-16">
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-white font-light">12+</p>
              <p className="text-xs tracking-widest text-slate-400 uppercase mt-1">Years Experience</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-amber-400 font-light">45+</p>
              <p className="text-xs tracking-widest text-slate-400 uppercase mt-1">Countries Visited</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-white font-light">18</p>
              <p className="text-xs tracking-widest text-slate-400 uppercase mt-1">Global Awards</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-amber-400 font-light">2,500+</p>
              <p className="text-xs tracking-widest text-slate-400 uppercase mt-1">Fine Art Prints Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Curated Portfolios</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2">Selected Works</h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => {
            const isLiked = likedPhotoIds.includes(photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase font-semibold text-amber-300">
                    {photo.category}
                  </span>

                  {/* Like Button */}
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition ${
                      isLiked
                        ? "bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30"
                        : "bg-black/40 border-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                  </button>

                  {/* Bottom Details on Card */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-center space-x-1.5 text-amber-400 text-xs mb-1 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{photo.location}</span>
                    </div>
                    <h3 className="font-serif text-xl font-normal text-white group-hover:text-amber-200 transition">
                      {photo.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-xs text-slate-400">
                      <span>{photo.camera}</span>
                      <span className="flex items-center space-x-1 text-slate-300">
                        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                        <span>{photo.likes}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Photographer Section */}
      <section id="about" className="py-24 bg-white/[0.02] border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                alt="Julian Vance - Photographer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#121216] border border-amber-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <Award className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="font-serif font-bold text-white text-sm">IPA Photographer</p>
                  <p className="text-[10px] text-amber-400 uppercase tracking-widest">Grand Winner 2023</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                "Photography is not about the camera you hold, but the depth of emotion you are willing to witness."
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Meet the Artist</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              Julian Vance — <span className="italic font-normal text-amber-400">Visual Poet</span> & Explorer.
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              For over a decade, I have wandered through sweeping glacial valleys, chaotic neon megacities, and quiet portrait studios seeking the transcendent in the everyday. My work is driven by a deep fascination with natural light, architectural symmetry, and intimate human vulnerability.
            </p>

            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Whether collaborating with luxury brands, crafting fine art prints for private collectors, or documenting once-in-a-lifetime celebrations, my mission remains unchanged: to create timeless visual heirlooms that speak without words.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-serif text-white font-medium text-sm">Gear of Choice</p>
                <p className="text-xs text-slate-400 mt-1">Sony Alpha System & Leica M-Series for uncompromised optical purity.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-serif text-white font-medium text-sm">Fine Art Printing</p>
                <p className="text-xs text-slate-400 mt-1">Printed exclusively on museum-grade 308gsm Hahnemühle Rag paper.</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-semibold text-xs tracking-widest uppercase"
              >
                <span>Get in touch for collaborations</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Prints & Store Section */}
      <section id="prints" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Museum Quality Editions</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2">Limited Fine Art Prints</h2>
          <p className="text-slate-400 text-sm mt-4">
            Own a piece of the journey. Each photograph is printed in limited editions of 25 worldwide, hand-signed, and accompanied by a numbered certificate of authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[ 
            {
              name: "Collector Edition (Small)",
              size: "16" x 24"",
              price: "$450",
              desc: "Edition of 25 • Hahnemühle Cotton Rag • Signed & Numbered"
            },
            {
              name: "Gallery Edition (Medium)",
              size: "24" x 36"",
              price: "$850",
              desc: "Edition of 15 • UV Protective Acrylic Face Mount • Signed"
            },
            {
              name: "Masterpiece Edition (Large)",
              size: "40" x 60"",
              price: "$1,650",
              desc: "Edition of 5 • Museum Acrylic & Solid Walnut Floating Frame"
            }
          ].map((tier, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${idx === 1 ? 'bg-amber-500/10 border-amber-500/50 shadow-2xl relative' : 'bg-white/5 border-white/10 hover:border-white/25'}`}>
              {idx === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-black text-[10px] font-bold tracking-widest uppercase">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="font-serif text-2xl font-normal text-white">{tier.name}</h3>
                <p className="text-amber-400 text-sm font-semibold mt-1">{tier.size}</p>
                <p className="font-serif text-4xl text-white font-light mt-4">{tier.price}</p>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">{tier.desc}</p>
              </div>
              <div className="pt-8 mt-8 border-t border-white/10">
                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition ${idx === 1 ? 'bg-amber-400 text-black hover:bg-amber-300' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <span>Inquire Print</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Client Experiences</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2">Words from Collectors & Clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-white/10">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-serif text-white font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-amber-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="contact" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="space-y-6">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Let's Create Together</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">Book a Session or Request a Print</h2>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Whether you're looking to book a portrait session, commission a landscape series, or acquire a fine art print for your home or office, I'd love to hear from you.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="font-serif text-white">julian@apertureandsoul.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Instagram</p>
                  <p className="font-serif text-white">@julianvance.photo</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Studio Location</p>
                  <p className="font-serif text-white">Reykjavik & San Francisco</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {bookingSubmitted ? (
              <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-white">Message Received</h3>
                <p className="text-slate-300 text-sm">
                  Thank you for reaching out, {bookingName}. Julian will review your inquiry and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Service / Inquiry</label>
                    <select
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-400 transition text-sm"
                    >
                      <option className="bg-slate-900">Portrait Session</option>
                      <option className="bg-slate-900">Commercial / Editorial</option>
                      <option className="bg-slate-900">Fine Art Print Inquiry</option>
                      <option className="bg-slate-900">Workshop & Mentorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-400 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Project Details</label>
                  <textarea
                    rows={4}
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    placeholder="Tell me about your vision, location, or print preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-widest uppercase transition shadow-lg shadow-amber-400/20"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 lg:px-12 bg-[#08080a] text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black">
              <Camera className="w-4 h-4" />
            </div>
            <span className="font-serif tracking-widest text-sm font-bold text-white uppercase">Aperture & Soul</span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Julian Vance Photography. All rights reserved. Crafted with React & Tailwind.
          </p>

          <div className="flex items-center space-x-4 text-slate-400">
            <a href="#" className="hover:text-amber-400 transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-amber-400 transition"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

      {/* Lightbox / Modal for Photo Details */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#121216] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Preview */}
            <div className="lg:w-2/3 bg-black flex items-center justify-center p-4">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[80vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Metadata & Actions */}
            <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-widest font-semibold">
                    {activePhoto.category}
                  </span>
                  <button
                    onClick={() => handleLike(activePhoto.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs transition ${
                      likedPhotoIds.includes(activePhoto.id)
                        ? "bg-rose-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedPhotoIds.includes(activePhoto.id) ? "fill-white" : ""}`} />
                    <span>{activePhoto.likes}</span>
                  </button>
                </div>

                <h3 className="font-serif text-2xl text-white font-normal mb-2">{activePhoto.title}</h3>
                <div className="flex items-center space-x-1.5 text-amber-400 text-xs mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePhoto.location}</span>
                </div>

                {/* EXIF Data */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3 mb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Camera Metadata</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Camera</span>
                      <span className="text-slate-200 font-medium">{activePhoto.camera}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Lens</span>
                      <span className="text-slate-200 font-medium">{activePhoto.lens}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/10">
                      <span className="text-slate-500 block">Settings</span>
                      <span className="text-slate-200 font-medium">{activePhoto.settings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="#contact"
                  onClick={() => setActivePhoto(null)}
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-widest uppercase transition flex items-center justify-center space-x-2 shadow-lg shadow-amber-400/20"
                >
                  <span>Inquire Fine Art Print</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
