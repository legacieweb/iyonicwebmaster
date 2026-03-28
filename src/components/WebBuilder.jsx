import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Trash2, Copy, Eye, Save, Settings, GripVertical, CheckCircle } from 'lucide-react'
import { saveProject } from '../utils/api'
import { useAuth } from '../contexts/AuthContext'

const WebBuilder = ({ onBack, templateId, themeData }) => {
  const { currentUser } = useAuth()
  const [blocks, setBlocks] = useState([])
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [preview, setPreview] = useState(false)
  const [draggedFrom, setDraggedFrom] = useState(null)
  const [projectTitle, setProjectTitle] = useState('My Project')
  const [savedStatus, setSavedStatus] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (themeData) {
      setProjectTitle(themeData.name || 'My Project')
      const initialBlocks = themeData.blocks?.map((blockType, idx) => ({
        id: idx + 1,
        type: blockType,
        title: `${blockType} Section`,
        ...getDefaultBlockProps(blockType)
      })) || []
      setBlocks(initialBlocks.length > 0 ? initialBlocks : [
        { id: 1, type: 'hero', title: 'Welcome to Your Website', subtitle: 'Create something amazing', bgColor: '#1e40af' },
        { id: 2, type: 'features', title: 'Features', items: ['Feature 1', 'Feature 2', 'Feature 3'] },
      ])
    }
  }, [themeData])

  const templateIdMap = {
    1: 'modern-business',
    2: 'creative-portfolio',
    3: 'ecommerce-store',
    4: 'landing-page-pro',
    5: 'agency-website',
    6: 'creative-portfolio',
    7: 'startup-minimal',
  }

  const blockTypes = [
    { type: 'hero', label: 'Hero Section', icon: '🎨' },
    { type: 'features', label: 'Features', icon: '⭐' },
    { type: 'cta', label: 'Call to Action', icon: '🎯' },
    { type: 'gallery', label: 'Gallery', icon: '🖼️' },
    { type: 'testimonials', label: 'Testimonials', icon: '💬' },
    { type: 'contact', label: 'Contact Form', icon: '📧' },
  ]

  const selectedBlock = blocks.find(b => b.id === selectedBlockId)

  const addBlock = (type) => {
    const newId = Math.max(...blocks.map(b => b.id), 0) + 1
    const newBlock = {
      id: newId,
      type,
      title: `New ${type} Block`,
      ...getDefaultBlockProps(type)
    }
    setBlocks([...blocks, newBlock])
    setSelectedBlockId(newId)
  }

  const getDefaultBlockProps = (type) => {
    const defaults = {
      hero: { title: 'Your Headline', subtitle: 'Your subheading', bgColor: '#1e40af' },
      features: { title: 'Features', items: ['Feature 1', 'Feature 2', 'Feature 3'] },
      cta: { title: 'Ready to Get Started?', buttonText: 'Click Here', bgColor: '#0891b2' },
      gallery: { title: 'Gallery', images: ['Image 1', 'Image 2', 'Image 3', 'Image 4'] },
      testimonials: { title: 'What Our Clients Say', items: ['Great service!', 'Highly recommended!'] },
      contact: { title: 'Get In Touch', fields: ['Name', 'Email', 'Message'] }
    }
    return defaults[type] || {}
  }

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  const duplicateBlock = (id) => {
    const blockToDuplicate = blocks.find(b => b.id === id)
    const newId = Math.max(...blocks.map(b => b.id), 0) + 1
    const newBlock = { ...blockToDuplicate, id: newId }
    const index = blocks.findIndex(b => b.id === id)
    setBlocks([...blocks.slice(0, index + 1), newBlock, ...blocks.slice(index + 1)])
  }

  const moveBlock = (id, direction) => {
    const index = blocks.findIndex(b => b.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) return

    const newBlocks = [...blocks]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[newIndex]
    newBlocks[newIndex] = temp
    setBlocks(newBlocks)
  }

  const updateBlock = (id, updates) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  const handleSaveProject = async () => {
    if (!currentUser?.id) {
      alert('Please log in to save your project')
      return
    }

    setIsSaving(true)
    try {
      let templateValue = themeData?.id || themeData?.template || templateId || 'custom'
      
      if (typeof templateValue === 'number' && templateIdMap[templateValue]) {
        templateValue = templateIdMap[templateValue]
      }

      const projectData = {
        title: projectTitle,
        blocks: blocks,
        template: templateValue,
        userId: currentUser.id,
        status: 'draft',
        description: `Project built with ${themeData?.name || 'custom template'}`
      }

      await saveProject(projectData)
      setSavedStatus({
        type: 'success',
        message: 'Project saved successfully!'
      })
      setTimeout(() => setSavedStatus(null), 3000)
    } catch (error) {
      setSavedStatus({
        type: 'error',
        message: 'Failed to save project. Please try again.'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const renderBlockPreview = (block) => {
    switch (block.type) {
      case 'hero':
        return (
          <div style={{ backgroundColor: block.bgColor }} className="py-16 px-6 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">{block.title}</h1>
            <p className="text-xl">{block.subtitle}</p>
          </div>
        )
      case 'features':
        return (
          <div className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{block.title}</h2>
            <div className="grid grid-cols-3 gap-4">
              {block.items?.map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg text-center">{item}</div>
              ))}
            </div>
          </div>
        )
      case 'cta':
        return (
          <div style={{ backgroundColor: block.bgColor }} className="py-12 px-6 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">{block.title}</h2>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold">{block.buttonText}</button>
          </div>
        )
      case 'gallery':
        return (
          <div className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{block.title}</h2>
            <div className="grid grid-cols-4 gap-4">
              {block.images?.map((img, i) => (
                <div key={i} className="bg-white/10 h-32 rounded-lg flex items-center justify-center">{img}</div>
              ))}
            </div>
          </div>
        )
      default:
        return <div className="p-6">{block.type} block</div>
    }
  }

  if (preview) {
    return (
      <div className="min-h-screen bg-dark overflow-x-hidden">
        {/* Redesigned Preview Header */}
        <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10 py-4 px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">{projectTitle}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Live Architectural Preview</span>
            </div>
          </div>
          <button 
            onClick={() => setPreview(false)} 
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-cyan-400 rounded-full border border-white/10 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
          >
            Exit Preview System
          </button>
        </header>
        <div className="bg-gray-900">
          {blocks.map(block => (
            <div key={block.id} className="border-b border-white/10">{renderBlockPreview(block)}</div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark pt-24 md:pt-28">
      {/* Redesigned Editor Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10 py-3 md:py-4 px-4 sm:px-8 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
          <motion.button
            onClick={() => onBack?.('landing')}
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
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="text-sm md:text-xl font-black bg-transparent text-white border-b border-transparent hover:border-cyan-500/50 focus:border-cyan-500 outline-none transition-all uppercase italic tracking-tighter truncate w-full"
                placeholder="Project Title"
              />
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Master Builder Protocol</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-4">
          <div className="hidden lg:flex mr-4">
            {savedStatus && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest ${
                  savedStatus.type === 'success'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {savedStatus.type === 'success' && <CheckCircle size={14} />}
                {savedStatus.message}
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPreview(true)}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/5 hover:bg-white/10 text-white rounded-full md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-white/10 transition-all shadow-xl shadow-white/5 group"
          >
            <span className="hidden sm:inline">Visualize</span>
            <span className="sm:hidden">View</span>
            <Eye size={14} className="group-hover:scale-110 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSaving}
            onClick={handleSaveProject}
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
                <span className="hidden sm:inline">Commit System</span>
                <span className="sm:hidden">Save</span>
                <Save size={14} className="group-hover:scale-110 transition-transform" />
              </>
            )}
          </motion.button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Block Types */}
          <div className="glass-dark p-6 rounded-2xl h-fit sticky top-24">
            <h3 className="text-lg font-bold mb-4">Add Blocks</h3>
            <div className="space-y-2">
              {blockTypes.map(({ type, label, icon }) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addBlock(type)}
                  className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-medium transition-colors text-left"
                >
                  <span className="text-lg">{icon}</span>
                  <span>{label}</span>
                  <Plus size={16} className="ml-auto" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
              <AnimatePresence>
                {blocks.map((block) => (
                  <motion.div
                    key={block.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`border-b border-white/10 cursor-pointer transition-colors ${
                      selectedBlockId === block.id ? 'bg-cyan-600/10 border-l-4 border-l-cyan-400' : 'hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedBlockId(block.id)}
                  >
                    {renderBlockPreview(block)}
                  </motion.div>
                ))}
              </AnimatePresence>
              {blocks.length === 0 && (
                <div className="py-12 text-center text-gray-400">Click "Add Blocks" to start building</div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Block Editor */}
          {selectedBlock && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-dark p-6 rounded-2xl h-fit sticky top-24"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold capitalize">{selectedBlock.type} Settings</h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => duplicateBlock(selectedBlock.id)}
                    className="p-2 hover:bg-white/10 rounded text-cyan-400"
                  >
                    <Copy size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => deleteBlock(selectedBlock.id)}
                    className="p-2 hover:bg-red-500/20 rounded text-red-400"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                {selectedBlock.type === 'hero' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Title</label>
                      <input
                        type="text"
                        value={selectedBlock.title}
                        onChange={(e) => updateBlock(selectedBlock.id, { title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={selectedBlock.subtitle}
                        onChange={(e) => updateBlock(selectedBlock.id, { subtitle: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Background Color</label>
                      <input
                        type="color"
                        value={selectedBlock.bgColor}
                        onChange={(e) => updateBlock(selectedBlock.id, { bgColor: e.target.value })}
                        className="w-full h-10 rounded cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {selectedBlock.type === 'cta' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Title</label>
                      <input
                        type="text"
                        value={selectedBlock.title}
                        onChange={(e) => updateBlock(selectedBlock.id, { title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={selectedBlock.buttonText || 'Click Here'}
                        onChange={(e) => updateBlock(selectedBlock.id, { buttonText: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Color</label>
                      <input
                        type="color"
                        value={selectedBlock.bgColor}
                        onChange={(e) => updateBlock(selectedBlock.id, { bgColor: e.target.value })}
                        className="w-full h-10 rounded cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {selectedBlock.type === 'features' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Features</label>
                    {selectedBlock.items?.map((item, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...selectedBlock.items]
                          newItems[idx] = e.target.value
                          updateBlock(selectedBlock.id, { items: newItems })
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white mb-2"
                      />
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => moveBlock(selectedBlock.id, 'up')}
                    className="flex-1 bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    ↑ Move Up
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => moveBlock(selectedBlock.id, 'down')}
                    className="flex-1 bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    ↓ Move Down
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WebBuilder
