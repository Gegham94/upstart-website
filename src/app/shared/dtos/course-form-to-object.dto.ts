import { CourseForm } from '../interfaces/courses/course-form.interface';
import { Course } from '../interfaces/courses/course.interface';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export class CourseFormToObjectDto {
  public static serialize(formData: Partial<CourseForm>, id: number): Partial<Course> {
    const trainerImage =
      !!formData.trainer?.image && typeof formData.trainer.image === 'string'
        ? formData.trainer.image
        : undefined;

    const coverImage =
      formData.landingPage?.coverImage && typeof formData.landingPage.coverImage === 'string'
        ? formData.landingPage.coverImage
        : undefined;

    const requirements = formData.landingPage?.requirements?.filter((req) => req).length
      ? formData.landingPage?.requirements?.filter((req) => !!req)
      : undefined;

    const whatWillLearn = formData.courseInformation?.whatWillLearn?.filter(
      (willLearn: string) => willLearn,
    ).length
      ? formData.courseInformation?.whatWillLearn?.filter((willLearn: string) => !!willLearn)
      : undefined;

    const lessons = formData.courseInformation?.lessons?.map((lesson) => {
      let date: Dayjs | string | undefined = lesson.enterDate
        ? typeof lesson.enterDate === 'string'
          ? dayjs(lesson.enterDate, 'DD-MM-YYYY')
          : dayjs(lesson.enterDate)
        : undefined;

      if (date) {
        if (lesson.enterTime && lesson.enterTime instanceof Date) {
          date = date
            .set('hour', dayjs(lesson.enterTime).hour())
            .set('minute', dayjs(lesson.enterTime).minute())
            .format('YYYY-MM-DD HH:mm:ss');
        } else {
          date = date
            .set('hour', dayjs(lesson.enterTime, 'HH:mm:ss').hour())
            .set('minute', dayjs(lesson.enterTime, 'HH:mm:ss').minute())
            .format('YYYY-MM-DD HH:mm:ss');
        }
      }

      return {
        course_id: id,
        duration: lesson.duration * 60,
        start_time: date ?? undefined,
        title: lesson.title,
      };
    });

    return {
      id,
      status: formData.status,
      type: formData.type,
      category_id: formData.category || undefined,
      title: formData.landingPage?.title || undefined,
      sub_title: formData.landingPage?.subtitle || undefined,
      description: formData.landingPage?.description || undefined,
      promo_video: formData.landingPage?.promotionalVideo || undefined,
      cover_image:
        coverImage
          ?.replace(/https:\/\/upstart.brainfors.am\//gm, '')
          .replace(/https:\/\/api.upstart.am\//gm, '') || undefined,
      price: formData.courseInformation?.price?.amount ?? undefined,
      currency: formData.courseInformation?.price?.currency || undefined,
      certificate: formData.courseInformation?.certificate ? 1 : 0,
      language: formData.courseInformation?.language || undefined,
      max_participants: formData.courseInformation?.maxParticipants || undefined,
      level: formData.courseInformation?.level || undefined,
      link: formData.courseInformation?.link || undefined,
      address: formData.courseInformation?.address || undefined,
      will_learn: whatWillLearn ?? undefined,
      requirements: requirements ?? undefined,
      lessons,
      lessons_count: lessons ? lessons.length : 0,
      trainer: formData.trainer
        ? {
            id: formData.trainer?.id || undefined,
            bio: formData.trainer?.bio || undefined,
            first_name: formData.trainer?.name || undefined,
            last_name: formData.trainer?.surname || undefined,
            avatar:
              trainerImage
                ?.replace(/https:\/\/upstart.brainfors.am\//gm, '')
                .replace(/https:\/\/api.upstart.am\//gm, '') || undefined,
          }
        : undefined,
    };
  }

  public static deserialize(course: Partial<Course>, languageCode: string): Partial<CourseForm> {
    return {
      type: course.type,
      category: course.category_id ?? null,
      landingPage: {
        title: course.title ?? null,
        subtitle: course.sub_title ?? null,
        description: course.description ?? null,
        promotionalVideo: course.promo_video ?? null,
        coverImage: course.cover_image ?? null,
        requirements: course.requirements ? JSON.parse(course.requirements as string) : null,
      },
      courseInformation: {
        language: course.language ?? languageCode === 'hy' ? 1 : 2,
        level: course.level ?? 1,
        address: course.address ?? null,
        link: course.link ?? null,
        certificate:
          course.certificate !== undefined && course.certificate !== null
            ? !!course.certificate
            : null,
        lessonsCount: course.lessons_count ? course.lessons_count : 1,
        whatWillLearn: course.will_learn ? JSON.parse(course.will_learn as string) : null,
        price: {
          amount: course.price ?? 0,
          currency: course.currency ?? null,
        },
        maxParticipants: course.max_participants ?? 1,
        lessons:
          course.lessons
            ?.filter((lesson) => lesson.start_time)
            .map((lesson) => {
              const startDate = dayjs(lesson.start_time as string, 'YYYY-MM-DD HH:mm:ss').toDate();
              startDate.setMinutes(0);
              startDate.setHours(0);
              startDate.setSeconds(0);
              return {
                title: lesson.title as string,
                enterDate: startDate,
                enterTime: dayjs(lesson.start_time as string, 'YYYY-MM-DD HH:mm:ss').toDate(),
                duration: lesson.duration ? (lesson.duration as number) / 60 : 0,
              };
            }) ?? [],
      },
      trainer: {
        name: course.trainer?.first_name ?? null,
        surname: course.trainer?.last_name ?? null,
        id: course.trainer?.id ?? null,
        bio: course.trainer?.bio ?? null,
        image: course.trainer?.avatar ?? undefined,
      },
    };
  }
}
