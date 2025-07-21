export class ApiUrls {
  //AUTH
  public static AUTH: string = "/log-in";

  //GROUPS
  public static GROUPS: string = "/group";

  //COURSE
  public static COURSE: string = "/courses";

  //TEACHER
  public static TEACHER: string = "/teacher";

  //STUDENT
  public static STUDENT: string = "/students";

  //BRANCH
  public static BRANCH: string = "/branches";

  //ROOM
  public static ROOM: string = "/rooms";

  // LESSONS
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = this.LESSONS + "/group";

  // GROUP TEACHERS
  public static GROUP_TEACHERS: string = "/group-teachers";
  public static GROUP_TEACHERS_BY_GROUP_ID: string =
    this.GROUP_TEACHERS + "/by-group";

  // GROUP STUDENTS
  public static GROUP_STUDENTS: string = "/group-students";
  public static GROUP_STUDENTS_BY_GROUP_ID: string =
    this.GROUP_STUDENTS + "/by-group";
}
