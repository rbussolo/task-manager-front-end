import { Alert, AlertTitle, Box, Button, Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 12,
};

export type PopupAlertType = "success" | "info" | "warning" | "error";

interface PopupAlertProps {
  type: PopupAlertType;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupAlert({ type, message, isOpen, onClose }: PopupAlertProps) {
  const title = type === "success" ? "SUCESSO"
                  : type === "info" ? "INFORMAÇÃO"
                  : type === "warning" ? "AVISO"
                  : type === "error" ? "ERRO"
                  : "";

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Alert severity={type}>
          <AlertTitle>{title}</AlertTitle>
          <span>{message}</span>

          <Box sx={{marginTop: '10px'}}>
            <Button
              variant="contained"
              color={type}
              onClick={onClose}
              size="large">
              Fechar
            </Button>
          </Box>
        </Alert>
      </Box>
    </Modal>
  )
}