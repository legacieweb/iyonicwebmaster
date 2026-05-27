import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Edit2, MessageSquare, Globe, Users, 
  ChevronDown, ChevronUp, Save, X, Phone, Mail, Rocket
} from 'lucide-react';

const PipelineSection = ({ leads, onAdd, onUpdate, onDelete, onAddNote, processing }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    social_media: '',
    contact_info: '',
    business_type: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [newNote, setNewNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(formData);
      setFormData({ business_name: '', social_media: '', contact_info: '', business_type: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'interested': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'contacted': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'not_contacted': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'not_interested': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'converted': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3">Prospecting Engine</p>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 uppercase italic tracking-tighter leading-none">
            Lead <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pipeline</span>
          </h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          {showAddForm ? <X size={16} /> : <Plus size={16} />}
          {showAddForm ? 'Cancel Operation' : 'Add New Prospect'}
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Business Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Blue Horizon Bakery"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Business Type / Offerings</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Artisan Bread, Pastries"
                  value={formData.business_type}
                  onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Social Media Pages</label>
                <input
                  type="text"
                  placeholder="Instagram, Facebook links"
                  value={formData.social_media}
                  onChange={(e) => setFormData({ ...formData, social_media: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Contact Information</label>
                <input
                  type="text"
                  placeholder="Phone or Email"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-900/10"
                >
                  Deploy Prospect to Pipeline
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-24 text-center">
            <Rocket className="w-16 h-16 text-slate-100 mx-auto mb-6" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Pipeline Empty</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {leads.map((lead) => (
              <div key={lead.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors group">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-center text-blue-600 font-black text-xl uppercase">
                      {lead.business_name?.charAt(0) || 'B'}
                    </div>
                    <div>
                      <h3 className="font-black text-neutral-950 text-lg uppercase tracking-tight mb-1">
                        {lead.business_name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border font-black ${getStatusColor(lead.status)}`}>
                          {lead.status?.replace('_', ' ')}
                        </span>
                        <span className="flex items-center gap-1.5"><Globe size={12} /> {lead.business_type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className="flex-1 sm:flex-none p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">Follow Up / Details</span>
                      {expandedId === lead.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === lead.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Intelligence Brief</h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Social Matrix</span>
                                <span className="text-xs font-bold text-slate-900">{lead.social_media || 'Not logged'}</span>
                              </div>
                              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Comms Channel</span>
                                <span className="text-xs font-bold text-slate-900">{lead.contact_info || 'Not logged'}</span>
                              </div>
                              <div className="flex justify-between items-center py-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prospect Status</span>
                                <select
                                  value={lead.status}
                                  onChange={(e) => onUpdate(lead.id, { status: e.target.value })}
                                  className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="not_contacted">Not Contacted</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="interested">Interested</option>
                                  <option value="not_interested">Not Interested</option>
                                  <option value="converted">Converted</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Mission Log (Notes)</h4>
                            <div className="space-y-4 max-h-48 overflow-y-auto mb-6 pr-2 no-scrollbar">
                              {(!lead.notes || lead.notes.length === 0) ? (
                                <p className="text-[10px] font-bold text-slate-400 uppercase italic">No logs recorded...</p>
                              ) : (
                                lead.notes.map((note, idx) => (
                                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs font-medium text-slate-700 mb-2">{note.text}</p>
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                                      <span>By: {note.author}</span>
                                      <span>{new Date(note.date).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Add entry to mission log..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                              />
                              <button
                                onClick={() => {
                                  if (newNote.trim()) {
                                    onAddNote(lead.id, newNote);
                                    setNewNote('');
                                  }
                                }}
                                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:scale-95"
                              >
                                <Save size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineSection;
