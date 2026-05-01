import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES, WHY_CHOOSE_US_METRICS } from '../utils/constants'

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              {WHY_CHOOSE_US_CONTENT.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
              {WHY_CHOOSE_US_CONTENT.title.split(',')[0]}, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {WHY_CHOOSE_US_CONTENT.title.split(',')[1]}
              </span>
            </h2>
            <p className="text-lg text-neutral-500 mb-12 leading-relaxed">
              {WHY_CHOOSE_US_CONTENT.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {WHY_CHOOSE_US_FEATURES.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                      feature.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      feature.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                      feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                      feature.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-blue-500/5 border border-neutral-100 relative z-10">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Performance Metrics</h3>
              <div className="space-y-8">
                {WHY_CHOOSE_US_METRICS.map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">{metric.label}</span>
                      <span className="text-xl font-bold text-neutral-900">{metric.value}</span>
                    </div>
                    <div className="h-2 bg-neutral-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 -z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-0" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs