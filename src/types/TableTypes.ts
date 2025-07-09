import { Dispatch, ReactNode, SetStateAction } from "react";
import { PopupProps } from "./AdminPanelProps";
export type colType = { key: string; label: string; render?: () => void };

export interface tableProps {
  columns: colType[];
  customAction?:
    | null
    | ((
        item: Record<string, any>,
        actionFn: (() => void) | Dispatch<SetStateAction<PopupProps | null>>,
        tablePopup?: PopupProps[]
      ) => ReactNode);
  data: Record<string, any>;
  tablePopup?: (id?: Record<string, any>) => PopupProps[];
}
