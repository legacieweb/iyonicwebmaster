import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, Edit2, AlertCircle, Code2, Zap, ChevronDown, 
  ChevronUp, X, Save, Loader, ArrowRight, Layout, Globe, Settings
} from 'lucide-react'
import { saveTemplate, updateTemplate, deleteTemplate as deleteTemplateApi, fetchTemplates, deployTemplate } from '../utils/api'

const TemplateBuilder = () => {
  const [templates, setTemplates] = useState([])
  const [view, setView] = useState('list')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedPage, setSelectedPage] = useState(null)
  const [templateName, setTemplateName] = useState('')
  const [pageName, setPageName] = useState('')
  const [pageCode, setPageCode] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates()
        setTemplates(data)
      } catch (err) {
        console.error('Failed to load templates:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [])

  const createTemplate = async () => {
    if (!templateName.trim()) {
      setError('Template name is required')
      return
    }

    try {
      setSaving(true)
      const newTemplate = {
        name: templateName,
        pages: [],
        status: 'draft',
        deployed: false,
      }

      const savedTemplate = await saveTemplate(newTemplate)
      setTemplates([...templates, savedTemplate])
      setSelectedTemplate(savedTemplate)
      setTemplateName('')
      setView('editor')
      setError(null)
    } catch (err) {
      setError('Failed to create template: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const addPageToTemplate = async () => {
    if (!selectedTemplate) return
    if (!pageName.trim()) {
      setError('Page name is required')
      return
    }

    try {
      setSaving(true)
      const newPage = {
        id: Date.now().toString(),
        name: pageName,
        code: pageCode,
        linkedPages: [],
      }

      const updatedTemplate = {
        ...selectedTemplate,
        pages: [...(selectedTemplate.pages || []), newPage],
      }

      const savedTemplate = await updateTemplate(selectedTemplate.id, { pages: updatedTemplate.pages })
      const updatedWithNewPages = { ...selectedTemplate, pages: updatedTemplate.pages }
      setSelectedTemplate(updatedWithNewPages)
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? updatedWithNewPages : t))
      setPageName('')
      setPageCode('')
      setError(null)
    } catch (err) {
      setError('Failed to add page: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const updatePageCode = async (pageId, newCode) => {
    if (!selectedTemplate) return

    try {
      setSaving(true)
      const updatedTemplate = {
        ...selectedTemplate,
        pages: (selectedTemplate.pages || []).map(p =>
          p.id === pageId ? { ...p, code: newCode } : p
        ),
      }

      await updateTemplate(selectedTemplate.id, { pages: updatedTemplate.pages })
      setSelectedTemplate(updatedTemplate)
      setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t))
    } catch (err) {
      setError('Failed to update page: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const deletePage = async (pageId) => {
    if (!selectedTemplate) return

    try {
      setSaving(true)
      const updatedTemplate = {
        ...selectedTemplate,
        pages: (selectedTemplate.pages || []).filter(p => p.id !== pageId),
      }

      await updateTemplate(selectedTemplate.id, { pages: updatedTemplate.pages })
      setSelectedTemplate(updatedTemplate)
      setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t))
    } catch (err) {
      setError('Failed to delete page: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const linkPagesToPage = async (pageId, targetPageId) => {
    if (!selectedTemplate) return

    try {
      setSaving(true)
      const updatedTemplate = {
        ...selectedTemplate,
        pages: (selectedTemplate.pages || []).map(p => {
          if (p.id === pageId) {
            return {
              ...p,
              linkedPages: (p.linkedPages || []).includes(targetPageId)
                ? (p.linkedPages || []).filter(id => id !== targetPageId)
                : [...(p.linkedPages || []), targetPageId],
            }
          }
          return p
        }),
      }

      await updateTemplate(selectedTemplate.id, { pages: updatedTemplate.pages })
      setSelectedTemplate(updatedTemplate)
      setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t))
    } catch (err) {
      setError('Failed to link pages: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const deployTemplateFunc = async () => {
    if (!selectedTemplate) return
    if ((selectedTemplate.pages || []).length === 0) {
      setError('Add at least one page before deploying')
      return
    }

    try {
      setSaving(true)
      await deployTemplate(selectedTemplate.id)
      setSelectedTemplate({ ...selectedTemplate, status: 'published', deployed: true })
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? { ...selectedTemplate, status: 'published', deployed: true } : t))
      setError(null)
    } catch (err) {
      setError('Failed to deploy template: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteTemplateFunc = async (templateId) => {
    try {
      setSaving(true)
      await deleteTemplateApi(templateId)
      setTemplates(templates.filter(t => t.id !== templateId))
      if (selectedTemplate?.id === templateId) {
        setSelectedTemplate(null)
        setView('list')
      }
    } catch (err) {
      setError('Failed to delete template: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full"
        />
        <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Forging Assets...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* View: Template List */}
      {view === 'list' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Design Infrastructure</p>
              <h2 className="text-3xl font-black text-neutral-950 uppercase italic tracking-tight">Active Templates</h2>
            </div>
            <motion.button
              onClick={() => setView('create')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-neutral-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-neutral-200 transition-all"
            >
              <Plus size={18} />
              New Blueprint
            </motion.button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-rose-900 font-bold uppercase text-[10px] tracking-widest mb-1">Error Detected</p>
                <p className="text-rose-600 text-sm font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {templates.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 p-20 rounded-[3rem] text-center">
              <Code2 className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Repository Empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50 group transition-all cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    setSelectedTemplate(template)
                    setView('editor')
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                        <Layout size={24} />
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                        template.deployed
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {template.deployed ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <h3 className="font-black text-neutral-950 text-xl uppercase italic tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{template.name}</h3>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{(template.pages || []).length} Enterprise Nodes</p>

                    <div className="flex gap-4 mt-8 pt-6 border-t border-slate-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (window.confirm('Erase this design blueprint?')) {
                            deleteTemplateFunc(template.id)
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-rose-400 hover:text-rose-600 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        <Trash2 size={14} />
                        Erase
                      </button>
                      <div className="w-px h-10 bg-slate-50" />
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 text-blue-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
                        Edit <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* View: Create Template */}
      {view === 'create' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <h2 className="text-3xl font-black text-neutral-950 uppercase italic tracking-tight mb-8">New Design Blueprint</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 border border-rose-100 p-6 rounded-3xl mb-8 flex items-start gap-4"
              >
                <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-rose-900 font-bold uppercase text-[10px] tracking-widest mb-1">Error Detected</p>
                  <p className="text-rose-600 text-sm font-medium">{error}</p>
                </div>
              </motion.div>
            )}

            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Blueprint Identity</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., QUANTUM ENTERPRISE"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-neutral-950 font-bold placeholder-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={createTemplate}
                  whileHover={!saving ? { scale: 1.02 } : {}}
                  whileTap={!saving ? { scale: 0.98 } : {}}
                  disabled={saving}
                  className="flex-1 px-8 py-5 bg-neutral-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] disabled:opacity-50 shadow-xl hover:shadow-neutral-200 transition-all"
                >
                  {saving ? 'Initializing...' : 'Initialize Blueprint'}
                </motion.button>
                <motion.button
                  onClick={() => {
                    setView('list')
                    setTemplateName('')
                    setError(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                >
                  Abort
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* View: Template Editor */}
      {view === 'editor' && selectedTemplate && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Layout size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-neutral-950 uppercase italic tracking-tight mb-1">{selectedTemplate.name}</h2>
                <div className="flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Code2 size={12} /> {(selectedTemplate.pages || []).length} Active Nodes</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5"><Settings size={12} /> {selectedTemplate.status}</span>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => setView('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
            >
              Abort Mission
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {!selectedPage ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-12 gap-10"
              >
                {/* Add New Page */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-neutral-950 p-8 rounded-[2.5rem] border border-neutral-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-8">Node Injection</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">Node Identity</label>
                          <input
                            type="text"
                            value={pageName}
                            onChange={(e) => setPageName(e.target.value)}
                            placeholder="e.g., Homepage"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold placeholder-neutral-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">Core Payload (HTML)</label>
                          <textarea
                            value={pageCode}
                            onChange={(e) => setPageCode(e.target.value)}
                            placeholder="<div>Inject Content...</div>"
                            rows={6}
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-xs placeholder-neutral-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                          />
                        </div>

                        <motion.button
                          onClick={addPageToTemplate}
                          whileHover={!saving ? { scale: 1.02, backgroundColor: '#ffffff', color: '#000000' } : {}}
                          whileTap={!saving ? { scale: 0.98 } : {}}
                          disabled={saving}
                          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                        >
                          <Plus size={16} />
                          {saving ? 'Injecting...' : 'Inject Node'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pages List */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-black text-neutral-950 uppercase italic tracking-tight">System Nodes</h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{(selectedTemplate.pages || []).length} Total</span>
                    </div>

                    {(selectedTemplate.pages || []).length === 0 ? (
                      <div className="py-20 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem]">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Nodes Detected In Flux</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {(selectedTemplate.pages || []).map((page) => (
                          <div
                            key={page.id}
                            className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                              <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                  <Code2 size={20} />
                                </div>
                                <div>
                                  <h4 className="font-black text-neutral-950 uppercase tracking-tight">{page.name}</h4>
                                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{page.code.length} bytes · {page.linkedPages?.length || 0} links</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setSelectedPage(page)}
                                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Delete this system node?')) {
                                      deletePage(page.id)
                                    }
                                  }}
                                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Deploy Button */}
                    {(selectedTemplate.pages || []).length > 0 && (
                      <div className="mt-12 pt-10 border-t border-slate-100">
                        <motion.button
                          onClick={deployTemplateFunc}
                          whileHover={{ scale: 1.02, backgroundColor: '#10b981' }}
                          whileTap={{ scale: 0.98 }}
                          disabled={selectedTemplate.deployed || saving}
                          className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] disabled:opacity-50 shadow-xl shadow-emerald-100 flex items-center justify-center gap-4 transition-all"
                        >
                          <Zap size={20} />
                          {selectedTemplate.deployed ? 'Assets Synchronized' : 'Execute Deployment'}
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="editor"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-8 bg-neutral-950 border-b border-neutral-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                      <Code2 size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Refining Node: {selectedPage.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="p-3 bg-white/10 text-white hover:bg-white hover:text-neutral-950 rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 sm:p-12 space-y-10">
                  <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-4">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">System Payload (HTML/CSS/JS)</label>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition-all" />
                        <textarea
                          value={selectedPage.code}
                          onChange={(e) => updatePageCode(selectedPage.id, e.target.value)}
                          rows={20}
                          className="relative w-full px-8 py-8 bg-slate-900 border border-slate-800 rounded-2xl text-indigo-100 font-mono text-sm focus:ring-0 outline-none resize-none custom-scrollbar"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Neural Linkage (Page Connections)</label>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                          {(selectedTemplate.pages || []).map((page) => {
                            if (page.id === selectedPage.id) return null
                            const isLinked = (selectedPage.linkedPages || []).includes(page.id)
                            return (
                              <button 
                                key={page.id} 
                                onClick={() => linkPagesToPage(selectedPage.id, page.id)}
                                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                                  isLinked 
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <Globe size={16} />
                                  <span className="font-bold text-xs uppercase tracking-widest">{page.name}</span>
                                </div>
                                {isLinked && <Zap size={14} className="animate-pulse" />}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="text-indigo-600" size={20} />
                          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Deployment Guide</span>
                        </div>
                        <p className="text-[10px] text-indigo-900/60 leading-relaxed font-bold">Neural links allow seamless navigation between system nodes. Ensure all primary nodes are interlinked for optimal user traversal.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-100">
                    <motion.button
                      onClick={() => setSelectedPage(null)}
                      whileHover={!saving ? { scale: 1.02 } : {}}
                      whileTap={!saving ? { scale: 0.98 } : {}}
                      disabled={saving}
                      className="w-full py-6 bg-neutral-950 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:shadow-neutral-300 transition-all flex items-center justify-center gap-4"
                    >
                      <Save size={20} />
                      {saving ? 'Synchronizing Node...' : 'Commit Node & Close'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default TemplateBuilder
