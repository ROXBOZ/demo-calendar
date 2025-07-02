import React from "react";

function Course({
  course,
  idx,

  getLevelLabel,
}: {
  course: Course;
  idx: number;

  getLevelLabel: (level?: number) => string;
}) {
  const baseHeight = 8;
  const heightRem = (course.duration / 60) * baseHeight;
  return (
    <div
      key={idx}
      className="border-t pt-1"
      style={{ height: `${heightRem}rem` }}
    >
      <div className="flex justify-between text-lg  items-baseline w-full pb-2">
        <h3>{course.title}</h3>
        <p>{course.startTime}</p>
      </div>
      <div className="flex gap-1">
        {course.level && (
          <p>
            {getLevelLabel(course.level)} <span>level</span>
            {course.trainers && ","}
          </p>
        )}
        {course.trainers && (
          <div>
            {course.level ? "with " : "With "}
            {course.trainers?.map((trainer, index) => (
              <span key={index}>
                {index > 0 && " / "}
                {trainer}
              </span>
            ))}
          </div>
        )}
      </div>
      {course.minAge && course.minAge < 18 && (
        <p>For girls from {course.minAge} years old</p>
      )}

      {course.openToAll && <p>Open for trial</p>}
    </div>
  );
}

export default Course;
