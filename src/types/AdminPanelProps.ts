import { Dispatch, JSX, ReactNode, SetStateAction } from "react";
import { tableProps } from "./TableTypes";

export interface adminPanelProps extends tableProps {
  panelTitle: string;
  btnText?: string;
  filterContent?: (
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
  ) => ReactNode;
  filterAction?: () => void;
  mainPopup?: PopupProps;
  setFilterData?: Dispatch<SetStateAction<Record<string, any>>>;
}

export interface PopupProps {
  popupTitle?: string;
  PopupContent: React.ReactNode | (() => JSX.Element);
  popupActionText?: string;
  popupAction?: () => void;
  isPending?: boolean;
}
