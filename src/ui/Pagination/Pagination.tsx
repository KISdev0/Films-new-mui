import { Button, Stack } from "@mui/material";
import { PaginationProps } from "../../types";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    if (startPage > 1) {
      pages.push(
        <Button key={1} onClick={() => onPageChange(1)} variant="contained">
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={i === currentPage ? "contained" : "outlined"}
          sx={{
            minWidth: "32px",
            padding: "6px 8px",
          }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };
  return (
    <Stack
      className={styles.pagination}
      direction="row"
      justifyContent="center"
    >
      {getPageNumbers()}
    </Stack>
  );
};

export default Pagination;
