import { useCallback, useState } from "react";
import { INITIAL_FILTERS_RANGE } from "../consts";
import { NewFilterProps } from "../types";

export const useChangeFilter = () => {
  const [filters, setFilters] = useState<NewFilterProps>(INITIAL_FILTERS_RANGE);

  const handleChangeFilter = useCallback(
    (newFilters: NewFilterProps) =>
      setFilters((prev) =>
        prev.yearRange[0] === newFilters.yearRange[0] &&
        prev.yearRange[1] === newFilters.yearRange[1]
          ? prev
          : newFilters
      ),
    []
  );
  return { handleChangeFilter, filters };
};
