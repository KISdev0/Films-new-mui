import { LoginFormTokenProps } from "../../types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLoginFormToken } from "../../hooks/useLoginFormToken";

export const LoginFormToken = ({ onClose, onLogin }: LoginFormTokenProps) => {
  const {
    email,
    setEmail,
    token,
    setToken,
    errors,
    step,
    loading,
    reset,
    handleRequestToken,
    handleVerifyToken,
  } = useLoginFormToken({ onClose, onLogin });

  return (
    <Dialog
      open={true}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            onClick={() => {
              onClose();
              reset();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {step === "request" ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Запросить токен</Typography>
            <Typography>почта</Typography>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваша почта"
              fullWidth
              error={!!errors}
              helperText={errors}
            />
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Button
                onClick={onClose}
                variant="contained"
                disabled={loading}
                fullWidth
              >
                Отмена
              </Button>
              <Button
                onClick={handleRequestToken}
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? "Отправка" : "Запросить"}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Введите токен</Typography>
            <Typography>Токен</Typography>
            <TextField
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Токен"
              fullWidth
              error={!!errors}
              helperText={errors}
            />
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Button
                onClick={onClose}
                variant="contained"
                disabled={loading}
                fullWidth
              >
                Отмена
              </Button>
              <Button onClick={handleVerifyToken} variant="contained" fullWidth>
                Подтвердить
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
