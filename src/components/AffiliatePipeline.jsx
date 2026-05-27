import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, MessageSquare, Globe, Users, 
  ChevronDown, ChevronUp, Save, Phone, Mail, Rocket,
  CheckCircle, Clock, XCircle, AlertCircle
} from 'lucide-react';

const AffiliatePipeline = ({ leads, onUpdate, onAddNote }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [newNote, setNewNote] = useState('');

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
    <div className="space-y-8">
      <div className="bg-blue-600 rounded-[3rem] p-10 text-white relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4 italic uppercase">Strategic Outreach</h2>
          <p className="text-blue-100 text-sm font-medium max-w-xl leading-relaxed">
            Track and engage with businesses in the pipeline. Your mission is to convert these prospects by offering our infrastructure solutions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-24 text-center">
            <Rocket className="w-16 h-16 text-neutral-100 mx-auto mb-6" />
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">No leads assigned to pipeline yet</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-50">
            {leads.map((lead) => (
              <div key={lead.id} className="p-6 lg:p-10 hover:bg-neutral-50/50 transition-colors group">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-center text-blue-600 font-black text-2xl uppercase shadow-sm">
                      {lead.business_name?.charAt(0) || 'B'}
                    </div>
                    <div>
                      <h3 className="font-black text-neutral-900 text-xl uppercase tracking-tight mb-2">
                        {lead.business_name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusColor(lead.status)}`}>
                          {lead.status?.replace('_', ' ')}
                        </span>
                        <span className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                          <Globe size={14} className="text-blue-500" /> {lead.business_type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-xl">
                      {[
                        { status: 'contacted', icon: Clock, label: 'Contacted', color: 'text-blue-600' },
                        { status: 'interested', icon: CheckCircle, label: 'Interested', color: 'text-emerald-600' },
                        { status: 'not_interested', icon: XCircle, label: 'Not Int.', color: 'text-rose-600' }
                      ].map((btn) => (
                        <button
                          key={btn.status}
                          onClick={() => onUpdate(lead.id, { status: btn.status })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                            lead.status === btn.status 
                            ? 'bg-white shadow-md ' + btn.color 
                            : 'text-neutral-400 hover:text-neutral-600'
                          }`}
                        >
                          <btn.icon size={14} />
                          <span className="hidden sm:inline">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className="p-4 bg-neutral-900 text-white rounded-xl shadow-lg shadow-neutral-900/20 active:scale-95 transition-all"
                    >
                      {expandedId === lead.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
                      <div className="mt-10 grid lg:grid-cols-2 gap-10 border-t border-neutral-100 pt-10">
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Contact Matrix</h4>
                            <div className="grid gap-4">
                              <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                    <Phone size={18} />
                                  </div>
                                  <span className="text-sm font-bold text-neutral-900">{lead.contact_info || 'No contact info'}</span>
                                </div>
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Copy</button>
                              </div>
                              <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                                    <MessageSquare size={18} />
                                  </div>
                                  <span className="text-sm font-bold text-neutral-900">{lead.social_media || 'No social link'}</span>
                                </div>
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Visit</button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 relative overflow-hidden">
                            <div className="relative z-10">
                              <h4 className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">
                                <AlertCircle size={14} /> Mission Tip
                              </h4>
                              <p className="text-xs font-bold text-amber-900 leading-relaxed">
                                Always reference their {lead.business_type} business and mention how a website could increase their visibility by 300%.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col h-full">
                          <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Follow-up Dossier</h4>
                          <div className="flex-1 space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                            {(!lead.notes || lead.notes.length === 0) ? (
                              <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-neutral-100 rounded-2xl text-neutral-300">
                                <MessageSquare size={24} className="mb-2" />
                                <p className="text-[10px] font-black uppercase">No entries yet</p>
                              </div>
                            ) : (
                              lead.notes.map((note, idx) => (
                                <div key={idx} className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                                  <p className="text-sm font-medium text-neutral-700 mb-3">{note.text}</p>
                                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-neutral-400">
                                    <span className="text-blue-600">{note.author}</span>
                                    <span>{new Date(note.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="Update dossier with new intel..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="flex-1 px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                            />
                            <button
                              onClick={() => {
                                if (newNote.trim()) {
                                  onAddNote(lead.id, newNote);
                                  setNewNote('');
                                }
                              }}
                              className="px-8 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
                            >
                              Log
                            </button>
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

export default AffiliatePipeline;
