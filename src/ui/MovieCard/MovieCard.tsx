import React from "react";
import { Card, CardMedia, IconButton, Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieCardProps } from "../../types";

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card
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
      <IconButton
        aria-label="toggle favorite"
        sx={{
          position: "absolute",
          top: 240,
          right: 8,
          zIndex: 1,
        }}
      >
        <FavoriteIcon
          sx={{
            color: "rgb(33, 139, 226)",
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
