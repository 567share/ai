import React, { useState } from 'react';
import { X, Database, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { getSupabaseConfig, setSupabaseConfig, isSupabaseConfigured } from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onReload
}) => {
  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSupabaseConfig(url.trim(), anonKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onReload();
      onClose();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-600/20 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Supabase Backend Status</h2>
            <p className="text-xs text-zinc-400">Connected to table <code className="text-blue-400">tools</code></p>
          </div>
        </div>

        <div className="mb-6 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Status:</span>
            {isSupabaseConfigured() ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Configured
              </span>
            ) : (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Using Env / Placeholder
              </span>
            )}
          </div>
          <div className="text-[11px] text-zinc-500 leading-relaxed">
            Requests fetch directly from Supabase table <code className="text-zinc-300">tools</code>. Insertions push new entries into <code className="text-zinc-300">tools</code>.
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Supabase Project URL (<code className="text-blue-400">VITE_SUPABASE_URL</code>)
            </label>
            <input
              type="text"
              placeholder="https://your-project.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 outline-none transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Supabase Anon Key (<code className="text-blue-400">VITE_SUPABASE_ANON_KEY</code>)
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 outline-none transition-all font-mono"
            />
          </div>

          {saved && (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Credentials saved! Reloading live Supabase table...</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Save & Reload</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
