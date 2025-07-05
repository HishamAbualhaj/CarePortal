import { Dispatch, ReactNode, SetStateAction } from "react";
import { tableProps } from "./TableTypes";

export interface adminPanelProps extends tableProps {
  panelTitle: string;
  btnText?: string;
  filterContent?: (
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void,
    isChange: boolean
  ) => ReactNode;
  filterAction?: () => void;
  mainPopup?: PopupProps;
}

export interface PopupProps {
  popupTitle?: string;
  popupContent?: { text: string; item: ReactNode; data?: string }[] | string;
  popupActionText?: string;
  popupAction?: () => void;
}
