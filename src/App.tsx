/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  X,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Music,
  Palette,
  Theater,
  Feather,
  HeartHandshake,
  Compass,
  Award,
  Users,
  Film,
  Camera,
  Layers,
  Coins,
  Megaphone,
  Briefcase,
  ChevronDown,
  ExternalLink,
  Check,
  Flame,
  Volume2,
  VolumeX,
  Eye,
  Star,
  Globe2
} from 'lucide-react';

/* =========================================================================
   CURATED ASSETS & FALLBACK MAPPINGS
   ========================================================================= */

const ARTS_CLUB_LOGO = '/src/assets/images/arts_club_logo_1791109391070.jpg';
const ARTS_CLUB_LOGO_FALLBACK = '/arts-club-logo.jpg';

const EVENT_FALLBACKS: Record<string, string> = {
  'rigolade.jpg': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  'sreeotsav.jpg': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  'holi.jpg': 'https://images.unsplash.com/photo-1576487247299-e22607349926?auto=format&fit=crop&w=1200&q=80',
  'traditional-day.jpg': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  'sankranthi.jpg': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'christmas.jpg': 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=80',
};

const BOARD_PORTRAIT_FALLBACKS: Record<string, string> = {
  'JUAN EMMANUEL.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'LIKITHA REDDY.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'VISISTA SOUFALYA.jpeg': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'AKASH REDDY.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'SREENIDHI.jpeg': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  'VEEKSHITH.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'VENKY.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'SAHARSH.jpg': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'AARADHYA KADIRI.jpeg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'ABHIJEET RAJ.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'ERNEST PAUL.jpg': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
  'GANDI CHARAN TEJ.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  'AKHIL.jpg': 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80',
  'SIDDARTH REDDY.jpg': 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
  'SINDHU.jpeg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  'AIHEKA.jpg': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
  'NAGESH.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'RAHUL.jpeg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'SAI SOHAN.jpeg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'Nirvigna.jpg': 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
  'juan-emmanuel.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'likhitha.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'visista-soufalya.jpg': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
};

/* =========================================================================
   DATA STRUCTURES
   ========================================================================= */

interface EventItem {
  id: string;
  name: string;
  image: string;
  tagline: string;
  timeline: string;
  badge: string;
  story: string;
  highlights: string[];
  coHost?: string;
  stats: { label: string; value: string }[];
}

interface PlatformItem {
  id: string;
  name: string;
  wing: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  disciplines: string[];
}

interface ExtensionItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  leadQuote: string;
  focus: string[];
  icon: React.ElementType;
  gradient: string;
}

interface DomainItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

interface BoardMember {
  name: string;
  designation: string;
  image: string;
  category: 'core' | 'wing' | 'operations';
  bio?: string;
}

/* =========================================================================
   CATALOG DATA DEFINITIONS
   ========================================================================= */

const EVENTS_DATA: EventItem[] = [
  {
    id: 'rigolade',
    name: 'Rigolade',
    image: '/rigolade.jpg',
    tagline: 'The Grand Annual Convergence of Tech & Soul',
    timeline: 'Annual 3-Day Flagship Fest',
    badge: 'Flagship Convergence',
    coHost: 'Co-hosted with TechVision Club SNIST',
    story:
      'Rigolade stands as the pinnacle of cultural and technical synergy at Sreenidhi Institute of Science & Technology. Spanning three electrifying days, Rigolade fuses cutting-edge hackathons and technical expos with showstopping theatrical spectacles, visual art galleries, and the world-renowned Vivarth Cultural Night. The festival consistently welcomes prominent celebrity artists, playback icons, and indie visionaries who transform the campus amphitheater into a sea of pulsing lights and uninhibited creative energy.',
    highlights: [
      'The legendary Vivarth Cultural Night featuring celebrity performers',
      'Dual-spectrum synergy uniting creative expression and technology',
      'Massive campus-wide battle of the bands and solo musical showcases',
      'National-level dance face-offs drawing crews from across India',
    ],
    stats: [
      { label: 'Festival Days', value: '3 Days' },
      { label: 'Campus Footfall', value: '10,000+' },
      { label: 'Flagship Stage', value: 'Vivarth Night' },
    ],
  },
  {
    id: 'sreeotsav',
    name: 'Sreeotsav',
    image: '/sreeotsav.jpg',
    tagline: 'A Multi-Sensory Celebration of Heritage & Festivity',
    timeline: 'Annual 2-Day Extravaganza',
    badge: 'Cultural Festive',
    story:
      'Sreeotsav represents the communal heartbeat of SNIST. Over two unforgettable days, the campus transforms into a kaleidoscope of Indian festive culture. The celebration features an extensive multicultural Food Festival presenting artisanal delicacies from every state, culminating in the vibrant Dandiya and Garba Night where thousands of students, faculty, and guests spin under shimmering canopy lights in radiant traditional finery.',
    highlights: [
      'Authentic multicultural culinary fair curated by regional student wings',
      'High-energy open-air Dandiya Night with live dhol players and DJ sets',
      'Inter-departmental folk dance showcases and traditional rangoli trails',
      'Artisanal handicraft bazaars and live interactive caricature stalls',
    ],
    stats: [
      { label: 'Celebration Days', value: '2 Days' },
      { label: 'Food Stalls', value: '45+ Stalls' },
      { label: 'Dandiya Dancers', value: '4,000+' },
    ],
  },
  {
    id: 'holi',
    name: 'Holi',
    image: '/Holi.jpg',
    tagline: 'The Living Canvas of Colors, Harmony & Kinship',
    timeline: 'Spring Festival',
    badge: 'Color Carnival',
    story:
      'The Arts Club Holi celebration reimagines the festival of colors as an artistic canvas of unity. Embracing the tradition of pristine white attire, the entire student collective gathers on the vast lawns for a joyful, organic powder celebration. Surrounded by rhythmic acoustic dhol circles and live fusion music, social hierarchies dissolve into laughter, brotherhood, and kaleidoscopic memories.',
    highlights: [
      '100% eco-friendly and organic herbal gulal distribution',
      'Classic all-white dress code transforming into an organic living mural',
      'Rhythmic acoustic dhol beats, water misting zones, and DJ crescendos',
      'Curated safety corridors and vibrant candid photo installations',
    ],
    stats: [
      { label: 'Organic Colors', value: '500+ KG' },
      { label: 'Student Union', value: 'Unified' },
      { label: 'Vibe Level', value: 'Pure Euphoria' },
    ],
  },
  {
    id: 'traditional-day',
    name: 'Traditional Day',
    image: '/traditional day.jpg',
    tagline: 'Honoring Ancestral Heritage, Couture & Timeless Roots',
    timeline: 'Annual Heritage Showcase',
    badge: 'Heritage Gala',
    story:
      'Traditional Day is SNIST’s most poignant homage to Indian heritage and generational art. Students and faculty don exquisite regional attire—from shimmering Kanjeevarams and elegant Kurtas to regal Sherwanis. The day unfolds with classical carnatic instrumentals, traditional procession marches, folk drama vignettes, and an editorial campus photography retrospective celebrating our shared ancestry.',
    highlights: [
      'Grand ethnic couture parade celebrating regional handlooms',
      'Live Carnatic and Hindustani classical ensemble performances',
      'Heritage photo-booth installations honoring Indian architectural motifs',
      'Faculty and student felicitation for cultural stewardship',
    ],
    stats: [
      { label: 'Couture Displays', value: 'Pan-Indian' },
      { label: 'Heritage Walk', value: 'Grand Scale' },
      { label: 'Campus Elegance', value: '100%' },
    ],
  },
  {
    id: 'sankranti',
    name: 'Sankranti',
    image: '/sankranthi.jpg',
    tagline: 'Sunward Harvests, Rangoli Murals & Skyward Kites',
    timeline: 'Harvest Solstice',
    badge: 'Harvest Jubilee',
    story:
      'Marking the auspicious transit of the sun, the Arts Club Sankranti celebration honors the agrarian roots of Telangana and Andhra Pradesh. The courtyard becomes an open gallery for intricate Muggu (Rangoli) competitions, while the skies above SNIST are filled with colorful kites competing in friendly wind-duels. The aroma of freshly cooked Pongal and festive sweets fills the air as students gather around the traditional Bhogi warmth.',
    highlights: [
      'Inter-collegiate geometric Muggu and floral Rangoli competition',
      'Skyward kite-flying tournament with customized Arts Club diamond kites',
      'Traditional Haridasu chants and live ethnic instrumental performances',
      'Communal preparation and sharing of warm sweet Pongal',
    ],
    stats: [
      { label: 'Rangoli Artworks', value: '60+ Murals' },
      { label: 'Kites in Flight', value: '1,000+' },
      { label: 'Harvest Sweets', value: 'Campus-wide' },
    ],
  },
  {
    id: 'christmas',
    name: 'Christmas',
    image: 'christmas.jpg',
    tagline: 'A Winter Symphony of Lights, Benevolence & Carol Harmony',
    timeline: 'Winter Jubilee',
    badge: 'Winter Solstice',
    story:
      'As December winds sweep the Hyderabad plateau, the Arts Club wraps the campus in fairy lights, pine wreaths, and warm acoustic harmonies. Christmas at SNIST is defined by kindness: the club orchestrates student carol choirs, an enormous lit Christmas tree installation, campus-wide Secret Santa gift exchanges, and philanthropic charity donation drives extending warmth to underserved local communities.',
    highlights: [
      'Acoustic choir singing contemporary and classical winter carols',
      'Monumental 20-foot campus Christmas tree illumination countdown',
      'Arts Club Secret Santa gift-sharing network connecting hundreds',
      'Annual Winter Benevolence Drive providing clothes and meals to shelter homes',
    ],
    stats: [
      { label: 'Tree Illumination', value: '20 Feet' },
      { label: 'Carols Sung', value: '30+ Hymns' },
      { label: 'Charity Impact', value: 'Community First' },
    ],
  },
];

const PLATFORMS_DATA: PlatformItem[] = [
  {
    id: 'nrithya',
    name: 'Nrithya',
    wing: 'The Dance Wing',
    tagline: 'The Poetics of Motion & Sacred Rhythm',
    description:
      'Nrithya is the physical manifestation of melody. From the measured mudras of Bharatanatyam and Kathak to fluid contemporary storytelling and high-energy cinematic choreography, Nrithya commands every stage with razor-sharp synchronization and raw emotional gravity.',
    icon: Flame,
    accent: 'from-amber-500/20 via-rose-500/10 to-transparent',
    disciplines: ['Classical Bharatanatyam & Kathak', 'Contemporary Lyrical', 'Cinematic Semi-Classical', 'Folk & Regional Rhythms'],
  },
  {
    id: 'sargam',
    name: 'Sargam',
    wing: 'The Music Wing',
    tagline: 'Resonance, Acoustics & Timeless Harmony',
    description:
      'Sargam breathes soul into the club. Comprising gifted vocalists, classical instrumentalists, electric guitarists, and acoustic percussionists, Sargam curates soul-stirring unplugged jams, classical jugalbandis, and arena-filling rock sets.',
    icon: Music,
    accent: 'from-violet-500/20 via-indigo-500/10 to-transparent',
    disciplines: ['Carnatic & Hindustani Vocals', 'Western & Eastern Fusion', 'Acoustic Ensembles', 'Battle of the Bands'],
  },
  {
    id: 'abhinaya',
    name: 'Abhinaya',
    wing: 'Dramatics & Theatre Wing',
    tagline: 'The Living Stage & Human Truth',
    description:
      'Abhinaya is the sanctuary of dramatic truth. From powerful street-play nukkad nataks addressing urgent socio-cultural dilemmas to theatrical proscenium productions and mime artistry, Abhinaya pierces the veil between performer and spectator.',
    icon: Theater,
    accent: 'from-red-500/20 via-orange-500/10 to-transparent',
    disciplines: ['Proscenium Theatre Plays', 'Street Plays (Nukkad Natak)', 'Expressive Mime Art', 'Method Acting & Monologues'],
  },
  {
    id: 'kalakrithi',
    name: 'Kalakrithi',
    wing: 'Fine Arts & Painting Wing',
    tagline: 'Color Alchemy, Charcoal & Sacred Geometry',
    description:
      'Kalakrithi paints the world with unbridled vision. Its artists master acrylic canvas painting, intricate charcoal sketching, large-scale live graffiti, monumental campus installations, and digital concept art that visually anchor all SNIST festivals.',
    icon: Palette,
    accent: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    disciplines: ['Canvas Acrylic & Oil Works', 'Live Charcoal & Pencil Realism', 'Monumental Festival Installations', 'Digital Art & Calligraphy'],
  },
  {
    id: 'sahithi',
    name: 'Sahithi',
    wing: 'Literature, Poetry & Oratory',
    tagline: 'The Spoken Word & Literary Architecture',
    description:
      'Sahithi honors the eternal power of language. Bridging Telugu, Hindi, and English literature, Sahithi nurtures fierce slam poets, persuasive orators, insightful essayists, and philosophical debaters who give voice to the unspoken thoughts of youth.',
    icon: Feather,
    accent: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    disciplines: ['Spoken Word & Slam Poetry', 'Multilingual Debating & Parliamentary Speech', 'Creative Prose & Magazine Journals', 'Extempore & Literary Quizzing'],
  },
  {
    id: 'shakti',
    name: 'Shakti',
    wing: 'Social & Cultural Empowerment',
    tagline: 'Art as an Instrument of Empathy & Transformation',
    description:
      'Shakti channels artistic passion into direct community upliftment. Through art therapy workshops, gender equality symposia, environmental sustainability drives, and outreach visits to orphanage homes, Shakti ensures that culture always serves humanity.',
    icon: HeartHandshake,
    accent: 'from-pink-500/20 via-purple-500/10 to-transparent',
    disciplines: ['Community Art Therapy', 'Inclusivity & Mental Wellness Drives', 'Eco-Art Sustainability Initiatives', 'Youth Empowerment Forums'],
  },
];

const EXTENSIONS_DATA: ExtensionItem[] = [
  {
    id: 'devonyes',
    name: 'Devonyes',
    subtitle: 'The Official Dance Crew of SNIST',
    description:
      'Devonyes is SNIST’s high-octane competitive urban dance powerhouse. Renowned across South India for razor-sharp choreography, explosive popping, waacking, breaking, and unified crew sync, Devonyes represents the college at premier national collegiate dance battles and festival arenas.',
    leadQuote: '“Precision in chaos. Grace in power. Every beat is an oath.”',
    focus: ['Urban Hip-Hop & Krumping', 'Collegiate State Championships', 'Synchronized Choreography', 'Experimental Street Battles'],
    icon: Flame,
    gradient: 'from-rose-500/20 via-red-950/40 to-black/60',
  },
  {
    id: 'munsoc',
    name: 'MUNSOC',
    subtitle: 'Model United Nations Society of SNIST',
    description:
      'MUNSOC is the premier diplomatic think-tank and debating society of SNIST. Simulating the halls of the United Nations Security Council, General Assembly, and Crisis Committees, MUNSOC hones geopolitical acumen, strategic lobbying, resolution drafting, and foreign policy discourse.',
    leadQuote: '“Where diplomacy replaces discord, and future leaders shape global policy.”',
    focus: ['UN Parliamentary Procedure', 'Geopolitical Crisis Simulations', 'Multilateral Treaty Drafting', 'National MUN Delegations'],
    icon: Globe2,
    gradient: 'from-cyan-500/20 via-blue-950/40 to-black/60',
  },
];

const DOMAINS_DATA: DomainItem[] = [
  {
    id: 'organizing',
    name: 'Organizing Team',
    subtitle: 'Logistics Command & Stage Architecture',
    description:
      'The operational spine of every flagship festival. From stage rigging, acoustic sound checks, and greenroom coordination to campus crowd security and meticulous minute-by-minute schedules, the Organizing Team turns creative ambition into flawless reality.',
    deliverables: ['Campus Crowd Management', 'Stage & Sound Architecture', 'VIP & Artist Protocol', 'Festival Timeline Governance'],
    icon: Compass,
  },
  {
    id: 'publicity',
    name: 'Publicity Team',
    subtitle: 'Campus Buzz & Guerrilla Marketing',
    description:
      'The voice that echoes through every corridor. The Publicity Team orchestrates classroom campaigns, surprise campus flash mobs, viral social countdowns, and on-ground street stunts that ensure full-house attendance at every production.',
    deliverables: ['Offline Classroom Drives', 'Flash Mob Choreography', 'Campus Poster Distribution', 'Influencer Student Partnerships'],
    icon: Megaphone,
  },
  {
    id: 'marketing',
    name: 'Marketing Team',
    subtitle: 'Corporate Outreach & Strategic Alliances',
    description:
      'The strategic diplomats securing corporate backing and festival capital. The Marketing Team negotiates multi-tier brand sponsorships, hospitality tie-ups, merchandise contracts, and high-visibility media partnerships.',
    deliverables: ['Corporate Sponsorship Pitches', 'Brand Activation Stalls', 'Merchandising Logistics', 'Budget Capital Acquisition'],
    icon: Briefcase,
  },
  {
    id: 'designing',
    name: 'Designing Team',
    subtitle: 'Visual Identity, 3D & Brand Aesthetics',
    description:
      'The visual architects who forge the aesthetic soul of Arts Club. From high-fashion festival posters and illuminated identity passes to 3D stage backdrops and digital motion banners, Designing sets the world-class visual standard.',
    deliverables: ['Festival Posters & Typography', 'Passes, Badges & Merch Prints', 'Motion Graphics & 3D Renders', 'Social Media Design Systems'],
    icon: Layers,
  },
  {
    id: 'documenting',
    name: 'Documenting Team',
    subtitle: 'Archival Journalism & Cinematic Memory',
    description:
      'The chroniclers of history. Armed with cinema-grade cameras and journalistic pens, the Documenting Team captures high-definition festival aftermovies, intimate artist portraits, and writes the official annual Arts Club Magazine.',
    deliverables: ['4K Cinematic Aftermovies', 'Portraits & Candid Photography', 'The Arts Club Magazine', 'Press Releases & Curatorial Archives'],
    icon: Camera,
  },
  {
    id: 'finance',
    name: 'Finance Team',
    subtitle: 'Fiscal Stewardship & Budget Integrity',
    description:
      'The trusted custodians of the treasury. Managing festival allocations, vendor audits, real-time expense reconciliation, and transparent balance sheets, the Finance Team guarantees sustainable fiscal health for the club.',
    deliverables: ['Festival Budget Balancing', 'Vendor Contract Auditing', 'Cashflow & Treasury Governance', 'Post-Event Fiscal Reconciliation'],
    icon: Coins,
  },
];

const BOARD_MEMBERS: BoardMember[] = [
  { name: 'Juan Emmanuel', designation: 'President', image: '/JUAN EMMANUEL.jpg', category: 'core', bio: 'Guiding the overarching vision, strategic expansions, and collective legacy of the Arts Club.' },
  { name: 'Likhitha Reddy', designation: 'Vice-President', image: '/LIKITHA REDDY.jpg', category: 'core', bio: 'Spearheading cross-wing alignment, club executive affairs, and high-impact campus collaborations.' },
  { name: 'Visista Soufalya', designation: 'General Secretary', image: '/VISISTA SOUFALYA.jpeg', category: 'core', bio: 'Managing institutional correspondence, council administration, and statutory club governance.' },
  { name: 'Sindhu Pulipati', designation: 'Treasurer', image: '/SINDHU.jpeg', category: 'core', bio: 'Overseeing club accounts, cashflows, festival budgeting, and financial transparency.' },
  { name: 'Akash Reddy', designation: 'Organising Head', image: '/AKASH REDDY.jpg', category: 'operations', bio: 'Commanding on-ground production, stage infrastructure, security, and festival timelines.' },
  { name: 'Ernest Paul', designation: 'Technical Head', image: '/ERNEST PAUL.jpg', category: 'operations', bio: 'Architecting digital infrastructure, festival portals, acoustic telemetry, and stage tech.' },
  { name: 'Gandi Charan Tej', designation: 'Marketing Head', image: '/GANDI CHARAN TEJ.jpg', category: 'operations', bio: 'Forging corporate sponsorships, high-value brand partnerships, and industry tie-ups.' },
  { name: 'Akhil Nadukula', designation: 'Publicity Head', image: '/AKHIL.jpg', category: 'operations', bio: 'Driving viral campus outreach, offline promotions, class campaigns, and teaser events.' },
  { name: 'Siddarth Reddy', designation: 'Public Relations', image: '/SIDDARTH REDDY.jpg', category: 'operations', bio: 'Facilitating dignitary hospitality, artist press relations, and inter-collegiate ties.' },
  { name: 'Aiheka Gadde', designation: 'Documentation Head', image: '/AIHEKA.jpg', category: 'operations', bio: 'Curating the annual Arts Club Magazine, festival photo archives, and literary records.' },
  { name: 'Nagesh Pebbati', designation: 'Designing Head', image: '/NAGESH.jpg', category: 'operations', bio: 'Directing the visual branding, typography, posters, stage backdrops, and 3D assets.' },
  { name: 'Rahul Cheruku', designation: 'Hospitality Head', image: '/RAHUL.jpeg', category: 'operations', bio: 'Supervising celebrity artist hosting, guest care, banquet logistics, and campus hospitality.' },
  { name: 'Venky', designation: 'Nrithya Head', image: '/VENKY.jpg', category: 'wing', bio: 'Leading the classical, contemporary, and cinematic dance corps with signature choreographies.' },
  { name: 'Veekshith', designation: 'Sargam Head', image: '/VEEKSHITH.jpg', category: 'wing', bio: 'Curating acoustic jam nights, classical ensembles, band battles, and musical arrangements.' },
  { name: 'Sreenidhi', designation: 'Abhinaya Head', image: '/SREENIDHI.jpeg', category: 'wing', bio: 'Directing proscenium theatre, street plays, casting sessions, and dramatic storytelling.' },
  { name: 'Abhijeet Raj Nalla', designation: 'Kalakrithi Head', image: '/ABHIJEET RAJ.jpg', category: 'wing', bio: 'Masterminding campus visual arts, monumental installations, and exhibition curation.' },
  { name: 'Saharsh Vuppula', designation: 'Sahithi Head', image: '/SAHARSH.jpg', category: 'wing', bio: 'Inspiring literary excellence through poetry slams, multilingual debates, and oratory workshops.' },
  { name: 'Aaradhya Kadiri', designation: 'Shakti Head', image: '/AARADHYA KADIRI.jpeg', category: 'wing', bio: 'Driving social empathy, inclusivity drives, art therapy, and community empowerment.' },
  { name: 'Nirvigna', designation: 'Devonyes Head', image: '/Nirvigna.jpg', category: 'wing', bio: 'Leading SNIST’s high-octane urban hip-hop and choreography crew in national collegiate battles.' },
  { name: 'Dasi Sai Sohan', designation: 'MUNSOC Head', image: '/SAI SOHAN.jpeg', category: 'wing', bio: 'Leading diplomatic debates, Model United Nations conferences, and international affairs panels.' },
];

/* =========================================================================
   MAIN APP COMPONENT
   ========================================================================= */

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [boardCategory, setBoardCategory] = useState<'all' | 'core' | 'wing' | 'operations'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio tone synth for ethereal feedback (no external sound file dependencies)
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playChime = (freq = 440) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext policy safe fallback
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Keyboard navigation & escape listener for modal & splash
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedEvent) {
          setSelectedEvent(null);
        } else if (selectedMember) {
          setSelectedMember(null);
        } else if (showSplash) {
          setShowSplash(false);
          playChime(523.25);
        }
      } else if (e.key === 'Enter' && showSplash) {
        setShowSplash(false);
        playChime(523.25);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSplash, selectedEvent, selectedMember]);

  // Handle image error fallbacks gracefully
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackKey: string,
    isBoard = false
  ) => {
    const target = e.currentTarget;
    const cleanKey = fallbackKey.replace(/^\/board\//, '').replace(/^\//, '');

    // Multi-tier local retry: /board/... -> /... -> /src/assets/images/... -> external fallback
    if (isBoard) {
      const currentSrc = target.getAttribute('src') || target.src;
      if (currentSrc.includes('/board/')) {
        target.src = `/${cleanKey}`;
        return;
      }
      if (currentSrc.startsWith('/') && !currentSrc.includes('/src/assets/images/')) {
        target.src = `/src/assets/images/${cleanKey}`;
        return;
      }
    }

    const fallbackUrl = isBoard
      ? BOARD_PORTRAIT_FALLBACKS[cleanKey] ||
        BOARD_PORTRAIT_FALLBACKS[fallbackKey] ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
      : EVENT_FALLBACKS[cleanKey] ||
        EVENT_FALLBACKS[fallbackKey] ||
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80';

    if (target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    }
  };

  const filteredBoard = BOARD_MEMBERS.filter((member) => {
    if (boardCategory === 'all') return true;
    return member.category === boardCategory;
  });

  /* =========================================================================
     PHASE A: THE SPLASH REVEAL SCREEN
     ========================================================================= */
  if (showSplash) {
    return (
      <div
        onClick={() => {
          setShowSplash(false);
          playChime(523.25);
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070a] text-white cursor-pointer select-none overflow-hidden transition-all duration-1000 ease-out"
        role="button"
        tabIndex={0}
        aria-label="Enter Arts Club SNIST experience"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Ambient Gallery Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto transform transition-transform duration-700 hover:scale-[1.01]">
          {/* Official Arts Club Logo Exhibition Showcase Frame - 100% Uncropped Full Logo */}
          <div className="relative mb-6 sm:mb-8 group flex items-center justify-center">
            {/* Ambient Multi-Hue Halo Aura */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/25 via-rose-500/20 to-amber-600/25 rounded-[36px] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Orbiting Concentric Ring Highlights */}
            <div className="absolute -inset-6 rounded-[40px] border border-amber-500/20 pointer-events-none animate-pulse" />
            <div className="absolute -inset-10 rounded-[48px] border border-rose-500/15 border-dashed pointer-events-none" />

            {/* Pristine Museum Gallery Frame - Entire Logo Displayed Without Any Cropping */}
            <div className="relative w-64 sm:w-72 md:w-80 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-[0_0_60px_rgba(245,158,11,0.35),0_25px_50px_-12px_rgba(0,0,0,0.8)] border-2 border-amber-400/40 backdrop-blur-md overflow-hidden">
              <img
                src={ARTS_CLUB_LOGO}
                alt="Arts Club SNIST Official Logo — For the creator in you"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== ARTS_CLUB_LOGO_FALLBACK) {
                    target.src = ARTS_CLUB_LOGO_FALLBACK;
                  }
                }}
                className="w-full h-auto object-contain block mx-auto select-none transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Luxury Typography Subtitle & Credentials */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400/90 font-medium font-sans">
              <span>Sreenidhi Institute of Science & Technology</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-400 font-serif-luxury italic tracking-wide">
              Official Cultural & Creative Arts Flagship <span className="text-amber-500/60 not-italic mx-2">•</span> Established 2005
            </p>
          </div>

          {/* Interactive Tap Badge */}
          <div className="mt-8 sm:mt-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs tracking-widest uppercase text-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:border-amber-400/40 hover:text-white transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Tap anywhere to explore</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     PHASE B: THE MAIN SHOWCASE
     ========================================================================= */
  return (
    <div className="min-h-screen bg-[#07070b] text-neutral-200 font-sans selection:bg-amber-500 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-neutral-900 border border-amber-500/40 text-neutral-100 rounded-lg shadow-2xl backdrop-blur-lg text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Subtle Ethereal Ambient Radial Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-rose-500/[0.025] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-violet-600/[0.025] rounded-full blur-[150px] pointer-events-none" />

      {/* TOP BAR / NAVIGATION: Strict 3-zone contract */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07070b]/80 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onClick={() => playChime(440)}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white p-1 border border-amber-500/40 shadow-sm flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all shrink-0">
              <img
                src={ARTS_CLUB_LOGO}
                alt="Arts Club Logo"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== ARTS_CLUB_LOGO_FALLBACK) {
                    target.src = ARTS_CLUB_LOGO_FALLBACK;
                  }
                }}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-cinzel text-base tracking-wider font-bold text-white group-hover:text-amber-300 transition-colors">
                ARTS CLUB
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 -mt-0.5">
                SNIST HYDERABAD
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
            <a
              href="#events"
              onClick={() => playChime(392)}
              className="hover:text-amber-300 transition-colors tracking-wide"
            >
              Events
            </a>
            <a
              href="#platforms"
              onClick={() => playChime(440)}
              className="hover:text-amber-300 transition-colors tracking-wide"
            >
              Platforms
            </a>
            <a
              href="#extensions"
              onClick={() => playChime(493.88)}
              className="hover:text-amber-300 transition-colors tracking-wide"
            >
              Wings
            </a>
            <a
              href="#domains"
              onClick={() => playChime(523.25)}
              className="hover:text-amber-300 transition-colors tracking-wide"
            >
              Operations
            </a>
            <a
              href="#board"
              onClick={() => playChime(587.33)}
              className="hover:text-amber-300 transition-colors tracking-wide"
            >
              Board
            </a>
            <a
              href="#why-join"
              onClick={() => playChime(659.25)}
              className="hover:text-amber-300 transition-colors tracking-wide"
            >
              Join Us
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showToast(soundEnabled ? 'Chime feedback muted' : 'Chime feedback activated');
              }}
              title={soundEnabled ? 'Mute ambient sound' : 'Unmute ambient sound'}
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all text-xs"
              aria-label="Toggle sound feedback"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc4NnUV3fYz5zLWmg8D372Geldh0OYAkzp7gLBisd3Ve1nPUg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playChime(784)}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-amber-500 via-rose-600 to-amber-600 hover:from-amber-400 hover:to-rose-500 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all whitespace-nowrap"
            >
              Register
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 bg-white/[0.03] border border-white/[0.08]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-[#0a0a0f] border-b border-white/[0.08] space-y-3 animate-in fade-in duration-200">
            <a
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-300 hover:text-amber-400"
            >
              Our Events
            </a>
            <a
              href="#platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-300 hover:text-amber-400"
            >
              Disciplines & Platforms
            </a>
            <a
              href="#extensions"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-300 hover:text-amber-400"
            >
              Elite Wings & Extensions
            </a>
            <a
              href="#domains"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-300 hover:text-amber-400"
            >
              Operations & Work Areas
            </a>
            <a
              href="#board"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-300 hover:text-amber-400"
            >
              Board Members
            </a>
            <a
              href="#why-join"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-300 hover:text-amber-400"
            >
              Why Arts Club & Registration
            </a>
          </div>
        )}
      </header>

      {/* HERO BANNER SECTION */}
      <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {/* Top Minimal Editorial Badge & Logo Showcase */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-16 h-20 sm:w-20 sm:h-24 bg-white p-2 rounded-2xl border border-amber-400/35 shadow-[0_0_35px_rgba(245,158,11,0.25)] flex items-center justify-center hover:scale-105 transition-transform duration-500 mb-4">
                <img
                  src={ARTS_CLUB_LOGO}
                  alt="Arts Club SNIST Official Crest"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== ARTS_CLUB_LOGO_FALLBACK) {
                      target.src = ARTS_CLUB_LOGO_FALLBACK;
                    }
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.05] text-amber-300 text-xs tracking-widest uppercase backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Sreenidhi Institute of Science & Technology • Est. 2005</span>
              </div>
            </div>

            {/* Main Editorial Headline with balance */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-bold tracking-tight text-white max-w-5xl leading-[1.08] [text-wrap:balance]">
              Where Passion Finds Its{' '}
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent italic font-serif-luxury">
                Canvas.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="mt-8 text-lg sm:text-xl text-neutral-400 font-serif-luxury max-w-3xl leading-relaxed">
              For nearly two decades, the Arts Club at SNIST has flourished as a vibrant sanctuary for stage dramatists, classical and western vocalists, fluid dancers, fine artists, and visionary thinkers. We do not merely produce festivals; we ignite lifelong artistic destinies.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#events"
                onClick={() => playChime(523.25)}
                className="px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2"
              >
                <span>Explore Our Festivals</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc4NnUV3fYz5zLWmg8D372Geldh0OYAkzp7gLBisd3Ve1nPUg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-neutral-200 bg-white/[0.04] border border-white/[0.12] hover:border-amber-400/50 hover:bg-white/[0.08] hover:text-white transition-all flex items-center gap-2"
              >
                <span>Join The Collective</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Quantitative Institutional Heritage Strip */}
            <div className="mt-20 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center border-r border-white/[0.05] last:border-r-0">
                <span className="text-3xl sm:text-4xl font-cinzel font-bold text-amber-300 tabular-nums">2005</span>
                <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Founded Year</span>
              </div>
              <div className="flex flex-col items-center justify-center sm:border-r border-white/[0.05]">
                <span className="text-3xl sm:text-4xl font-cinzel font-bold text-rose-300 tabular-nums">6</span>
                <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Artistic Wings</span>
              </div>
              <div className="flex flex-col items-center justify-center border-r border-white/[0.05] last:border-r-0">
                <span className="text-3xl sm:text-4xl font-cinzel font-bold text-amber-300 tabular-nums">2</span>
                <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Elite Crews</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-cinzel font-bold text-rose-300 tabular-nums">20</span>
                <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Board Stewards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: "OUR EVENTS" (Interactive Grid + Popups) */}
      <section id="events" className="py-16 sm:py-24 border-t border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400/90 mb-2">
                01 • Curated Chronicles
              </div>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
                OUR SIGNATURE EVENTS
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-neutral-400 font-serif-luxury max-w-md">
              From the thunderous stages of Rigolade to intimate harvest solstice gatherings, explore the living archives of SNIST’s cultural triumphs. Click any showcase to read the story.
            </p>
          </div>

          {/* 3-Column Responsive Grid - 3 cards at a time on mobile */}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {EVENTS_DATA.map((evt) => (
              <div
                key={evt.id}
                onClick={() => {
                  setSelectedEvent(evt);
                  playChime(600);
                }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col shadow-sm sm:shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                {/* Visual Card Image Box with Measured Scrim */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={evt.image}
                    alt={evt.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, evt.image)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/40 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute top-1 right-1 sm:top-4 sm:right-4">
                    <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded text-[7px] sm:text-[10px] font-mono uppercase tracking-wider text-amber-200 bg-black/75 border border-white/10 backdrop-blur-md">
                      {evt.badge}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-2 sm:p-4 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[7px] sm:text-xs font-mono text-neutral-400 tracking-wider mb-0.5 sm:mb-1 truncate">
                      {evt.timeline}
                    </div>
                    <h3 className="text-[11px] sm:text-lg md:text-2xl font-cinzel font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-2 leading-tight">
                      {evt.name}
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs md:text-sm text-neutral-400 font-serif-luxury line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-relaxed hidden sm:block">
                      {evt.tagline}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-6 pt-1.5 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[8px] sm:text-xs font-semibold text-amber-400 tracking-wider uppercase group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 sm:gap-1.5">
                      <span className="hidden sm:inline">Read Story</span>
                      <span className="sm:hidden">Story</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    </span>
                    <span className="hidden md:inline text-[11px] text-neutral-500 font-mono">Archive Entry</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT MAGAZINE MODAL POPUP */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0d14] border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white p-6 sm:p-10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.06] hover:bg-white/20 border border-white/10 text-neutral-300 hover:text-white transition-all z-20"
              aria-label="Close Event Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Backdrop Hero */}
            <div className="relative -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 mb-8 aspect-[21/9] overflow-hidden rounded-t-3xl bg-neutral-900">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.name}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, selectedEvent.image)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 sm:left-10">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
                  {selectedEvent.timeline}
                </span>
                <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white mt-1">
                  {selectedEvent.name}
                </h2>
                {selectedEvent.coHost && (
                  <p className="text-xs font-mono text-neutral-300 mt-1">
                    {selectedEvent.coHost}
                  </p>
                )}
              </div>
            </div>

            {/* Story Editorial Body */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif-luxury italic text-amber-200/90 leading-relaxed">
                "{selectedEvent.tagline}"
              </h3>

              <div className="text-neutral-300 font-sans leading-relaxed text-base space-y-4">
                <p className="first-letter:text-5xl first-letter:font-cinzel first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-amber-400">
                  {selectedEvent.story}
                </p>
              </div>

              {/* Highlights & Features */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                  Curatorial Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedEvent.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-200 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Festival Stats Ribbon */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {selectedEvent.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <span className="block text-xl font-cinzel font-bold text-amber-300">{s.value}</span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Official festival link copied to clipboard!');
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share Festival Link</span>
                </button>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc4NnUV3fYz5zLWmg8D372Geldh0OYAkzp7gLBisd3Ve1nPUg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 shadow-lg transition-all"
                >
                  Register For Next Edition
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: "OUR PLATFORMS" (Visual Disciplines Showcase) */}
      <section id="platforms" className="py-16 sm:py-24 border-t border-white/[0.06] relative bg-[#060609]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-rose-400/90 mb-2">
                02 • Creative Pillars
              </div>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
                OUR PLATFORMS
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-neutral-400 font-serif-luxury max-w-md">
              Six dedicated wings, each cultivating a distinct discipline of performing and visual arts with uncompromising devotion.
            </p>
          </div>

          {/* 3-Column Responsive Grid - 3 cards at a time on mobile */}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {PLATFORMS_DATA.map((plat) => {
              const IconComp = plat.icon;
              return (
                <div
                  key={plat.id}
                  className="group relative p-2.5 sm:p-5 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-sm sm:shadow-lg"
                >
                  {/* Subtle Gradient Backlight */}
                  <div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${plat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  />

                  <div className="relative z-10">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-amber-300 group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300 mb-2 sm:mb-4 md:mb-6">
                      <IconComp className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>

                    <div className="text-[7px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest text-amber-400/80 mb-0.5 sm:mb-1 truncate">
                      {plat.wing}
                    </div>
                    <h3 className="text-[10px] sm:text-base md:text-2xl font-cinzel font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 leading-tight">
                      {plat.name}
                    </h3>
                    <p className="text-[8px] sm:text-xs font-serif-luxury italic text-neutral-400 mt-0.5 mb-1 sm:mb-4 line-clamp-1">
                      {plat.tagline}
                    </p>

                    <p className="text-sm text-neutral-300 leading-relaxed font-sans hidden sm:block">
                      {plat.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-2 sm:mt-6 md:mt-8 pt-1.5 sm:pt-4 md:pt-6 border-t border-white/[0.06] hidden sm:block">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Key Disciplines
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {plat.disciplines.map((d, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-neutral-300 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: "EXTENSIONS" (Elite Dance Crew & MUNSOC) */}
      <section id="extensions" className="py-24 border-t border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400/90 mb-2">
                03 • Premier Squads
              </div>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
                ELITE EXTENSIONS
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-neutral-400 font-serif-luxury max-w-md">
              Specialized elite divisions flying the SNIST flag across inter-collegiate national battlegrounds and international diplomatic assemblies.
            </p>
          </div>

          {/* 2-Card Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {EXTENSIONS_DATA.map((ext) => {
              const IconComp = ext.icon;
              return (
                <div
                  key={ext.id}
                  className="group relative p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  {/* Subtle Gradient Backlight */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${ext.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-amber-300 group-hover:scale-105 transition-all">
                          <IconComp className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                          Official SNIST Squad
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-white group-hover:text-amber-300 transition-colors">
                        {ext.name}
                      </h3>
                      <div className="text-sm font-mono text-neutral-400 mt-1 mb-4">
                        {ext.subtitle}
                      </div>

                      <blockquote className="text-sm font-serif-luxury italic text-amber-200/80 mb-4 border-l-2 border-amber-400/40 pl-3">
                        {ext.leadQuote}
                      </blockquote>

                      <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                        {ext.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/[0.08]">
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                        Core Focus Arenas
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {ext.focus.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-neutral-300 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: "THE AREAS WE WORK ON" (Operational Domains) */}
      <section id="domains" className="py-16 sm:py-24 border-t border-white/[0.06] relative bg-[#060609]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-rose-400/90 mb-2">
                04 • Operational Command
              </div>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
                THE AREAS WE WORK ON
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-neutral-400 font-serif-luxury max-w-md">
              Behind every grand festival and standing ovation lies the rigorous machinery of our six core operations divisions.
            </p>
          </div>

          {/* Modern 6-Item Domain Grid - 3 cards at a time on mobile */}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {DOMAINS_DATA.map((dom) => {
              const IconComp = dom.icon;
              return (
                <div
                  key={dom.id}
                  className="group p-2.5 sm:p-5 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-sm sm:shadow-md"
                >
                  <div>
                    <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300 mb-2 sm:mb-4 md:mb-6 group-hover:border-amber-400/40 group-hover:scale-105 transition-all">
                      <IconComp className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>

                    <h3 className="text-[10px] sm:text-base md:text-xl font-cinzel font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 leading-tight">
                      {dom.name}
                    </h3>
                    <div className="text-[7px] sm:text-[10px] md:text-xs font-mono text-neutral-400 mt-0.5 mb-1 sm:mb-4 truncate">
                      {dom.subtitle}
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed font-sans hidden sm:block">
                      {dom.description}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-6 pt-1.5 sm:pt-5 border-t border-white/[0.06] hidden sm:block">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Key Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {dom.deliverables.map((del, i) => (
                        <li key={i} className="text-xs text-neutral-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: "BOARD MEMBERS" (Continuous Unified Grid) */}
      <section id="board" className="py-16 sm:py-24 border-t border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400/90 mb-2">
                05 • Guardians of the Craft
              </div>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
                BOARD MEMBERS
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-neutral-400 font-serif-luxury max-w-md">
              The 20 executive stewards steering the vision, stage productions, and multidisciplinary talent of Arts Club SNIST.
            </p>
          </div>

          {/* Interactive Filter Tabs for Board Hierarchy */}
          <div className="flex flex-wrap items-center gap-2 mb-12 p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl w-fit">
            <button
              onClick={() => {
                setBoardCategory('all');
                playChime(440);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                boardCategory === 'all'
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All 20 Stewards
            </button>
            <button
              onClick={() => {
                setBoardCategory('core');
                playChime(493.88);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                boardCategory === 'core'
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Core Executives
            </button>
            <button
              onClick={() => {
                setBoardCategory('wing');
                playChime(523.25);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                boardCategory === 'wing'
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Wing & Cultural Heads
            </button>
            <button
              onClick={() => {
                setBoardCategory('operations');
                playChime(587.33);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                boardCategory === 'operations'
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Operations & Tech Heads
            </button>
          </div>

          {/* Continuous Responsive Grid - 3 cards at a time on mobile */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
            {filteredBoard.map((member, idx) => (
              <div
                key={member.name}
                onClick={() => {
                  setSelectedMember(member);
                  playChime(523.25);
                }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-sm sm:shadow-md cursor-pointer hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
                role="button"
                tabIndex={0}
                aria-label={`View portrait and profile of ${member.name}`}
              >
                {/* Portrait Frame with subtle rim lighting */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, member.image, true)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* Measured Dark Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/20 to-transparent" />

                  {/* Hierarchical Index Marker */}
                  <div className="absolute top-1 left-1 sm:top-3 sm:left-3">
                    <span className="text-[7px] sm:text-[10px] font-mono text-neutral-300 bg-black/75 px-1 sm:px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                      #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  {/* Hover Quick-View Badge */}
                  <div className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[7px] sm:text-[10px] font-mono tracking-wider text-amber-300 bg-black/80 px-1 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-400/40 backdrop-blur-md flex items-center gap-0.5 sm:gap-1">
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                      <span className="hidden sm:inline">Portrait</span>
                    </span>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-1.5 sm:p-3 md:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[10px] sm:text-xs md:text-base font-cinzel font-bold text-white tracking-wider uppercase group-hover:text-amber-300 transition-colors line-clamp-1 leading-tight">
                      {member.name}
                    </h3>
                    <div className="text-[8px] sm:text-[10px] md:text-xs font-serif-luxury italic text-amber-400/90 font-medium mt-0.5 line-clamp-1 leading-tight">
                      {member.designation}
                    </div>
                  </div>

                  {member.bio && (
                    <p className="mt-1 sm:mt-3 text-[10px] sm:text-[11px] text-neutral-400 line-clamp-2 leading-relaxed hidden sm:block">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOARD MEMBER FULL PORTRAIT MODAL */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0c0d14] border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white p-6 sm:p-8 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row gap-6 md:gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/20 border border-white/10 text-neutral-300 hover:text-white transition-all z-20"
                aria-label="Close Member Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Res Full Portrait Container */}
              <div className="w-full md:w-1/2 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-amber-500/30 shadow-xl shrink-0 relative">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, selectedMember.image, true)}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-white/10">
                  Official Portrait
                </div>
              </div>

              {/* Member Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/[0.08] text-amber-300 text-[11px] font-mono tracking-widest uppercase w-fit">
                  <span>
                    {selectedMember.category === 'core'
                      ? 'Core Executive Council'
                      : selectedMember.category === 'wing'
                      ? 'Cultural & Performing Wing'
                      : 'Operations & Technical Wing'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
                    {selectedMember.name}
                  </h3>
                  <div className="text-base font-serif-luxury italic text-amber-400 font-medium mt-1">
                    {selectedMember.designation}
                  </div>
                </div>

                <div className="h-px w-full bg-white/[0.08]" />

                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {selectedMember.bio}
                </p>

                <div className="pt-2 text-xs font-mono text-neutral-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Arts Club SNIST • Executive Board</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6: "WHY ARTS CLUB? & REGISTRATION" (Grand Centerpiece CTA) */}
      <section id="why-join" className="py-28 border-t border-white/[0.06] relative overflow-hidden bg-gradient-to-b from-[#07070b] via-[#0d0d16] to-[#07070b]">
        {/* Glow Anchors */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-violet-600/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* Section Marker */}
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-amber-400/90 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Collective Calling</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
            WHY ARTS CLUB?
          </h2>

          {/* Required Editorial Callout Quote */}
          <blockquote className="mt-8 text-xl sm:text-2xl md:text-3xl font-serif-luxury italic text-amber-100/90 max-w-4xl mx-auto leading-relaxed border-y border-amber-500/20 py-8">
            “The Arts Club is more than just a space for art — it's a community where imagination meets passion, and every idea finds a canvas.”
          </blockquote>

          {/* 4 Pillars of Experience */}
          <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-left">
            <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-2 sm:mb-3" />
              <h4 className="text-xs sm:text-base font-cinzel font-bold text-white mb-1 sm:mb-2 leading-tight">Unbounded Freedom</h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                A judgment-free creative incubator to experiment with music, drama, poetry, and modern digital mediums.
              </p>
            </div>

            <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 mb-2 sm:mb-3" />
              <h4 className="text-xs sm:text-base font-cinzel font-bold text-white mb-1 sm:mb-2 leading-tight">Grand Arenas</h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Perform before 10,000+ passionate audiences on the flagship Rigolade and Vivarth concert stages.
              </p>
            </div>

            <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-2 sm:mb-3" />
              <h4 className="text-xs sm:text-base font-cinzel font-bold text-white mb-1 sm:mb-2 leading-tight">Lifelong Kinship</h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Forge unbreakable bonds with fellow creators, mentors, and alumni working across the creative industries.
              </p>
            </div>

            <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 mb-2 sm:mb-3" />
              <h4 className="text-xs sm:text-base font-cinzel font-bold text-white mb-1 sm:mb-2 leading-tight">Leadership Pedigree</h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Master real-world logistics, marketing, fiscal accounting, and design direction that accelerate your career.
              </p>
            </div>
          </div>

          {/* Grand Centerpiece CTA Button */}
          <div className="mt-16 flex flex-col items-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc4NnUV3fYz5zLWmg8D372Geldh0OYAkzp7gLBisd3Ve1nPUg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playChime(880)}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-sm sm:text-base font-bold tracking-widest uppercase text-white bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500 hover:from-amber-400 hover:to-rose-500 shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:shadow-[0_0_70px_rgba(245,158,11,0.6)] transition-all transform hover:-translate-y-1"
            >
              <span>REGISTER NOW — JOIN THE COLLECTIVE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <div className="mt-4 text-xs font-mono text-neutral-500 tracking-wider">
              Official Application Portal for Academic Year 2026-27 • Open to All SNIST Students
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LUXURY FOOTER & OFFICIAL CONTACT DETAILS */}
      <footer className="border-t border-white/[0.08] bg-[#050508] py-16 text-neutral-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
            {/* Column 1: Brand & Identity */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-14 rounded-2xl bg-white p-1.5 border border-amber-500/30 flex items-center justify-center shadow-md shrink-0">
                  <img
                    src={ARTS_CLUB_LOGO}
                    alt="Arts Club SNIST Crest"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== ARTS_CLUB_LOGO_FALLBACK) {
                        target.src = ARTS_CLUB_LOGO_FALLBACK;
                      }
                    }}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-cinzel text-lg tracking-wider font-bold text-white">
                  ARTS CLUB SNIST
                </span>
              </div>
              <p className="text-sm font-serif-luxury text-neutral-400 max-w-sm leading-relaxed">
                The official flagship creative, cultural, and performing arts collective of Sreenidhi Institute of Science & Technology. Empowering student visionaries since 2005.
              </p>
              <div className="text-xs font-mono text-neutral-500">
                Autonomous Institution • Affiliated to JNTUH • Approved by AICTE
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white">
                Showcase Sections
              </h4>
              <ul className="space-y-2 text-xs font-sans">
                <li>
                  <a href="#events" className="hover:text-amber-300 transition-colors">
                    Flagship Festivals
                  </a>
                </li>
                <li>
                  <a href="#platforms" className="hover:text-amber-300 transition-colors">
                    Artistic Platforms
                  </a>
                </li>
                <li>
                  <a href="#extensions" className="hover:text-amber-300 transition-colors">
                    Devonyes & MUNSOC
                  </a>
                </li>
                <li>
                  <a href="#domains" className="hover:text-amber-300 transition-colors">
                    Operations Teams
                  </a>
                </li>
                <li>
                  <a href="#board" className="hover:text-amber-300 transition-colors">
                    Executive Board
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Official Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white">
                Official Inquiries
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="tel:7893831557"
                    onClick={() => {
                      navigator.clipboard.writeText('7893831557');
                      showToast('Phone number 7893831557 copied to clipboard');
                    }}
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>7680077335</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:artsclub@sreenidhi.edu.in"
                    onClick={() => {
                      navigator.clipboard.writeText('artsclub@sreenidhi.edu.in');
                      showToast('Email artsclub@sreenidhi.edu.in copied to clipboard');
                    }}
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>artsclub@sreenidhi.edu.in</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/theartsclubsnist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-amber-400" />
                    <span>@theartsclubsnist</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 pt-1 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Yamnampet, Ghatkesar, Hyderabad - 501 301</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar Credits */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <div>
              © {new Date().getFullYear()} Arts Club SNIST. All rights reserved. Sreenidhi Institute of Science & Technology.
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setShowSplash(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors text-xs font-mono"
              >
                Replay Insignia Splash
              </button>
              <span className="text-neutral-700">•</span>
              <a
                href="#hero"
                className="hover:text-amber-300 transition-colors text-xs font-mono"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
