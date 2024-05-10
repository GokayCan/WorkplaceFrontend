export class StudentLesson {
    id: number;
    studentId: number;
    lessonId: number;
    midtern: number | null;
    project: number | null;
    quiz: number | null;
    final: number | null;
    average: number | null;
    isActive: boolean;
}