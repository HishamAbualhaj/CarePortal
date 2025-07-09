import { ReactNode } from "react";
export interface Response {
  status: boolean;
  msg: string | Record<string, any>;
}

export type formDoctor = {
  image_url: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  specialization: string;
  yearsofexperience: string;
  gender: string;
  city: string;
  date: string;
  fileName: string | null;
  country_graduation: string;
  desc: string;
};
export type formUser = {
  image_url: string | null;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  gender: string;
  status: string;
  date: string;
  diseases: string;
  fileName: string | null;
};

export type FormItem<T, K extends keyof T> = {
  key: K;
  text: string;
  item: (
    itemValue: string,
    handleItemChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void
  ) => ReactNode;
};
