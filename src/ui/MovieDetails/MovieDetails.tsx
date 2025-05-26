import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRequetsMovieDetails } from "../../hooks/useRequetsMovieDetails";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading } = useRequetsMovieDetails(id);

  if (loading) return <div>Загрузка...</div>;
  if (!movie) return <div>Упс, фильма нет</div>;

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, display: "flex", gap: 3, height: "100vh" }}
    >
      <Avatar
        src={movie.posterUrl}
        alt={movie.title}
        variant="rounded"
        sx={{ width: 200, height: 300 }}
      />

      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {movie.title} ({movie.year})
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="text.secondary"
        >
          {movie.country}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Назад
        </Button>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 3 }}>
          Описание
        </Typography>

        <Typography variant="body1" component="h3">
          Продолжительность фильма: {movie.duration} минут
        </Typography>

        <Typography variant="body1" component="h3">
          {movie.description}
        </Typography>
      </Box>
    </Paper>
  );
};
