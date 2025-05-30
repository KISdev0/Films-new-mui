import React, { useCallback } from "react";
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieCardProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../hooks/useFavorite";
import { useSnackbarError } from "../../hooks/useSnackbarError";

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { favoriteId, toggleFavorite } = useFavorite();
  const { snackbarMessage, handleCloseSnackbar, snackbarOpen } =
    useSnackbarError();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(`/movies/${movie.id}`);
  }, [movie.id, navigate]);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(movie.id);
    },
    [movie.id, toggleFavorite]
  );

  const isFavorite = favoriteId.includes(movie.id);

  return (
    <Card
      onClick={handleClick}
      sx={{
        ml: "20px",
        position: "relative",
        width: 200,
        height: 300,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <IconButton
        aria-label="toggle favorite"
        onClick={handleToggleFavorite}
        sx={{
          position: "absolute",
          top: 240,
          right: 8,
          zIndex: 1,
        }}
      >
        <FavoriteIcon
          sx={{
            color: isFavorite ? "rgb(219, 198, 6)" : "rgb(33, 139, 226)",
            "&:hover": { color: "rgb(219, 198, 6)" },
          }}
        />
      </IconButton>

      <CardMedia
        component="img"
        height="100%"
        image={movie.posterUrl}
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 50%, transparent 100%)",
          p: 2,
          color: "white",
        }}
      >
        <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Год: {movie.year}
        </Typography>
      </Box>
    </Card>
  );
};
