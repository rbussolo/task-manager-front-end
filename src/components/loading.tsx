import { Box, CircularProgress, Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

interface LoadingProps {
  isLoading: boolean
}

export function Loading({ isLoading }: LoadingProps) {
  return (
    <Modal
      open={isLoading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CircularProgress />
      </Box>
    </Modal>
  )
}
