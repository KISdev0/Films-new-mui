import { useEffect, useReducer } from "react";
import Select from "../Select/Select";
import styles from "./Filters.module.css";
import { FILTER_OPTIONS } from "../../consts";
import { Autocomplete, Box, Paper, Slider, TextField } from "@mui/material";
import { ActionType, FiltersProps, StateType } from "../../types";

const initialState: StateType = {
  sortBy: "",
  year: [1950, new Date().getFullYear()],
  selectedGenres: [],
};

const filterReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_GENRE":
      return {
        ...state,
        selectedGenres: action.payload,
      };
    case "RESET-FILTERS":
      return initialState;
    default:
      return state;
  }
};

export const Filters = ({ initialYearRange, onFilterChange }: FiltersProps) => {
  const [state, dispatch] = useReducer(filterReducer, {
    ...initialState,
    year: initialYearRange,
  });

  const handleChangeGenre = (
    event: React.SyntheticEvent,
    value: Array<{ title: string }>
  ) => {
    event.preventDefault();
    dispatch({ type: "SET_GENRE", payload: value });
  };

  const handleResetFilters = () => {
    dispatch({ type: "RESET-FILTERS" });
  };

  useEffect(() => {
    onFilterChange({ yearRange: state.year as [number, number] });
  }, [state.year, onFilterChange]);

  const handleYearChange = (e: Event, newValue: number[]) => {
    e.preventDefault();
    dispatch({ type: "SET_YEAR", payload: newValue as number[] });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        width: "100%",
        maxWidth: 350,
        bgcolor: "background.paper",
      }}
    >
      <div className={styles.filters}>
        <h3 className={styles.header}>
          Фильтры
          <button onClick={handleResetFilters} className={styles.buttonClose}>
            X
          </button>
        </h3>

        <Select
          value={state.sortBy}
          onChange={(e) =>
            dispatch({ type: "SET_SORT_BY", payload: e.target.value })
          }
          label="Сортировать по:"
          options={FILTER_OPTIONS.sortOptions}
          placeholder="Выбрать"
        />

        <Box sx={{ mt: "40px" }}>
          <div className={styles.sliderContainer}>
            <label>Год реллиза</label>
            <Slider
              getAriaLabel={() => "Год релиза-диапазон"}
              value={state.year}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={1950}
              max={new Date().getFullYear()}
            />
          </div>
        </Box>

        <div>
          <Box sx={{ mt: "40px" }}>
            <Autocomplete
              multiple
              limitTags={3}
              id="multiple-limit-tags"
              options={FILTER_OPTIONS.genres}
              getOptionLabel={(option) => option.title}
              value={state.selectedGenres}
              onChange={handleChangeGenre}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Жанры"
                  placeholder="Выберите жанры"
                />
              )}
              sx={{ width: "100%" }}
            />
          </Box>
        </div>
      </div>
    </Paper>
  );
};
