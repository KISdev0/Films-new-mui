import { useEffect, useReducer } from "react";
import Select from "../Select/Select";
import styles from "./Filters.module.css";
import { FILTER_OPTIONS, INITIAL_FILTERS } from "../../consts";
import { Autocomplete, Box, Paper, Slider, TextField } from "@mui/material";
import { ActionType, FiltersProps, StateType } from "../../types";
import React from "react";

const initialState: StateType = {
  sortBy: "",
  yearRange: [1950, new Date().getFullYear()],
  selectedGenres: [],
  search: "",
};

const filterReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "SET_YEAR":
      return { ...state, yearRange: action.payload };
    case "SET_GENRE":
      return {
        ...state,
        selectedGenres: action.payload,
      };
    case "RESET-FILTERS":
      return INITIAL_FILTERS;
    default:
      return state;
  }
};

export const Filters = React.memo(
  ({ initialYearRange, onFilterChange }: FiltersProps) => {
    const [state, dispatch] = useReducer(filterReducer, {
      ...initialState,
      yearRange: initialYearRange,
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
      onFilterChange({ yearRange: state.yearRange as [number, number] });
    }, [state.yearRange, onFilterChange]);

    const handleYearChange = (e: Event, newValue: number[]) => {
      e.preventDefault();
      dispatch({ type: "SET_YEAR", payload: newValue });
      onFilterChange({
        yearRange: newValue as [number, number],
        search: state.search,
      });
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      dispatch({ type: "SET_SEARCH", payload: value });
      onFilterChange({
        yearRange: state.yearRange as [number, number],
        search: value,
      });
    };

    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
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

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Название фильма"
              variant="outlined"
              value={state.search}
              onChange={handleChangeSearch}
              placeholder="Введите название фильма"
            />
          </Box>

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
                value={state.yearRange}
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
  }
);
