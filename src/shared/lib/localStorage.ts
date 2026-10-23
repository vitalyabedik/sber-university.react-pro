interface SaveToLS {
  key: string;
  state: unknown;
  subTitle?: string;
}

interface LoadFromLS {
  key: string;
  subTitle?: string;
}

interface ClearLS {
  key: string;
  subTitle?: string;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === "[object Object]";

const hasOwnProperty = <X extends object, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> => Object.prototype.hasOwnProperty.call(obj, prop);

export const saveToLocalStorage = ({ state, key, subTitle }: SaveToLS): void => {
  try {
    if (subTitle) {
      const prevDataByKey = loadFromLS<Record<string, unknown>>({ key });
      localStorage.setItem(key, JSON.stringify({ ...prevDataByKey, [subTitle]: state }));
      return;
    }

    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
};

export const loadFromLS = <T>({ key, subTitle }: LoadFromLS): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;

    const parsedData: unknown = JSON.parse(serializedState);

    if (subTitle) {
      return isPlainObject(parsedData) && hasOwnProperty(parsedData, subTitle)
        ? (parsedData[subTitle] as T)
        : undefined;
    }

    return parsedData as T;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const clearLS = ({ key, subTitle }: ClearLS): void => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return;

    if (!subTitle) {
      localStorage.removeItem(key);
      return;
    }

    const parsedData: unknown = JSON.parse(serializedState);

    if (isPlainObject(parsedData) && hasOwnProperty(parsedData, subTitle)) {
      delete parsedData[subTitle];
      saveToLocalStorage({ key, state: parsedData });
    }
  } catch (error) {
    console.error(error);
  }
};
