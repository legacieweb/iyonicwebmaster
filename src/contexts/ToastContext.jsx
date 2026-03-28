import { createContext, useContext, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const ToastContext = createContext(null)

// Global toast dispatcher - will be set by ToastProvider
let toastDispatcher = null

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    warning: (message) => addToast(message, 'warning'),
    info: (message) => addToast(message, 'info'),
  }

  // Store dispatcher for global access
  toastDispatcher = toast

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Export a simple function to trigger toasts from anywhere
export const toast = {
  success: (message) => toastDispatcher?.success?.(message) || console.log('Toast not ready:', message),
  error: (message) => toastDispatcher?.error?.(message) || console.log('Toast not ready:', message),
  warning: (message) => toastDispatcher?.warning?.(message) || console.log('Toast not ready:', message),
  info: (message) => toastDispatcher?.info?.(message) || console.log('Toast not ready:', message),
}

function Toast({ toast, onClose }) {
  const icons = {
    success: <CheckCircle className="text-emerald-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  }

  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-right duration-300 ${colors[toast.type]}`}>
      {icons[toast.type]}
      <p className="text-sm font-medium">{toast.message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-60">
        <X size={16} />
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    return {
      success: (msg) => console.log('Toast not available:', msg),
      error: (msg) => console.log('Toast not available:', msg),
      warning: (msg) => console.log('Toast not available:', msg),
      info: (msg) => console.log('Toast not available:', msg),
    }
  }
  return context
}
