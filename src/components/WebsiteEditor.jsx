import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Palette, Type, Image as ImageIcon, Save, Loader, AlertCircle } from 'lucide-react'
import { updateProject } from '../utils/api'

const WebsiteEditor = ({ website, onBack }) => {
  const [editingTitle, setEditingTitle] = useState(website?.title || website?.name || 'Untitled Project')
  const [editedTitle, setEditedTitle] = useState(editingTitle)
  const [blocks, setBlocks] = useState([])
  const [customStyles, setCustomStyles] = useState(website?.settings?.customStyles || '')
  const [activeBlockId, setActiveBlockId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (website?.blocks) {
      const blocksData = Array.isArray(website.blocks) ? website.blocks : 
                        (typeof website.blocks === 'string' ? JSON.parse(website.blocks) : [])
      setBlocks(blocksData)
      if (blocksData.length > 0) {
        setActiveBlockId(blocksData[0].id)
      }
    }
  }, [website])

  const activeBlock = blocks.find(b => b.id === activeBlockId)

  const updateBlockContent = (blockId, field, value) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, [field]: value } : block
    ))
  }

  const renderBlockEditor = () => {
    if (!activeBlock) return null

    return (
      <div className="space-y-6 p-6 bg-white/5 rounded-xl border border-white/10">
        <div>
          <label className="block text-sm font-semibold mb-2">Section Title</label>
          <input
            type="text"
            value={activeBlock.title || ''}
            onChange={(e) => updateBlockContent(activeBlockId, 'title', e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {activeBlock.subtitle && (
          <div>
            <label className="block text-sm font-semibold mb-2">Subtitle</label>
            <textarea
              value={activeBlock.subtitle || ''}
              onChange={(e) => updateBlockContent(activeBlockId, 'subtitle', e.target.value)}
              rows="2"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>
        )}

        {activeBlock.bgColor && (
          <div>
            <label className="block text-sm font-semibold mb-2">Background Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={activeBlock.bgColor}
                onChange={(e) => updateBlockContent(activeBlockId, 'bgColor', e.target.value)}
                className="w-16 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={activeBlock.bgColor}
                onChange={(e) => updateBlockContent(activeBlockId, 'bgColor', e.target.value)}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {activeBlock.items && Array.isArray(activeBlock.items) && (
          <div>
            <label className="block text-sm font-semibold mb-2">Items</label>
            <div className="space-y-2">
              {activeBlock.items.map((item, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...activeBlock.items]
                    newItems[idx] = e.target.value
                    updateBlockContent(activeBlockId, 'items', newItems)
                  }}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder={`Item ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {activeBlock.buttonText && (
          <div>
            <label className="block text-sm font-semibold mb-2">Button Text</label>
            <input
              type="text"
              value={activeBlock.buttonText}
              onChange={(e) => updateBlockContent(activeBlockId, 'buttonText', e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
        )}
      </div>
    )
  }

  const renderBlockPreview = () => {
    if (!activeBlock) return null

    switch (activeBlock.type) {
      case 'hero':
        return (
          <div
            style={{ backgroundColor: activeBlock.bgColor }}
            className="w-full py-20 px-6 text-center text-white rounded-lg"
          >
            <h1 className="text-4xl font-bold mb-4">{activeBlock.title}</h1>
            <p className="text-xl text-gray-200">{activeBlock.subtitle}</p>
          </div>
        )
      case 'features':
        return (
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold mb-6">{activeBlock.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeBlock.items?.map((item, idx) => (
                <div key={idx} className="glass-dark p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-center">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'cta':
        return (
          <div
            style={{ backgroundColor: activeBlock.bgColor }}
            className="w-full py-12 px-6 text-center rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">{activeBlock.title}</h2>
            <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              {activeBlock.buttonText}
            </button>
          </div>
        )
      default:
        return (
          <div className="glass-dark p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-2">{activeBlock.title}</h3>
            <p className="text-gray-400 text-sm">Preview for {activeBlock.type}</p>
          </div>
        )
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError(null)

      const updateData = {
        title: editedTitle,
        blocks: blocks,
        settings: {
          ...website?.settings,
          customStyles,
        },
      }

      console.log('Saving project with data:', updateData)
      await updateProject(website.id, updateData)
      setEditingTitle(editedTitle)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error saving project:', err)
      setError('Failed to save project. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6 md:py-12">
        {/* Redesigned Responsive Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10 py-3 md:py-4 px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            <motion.button
              onClick={onBack}
              whileHover={{ x: -5 }}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-cyan-400 transition-all active:scale-95"
              title="Go Back"
            >
              <ArrowLeft size={18} />
            </motion.button>
            
            <div className="flex-1 min-w-0 max-w-md">
              <div className="flex flex-col">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-sm md:text-xl font-black bg-transparent text-white border-b border-transparent hover:border-cyan-500/50 focus:border-cyan-500 outline-none transition-all uppercase italic tracking-tighter truncate w-full"
                  placeholder="Project Title"
                />
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest truncate">Live Editor Protocol</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-4">
            {success ? (
              <motion.button
                disabled
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-full md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/10"
              >
                <span className="hidden sm:inline">Changes Saved</span>
                <span className="sm:hidden">Saved</span>
                <Save size={14} />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 md:px-8 md:py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-xl shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSaving ? (
                  <>
                    <Loader size={14} className="animate-spin" />
                    <span className="hidden sm:inline">Synchronizing...</span>
                    <span className="sm:hidden">Saving</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Commit Changes</span>
                    <span className="sm:hidden">Save</span>
                    <Save size={14} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </header>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="glass-dark p-8 rounded-2xl border border-white/10">
              <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Live Preview</h2>
              <div className="space-y-6">
                {renderBlockPreview()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blocks Navigation */}
            <div className="glass-dark p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">Sections</h3>
              <div className="space-y-2">
                {blocks.map((block) => (
                  <motion.button
                    key={block.id}
                    onClick={() => setActiveBlockId(block.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      activeBlockId === block.id
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {block.title || `${block.type} Section`}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Block Editor */}
            {activeBlock && (
              <div className="glass-dark rounded-2xl border border-white/10">
                <div className="px-6 pt-6 pb-4 border-b border-white/10">
                  <h3 className="text-lg font-bold">Edit Section</h3>
                </div>
                {renderBlockEditor()}
              </div>
            )}

            {/* Color Customization */}
            <div className="glass-dark p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Palette size={20} />
                Global Styles
              </h3>
              <div>
                <label className="block text-sm font-semibold mb-2">Custom CSS</label>
                <textarea
                  value={customStyles}
                  onChange={(e) => setCustomStyles(e.target.value)}
                  placeholder="/* Add custom styles */
.hero { border-radius: 20px; }"
                  rows="6"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsiteEditor
