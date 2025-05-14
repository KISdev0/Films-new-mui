import styles from "./Pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <button disabled>&lt;</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>&gt;</button>
    </div>
  );
};

export default Pagination;
