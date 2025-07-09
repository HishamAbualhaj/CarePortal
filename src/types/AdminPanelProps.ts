import { Dispatch, JSX, ReactNode, SetStateAction } from "react";
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
  PopupContent: React.ReactNode | (() => JSX.Element);
  popupActionText?: string;
  popupAction?: () => void;
}
