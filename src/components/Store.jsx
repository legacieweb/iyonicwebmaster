import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Heart, Search, Filter, Star } from 'lucide-react'

const Store = ({ onBack }) => {
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [wishlist, setWishlist] = useState([])

  const products = [
    {
      id: 1,
      name: 'Premium Template Bundle',
      category: 'templates',
      price: 49,
      rating: 4.8,
      image: 'bg-gradient-to-br from-cyan-600 to-blue-600',
      description: '50+ Premium website templates for all industries',
    },
    {
      id: 2,
      name: 'Custom Domain for 1 Year',
      category: 'addons',
      price: 14.99,
      rating: 4.9,
      image: 'bg-gradient-to-br from-purple-600 to-pink-600',
      description: 'Custom domain registration and hosting for 1 year',
    },
    {
      id: 3,
      name: 'Lifetime Premium Support',
      category: 'support',
      price: 99,
      rating: 4.7,
      image: 'bg-gradient-to-br from-green-600 to-emerald-600',
      description: '24/7 priority support and lifetime updates',
    },
    {
      id: 4,
      name: 'SEO Optimization Pack',
      category: 'addons',
      price: 29.99,
      rating: 4.8,
      image: 'bg-gradient-to-br from-orange-600 to-red-600',
      description: 'Complete SEO setup and monthly optimization',
    },
    {
      id: 5,
      name: 'E-commerce Features',
      category: 'addons',
      price: 39.99,
      rating: 4.9,
      image: 'bg-gradient-to-br from-indigo-600 to-purple-600',
      description: 'Full e-commerce functionality for your store',
    },
    {
      id: 6,
      name: 'Email Marketing Integration',
      category: 'addons',
      price: 24.99,
      rating: 4.6,
      image: 'bg-gradient-to-br from-yellow-600 to-orange-600',
      description: 'Connect with MailChimp, ConvertKit, and more',
    },
  ]

  const categories = ['all', 'templates', 'addons', 'support']

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <motion.button
          onClick={() => onBack('landing')}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8 transition-colors font-medium"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-2">
            Extend Your <span className="text-neutral-900">Builder</span>
          </h1>
          <p className="text-neutral-500 text-lg">Premium templates, features, and support to enhance your website building experience</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 shadow-sm p-6 rounded-2xl sticky top-24 space-y-6">
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                </h3>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg mb-2 font-medium capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="font-bold mb-4">Cart Summary</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-400 text-sm">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">{item.name}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            ✕
                          </motion.button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-neutral-900">${cartTotal.toFixed(2)}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full mt-4 bg-neutral-900 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-neutral-200"
                      >
                        Checkout
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-8 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors shadow-sm"
              />
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-neutral-200 shadow-sm rounded-2xl overflow-hidden hover:border-neutral-300 transition-all group"
                >
                  <div className={`h-40 ${product.image} relative`}>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                        wishlist.includes(product.id)
                          ? 'bg-red-500/30 border border-red-500'
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={wishlist.includes(product.id) ? 'fill-red-400 text-red-400' : 'text-white'}
                      />
                    </motion.button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-2xl font-bold text-neutral-900">${product.price}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="w-full bg-neutral-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-neutral-100"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store
