import { 
  Code, ShoppingBag, Layout, Globe, Database, Smartphone, Zap, Shield, 
  Activity, Cloud, Layers, Lightbulb, Rocket, Heart, Star, Mail, ArrowRight,
  Award, Target, CheckCircle, Clock, Users, Headphones, HeartHandshake, ShieldCheck,
  Phone, MapPin
} from 'lucide-react'

export const SERVICES_CONTENT = {
  subtitle: 'Our Specialization',
  title: 'Premium Web Development Services',
  description: 'We specialize exclusively in high-end web development, delivering precision-engineered digital solutions. Every project comes with a custom logo, banner, flyers, and posters—completely free of charge.'
}

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Consultation',
    description: 'We discuss your requirements, goals, and vision to understand the project scope.',
    icon: Lightbulb,
    color: 'blue'
  },
  {
    title: 'Design',
    description: 'We create wireframes and mockups based on your requirements and brand identity.',
    icon: Layout,
    color: 'purple'
  },
  {
    title: 'Development',
    description: 'We build your website with clean, scalable code using modern frameworks.',
    icon: Code,
    color: 'indigo'
  },
  {
    title: 'Launch',
    description: 'We deploy your website and ensure everything works perfectly.',
    icon: Rocket,
    color: 'emerald'
  }
]

export const WHY_CHOOSE_US_CONTENT = {
  subtitle: 'Why Iyonicorp',
  title: "We don't just build, we empower",
  description: 'Choosing the right partner is the difference between a project that just exists and one that thrives. We bring a decade of expertise and a relentless focus on your ROI.'
}

export const WHY_CHOOSE_US_FEATURES = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Enterprise-grade protocols with 24/7 monitoring and compliance.',
    color: 'blue'
  },
  {
    icon: Rocket,
    title: 'Fast Delivery',
    description: 'Agile methodology ensures rapid deployment without compromises.',
    color: 'purple'
  },
  {
    icon: Zap,
    title: 'Modern Stack',
    description: 'Leveraging the latest frameworks for future-proof solutions.',
    color: 'indigo'
  },
  {
    icon: Heart,
    title: 'Client Centric',
    description: 'Your success is our priority. We work as your dedicated partner.',
    color: 'rose'
  }
]

export const WHY_CHOOSE_US_METRICS = [
  { label: 'Uptime Guarantee', value: '99.9%' },
  { label: 'Project Success', value: '100%' },
  { label: 'Client Retention', value: '95%' },
  { label: 'Support Response', value: '< 2h' },
]

export const PARTNERSHIP_CONTENT = {
  subtitle: 'E-commerce Alliance',
  title: 'The 7% Standard.',
  description: "We've eliminated the barriers to digital commerce. No upfront costs, no maintenance fees—just a single 7% performance fee that settles in 30 seconds."
}

export const PARTNERSHIP_STEPS = [
  {
    icon: Rocket,
    title: 'Zero Upfront',
    description: 'We build your high-conversion storefront with zero initial investment. We only win when you win.',
    color: 'blue'
  },
  {
    icon: Zap,
    title: '30s Settlement',
    description: 'Get paid instantly. Sales are settled to your mobile money wallet within 30 seconds of purchase.',
    color: 'indigo'
  },
  {
    icon: HeartHandshake,
    title: '7% All-In',
    description: 'One flat fee covers everything: hosting, maintenance, transactions, and ongoing support.',
    color: 'purple'
  }
]

export const SHOPRIGHT_CONTENT = {
  subtitle: 'New Launch: Shop',
  title: 'Shop by Iyonicorp.',
  description: "The ultimate merchant ecosystem. Sell products, manage inventory, and track performance with a precision-engineered online store that reflects your brand's excellence."
}

export const SHOPRIGHT_FEATURES = [
  { icon: Layout, text: 'Custom Storefronts' },
  { icon: Zap, text: 'Instant Performance' },
  { icon: Globe, text: 'Global Reach' },
  { icon: ShieldCheck, text: 'Secure Transactions' }
]

export const CONTACT_CONTENT = {
  subtitle: 'Get in Touch',
  title: "Let's build something exceptional together",
  description: "Have a vision? We have the expertise to bring it to life. Reach out and let's start a conversation about your next big project."
}

export const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@iyonicorp.com',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+254 113203900',
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: 'Nairobi, Kenya',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
]

export const SERVICES = [
  {
    id: 'web-development',
    icon: Code,
    title: 'Precision Web Development',
    description: 'Bespoke digital experiences crafted with industry-leading technology. We handle everything from the initial architecture to the final deployment, ensuring a seamless, high-performance web presence for your brand.',
    moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'seo_basic', 'auth', 'db_basic'],
    color: 'bg-blue-600',
    types: ['SaaS', 'E-commerce', 'Portfolios', 'Corporate'],
    architecture: 'Next.js / React',
    minPrice: 100
  }
]

export const PRICING_DATA = {
  'web-development': [
    {
      name: 'Launch Pad',
      category: 'Entry Level',
      price: 100,
      maxPrice: 400,
      description: 'Perfect for landing pages, simple portfolios, and startup presence.',
      moduleIds: ['crm', 'collaboration', 'auth'],
      tag: 'Startup Ready',
      color: 'blue',
      design: {
        gradient: 'from-blue-600 to-cyan-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-blue-500/20'
      }
    },
    {
      name: 'Service Suite',
      category: 'Professional',
      price: 450,
      maxPrice: 1200,
      description: 'Comprehensive business solutions with advanced functionality.',
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
      name: 'Enterprise Engine',
      category: 'Enterprise',
      price: 1500,
      maxPrice: 10000,
      description: 'High-performance, scalable systems for large scale operations.',
      moduleIds: ['crm', 'collaboration', 'inventory', 'cloud_infra', 'auth'],
      tag: 'Enterprise',
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
  { name: 'Bakeries', price: 500, id: 'bakeries' },
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
  { name: 'Professional Services', price: 500, id: 'professional-services' },
  { name: 'AI & Automation', price: 2500, id: 'ai-automation' }
]

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
      price: 250,
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
      price: 300,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://dreamhomes.iyonicorp.com/',
      moduleIds: ['property listings', 'agent profiles', 'contact forms'],
      minTier: 'basic'
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
      price: 300,
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
                {
      id: 'cp-12',
      name: 'Baller\'s mounts',
      type: 'Professional Services',
      description: 'Digital portraits from your favorite photographs. Custom digital art in multiple sizes - A4, A3, A2, A1, A0. Transform your memories into timeless art.',
      price: 299,
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
      price: 499,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://rentdrive.iyonicorp.com/',
      moduleIds: ['vehicle listings', 'booking management', 'customer profiles', 'analytics'],
      minTier: 'basic'
    },
{
      id: 'cp-14',
      name: 'Beauty plug',
      type: 'Salons',
      description: 'Salon booking platform with service listings, product listings, appointment scheduling, and customer profiles.',
      price: 1499,
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
      minTier: 'premium_plus'
    },
                    {
      id: 'cp-16',
      name: 'Justice law firm',
      type: 'Professional Services',
      description: 'Legal services platform with case management, client profiles, and document storage.',
      price: 1200,
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
      price: 3000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://elegantmen.iyonicorp.com/',
      moduleIds: ['crm', 'inventory', 'cloud_infra', 'auth', 'seo_basic'],
      minTier: 'premium'
    },
            {
      id: 're-14',
      name: 'Modern Bistro',
      type: 'Point of Sale',
      description: 'pos for fastfood restaurant with inventory and customer management.',
      price: 900,
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
      minTier: 'basic'
    },
                    {
      id: 're-16',
      name: 'Booktels',
      type: 'Event Planner',
      description: 'Comprehensive event planning platform with vendor management, guest lists, and scheduling tools.',
      price: 2000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://eventplanner.iyonicorp.com',
      moduleIds: ['event management', 'vendor management', 'guest management', 'scheduling'],
      minTier: 'premium'
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
      price: 4000,
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
      price: 1000,
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
      price: 350,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://paylang.iyonicorp.com/',
      moduleIds: ['invoicing', 'security', 'refund management', 'basic analytics'],
      minTier: 'free'
    }
  ],
  'Fintech Core': [
    {
      id: 'fc-1',
      name: 'iyonicpay',
      description: 'Secure financial dashboard with transaction history.',
      price: 15000,
      image: 'https://i.imgur.com/6nGQFtj.png',
      url: 'https://pay.iyonicorp.com',
      moduleIds: ['invoicing', 'security', 'global_payroll', 'high_risk_monitoring', 'faud_prevention', 'premium analytics', 'customer support', 'compliance_management'],
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

