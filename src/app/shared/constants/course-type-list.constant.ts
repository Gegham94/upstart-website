import { CourseType } from '../enums/course-type.enum';

export const courseTypeList = [
  {
    id: CourseType.ONLINE,
    name: 'dashboard.courses.online',
    imageName: 'online',
    disabled: false,
  },
  {
    id: CourseType.OFFLINE,
    name: 'dashboard.courses.offline',
    imageName: 'offline',
    disabled: false,
  },
  {
    id: CourseType.ONLINE_WEBINAR,
    name: 'dashboard.courses.online-webinar',
    imageName: 'webinar',
    disabled: false,
  },
  {
    id: CourseType.CONSULTATION,
    name: 'dashboard.courses.consultation',
    imageName: 'consultation',
    disabled: true,
  },
];
