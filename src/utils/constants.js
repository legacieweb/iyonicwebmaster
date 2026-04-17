import { Code, ShoppingBag, Layout, Globe, Database, Smartphone, Zap, Shield, Activity, Cloud, Layers } from 'lucide-react'

export const SERVICES = [
  {
    id: 'web-development',
    icon: Code,
    title: 'Custom Web Applications',
    description: 'High-performance, scalable web applications built with modern frameworks and robust backend architectures tailored to your business needs.',
    moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'seo_basic', 'auth', 'db_basic'],
    color: 'bg-blue-600',
    types: ['SaaS', 'Internal Tools', 'Portals', 'Dashboards']
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-commerce Solutions',
    description: 'Full-featured online stores with advanced inventory management, secure payments, and seamless user experiences to drive your sales.',
    moduleIds: ['inventory', 'auth', 'db_basic', 'analytics'],
    color: 'bg-indigo-600',
    types: ['Retail', 'Marketplaces', 'B2B Stores', 'Subscriptions']
  },
  {
    id: 'brand-presence',
    icon: Globe,
    title: 'Corporate & Portfolio',
    description: 'Stunning, high-conversion websites that establish your brand authority and showcase your professional expertise to the world.',
    moduleIds: ['seo_basic', 'collaboration', 'auth'],
    color: 'bg-cyan-600',
    types: ['Portfolios', 'Landing Pages', 'Business Profiles', 'Blogs']
  },
  {
    id: 'specialized-systems',
    icon: Layers,
    title: 'Specialized Systems',
    description: 'Niche solutions for specific industries including booking systems, automated workflows, and data-intensive platforms.',
    moduleIds: ['automation', 'security', 'compliance', 'cloud_infra'],
    color: 'bg-slate-900',
    types: ['Booking', 'Real Estate', 'Logistics', 'Education']
  }
]

export const PRICING_DATA = {
  'web-development': [
    {
      name: 'Launch Pad',
      category: 'Personal & Portfolio',
      price: 100,
      maxPrice: 300,
      description: 'Personal websites including portfolios, blogs, and high-conversion landing pages.',
      moduleIds: ['crm', 'collaboration', 'auth'],
      tag: 'Flexible Range',
      color: 'blue',
      design: {
        gradient: 'from-blue-600 to-cyan-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-blue-500/20'
      }
    },
    {
      name: 'Service Suite',
      category: 'Professional Services',
      price: 450,
      maxPrice: 900,
      description: 'The ultimate solution for all service-based websites: spas, rentals, and hotel bookings.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'db_basic'],
      tag: 'Most Popular',
      popular: true,
      color: 'purple',
      design: {
        gradient: 'from-purple-600 to-indigo-600',
        pattern: 'bg-dot-white/[0.05]',
        shadow: 'hover:shadow-purple-500/20'
      }
    },
    {
      name: 'Retail Engine',
      category: 'E-commerce & Retail',
      price: 950,
      maxPrice: 3500,
      description: 'Full-scale ecommerce websites with advanced checkout and inventory management.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'auth'],
      tag: 'Enterprise',
      color: 'indigo',
      design: {
        gradient: 'from-indigo-600 to-blue-700',
        pattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
        shadow: 'hover:shadow-indigo-500/20'
      }
    }
  ],
  'ecommerce': [
    {
      name: 'Starter Shop',
      category: 'Small Business',
      price: 450,
      maxPrice: 1200,
      description: 'Perfect for small boutiques and specialized retailers starting their online journey.',
      moduleIds: ['inventory', 'auth', 'db_basic'],
      tag: 'Quick Start',
      color: 'blue',
      design: {
        gradient: 'from-blue-600 to-cyan-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-blue-500/20'
      }
    },
    {
      name: 'Retail Engine',
      category: 'E-commerce & Retail',
      price: 950,
      maxPrice: 3500,
      description: 'Full-scale ecommerce websites with advanced checkout and inventory management.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'auth'],
      tag: 'Most Popular',
      popular: true,
      color: 'purple',
      design: {
        gradient: 'from-purple-600 to-indigo-600',
        pattern: 'bg-dot-white/[0.05]',
        shadow: 'hover:shadow-purple-500/20'
      }
    },
    {
      name: 'Global Marketplace',
      category: 'Enterprise',
      price: 4500,
      maxPrice: 15000,
      description: 'Multi-vendor platforms with complex logistics, international payments, and AI insights.',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'analytics', 'global_payroll'],
      tag: 'Enterprise',
      color: 'indigo',
      design: {
        gradient: 'from-indigo-600 to-blue-700',
        pattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
        shadow: 'hover:shadow-indigo-500/20'
      }
    }
  ],
  'brand-presence': [
    {
      name: 'Identity Pack',
      category: 'Personal',
      price: 150,
      maxPrice: 500,
      description: 'Sleek portfolios and personal brands that stand out from the crowd.',
      moduleIds: ['seo_basic', 'auth'],
      tag: 'Personal',
      color: 'blue',
      design: {
        gradient: 'from-blue-600 to-cyan-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-blue-500/20'
      }
    },
    {
      name: 'Business Pro',
      category: 'Corporate',
      price: 600,
      maxPrice: 1500,
      description: 'Professional corporate websites with lead generation and brand storytelling.',
      moduleIds: ['crm', 'collaboration', 'seo_basic', 'auth'],
      tag: 'Corporate',
      popular: true,
      color: 'purple',
      design: {
        gradient: 'from-purple-600 to-indigo-600',
        pattern: 'bg-dot-white/[0.05]',
        shadow: 'hover:shadow-purple-500/20'
      }
    }
  ],
  'specialized-systems': [
    {
      name: 'Booking Hub',
      category: 'Services',
      price: 800,
      maxPrice: 2500,
      description: 'Advanced appointment and reservation systems for any service industry.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'db_basic'],
      tag: 'Service-Ready',
      color: 'blue',
      design: {
        gradient: 'from-blue-600 to-cyan-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-blue-500/20'
      }
    },
    {
      name: 'Custom Workflow',
      category: 'Automation',
      price: 1500,
      maxPrice: 8000,
      description: 'Tailored business automation and data management platforms built to your specs.',
      moduleIds: ['automation', 'cloud_infra', 'security', 'compliance'],
      tag: 'Tailored',
      popular: true,
      color: 'indigo',
      design: {
        gradient: 'from-indigo-600 to-blue-700',
        pattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
        shadow: 'hover:shadow-indigo-500/20'
      }
    }
  ]
}

export const WEBSITE_TYPES = [
  { name: 'Portfolio', price: 100, id: 'portfolio' },
  { name: 'Blogs', price: 150, id: 'blogs' },
  { name: 'Ecommerce', price: 950, id: 'ecommerce' },
  { name: 'Spa', price: 450, id: 'spa' },
  { name: 'Ebooks', price: 700, id: 'ebooks' },
  { name: 'Salons', price: 450, id: 'salons' },
  { name: 'Beauty shops', price: 550, id: 'beauty-shops' },
  { name: 'Hotels & Restaurants', price: 750, id: 'hotels-restaurants' },
  { name: 'Appointment Scheduling', price: 500, id: 'appointment-scheduling' },
  { name: 'Health & Fitness', price: 550, id: 'health-fitness' },
  { name: 'Automobiles', price: 850, id: 'automobiles' },
  { name: 'Tours & Travels', price: 700, id: 'tours-travels' },
  { name: 'Event Planner', price: 600, id: 'event-planner' },
  { name: 'Point of Sale', price: 1200, id: 'pos' },
  { name: 'Freelance', price: 200, id: 'freelance' },
  { name: 'Tutoring', price: 300, id: 'tutoring' },
  { name: 'Real Estate & Property Management', price: 1100, id: 'real-estate' },
  { name: 'Contractors', price: 500, id: 'contractors' },
  { name: 'Streaming', price: 2500, id: 'streaming' },
  { name: 'Social Platforms', price: 3500, id: 'social-platforms' },
  { name: 'Business Profiles', price: 400, id: 'business-profiles' },
  { name: 'Professional Services', price: 500, id: 'professional-services' }
]

export const CATALOG_ITEMS = {
  // Web Development Plans
  'Launch Pad': [
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
      price: 250,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://groundflexadventures.iyonicorp.com/',
      moduleIds: ['forms', 'bookings', 'customer management', 'ticketing', 'ticketvalidation'],
      minTier: 'basic'
    },
  ],
  'Service Suite': [
    {
      id: 'cp-1',
      name: 'Spa & Wellness Hub',
      type: 'Spa',
      description: 'Elegant booking and service portal for premium spas and wellness centers.',
      price: 1499,
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
      price: 450,
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
      price: 8000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://iflix-u9fu.onrender.com//',
      moduleIds: ['streaming', 'customer management', 'analytics', 'collaboration'],
      minTier: 'enterprise'
    },
                    {
      id: 'cp-7',
      name: 'Essayme',
      type: 'Freelance',
      description: 'streaming platform with customer management and analytics.',
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://essayme.iyonicorp.com//',
      moduleIds: ['freelance', 'essay management', 'analytics', 'conversation management', 'basic ai assistant'],
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
      price: 499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://landscaping-yppi.onrender.com/',
      moduleIds: ['bookings', 'project portfolio', 'customer management', 'analytics'],
      minTier: 'basic'
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
  ],
  'Retail Engine': [
    {
      id: 're-1',
      name: 'Modern Shop',
      type: 'Ecommerce',
      description: 'High-end e-commerce experience for premium brands.',
      price: 2999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://modern-shop-1.onrender.com',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth'],
      minTier: 'premium_plus'
    },
    {
      id: 're-2',
      name: 'Gift Shop',
      type: 'Ecommerce',
      description: 'Robust e-commerce platform with advanced inventory and user management.',
      price: 4999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://giftshop2-1.onrender.com',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium_plus'
    },
        {
      id: 're-3',
      name: 'Lumina Beauty',
      type: 'Beauty shops',
      description: 'Elegant beauty shop with inventory management and customer profiles.',
      price: 3999,
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
      price: 3999,
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
      price: 2599,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://africanartifacts.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'free'
    },
                {
      id: 're-6',
      name: 'Wimson',
      type: 'Ebooks',
      description: 'Best for selling ebooks and digital products',
      price: 799,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://wimson.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium_plus'
    },
        {
      id: 're-7',
      name: 'Couturec fashion',
      type: 'Ecommerce',
      description: 'High-end fashion e-commerce experience for premium brands.',
      price: 1999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://couturee.iyonicorp.com/',
      moduleIds: ['crm', 'inventory', 'speed optimization', 'auth', 'premium_seo'],
      minTier: 'premium_plus'
    },
        {
      id: 're-8',
      name: 'Plugin',
      type: 'Ecommerce',
      description: 'premium cannabis store.',
      price: 5900,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://plugin.iyonicorp.com/',
      moduleIds: ['crm', 'inventory', 'speed optimization', 'auth', 'premium_seo'],
      minTier: 'enterprise'
    },
            {
      id: 're-9',
      name: 'Zenpos',
      type: 'Point of Sale',
      description: 'Full-featured point of sale system with inventory and customer management.',
      price: 1000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://zenpos.onrender.com',
      moduleIds: ['pos', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },

              {
      id: 're-10',
      name: 'Lighters',
      type: 'Ecommerce',
      description: 'Elegant gift shop featuring premium lighters, custom engraving options and luxury accessories.',
      price: 2500,
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
      minTier: 'basic'
    },
                      {
      id: 're-12',
      name: 'Phone shop',
      type: 'Ecommerce',
      description: 'Mobile phone store with detailed product pages, inventory management, and customer reviews.',
      price: 900,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://phones.iyonicorp.com/',
      moduleIds: ['product catalog', 'inventory', 'customer management', 'analytics'],
      minTier: 'basic'
    },
            {
      id: 're-13',
      name: 'Elegant men\'s footwear',
      type: 'Ecommerce',
      description: 'High-end men\'s footwear e-commerce experience for premium brands.',
      price: 4999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://elegantmen.iyonicorp.com/',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium_plus'
    },
            {
      id: 're-14',
      name: 'Modern Bistro',
      type: 'Point of Sale',
      description: 'pos for fastfood restaurant with inventory and customer management.',
      price: 600,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pos-1-qwh3.onrender.com/',
      moduleIds: ['pos', 'inventory', 'customer management', 'analytics'],
      minTier: 'basic'
    },
                {
      id: 're-15',
      name: 'Nightclub POS',
      type: 'Point of Sale',
      description: 'POS system tailored for nightclubs and bars, featuring inventory management, customer profiles, and sales analytics to optimize operations and enhance customer experience.',
      price: 900,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pos2-night-club.onrender.com',
      moduleIds: ['pos', 'inventory', 'customer management', 'analytics'],
      minTier: 'premium'
    },
  ],

  // Payment Solution Plans
  'Gateway Lite': [
    {
      id: 'gl-1',
      name: 'Paylang',
      description: 'One-click payment landing page for single products.',
      price: 150,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://paylang.iyonicorp.com/',
      moduleIds: ['invoicing', 'security', 'subscription_mgmt'],
      minTier: 'free'
    }
  ],
  'Fintech Core': [
    {
      id: 'fc-1',
      name: 'iyonicpay',
      description: 'Secure financial dashboard with transaction history.',
      price: 999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pay.iyonicorp.com',
      moduleIds: ['invoicing', 'security', 'global_payroll', 'high_risk_monitoring', 'faud_prevention'],
      minTier: 'premium'
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
      description: 'Custom AI support agent trained on your docs.',
      price: 2499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://iyonicbots.iyonicorp.com',
      moduleIds: ['analytics', 'ai_assistant', 'model_training'],
      minTier: 'premium'
    }
  ],
  'Neural Enterprise': [
    {
      id: 'ne-1',
      name: 'Core Logic AI',
      description: 'Enterprise-wide LLM integration for operations.',
      price: 4999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://openai.com',
      moduleIds: ['analytics', 'ai_assistant', 'automation', 'vision_ai'],
      minTier: 'premium_plus'
    }
  ],

  // Mobile App Plans
  'Native MVP': [
    {
      id: 'mvp-1',
      name: 'Flash Mobile',
      description: 'Quick-to-market mobile app with core functionality.',
      price: 4999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://expo.dev',
      moduleIds: ['crm', 'collaboration', 'push_notifs'],
      minTier: 'premium'
    }
  ],
  'Mobile Empire': [
    {
      id: 'me-1',
      name: 'Ecosystem Mobile',
      description: 'Massive mobile app with social and commerce features.',
      price: 8999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://instagram.com',
      moduleIds: ['crm', 'collaboration', 'analytics', 'offline_sync', 'biometric_auth'],
      minTier: 'premium_plus'
    }
  ],

  // Integration Plans
  'Sync Logic': [
    {
      id: 'sl-1',
      name: 'Bridge Master',
      description: 'Connect two major systems with bidirectional sync.',
      price: 799,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://zapier.com',
      moduleIds: ['automation', 'security'],
      minTier: 'premium'
    }
  ],
  'System Weave': [
    {
      id: 'sw-1',
      name: 'Nexus Weaver',
      description: 'Centralized automation hub for your entire stack.',
      price: 1999,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://make.com',
      moduleIds: ['automation', 'security', 'compliance'],
      minTier: 'premium_plus'
    }
  ]
}
