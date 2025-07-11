import { ReactNode } from "react";
export interface Response {
  status: boolean;
  msg: string | Record<string, any>;
}

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

export type formAppointment = {
  id: string;
  doctor_id: string;
  patient_id: string;
  doctor: string;
  date: string;
  time: string;
  status: string;
  message: string;
};

export type formMessage = {
  id: string;
  doctor_id: string;
  patient_id: string;
  doctor: string;
  patient: string;
  message: string;
  reply: string;
};

export type formContact = {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor: string;
  patient: string;
  subject: string;
  message: string;
  sent_at: string;
};

export type formNews = {
  id: string;
  doctor: string;
  image_url: string;
  fileName: string;
  title: string;
  description: string;
  date: string;
};
export type FormItem<T, K extends keyof T> = {
  key: K;
  text: string;
  item: (
    itemValue: string,
    handleItemChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => void
  ) => ReactNode;
};
