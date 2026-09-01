import {
  Code, ShoppingBag, Layout, Globe, Database, Smartphone, Zap, Shield,
  Activity, Cloud, Layers, Lightbulb, Rocket, Heart, Star, Mail, ArrowRight,
  Award, Target, CheckCircle, Clock, Users, Headphones, HeartHandshake, ShieldCheck,
  Phone, MapPin, Building2, Briefcase, TrendingUp, BarChart3, PieChart,
  FileSpreadsheet, ShieldCheck as ShieldIcon, Banknote, Wallet,
  Gavel, Factory, Globe as GlobeIcon, Scale, RefreshCw
} from 'lucide-react'

export const COMPANY_CONTENT = {
  name: 'Iyoni Corp',
  fullName: 'Iyoni Corp',
  tagline: 'Corporate Holding & Acquisition Platform',
  subtitle: 'Turnkey Business Holdings',
  description: 'Iyoni Corp is a corporate holding company that acquires, operates, and scales fully-functional turnkey businesses. Each asset in our portfolio is immediately operational, revenue-generating, and ready for acquisition by institutional and private investors.',
  holdingsDescription: 'We engineer high-performance digital infrastructure for visionary brands who demand absolute scale and technical supremacy across their operational footprint.'
}

export const SERVICES_CONTENT = {
  subtitle: 'Portfolio Sectors',
  title: 'Operational Business Sectors',
  description: 'Iyoni Corp maintains a diversified portfolio of turnkey business assets across high-growth market sectors. Each holding is fully operational and revenue-generating.'
}

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Due Diligence Review',
    description: 'Comprehensive audit of financials, operations, technology stack, and growth trajectory for each holding.',
    icon: FileSpreadsheet,
    color: 'blue'
  },
  {
    title: 'Valuation Assessment',
    description: 'Institutional-grade business valuation models applied to determine accurate acquisition pricing.',
    icon: BarChart3,
    color: 'purple'
  },
  {
    title: 'Acquisition Structuring',
    description: 'Legal and financial structuring for seamless ownership transfer, with full IP and asset documentation.',
    icon: Gavel,
    color: 'indigo'
  },
  {
    title: 'Portfolio Integration',
    description: 'Integration of acquired assets into the Iyoni Corp operational ecosystem for continued growth.',
    icon: Factory,
    color: 'emerald'
  }
]

export const WHY_CHOOSE_US_CONTENT = {
  subtitle: 'Why Iyoni Corp',
  title: "Precision, Proven, Portfolio",
  description: 'Iyoni Corp delivers institutional-grade acquisition opportunities with fully operational assets. Our portfolio companies are engineered for scale, profitability, and immediate return on investment.'
}

export const WHY_CHOOSE_US_FEATURES = [
  {
    icon: Shield,
    title: 'Rigorous Due Diligence',
    description: 'Every holding undergoes comprehensive financial, legal, and technical audit before presentation.',
    color: 'blue'
  },
  {
    icon: TrendingUp,
    title: 'Revenue-Generating',
    description: 'All portfolio companies are fully operational with proven revenue streams and growth metrics.',
    color: 'purple'
  },
  {
    icon: BarChart3,
    title: 'Transparent Valuation',
    description: 'Clear, market-anchored business valuations presented as straightforward acquisition prices.',
    color: 'indigo'
  },
  {
    icon: Wallet,
    title: 'Turnkey Ownership',
    description: 'Seamless transfer of full operational control, assets, and intellectual property upon acquisition.',
    color: 'emerald'
  }
]

export const WHY_CHOOSE_US_METRICS = [
  { label: 'Portfolio Assets', value: '70+' },
  { label: 'Avg. Revenue Multiple', value: '3.2x' },
  { label: 'Investor ROI', value: '180%' },
  { label: 'Acquisition Success', value: '100%' },
]

export const PARTNERSHIP_CONTENT = {
  subtitle: 'Investor Relations',
  title: 'The Iyoni Standard.',
  description: "Iyoni Corp eliminates the barriers between institutional capital and proven revenue-generating assets. Each holding in our portfolio is presented at its total business valuation with full operational transparency."
}

export const PARTNERSHIP_STEPS = [
  {
    icon: FileSpreadsheet,
    title: 'Operational Audit',
    description: 'Comprehensive due diligence on all financials, operations, and technology of each holding.',
    color: 'blue'
  },
  {
    icon: Banknote,
    title: 'Valuation Pricing',
    description: 'Each business is priced at its total valuation, displayed transparently as the acquisition cost.',
    color: 'indigo'
  },
  {
    icon: Shield,
    title: 'Secure Transfer',
    description: 'Full ownership transfer including all assets, IP, domain, and operational data upon acquisition.',
    color: 'purple'
  }
]

export const SHOPRIGHT_CONTENT = {
  subtitle: 'Portfolio Insights',
  title: 'Operational Intelligence',
  description: "Iyoni Corp's holdings are engineered with institutional-grade infrastructure. Each business operates on a proven technology stack with full operational transparency, scalable architecture, and documented revenue streams."
}

export const SHOPRIGHT_FEATURES = [
  { icon: Layout, text: 'Turnkey Operations' },
  { icon: Zap, text: 'Proven Revenue' },
  { icon: Globe, text: 'Global Markets' },
  { icon: ShieldCheck, text: 'Secure Infrastructure' }
]

export const CONTACT_CONTENT = {
  subtitle: 'Investor Relations',
  title: "Let's discuss your next acquisition",
  description: "Have acquisition criteria? Our investor relations team will review your requirements and present qualified portfolio opportunities."
}

export const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Investor Relations',
    value: 'investors@iyonicorp.com',
    color: 'text-amber-400',
    bg: 'bg-neutral-800/30',
  },
  {
    icon: Phone,
    label: 'Office',
    value: '+254 113203900',
    color: 'text-amber-400',
    bg: 'bg-neutral-800/30'
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Nairobi, Kenya',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
]

export const SERVICES = [
  {
    id: 'corporate-holdings',
    icon: Building2,
    title: 'Corporate Holdings',
    description: 'A diversified portfolio of fully-operational turnkey businesses across high-growth market sectors, all immediately revenue-generating and available for acquisition.',
    moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'seo_basic', 'auth', 'db_basic'],
    color: 'bg-amber-400',
    types: ['SaaS', 'E-commerce', 'Portfolios', 'Corporate'],
    architecture: 'Next.js / React',
    minPrice: 100
  }
]

export const PRICING_DATA = {
  'corporate-holdings': [
    {
      name: 'Entry Portfolio',
      category: 'Entry Level',
      price: 100,
      maxPrice: 400,
      description: 'Ideal for emerging investor groups seeking exposure to proven revenue models.',
      moduleIds: ['crm', 'collaboration', 'auth'],
      tag: 'Acquisition Ready',
       color: 'amber',
       design: {
         gradient: 'from-amber-400 to-neutral-700',
         pattern: 'bg-grid-neutral/[0.02]',
         shadow: 'hover:shadow-amber-400/20'
      }
    },
    {
      name: 'Growth Portfolio',
      category: 'Professional',
      price: 450,
      maxPrice: 1200,
      description: 'Mid-market business assets with established revenue streams and scaling potential.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'db_basic'],
      tag: 'Most Popular',
      popular: true,
      color: 'purple',
      design: {
        gradient: 'from-purple-600 to-neutral-700',
        pattern: 'bg-dot-white/[0.05]',
        shadow: 'hover:shadow-purple-500/20'
      }
    },
    {
      name: 'Enterprise Portfolio',
      category: 'Enterprise',
      price: 1500,
      maxPrice: 10000,
      description: 'Large-scale operational assets with institutional-grade infrastructure and proven market dominance.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'auth'],
      tag: 'Institutional',
      color: 'indigo',
      design: {
        gradient: 'from-neutral-700 to-amber-400',
        pattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
        shadow: 'hover:shadow-amber-400/20'
      }
    }
  ]
}

export const BUSINESS_SECTORS = [
  { name: 'Health & Fitness', price: 100, id: 'health-fitness' },
  { name: ' Blogs', price: 150, id: 'blogs' },
  { name: 'Ecommerce', price: 950, id: 'ecommerce' },
  { name: 'Spa & Wellness', price: 450, id: 'spa' },
  { name: 'Media & Publishing', price: 700, id: 'ebooks' },
  { name: 'Salons & Beauty', price: 450, id: 'salons' },
  { name: 'Beauty Retail', price: 550, id: 'beauty-shops' },
  { name: 'Food & Beverage', price: 500, id: 'bakeries' },
  { name: 'Hospitality', price: 750, id: 'hotels-restaurants' },
  { name: 'Professional Services', price: 500, id: 'appointment-scheduling' },
  { name: 'Wellness', price: 550, id: 'health-fitness-2' },
  { name: 'Automotive', price: 850, id: 'automobiles' },
  { name: 'Travel & Tourism', price: 700, id: 'tours-travels' },
  { name: 'Events', price: 600, id: 'event-planner' },
  { name: 'Point of Sale', price: 1200, id: 'pos' },
  { name: 'Professional Services', price: 200, id: 'freelance' },
  { name: 'Education & Tutoring', price: 300, id: 'tutoring' },
  { name: 'Real Estate', price: 1100, id: 'real-estate' },
  { name: 'Construction', price: 500, id: 'contractors' },
  { name: 'Streaming', price: 2500, id: 'streaming' },
  { name: 'SaaS', price: 10000, id: 'saas' },
  { name: 'Social Platforms', price: 3500, id: 'social-platforms' },
  { name: 'Business Services', price: 400, id: 'business-profiles' },
  { name: 'Consulting', price: 500, id: 'professional-services' },
  { name: 'AI & Automation', price: 2500, id: 'ai-automation' }
]

export const WEBSITE_TYPES = BUSINESS_SECTORS

export const CATALOG_ITEMS = {
  // Web Development Plans
  'Launch Pad': [


        {
      id: 'lp-2',
      name: 'Elite Fitness',
      type: 'Health & Fitness',
      description: 'High-conversion landing page for fitness trainers, gyms, and wellness coaches.',
      price: 100,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://elitefitness.iyonicorp.com/',
      moduleIds: ['Home', 'About', 'Contact', 'Blog'],
      minTier: 'basic'
    },
    {
      id: 'lp-3',
      name: 'Iyonic Blog',
      type: 'Blogs',
      description: 'Get your idea online fast with this high-conversion landing page.',
      price: 150,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://blog.iyonicorp.com/',
      moduleIds: ['crm', 'analytics', 'auth'],
      minTier: 'basic'
    },
        {
      id: 'lp-4',
      name: 'Iyonic Blog 2',
      type: 'Blogs',
      description: 'Get your idea online fast with this high-conversion landing page.',
      price: 150,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://iyonicblog.iyonicorp.com/',
      moduleIds: ['forms'],
      minTier: 'basic'
    },

        {
      id: 'lp-5',
      name: 'Groundflex adventures',
      type: 'Tours & Travels',
      description: 'Get your idea online fast with this high-conversion landing page.',
      price: 500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://groundflexadventures.iyonicorp.com/',
      moduleIds: ['forms', 'bookings', 'customer management', 'ticketing', 'ticketvalidation'],
      minTier: 'basic'
    },

            {
      id: 'lp-6',
      name: 'Dream homes',
      type: 'Real Estate & Property Management',
      description: 'real estate listing and management platform with property search, agent profiles, and contact forms.',
      price: 1500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://dreamhomes.iyonicorp.com/',
      moduleIds: ['property listings', 'agent profiles', 'contact forms'],
      minTier: 'premium'
    },
        {
      id: 'lp-1',
      name: 'Modern Portfolio',
      type: 'Portfolio',
      description: 'Sleek, modern portfolio website to showcase your work and attract clients.',
      price: 100,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://bonfacemurimi.iyonicorp.com',
      moduleIds: ['crm', 'collaboration', 'auth'],
      minTier: 'basic'
    },
                {
      id: 'lp-7',
      name: 'Choma zone',
      type: 'Hotels & Restaurants',
      description: 'BBQ restaurant website with menu, ordering system, and reservation management.',
      price: 500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://chomazone.iyonicorp.com/',
      moduleIds: ['menu management', 'ordering system', 'reservation management'],
      minTier: 'basic'
    },

  ],
  'Service Suite': [
    {
      id: 'cp-1',
      name: 'Spa & Wellness Hub',
      type: 'Spa',
      description: 'Elegant booking and service portal for premium spas and wellness centers.',
      price: 2499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://tranquil.iyonicorp.com/',
      moduleIds: ['Appointments', 'customer management', 'inventory', 'free basic db'],
      minTier: 'premium'
    },
    {
      id: 'cp-2',
      name: 'Majestic Properties',
      type: 'Real Estate & Property Management',
      description: 'High-end rental management platform for apartments, airbnb, or properties.',
      price: 1799,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://majesticproperties.iyonicorp.com',
      moduleIds: ['crm', 'inventory', 'analytics', 'db_basic'],
      minTier: 'premium'
    },
    {
      id: 'cp-3',
      name: 'Boutique Hotel Booking',
      type: 'Hotels & Restaurants',
      description: 'Full-featured reservation system for boutique hotels and bed & breakfasts.',
      price: 2499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://restorunt1-1.onrender.com',
      moduleIds: ['crm', 'inventory', 'collaboration', 'db_basic'],
      minTier: 'premium'
    },
        {
      id: 'cp-4',
      name: 'Luxe Salon',
      type: 'Salons',
      description: 'Elegant booking and service portal for premium salons and wellness centers.',
      price: 3050,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://salon-4wel.onrender.com/',
      moduleIds: ['bookings', 'staff management', 'inventory', 'customer tracking'],
      minTier: 'premium'
    },
            {
      id: 'cp-5',
      name: 'Iyonicorp Support',
      type: 'Appointment Scheduling',
      description: 'Robust appointment scheduling system with customer management and analytics.',
      price: 1450,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://help.iyonicorp.com/',
      moduleIds: ['bookings', 'customer management', 'analytics', 'collaboration'],
      minTier: 'basic'
    },
                {
      id: 'cp-6',
      name: 'Iflix',
      type: 'Streaming',
      description: 'streaming platform with customer management and analytics.',
      price: 15000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://iflix-u9fu.onrender.com//',
      moduleIds: ['streaming', 'customer management', 'analytics', 'collaboration', 'basic ai assistant', 'payment gateway', 'premium seo', 'speed optimization', 'enterprise seo', 'cloud_infra', 'auth', 'db_basic'],
      minTier: 'enterprise'
    },
                    {
      id: 'cp-7',
      name: 'Essayme',
      type: 'Freelance',
      description: 'homework and essay management platform with analytics and conversation management.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://essayme.iyonicorp.com//',
      moduleIds: ['freelance', 'essay management', 'analytics', 'conversation management', 'advertisement', 'payment gateway', 'premium seo', 'speed optimization', 'enterprise seo', 'cloud_infra', 'auth', 'db_basic'],
      minTier: 'premium_plus'
    },
                        {
      id: 'cp-8',
      name: 'Top home designer',
      type: 'Professional Services',
      description: 'Best for interior designers, architects, and other professionals showcasing their work and services.',
      price: 2000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://tophomedesigner.com//',
      moduleIds: ['bookings', 'design portifolio', 'consoltation management'],
      minTier: 'basic'
    },
        {
      id: 'cp-9',
      name: 'Tujibambe',
      type: 'Tours & Travels',
      description: 'Best for travel agencies, tour operators, and adventure companies showcasing their offerings and managing bookings.',
      price: 7499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://tujibambe.iyonicorp.com/',
      moduleIds: ['bookings', 'travel packages', 'customer management', 'analytics'],
      minTier: 'enterprise'
    },
            {
      id: 'cp-10',
      name: 'GreenLeaf landscaping',
      type: 'Contractors',
      description: 'Best for landscaping companies, gardeners, and outdoor service providers showcasing their work and managing bookings.',
      price: 1500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://landscaping-yppi.onrender.com/',
      moduleIds: ['bookings', 'project portfolio', 'customer management', 'analytics'],
      minTier: 'premium'
    },
                {
      id: 'cp-11',
      name: 'my fitness trainer',
      type: 'Health & Fitness',
      description: 'Best for personal trainers, fitness coaches, and wellness professionals showcasing their services and managing client bookings. Aslo clients can track their fitness progress and access workout plans.',
      price: 4999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://myfitness.iyonicorp.com/',
      moduleIds: ['bookings', 'fitness programs', 'customer management', 'analytics'],
      minTier: 'premium_plus'
    },
                {
      id: 'cp-12',
      name: 'Baller\'s mounts',
      type: 'Professional Services',
      description: 'Digital portraits from your favorite photographs. Custom digital art in multiple sizes - A4, A3, A2, A1, A0. Transform your memories into timeless art.',
      price: 499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://ballersmounts.iyonicorp.com/',
      moduleIds: ['project portifolio', 'social media intergration'],
      minTier: 'basic'
    },
      {
      id: 'cp-13',
      name: 'Rent drive',
      type: 'Automobiles',
      description: 'Car rental platform with vehicle listings, booking management, and customer profiles.',
      price: 1499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://rentdrive.iyonicorp.com/',
      moduleIds: ['vehicle listings', 'booking management', 'customer profiles', 'analytics'],
      minTier: 'premium'
    },
{
      id: 'cp-14',
      name: 'Beauty plug',
      type: 'Salons',
      description: 'Salon booking platform with service listings, product listings, appointment scheduling, and customer profiles.',
      price: 2499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://beautyplug-1.onrender.com/',
      moduleIds: ['service listings', 'product listings', 'appointment scheduling', 'customer profiles', 'analytics'],
      minTier: 'premium_plus'
    },
                {
      id: 'cp-15',
      name: 'Auto kenya',
      type: 'Automobiles',
      description: 'Car dealership and with vehicle listings, booking management, and customer profiles.',
      price: 6000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://autokenya.onrender.com',
      moduleIds: ['vehicle listings', 'booking management', 'customer profiles', 'analytics'],
      minTier: 'enterprise'
    },
                    {
      id: 'cp-16',
      name: 'Justice law firm',
      type: 'Professional Services',
      description: 'Legal services platform with case management, client profiles, and document storage.',
      price: 3200,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://justicelawfirm.onrender.com',
      moduleIds: ['case management', 'client profiles', 'document storage'],
      minTier: 'premium'
    },
                      {
      id: 'cp-17',
      name: 'Events me',
      type: 'Event Planner',
      description: 'Comprehensive event planning platform with vendor management, guest lists, and scheduling tools.',
      price: 1800,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://eventsme.onrender.com',
      moduleIds: ['vendor management', 'guest lists', 'scheduling tools'],
      minTier: 'premium'
    },
                          {
      id: 'cp-18',
      name: 'Crown stroke',
      type: 'Saas',
      description: 'Print on demand platform with product customization, order management, and customer profiles.',
      price: 30000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://crownstroke.iyonicorp.com',
      moduleIds: ['product customization', 'order management', 'customer profiles', 'admin dashboard'],
      minTier: 'enterprise'
    },
                              {
      id: 'cp-19',
      name: 'Iyonicweb',
      type: 'Saas',
      description: 'Muliti tenant ecommerce with inbuilt payment system like paypal and Bots intergration for everything',
      price: 60000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://web.iyonicorp.com',
      moduleIds: ['product customization', 'order management', 'customer profiles', 'admin dashboard', 'payment gateway', 'chatbots', 'analytics', 'manager dashboard', 'crm', 'collaboration', 'inventory', 'cloud_infra', 'auth', 'db_basic', 'seo_basic', 'enterprise_seo', 'speed optimization'],
      minTier: 'enterprise'
    },

  ],
  
  'Retail Engine': [
    {
      id: 're-1',
      name: 'Modern Shop',
      type: 'Ecommerce',
      description: 'High-end e-commerce experience for premium brands.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://modern-shop-1.onrender.com',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth'],
      minTier: 'premium'
    },
    {
      id: 're-2',
      name: 'Gift Shop',
      type: 'Ecommerce',
      description: 'Robust e-commerce platform with advanced inventory and user management.',
      price: 5000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://giftshop2-1.onrender.com',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'premium_seo'],
      minTier: 'premium_plus'
    },
        {
      id: 're-3',
      name: 'Lumina Beauty',
      type: 'Beauty shops',
      description: 'Elegant beauty shop with inventory management and customer profiles.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://luminabeauty-1.onrender.com/',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium'
    },
            {
      id: 're-4',
      name: 'Fashion Vela',
      type: 'Ecommerce',
      description: 'High-end fashion e-commerce experience for premium brands.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://fashionvela-1.onrender.com/',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium'
    },

            {
      id: 're-5',
      name: 'African artifacts',
      type: 'Ecommerce',
      description: 'Best for selling handmade products',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://africanartifacts.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium'
    },
                {
      id: 're-6',
      name: 'Wimson',
      type: 'Ebooks',
      description: 'Best for selling ebooks and digital products',
      price: 1000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://wimson.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium'
    },
        {
      id: 're-7',
      name: 'Shabil fashion',
      type: 'Ecommerce',
      description: 'Stylish fashion e-commerce platform for trendy clothing and accessories.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://shabil.iyonicorp.com/',
      moduleIds: ['inventory','premium_seo', 'auth', 'cloud_infra', 'crm'],
      minTier: 'premium_plus'
    },
        {
      id: 're-8',
      name: 'Plugin',
      type: 'Ecommerce',
      description: 'premium cannabis store.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://plugin.iyonicorp.com/',
      moduleIds: ['crm', 'inventory', 'speed optimization', 'auth', 'premium_seo'],
      minTier: 'premium'
    },
            {
      id: 're-9',
      name: 'Zenpos',
      type: 'Point of Sale',
      description: 'Full-featured point of sale system with inventory and customer management.',
      price: 1500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://zenpos-1.onrender.com',
      moduleIds: ['pos', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },

              {
      id: 're-10',
      name: 'Lighters',
      type: 'Ecommerce',
      description: 'Elegant gift shop featuring premium lighters, custom engraving options and luxury accessories.',
      price: 1500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://blazecity.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },

                  {
      id: 're-11',
      name: 'Bean haven',
      type: 'Ecommerce',
      description: 'Specialty coffee shop with online ordering, subscription options, and rich customer profiles.',
      price: 1500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://beanhaven.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },
                      {
      id: 're-12',
      name: 'Phone shop',
      type: 'Ecommerce',
      description: 'Mobile phone store with detailed product pages, inventory management, and customer reviews.',
      price: 2900,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://phones.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },
            {
      id: 're-13',
      name: 'Elegant men\'s footwear',
      type: 'Ecommerce',
      description: 'High-end men\'s footwear e-commerce experience for premium brands.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://elegantmen.iyonicorp.com/',
      moduleIds: ['crm', 'inventory', 'marketing', 'auth', 'seo_basic'],
      minTier: 'premium'
    },
            {
      id: 're-14',
      name: 'Modern Bistro',
      type: 'Point of Sale',
      description: 'pos for fastfood restaurant with inventory and customer management.',
      price: 1900,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pos-1-qwh3.onrender.com/',
      moduleIds: ['pos', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },
                {
      id: 're-15',
      name: 'Nightclub POS',
      type: 'Point of Sale',
      description: 'POS system tailored for nightclubs and bars, featuring inventory management, customer profiles, and sales analytics to optimize operations and enhance customer experience.',
      price: 1900,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pos2-night-club.onrender.com',
      moduleIds: ['pos', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },
                    {
      id: 're-16',
      name: 'Booktels',
      type: 'Event Planner',
      description: 'Comprehensive event planning platform with vendor management, guest lists, and scheduling tools.',
      price: 4500,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://eventplanner.iyonicorp.com',
      moduleIds: ['event management', 'vendor management', 'guest management', 'scheduling'],
      minTier: 'premium_plus'
    },
                        {
      id: 're-17',
      name: 'Sunny Delights',
      type: 'Bakeries',
      description: 'Elegant online bakery store with detailed product pages, inventory management, and customer reviews.',
      price: 2000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://sunnydelights.iyonicorp.com',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },
                            {
      id: 're-18',
      name: 'Luxwatch',
      type: 'Ecommerce',
      description: 'High-end watch store with detailed product pages, inventory management, and customer reviews.',
      price: 6000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://luxwatch-1.onrender.com',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium_plus'
    },
                          {
      id: 're-19',
      name: 'Exclusive Phone shop',
      type: 'Ecommerce',
      description: 'Elegant mobile phone store with detailed product pages, inventory management, and customer reviews.',
      price: 4000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://phones2-1.onrender.com/',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics', 'premium_seo'],
      minTier: 'Premium_plus'
    },
                              {
      id: 're-20',
      name: 'Modern home decor',
      type: 'Ecommerce',
      description: 'High-end home decor store with detailed product pages, inventory management, and customer dashboard.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://homedeco2-1.onrender.com/',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics', 'premium_seo'],
      minTier: 'Premium'
    },
  ],

  // Payment Solution Plans
  'Gateway Lite': [
    {
      id: 'gl-1',
      name: 'Paylang',
      description: 'One-click payment landing page for single products.',
      price: 9000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://paylang.iyonicorp.com/',
      moduleIds: ['invoicing', 'security', 'refund management', 'basic analytics'],
      minTier: 'enterprise'
    }
  ],
  'Fintech Core': [
    {
      id: 'fc-1',
      name: 'iyonicpay',
      description: 'Secure financial dashboard with transaction history.',
      price: 25000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pay.iyonicorp.com',
      moduleIds: ['invoicing', 'security', 'global_payroll', 'high_risk_monitoring', 'faud_prevention', 'premium analytics', 'customer support', 'compliance_management', 'payment_gateway', 'refund_management', 'basic_analytics', 'advanced_reporting', 'multi_currency_support', 'recurring_payments', 'subscription_management', 'integration_with_ecommerce_platforms', 'mobile_payment_support', 'customizable_payment_forms', 'payment_link_generation', 'real_time_transaction_monitoring', 'chargeback_management', 'api_access_for_developers'],
      minTier: 'enterprise'
    }
  ],

  // Digital Marketing Plans
  'Traffic Wave': [
    {
      id: 'tw-1',
      name: 'Iyonic Marketing Funnel',
      description: 'High-converting marketing funnel with lead capture and email follow-up.',
      price: 1499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'http://marketing.iyonicorp.com/',
      moduleIds: ['market_intel', 'analytics', 'email_basic'],
      minTier: 'premium'
    }
  ],

  // AI & Automation Plans
  'Agent Zero': [
    {
      id: 'az-1',
      name: 'Custom AI Assistant',
      type: 'AI & Automation',
      description: 'Custom AI support agent trained on your docs.',
      price: 2499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://iyonicbots.iyonicorp.com',
      moduleIds: ['analytics', 'ai_assistant', 'model_training'],
      minTier: 'premium'
    }
  ]
}

export const formatPrice = (price) => {
  if (!price || price === 0) return '$0'
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  }
  if (price >= 1000) {
    return `$${Math.round(price / 1000)}K`
  }
  return `$${price.toLocaleString()}`
}

export const MODULE_NAME_MAP = {
  crm: 'Client Manager',
  auth: 'Identity Core',
  db_basic: 'Data Starter',
  invoicing: 'Invoicing System',
  email_basic: 'Mail Engine',
  collaboration: 'Team Nexus',
  seo_basic: 'SEO Starter',
  analytics: 'Advanced Analytics',
  inventory: 'Inventory Pro',
  security: 'Cyber Sentinel',
  market_intel: 'Market Intelligence',
  push_notifs: 'Push Engine',
  subscription_mgmt: 'Sub-Manager',
  ai_assistant: 'AI Strategy Assistant',
  cloud_infra: 'Auto-Scaler',
  fraud_prevention: 'Fraud Shield',
  payment_gateway: 'Payment Gateway',
  chatbots: 'Chatbot Engine',
  enterprise_seo: 'Enterprise SEO',
  'speed optimization': 'Speed Optimizer',
  'product catalog': 'Product Catalog',
  'product customization': 'Custom Products',
  'order management': 'Order Manager',
  'customer profiles': 'Customer Profiles',
  'customer management': 'Customer Manager',
  'agent profiles': 'Agent Profiles',
  'property listings': 'Property Listings',
  'contact forms': 'Contact Forms',
  'menu management': 'Menu Management',
  'ordering system': 'Ordering System',
  'reservation management': 'Reservation Manager',
  'staff management': 'Staff Management',
  'ticketvalidation': 'Ticket Validation',
  'design portifolio': 'Design Portfolio',
  'consoltation management': 'Consultation Manager',
  'vehicle listings': 'Vehicle Listings',
  'project portfolio': 'Project Portfolio',
  'travel packages': 'Travel Packages',
  'event management': 'Event Management',
  'vendor management': 'Vendor Manager',
  'guest management': 'Guest Manager',
  'scheduling': 'Scheduling',
  'case management': 'Case Manager',
  'document storage': 'Document Storage',
  'ticketing': 'Ticketing',
  'bookings': 'Booking System',
  forms: 'Form Builder',
  'appointment scheduling': 'Appointment Scheduler',
  'product listings': 'Product Listings',
  'product pages': 'Product Pages',
  marketing: 'Marketing Suite',
  'free basic db': 'Data Starter (Basic)',
  'analytics': 'Analytics Dashboard'
}

export const getModuleName = (moduleId) => {
  if (MODULE_NAME_MAP[moduleId]) return MODULE_NAME_MAP[moduleId]
  return moduleId
    ? moduleId.charAt(0).toUpperCase() + moduleId.slice(1).replace(/_/g, ' ')
    : 'Unknown Module'
}

export const MEMBERSHIP_INFO = {
  basic: { id: 'basic', name: 'Basic', color: 'blue' },
  premium: { id: 'premium', name: 'Premium', color: 'purple' },
  premium_plus: { id: 'premium_plus', name: 'Premium Plus', color: 'fuchsia' },
  enterprise: { id: 'enterprise', name: 'Enterprise', color: 'indigo' },
  partner: { id: 'partner', name: 'Alliance Partner', color: 'amber' }
}

export const OWNERSHIP_MODELS = [
  {
    id: 'instant',
    title: 'Instant Purchase',
    subtitle: 'Full Ownership & Source Code',
    description: 'Acquire 100% rights and source code access. Complete ownership transfer with all assets included.',
    features: ['100% Rights & Source Access', 'Immediate Delivery', 'Full Technical Documentation'],
    priceLabel: 'One-time',
    icon: ShoppingBag,
    color: 'amber',
    popular: true
  },
  {
    id: 'rent-to-own',
    title: 'Rent to Own',
    subtitle: '12-Month Path to Equity',
    description: 'Monthly payments with equity buildup. Own the business at the end of the term.',
    features: ['Monthly Payments', 'own at end', '+15% Premium'],
    priceLabel: '12-Month Term',
    icon: RefreshCw,
    color: 'purple'
  },
  {
    id: 'subscription',
    title: 'Subscription',
    subtitle: 'Member-Exclusive Access',
    description: 'Low entry point with full module access. Flexible tier-based subscription for ongoing use.',
    features: ['Low entry, full module access', 'Tier Based', 'Flexible Cancellation'],
    priceLabel: 'Tier Based',
    icon: Wallet,
    color: 'emerald'
  }
]

export const BUSINESS_MEMBERSHIP_TIERS = [
  {
    id: 'basic',
    name: 'Essential',
    subtitle: 'Core Infrastructure',
    tierLabel: 'Basic Membership',
    description: 'Perfect for small businesses starting their digital journey with essential core features.',
    price: 12,
    badge: 'Basic Membership',
    popular: false,
    features: [
      '2 Infrastructure Nodes (2 Businesses)',
      '4 Modules for the 2 businesses upgrade',
      'Free Maintenance for the 2 businesses',
      'Custom Domain Integration',
      'SEO Starter Pack',
      'Mail Engine Access',
      'API Gateway Access',
      'Basic Support Tier'
    ]
  },
  {
    id: 'premium',
    name: 'Professional Stack',
    subtitle: 'Premium Membership',
    tierLabel: 'Most Popular',
    description: 'Total digital transformation for businesses ready to scale with advanced analytics.',
    price: 25,
    badge: 'Premium Membership',
    popular: true,
    features: [
      'Everything in Essential',
      '1 Additional Infrastructure Node (3 Total)',
      'Advanced Business Analytics',
      '1 Dedicated Account Manager',
      '8 Modules for all businesses',
      'All Payment Solution Services',
      'Market Intelligence Access',
      'Workflow Automation Core'
    ]
  },
  {
    id: 'premium_plus',
    name: 'Total Power',
    subtitle: 'Enterprise Ecosystem',
    tierLabel: 'Premium Plus',
    description: 'The complete tech ecosystem. Unlimited modules and 24/7 VIP engineering support.',
    price: 60,
    badge: 'Premium Plus',
    popular: false,
    features: [
      'Everything in Professional',
      '1 Additional Infrastructure Node (4 Total)',
      'Unlimited Modules for all businesses',
      'AI-Powered Business Intelligence for all businesses',
      '24/7 VIP Engineering Support',
      '1 Basic Mobile App Inclusion',
      'Advanced Analytics for all businesses'
    ]
  },
  {
    id: 'enterprise',
    name: 'Maximum Scale',
    subtitle: 'Unlimited Infrastructure',
    tierLabel: 'Enterprise Tier',
    description: 'Maximum scalability with dedicated infrastructure and full whitelabel business platform.',
    price: 130,
    badge: 'Enterprise Tier',
    popular: false,
    features: [
      'Everything in Total Power',
      '3 Additional Infrastructure Nodes (7 Total)',
      'Dedicated Infrastructure',
      'Custom SLA & Legal Support',
      'Whitelabel Business Platform',
      'Direct API Access',
      'Unlimited Scalability',
      'Unlimited AI and Automation Services for all businesses'
    ]
  },
  {
    id: 'partner',
    name: 'Strategic Partner',
    subtitle: 'E-commerce Alliance',
    tierLabel: 'Alliance Partner',
    description: 'Strategic partnership for high-volume e-commerce with zero upfront development costs.',
    price: null,
    priceLabel: '7% fee',
    badge: 'Revenue Share Model',
    popular: false,
    partner: true,
    features: [
      'Unlimited Ecommerce Modules',
      'Limited Ecommerce Businesses',
      'Shared Revenue Model (7% Commission)',
      'Dedicated Partner Support',
      'Automated Scaling',
      'Zero Upfront Development'
    ]
  }
]

export const BRAND_CONTENT = {
  name: 'Iyoni Corp',
  tagline: 'Digital Businesses & Technology',
  coreMessage: 'Own a Business. Build a Business. Grow a Business.',
  heroDescription: 'Iyoni Corp creates digital businesses and technology products for entrepreneurs building the next generation of online businesses.',
  supportingMessage: 'We create digital businesses and technology products that help entrepreneurs build, operate, and grow online.'
}

export const THREE_PATHS = [
  {
    id: 'buy',
    title: 'Buy a Business',
    description: 'Acquire a ready-made digital business created by Iyoni Corp.',
    cta: 'Explore Businesses',
    href: '#businesses',
    isSecondary: false
  },
  {
    id: 'build',
    title: 'Build a Business',
    description: 'Launch and operate your business with IyonicWeb.',
    cta: 'Explore IyonicWeb',
    href: 'https://web.iyonicorp.com',
    isSecondary: false
  },
  {
    id: 'work',
    title: 'Work With Iyoni',
    description: 'Need a custom technology solution? Work directly with Iyoni Corp.',
    cta: 'Contact Iyoni Corp',
    href: '#contact',
    isSecondary: true
  }
]

export const HOW_IYONI_BUILDS = [
  { title: 'IDEA', description: 'We identify market opportunities and validate business concepts.' },
  { title: 'BUILD', description: 'We develop and launch digital businesses on the Iyonic platform.' },
  { title: 'LAUNCH', description: 'We deploy and optimize each business for operational performance.' },
  { title: 'GROW', description: 'We scale businesses with data-driven growth and automation.' },
  { title: 'OWN / OPERATE / SELL', description: 'Businesses are available for acquisition, partnership, or investment.' }
]

export const HOW_IYONI_BUILDS_DESCRIPTION = 'Iyoni Corp creates digital businesses and technology products that help entrepreneurs build, operate, and grow online.'

export const TECH_ECOSYSTEM = [
  {
    name: 'IyonicWeb',
    description: 'Business Platform',
    href: 'https://web.iyonicorp.com'
  },
  {
    name: 'IyonicPay',
    description: 'Payments',
    href: 'https://pay.iyonicorp.com'
  },
  {
    name: 'IyonicBots',
    description: 'AI & Automation',
    href: 'https://iyonicbots.iyonicorp.com'
  }
]

export const IYONICBOTS_CAPABILITIES = [
  {
    id: 'conversations',
    title: 'Customer Conversations',
    description: 'AI-powered chatbots that engage visitors and answer questions in real time.',
    exists: true
  },
  {
    id: 'product-questions',
    title: 'Product Questions',
    description: 'Assistants trained on your product docs and catalogs to answer buyer queries.',
    exists: true
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'AI-powered lead capture and qualification workflows are planned for upcoming releases.',
    exists: false
  },
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Automated support ticket handling and response routing via AI agents.',
    exists: true
  },
  {
    id: 'automation',
    title: 'Business Automation',
    description: 'Workflow automation for bookings, inventory, and daily operations.',
    exists: true
  }
]

export const EXCLUDED_BUSINESS_IDS = ['iyonicweb-cp19', 'iyonicpay-fc1', 'custom-ai-az1', 'paylang-gl1']
export const EXCLUDED_BUSINESS_NAMES = ['Iyonicweb', 'iyonicpay', 'Custom AI Assistant', 'Paylang']
export const EXCLUDED_BUSINESS_URLS = ['web.iyonicorp.com', 'pay.iyonicorp.com', 'iyonicbots.iyonicorp.com', 'paylang.iyonicorp.com']

export const HOME_NAV_ITEMS = [
  { label: 'Businesses', href: '#businesses' },
  { label: 'IyonicWeb', href: '#iyonicweb' },
  { label: 'IyonicPay', href: '#iyonicpay' },
  { label: 'IyonicBots', href: '#iyonicbots' },
  { label: 'Work With Iyoni', href: '#contact' }
]

export const ALL_BUSINESSES = Object.values(CATALOG_ITEMS).flat().filter(
  (item) => !EXCLUDED_BUSINESS_NAMES.includes(item.name)
)

export const findBusinessById = (id) => {
  return ALL_BUSINESSES.find((item) => item.id === id) || null
}

export const findBusinessByName = (name) => {
  return ALL_BUSINESSES.find((item) => item.name === name) || null
}

