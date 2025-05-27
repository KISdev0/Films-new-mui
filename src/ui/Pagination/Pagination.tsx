import { Button, Stack } from "@mui/material";
import { PaginationProps } from "../../types";
import styles from "./Pagination.module.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { MAX_VISIBLE_PAGES } from "../../consts";

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  const goBackPage = () => onPageChange(Math.max(1, currentPage - 1));
  const goNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
    );
    let endPage = startPage + MAX_VISIBLE_PAGES - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }
    if (startPage > 1) {
      pages.push(
        <Button key={1} onClick={() => onPageChange(1)} variant="contained">
          1
        </Button>
      );

      if (startPage > 2) {
        pages.push(
          <span
            key="start-ellipsis"
            style={{ display: "flex", alignItems: "center" }}
          >
            ...
          </span>
        );
        startPage++;
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
      marginLeft={"40px"}
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
    >
      <Button
        onClick={goBackPage}
        disabled={currentPage === 1}
        variant="outlined"
        sx={{ minWidth: "32px", padding: "6px 8px" }}
        aria-label="Previous page"
      >
        <ChevronLeft fontSize="small" />
      </Button>

      {getPageNumbers()}

      <Button
        onClick={goNextPage}
        disabled={currentPage === totalPages || totalPages === 0}
        variant="outlined"
        sx={{ minWidth: "32px", padding: "6px 8px" }}
        aria-label="Next page"
      >
        <ChevronRight fontSize="small" />
      </Button>
    </Stack>
  );
};

export default Pagination;
