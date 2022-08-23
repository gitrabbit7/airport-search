import { useContext } from 'react'

import { ToastContext } from '@/contexts'

export const useToast = () => {
  const {
    actions: { showToast, hideToast }
  } = useContext(ToastContext)

  return {
    showToast,
    hideToast
  }
}
