export const MODULES = [
  // Entry Modules ($25 - $75)
  {
    id: 'crm',
    name: 'Client Manager',
    description: 'Manage your client base and leads effectively.',
    minTier: 'basic',
    icon: 'Users',
    prices: { oneTime: 45 },
    serviceId: 'web-development'
  },
  {
    id: 'auth',
    name: 'Identity Core',
    description: 'Secure user authentication and authorization system.',
    minTier: 'basic',
    icon: 'ShieldCheck',
    prices: { oneTime: 75 },
    serviceId: 'web-development'
  },
  {
    id: 'db_basic',
    name: 'Data Starter',
    description: 'Essential database setup and management.',
    minTier: 'basic',
    icon: 'Database',
    prices: { oneTime: 30 },
    serviceId: 'web-development'
  },
  {
    id: 'invoicing',
    name: 'Invoicing System',
    description: 'Generate and send professional invoices.',
    minTier: 'basic',
    icon: 'FileText',
    prices: { oneTime: 25 },
    serviceId: 'payment-solutions'
  },
  {
    id: 'email_basic',
    name: 'Mail Engine',
    description: 'Basic email notifications and template system.',
    minTier: 'basic',
    icon: 'Mail',
    prices: { oneTime: 35 },
    serviceId: 'digital-marketing'
  },
  {
    id: 'collaboration',
    name: 'Team Nexus',
    description: 'Unified project coordination and team communication.',
    minTier: 'basic',
    icon: 'Briefcase',
    prices: { oneTime: 55 },
    serviceId: 'web-development'
  },
  {
    id: 'seo_basic',
    name: 'SEO Starter',
    description: 'Essential search engine optimization tools.',
    minTier: 'basic',
    icon: 'TrendingUp',
    prices: { oneTime: 40 },
    serviceId: 'digital-marketing'
  },

  // Professional Modules ($150 - $450)
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Deep dive into your business performance metrics.',
    minTier: 'premium',
    icon: 'BarChart3',
    prices: { oneTime: 180 },
    serviceId: 'ai-automation'
  },
  {
    id: 'offline_sync',
    name: 'Offline Core',
    description: 'Robust offline data synchronization for mobile apps.',
    minTier: 'premium',
    icon: 'RefreshCw',
    prices: { oneTime: 220 },
    serviceId: 'mobile-apps'
  },
  {
    id: 'inventory',
    name: 'Inventory Pro',
    description: 'Real-time stock tracking and management.',
    minTier: 'premium',
    icon: 'Box',
    prices: { oneTime: 280 },
    serviceId: 'web-development'
  },
  {
    id: 'security',
    name: 'Cyber Sentinel',
    description: 'Enterprise-grade threat detection and business security.',
    minTier: 'premium',
    icon: 'Lock',
    prices: { oneTime: 450 },
    serviceId: 'integrations'
  },
  {
    id: 'api_gateway',
    name: 'API Gateway',
    description: 'Centralized API management and traffic control.',
    minTier: 'basic',
    icon: 'Zap',
    prices: { oneTime: 350 },
    serviceId: 'integrations'
  },
  {
    id: 'market_intel',
    name: 'Market Intelligence',
    description: 'Real-time competitor tracking and industry insights.',
    minTier: 'premium',
    icon: 'TrendingUp',
    prices: { oneTime: 150 },
    serviceId: 'digital-marketing'
  },
  {
    id: 'push_notifs',
    name: 'Push Engine',
    description: 'Advanced push notification management system.',
    minTier: 'premium',
    icon: 'Zap',
    prices: { oneTime: 120 },
    serviceId: 'mobile-apps'
  },
  {
    id: 'biometric_auth',
    name: 'Bio-Secure',
    description: 'FaceID and fingerprint authentication integration.',
    minTier: 'premium',
    icon: 'Shield',
    prices: { oneTime: 190 },
    serviceId: 'mobile-apps'
  },
  {
    id: 'subscription_mgmt',
    name: 'Sub-Manager',
    description: 'Full-featured recurring billing and subscription system.',
    minTier: 'premium',
    icon: 'Repeat',
    prices: { oneTime: 320 },
    serviceId: 'payment-solutions'
  },

  // Enterprise & AI Modules ($800 - $3500)
  {
    id: 'ai_assistant',
    name: 'AI Strategy Assistant',
    description: 'Exclusive AI tools for business growth strategy.',
    minTier: 'premium_plus',
    icon: 'Sparkles',
    prices: { oneTime: 1200 },
    serviceId: 'ai-automation',
    tierExclusive: true
  },
  {
    id: 'vision_ai',
    name: 'Vision Intelligence',
    description: 'Advanced image recognition and computer vision tools.',
    minTier: 'premium_plus',
    icon: 'Eye',
    prices: { oneTime: 1500 },
    serviceId: 'ai-automation',
    tierExclusive: true
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    description: 'Automate repetitive business tasks with ease.',
    minTier: 'premium',
    icon: 'Zap',
    prices: { oneTime: 850 },
    serviceId: 'integrations',
    tierExclusive: true
  },
  {
    id: 'crypto_payments',
    name: 'Crypto Gateway',
    description: 'Seamless cryptocurrency payment integration.',
    minTier: 'premium_plus',
    icon: 'Coins',
    prices: { oneTime: 950 },
    serviceId: 'payment-solutions',
    tierExclusive: true
  },
  {
    id: 'compliance',
    name: 'Compliance Guard',
    description: 'Automated regulatory & legal compliance monitoring.',
    minTier: 'enterprise',
    icon: 'Shield',
    prices: { oneTime: 1100 },
    serviceId: 'integrations',
    tierExclusive: true
  },
  {
    id: 'global_payroll',
    name: 'Global Payouts',
    description: 'Seamless international team payments and tax handling.',
    minTier: 'premium_plus',
    icon: 'Wallet',
    prices: { oneTime: 1800 },
    serviceId: 'payment-solutions',
    tierExclusive: true
  },
  {
    id: 'cloud_infra',
    name: 'Auto-Scaler',
    description: 'On-demand cloud resource scaling and management.',
    minTier: 'enterprise',
    icon: 'Globe',
    prices: { oneTime: 2500 },
    serviceId: 'web-development',
    tierExclusive: true
  },
  {
    id: 'model_training',
    name: 'Neural Trainer',
    description: 'Custom AI model training and deployment.',
    minTier: 'enterprise',
    icon: 'Cpu',
    prices: { oneTime: 3500 },
    serviceId: 'ai-automation',
    tierExclusive: true
  },
  {
    id: 'fraud_prevention',
    name: 'Fraud Shield',
    description: 'AI-powered transaction monitoring and fraud detection.',
    minTier: 'premium_plus',
    icon: 'Shield',
    prices: { oneTime: 1400 },
    serviceId: 'payment-solutions',
    tierExclusive: true
  }
]

// Determine pricing based on modules - since we removed monthly, let's keep some fixed prices for tiers
export const MEMBERSHIP_TIERS = {
  BASIC: {
    id: 'basic',
    name: 'Basic',
    price: 12,
    websites: 2,
    maxModules: 4,
    features: [
      '2 Infrastructure Nodes (2 Websites)',
      '4 Modules for the 2 websites upgrade',
      'Free Maintenance for the 2 websites',
      'Custom Domain Integration',
      'SEO Starter Pack',
      'Mail Engine Access',
      'API Gateway Access',
      'Basic Support Tier'
    ],
    level: 0
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 25,
    websites: 3,
    maxModules: 8,
    features: [
      'Everything in Basic',
      '1 Additional Infrastructure Node (3 Total)',
      'Advanced Business Analytics',
      '1 Dedicated Account Manager',
      '8 Modules for all websites',
      'All Payment Solution Services',
      'Market Intelligence Access',
      'Workflow Automation Core'
    ],
    level: 1
  },
  PREMIUM_PLUS: {
    id: 'premium_plus',
    name: 'Premium Plus',
    price: 60,
    websites: 4,
    maxModules: 100, // Unlimited modules in prompt
    features: [
      'Everything in Premium',
      '1 Additional Infrastructure Node (4 Total)',
      'Unlimited Modules for all websites',
      'AI-Powered Business Intelligence for all websites',
      '24/7 VIP Engineering Support',
      '1 Basic Mobile App Inclusion',
      'Advanced Analytics for all websites'
    ],
    level: 2
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 130,
    websites: 7,
    maxModules: 1000, // Unlimited scalability
    features: [
      'Everything in Premium Plus',
      '3 Additional Infrastructure Nodes (7 Total)',
      'Dedicated Infrastructure',
      'Custom SLA & Legal Support',
      'Whitelabel Business Platform',
      'Direct API Access',
      'Unlimited Scalability',
      'Unlimited AI and Automation Services for all websites',
      'Unlimited Integrations for all websites',
      'Dedicated Account Managers for all websites',
      'Unlimited Digital Marketing for all websites'
    ],
    level: 3
  },
  PARTNER: {
    id: 'partner',
    name: 'Alliance Partner',
    price: 0,
    commission: 7,
    isRevenueShare: true,
    requiresApproval: true,
    features: [
      'Unlimited Ecommerce Modules',
      'Limited Ecommerce Websites',
      'Shared Revenue Model (7% Commission)',
      'Dedicated Partner Support',
      'Automated Scaling',
      'Zero Upfront Development'
    ],
    level: 4
  }
}

export const getBasicMembership = () => MEMBERSHIP_TIERS.BASIC
export const getPremiumMembership = () => MEMBERSHIP_TIERS.PREMIUM
export const getPremiumPlusMembership = () => MEMBERSHIP_TIERS.PREMIUM_PLUS
export const getEnterpriseMembership = () => MEMBERSHIP_TIERS.ENTERPRISE
export const getAlliancePartnerMembership = () => MEMBERSHIP_TIERS.PARTNER

export const checkAccess = (userTier = 'basic', toolMinTier) => {
  const tiers = ['basic', 'premium', 'premium_plus', 'enterprise', 'partner']
  return tiers.indexOf(userTier) >= tiers.indexOf(toolMinTier)
}

export const getUnlockedToolsForTier = (tierId) => {
  if (!tierId) return []
  
  // Basic tools are available to everyone with a membership
  const basicTools = [
    'crm', 'auth', 'db_basic', 'invoicing', 
    'email_basic', 'collaboration', 'seo_basic', 'api_gateway'
  ]
  
  const premiumTools = [
    ...basicTools,
    'analytics', 'offline_sync', 'inventory', 
    'security', 'market_intel', 'push_notifs', 
    'biometric_auth', 'subscription_mgmt', 'automation'
  ]
  
  const premiumPlusTools = [
    ...premiumTools,
    'ai_assistant', 'vision_ai', 'crypto_payments', 
    'global_payroll', 'fraud_prevention'
  ]
  
  const enterpriseTools = [
    ...premiumPlusTools,
    'compliance', 'cloud_infra', 'model_training'
  ]

  const partnerTools = [
    ...basicTools, // Partners get basic plus ecommerce focus
    'inventory', 'subscription_mgmt', 'invoicing'
  ]

  switch (tierId.toLowerCase()) {
    case 'basic': return basicTools
    case 'premium': return premiumTools
    case 'premium_plus': return premiumPlusTools
    case 'enterprise': return enterpriseTools
    case 'partner': return partnerTools
    case 'admin': return MODULES.map(m => m.id)
    default: return []
  }
}
