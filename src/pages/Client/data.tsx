// src/components/client-data.tsx

import { IClientItems, ITbody, IThead } from "../../types/client.ts";
import ClientTables from "./client-tables.tsx";
import img from "../../images/product/product-01.png";

export const thead: IThead[] = [
  {
    id: 1,
    name: "Фото",
  },
  {
    id: 2,
    name: "Клиент",
  },
  {
    id: 3,
    name: "Дата регистрации",
  },
  {
    id: 4,
    name: "Телефон",
  },
  {
    id: 5,
    name: "Сеансов всего",
  },
  {
    id: 6,
    name: "Оборот",
  },
  {
    id: 7,
    name: "Возраст",
  },
  {
    id: 8,
    name: "Мастера",
  },
  {
    id: 9,
    name: "Отмененых",
  },
  {
    id: 10,
    name: "Статус",
  },
];

export const tbody: ITbody[] = [
  {
    id: 1,
    img: img,
    name: "Имя, Фамилия",
    category: "Красота и здоровье волос",
    invoiceDate: `10 апреля 2024`,
    totalSessions: 104,
    rating: 5,
    status: "Активный",
    scheduleType: "По графику",
    canceled: 104,
    preferences: "Регулярное посещение",
    contacts: "99899 205 05 05",
    phoneNumber: "99899 205 05 05",
    placeOfWork: "Beauty Lab",
    selfEmployed: "Да",
  },
  {
    id: 2,
    img: img,
    name: "Имя, Фамилия",
    category: "Красота и здоровье волос",
    invoiceDate: `10 апреля 2024`,
    totalSessions: 104,
    rating: 5,
    status: "Заблокированный",
    scheduleType: "По графику",
    canceled: 104,
    preferences: "Регулярное посещение",
    contacts: "99899 205 05 05",
    phoneNumber: "99899 205 05 05",
    placeOfWork: "Beauty Lab",
    selfEmployed: "Да",
  },
  {
    id: 3,
    img: img,
    name: "Имя, Фамилия",
    category: "Ногтевой сервис",
    invoiceDate: `09 апреля 2024`,
    totalSessions: 104,
    rating: 5,
    status: "Активный",
    scheduleType: "По графику",
    canceled: 104,
    preferences: "Регулярное посещение",
    contacts: "99899 205 05 05",
    phoneNumber: "99899 205 05 05",
    placeOfWork: "Beauty Lab",
    selfEmployed: "Да",
  },
];

export const items: IClientItems[] = [
  {
    key: "1",
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl"></span>
    ),
    children: <ClientTables />,
  },
];
