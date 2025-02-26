import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div id={styles["wifi-loader"]}>
        <svg className={styles["circle-outer"]} viewBox="0 0 86 86">
          <circle className={styles["back"]} cx="43" cy="43" r="40"></circle>
          <circle className={styles["front"]} cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className={styles["circle-middle"]} viewBox="0 0 60 60">
          <circle className={styles["back"]} cx="30" cy="30" r="27"></circle>
          <circle className={styles["front"]} cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className={styles["circle-inner"]} viewBox="0 0 34 34">
          <circle className={styles["back"]} cx="17" cy="17" r="14"></circle>
          <circle className={styles["front"]} cx="17" cy="17" r="14"></circle>
        </svg>
        {/* <div className={styles["text"]} data-text="">
          Searching
        </div> */}
      </div>
    </div>
  );
};

export default Loading;
