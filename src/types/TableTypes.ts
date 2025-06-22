import { ReactNode } from "react";

export type colType = { key: string; label: string; render?: () => void };

export interface tableProps {
  columns: colType[];
  customAction?: null | ((item: Object, actionFn: () => void) => ReactNode);
  data: any[];
}
