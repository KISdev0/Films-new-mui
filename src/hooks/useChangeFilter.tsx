import { useCallback, useState } from "react";
import { INITIAL_FILTERS_RANGE } from "../consts";
import { NewFilterProps } from "../types";

export const useChangeFilter = () => {
  const [filters, setFilters] = useState<NewFilterProps>({
    ...INITIAL_FILTERS_RANGE,
    search: "",
  });

  const handleChangeFilter = useCallback(
    (newFilters: NewFilterProps) => setFilters(newFilters),
    []
  );
  return { handleChangeFilter, filters };
};
