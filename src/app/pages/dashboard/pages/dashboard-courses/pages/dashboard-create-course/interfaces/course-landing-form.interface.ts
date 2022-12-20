export interface CourseLandingForm {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  coverImage: File | string | null;
  promotionalVideo: string | null;
  requirements: string[] | null;
}
