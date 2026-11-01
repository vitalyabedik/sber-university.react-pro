import { useCallback, useState } from "react";
import type { ConfirmDialogOptions } from "./ConfirmDialog";
import { ConfirmDialog } from "./ConfirmDialog";

/**
 * Императивный вызов диалога: showConfirmDialog резолвит Promise в true/false —
 * по «Подтвердить», «Отмена», Escape или клику по подложке.
 */
export const useConfirmDialog = () => {
  const [options, setOptions] = useState<ConfirmDialogOptions>();
  const [resolveRef, setResolveRef] = useState<(confirmed: boolean) => void>();

  const showConfirmDialog = useCallback(
    (nextOptions: ConfirmDialogOptions) =>
      new Promise<boolean>((resolve) => {
        setOptions(nextOptions);
        setResolveRef(() => resolve);
      }),
    [],
  );

  const handleResolve = useCallback(
    (confirmed: boolean) => {
      if (!resolveRef) return;

      resolveRef(confirmed);
      setOptions(undefined);
      setResolveRef(undefined);
    },
    [resolveRef],
  );

  const confirmDialog = options ? <ConfirmDialog {...options} onResolve={handleResolve} /> : null;

  return { showConfirmDialog, confirmDialog };
};
