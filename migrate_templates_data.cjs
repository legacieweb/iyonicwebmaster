require('dotenv').config()
const { Pool } = require('pg')

// Mocking constants.js content since we can't easily import ESM into CJS without extra setup
// but we can just use the data we saw earlier
const CATALOG_ITEMS = {
  'Launch Pad': [
    { name: 'Elite Fitness', url: 'https://elitefitness.iyonicorp.com/' },
    { name: 'Iyonic Blog', url: 'https://blog.iyonicorp.com/' },
    { name: 'Iyonic Blog 2', url: 'https://iyonicblog.iyonicorp.com/' },
    { name: 'Groundflex adventures', url: 'https://groundflexadventures.iyonicorp.com/' },
    { name: 'Dream homes', url: 'https://dreamhomes.iyonicorp.com/' },
    { name: 'Modern Portfolio', url: 'https://bonfacemurimi.iyonicorp.com' },
    { name: 'Choma zone', url: 'https://chomazone.iyonicorp.com/' }
  ],
  'Service Suite': [
    { name: 'Spa & Wellness Hub', url: 'https://tranquil.iyonicorp.com/' },
    { name: 'Majestic Properties', url: 'https://majesticproperties.iyonicorp.com' },
    { name: 'Boutique Hotel Booking', url: 'https://restorunt1-1.onrender.com' },
    { name: 'Luxe Salon', url: 'https://salon-4wel.onrender.com/' },
    { name: 'Iyonicorp Support', url: 'https://help.iyonicorp.com/' },
    { name: 'Iflix', url: 'https://iflix-u9fu.onrender.com//' },
    { name: 'Essayme', url: 'https://essayme.iyonicorp.com//' },
    { name: 'Top home designer', url: 'https://tophomedesigner.com//' },
    { name: 'Tujibambe', url: 'https://tujibambe.iyonicorp.com/' },
    { name: 'GreenLeaf landscaping', url: 'https://landscaping-yppi.onrender.com/' },
    { name: 'my fitness trainer', url: 'https://myfitness.iyonicorp.com/' },
    { name: 'Baller\'s mounts', url: 'https://ballersmounts.iyonicorp.com/' },
    { name: 'Rent drive', url: 'https://rentdrive.iyonicorp.com/' },
    { name: 'Beauty plug', url: 'https://beautyplug-1.onrender.com/' },
    { name: 'Auto kenya', url: 'https://autokenya.onrender.com' },
    { name: 'Justice law firm', url: 'https://justicelawfirm.onrender.com' },
    { name: 'Events me', url: 'https://eventsme.onrender.com' }
  ],
  'Retail Engine': [
    { name: 'Modern Shop', url: 'https://modern-shop-1.onrender.com' },
    { name: 'Gift Shop', url: 'https://giftshop2-1.onrender.com' },
    { name: 'Lumina Beauty', url: 'https://luminabeauty-1.onrender.com/' },
    { name: 'Fashion Vela', url: 'https://fashionvela-1.onrender.com/' },
    { name: 'African artifacts', url: 'https://africanartifacts.iyonicorp.com/' },
    { name: 'Wimson', url: 'https://wimson.iyonicorp.com/' },
    { name: 'Shabil fashion', url: 'https://shabil.iyonicorp.com/' },
    { name: 'Plugin', url: 'https://plugin.iyonicorp.com/' },
    { name: 'Zenpos', url: 'https://zenpos-1.onrender.com' },
    { name: 'Lighters', url: 'https://blazecity.iyonicorp.com/' },
    { name: 'Bean haven', url: 'https://beanhaven.iyonicorp.com/' },
    { name: 'Phone shop', url: 'https://phones.iyonicorp.com/' },
    { name: 'Elegant men\'s footwear', url: 'https://elegantmen.iyonicorp.com/' },
    { name: 'Modern Bistro', url: 'https://pos-1-qwh3.onrender.com/' },
    { name: 'Nightclub POS', url: 'https://pos2-night-club.onrender.com' },
    { name: 'Booktels', url: 'https://eventplanner.iyonicorp.com' },
    { name: 'Sunny Delights', url: 'https://sunnydelights.iyonicorp.com' },
    { name: 'Luxwatch', url: 'https://luxwatch-1.onrender.com' }
  ],
  'Gateway Lite': [
    { name: 'Paylang', url: 'https://paylang.iyonicorp.com/' }
  ],
  'Fintech Core': [
    { name: 'iyonicpay', url: 'https://pay.iyonicorp.com' }
  ],
  'Traffic Wave': [
    { name: 'Iyonic Marketing Funnel', url: 'http://marketing.iyonicorp.com/' }
  ],
  'Agent Zero': [
    { name: 'Custom AI Assistant', url: 'https://iyonicbots.iyonicorp.com' }
  ]
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function migrate() {
  try {
    const allItems = Object.values(CATALOG_ITEMS).flat()
    console.log(`Starting migration for ${allItems.length} items...`)
    
    for (const item of allItems) {
      const result = await pool.query(
        'UPDATE templates SET url = $1 WHERE name = $2',
        [item.url, item.name]
      )
      console.log(`Updated ${item.name}: ${result.rowCount} rows`)
    }
  } catch (err) {
    console.error('Migration error:', err)
  } finally {
    await pool.end()
  }
}

migrate()
