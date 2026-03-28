import { Ticket } from 'lucide-react'
import { toast } from '../contexts/ToastContext'

const CouponAdmin = ({ coupons, newCoupon, setNewCoupon, loading, setLoading, setCoupons, createAdminCoupon, fetchCoupons }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center">
              <Ticket size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Admin Console</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Coupon <span className="text-emerald-400">Codes</span>
          </h2>
          <p className="text-emerald-200 font-medium text-lg max-w-xl">
            Create and manage discount coupon codes for membership subscriptions.
          </p>
        </div>
      </div>
      
      {/* Create Coupon Form */}
      <div className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12">
        <h3 className="text-xl font-black uppercase italic tracking-tight mb-8">Create New Coupon</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Coupon Code</label>
            <input 
              type="text" 
              value={newCoupon.code} 
              onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} 
              placeholder="e.g. SUMMER25" 
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold uppercase tracking-wider outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Discount %</label>
            <input 
              type="number" 
              value={newCoupon.discount_percentage} 
              onChange={(e) => setNewCoupon({...newCoupon, discount_percentage: e.target.value})} 
              placeholder="e.g. 20" 
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Max Uses</label>
            <input 
              type="number" 
              value={newCoupon.max_uses} 
              onChange={(e) => setNewCoupon({...newCoupon, max_uses: e.target.value})} 
              placeholder="e.g. 100" 
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Expires At</label>
            <input 
              type="date" 
              value={newCoupon.expires_at} 
              onChange={(e) => setNewCoupon({...newCoupon, expires_at: e.target.value})} 
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Description</label>
            <input 
              type="text" 
              value={newCoupon.description} 
              onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})} 
              placeholder="e.g. Summer discount" 
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={async () => {
                if (!newCoupon.code || !newCoupon.discount_percentage) { 
                  toast.warning('Please fill in code and discount percentage'); 
                  return 
                }
                setLoading(true)
                try {
                  await createAdminCoupon({ 
                    code: newCoupon.code, 
                    discount_percentage: parseFloat(newCoupon.discount_percentage), 
                    description: newCoupon.description, 
                    max_uses: newCoupon.max_uses ? parseInt(newCoupon.max_uses) : null, 
                    expires_at: newCoupon.expires_at ? new Date(newCoupon.expires_at).toISOString() : null, 
                    new_users_only: newCoupon.new_users_only, 
                    applicable_tiers: newCoupon.applicable_tiers 
                  })
                  toast.success('Coupon created successfully!')
                  setNewCoupon({ 
                    code: '', 
                    discount_percentage: '', 
                    description: '', 
                    max_uses: '', 
                    expires_at: '', 
                    new_users_only: true, 
                    applicable_tiers: ['free', 'premium'] 
                  })
                  const couponsData = await fetchCoupons()
                  setCoupons(couponsData || [])
                } catch (err) { 
                  toast.error(err.response?.data?.message || 'Failed to create coupon') 
                } finally { 
                  setLoading(false) 
                }
              }} 
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all"
            >
              {loading ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Apply to Tiers</label>
          <div className="flex flex-wrap gap-3">
            {['free', 'premium', 'premium_plus', 'enterprise'].map(tier => (
              <label key={tier} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={newCoupon.applicable_tiers.includes(tier)} 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewCoupon({...newCoupon, applicable_tiers: [...newCoupon.applicable_tiers, tier]})
                    } else {
                      setNewCoupon({...newCoupon, applicable_tiers: newCoupon.applicable_tiers.filter(t => t !== tier)})
                    }
                  }} 
                  className="w-4 h-4 text-emerald-600 rounded" 
                />
                <span className="text-sm font-bold uppercase">{tier.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Existing Coupons List */}
      <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden">
        {coupons.length === 0 ? (
          <div className="p-24 text-center">
            <Ticket className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Coupon Codes Created</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">
                    {coupon.discount_percentage}%
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-slate-900 text-xl uppercase">{coupon.code}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${coupon.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">{coupon.description || 'No description'}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span>Used: {coupon.current_uses || 0}/{coupon.max_uses || '∞'}</span>
                      {coupon.expires_at && <span>Expires: {new Date(coupon.expires_at).toLocaleDateString()}</span>}
                      {coupon.new_users_only && <span className="text-amber-600">New Users Only</span>}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-black uppercase text-slate-400">
                  Tiers: {coupon.applicable_tiers?.join(', ') || 'All'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CouponAdmin
