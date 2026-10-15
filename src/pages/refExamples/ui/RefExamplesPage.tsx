import {
  ClickTimer,
  DebouncedLogger,
  FocusTracker,
  PreviousInput,
  WebSocketLogger,
} from "features/refExamples";
import styles from "./RefExamplesPage.module.css";

export const RefExamplesPage = () => (
  <div className={styles.page}>
    <h1 className={styles.heading}>Примеры useRef</h1>
    <div className={styles.grid}>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
      <DebouncedLogger />
      <WebSocketLogger />
    </div>
  </div>
);
