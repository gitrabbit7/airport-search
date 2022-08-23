import { SnackbarProps } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { FC, memo } from 'react'

import { Alert } from '@/components'
import { useToast } from '@/hooks'

export interface IToastProps extends SnackbarProps {}

export const Toast: FC<IToastProps> = memo(
  ({ open, message, ...props }: IToastProps) => {
    const { hideToast } = useToast()

    return (
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => hideToast()}
        {...props}
      >
        <Alert severity='warning'>{message}</Alert>
      </Snackbar>
    )
  }
)

Toast.displayName = 'Toast'

export default Toast
