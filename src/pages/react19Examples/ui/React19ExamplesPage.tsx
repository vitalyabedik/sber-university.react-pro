import {
  ActionStateWithReducer,
  FormWithAsyncSave,
  TodoListOptimistic,
} from "features/react19Examples";
import styles from "./React19ExamplesPage.module.css";

export const React19ExamplesPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>Примеры React 19</h1>

    <div className={styles.grid}>
      <FormWithAsyncSave />
      <TodoListOptimistic />
      <ActionStateWithReducer />
    </div>
  </div>
);
