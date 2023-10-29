import {
  IconDeviceMobile,
  IconDeviceLaptop,
  IconDeviceTablet,
  IconDeviceWatch,
  IconMicrophone,
} from '@tabler/icons';
import React from 'react';

export type ICategory = {
  nameCate: string;
  slug: string;
  icon: React.ReactNode;
  cateBanner: string;
  subCate: Array<ISubCategory>;
};

type ISubCategory = Omit<ICategory, 'cateBanner'>;

export const CATEGORIES: ICategory[] = [
  {
    nameCate: 'Điện thoại',
    slug: '/dien-thoai',
    subCate: [],
    icon: <IconDeviceMobile size={24} strokeWidth={2} color={'#000'} />,
    cateBanner:
      'https://i.pinimg.com/originals/f0/f5/a6/f0f5a6cc6bff547d2c7d5cbcb00bea85.png',
  },
  {
    nameCate: 'Laptop',
    slug: '/laptop',
    subCate: [],
    icon: <IconDeviceLaptop size={24} strokeWidth={2} color={'#000'} />,
    cateBanner:
      'https://photo-cms-sggp.zadn.vn/w580/Uploaded/2022/yfsgf/2021_10_30/57561df9-881d-43b1-8a50-50364d7fae56_tadn.jpeg',
  },
  {
    nameCate: 'Tablet',
    slug: '/tablet',
    subCate: [],
    icon: <IconDeviceTablet size={24} strokeWidth={2} color={'#000'} />,
    cateBanner:
      'https://cdn.dribbble.com/users/427857/screenshots/3798805/attachments/857095/banner-ipad-hands_by-tranmautritam.jpg?compress=1&resize=400x300&vertical=top',
  },
  {
    nameCate: 'Đồng hồ',
    slug: '/dong-ho',
    subCate: [
      {
        nameCate: 'Đồng hồ thông minh',
        slug: '/dong-ho-thong-minh',
        icon: '',
        subCate: [],
      },
      { nameCate: 'Đồng hồ cơ', slug: '/dong-ho-co', icon: '', subCate: [] },
    ],
    icon: <IconDeviceWatch size={24} strokeWidth={2} color={'#000'} />,
    cateBanner:
      'https://i.pinimg.com/736x/48/fd/96/48fd9683e124e0ac2fead6a20b581266.jpg',
  },
  {
    nameCate: 'Phụ kiện',
    slug: '/phu-kien',
    subCate: [
      {
        nameCate: 'Phụ kiện máy tính',
        slug: '/phu-kien-may-tinh',
        subCate: [
          { nameCate: 'Chuột', slug: '/chuot', icon: '', subCate: [] },
          { nameCate: 'Bàn phím', slug: '/ban-phim', icon: '', subCate: [] },
          { nameCate: 'Loa', slug: '/loa', icon: '', subCate: [] },
          {
            nameCate: 'Giá đỡ laptop',
            slug: '/gia-do-laptop',
            icon: '',
            subCate: [],
          },
          { nameCate: 'Tai nghe', slug: '/tai-nghe', icon: '', subCate: [] },
        ],
        icon: <IconMicrophone size={24} strokeWidth={2} color={'#000'} />,
      },
      {
        nameCate: 'Phụ kiện điện thoại',
        slug: '/phu-kien-dien-thoai',
        subCate: [
          {
            nameCate: 'Sạc dự phòng',
            slug: '/sac-du-phong',
            icon: '',
            subCate: [],
          },
          { nameCate: 'Ốp lưng', slug: '/ban-phim', icon: '', subCate: [] },
          {
            nameCate: 'Giá đỡ điện thoại',
            slug: '/gia-do-dien-thoai',
            icon: '',
            subCate: [],
          },
          { nameCate: 'Tai nghe', slug: '/tai-nghe', icon: '', subCate: [] },
        ],
        icon: '',
      },
    ],
    icon: <IconMicrophone size={24} strokeWidth={2} color={'#000'} />,
    cateBanner: '',
  },
];
