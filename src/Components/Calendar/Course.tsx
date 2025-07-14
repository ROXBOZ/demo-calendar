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
  // const baseHeight = 9;
  // const heightRem = (course.duration / 60) * baseHeight;
  return (
    <div
      key={idx}
      className={`bg-base-50 min-h-36 overflow-hidden border-2 ${
        course.minAge < 18 ? "border-teal-500" : "border-orange-500"
      } rounded-lg pb-4`}
      // style={{ height: `${heightRem}rem` }}
    >
      <div
        className={`flex ${
          course.minAge < 18 ? "bg-teal-500" : "bg-orange-500"
        } w-full items-baseline justify-between gap-2 px-4 pt-2 pb-2 leading-tight font-medium`}
      >
        <h3>
          {course.title} &#40;{course.duration}min.&#41;
        </h3>
        <p>{course.startTime}</p>
      </div>
      <div className="px-4 py-2">
        {course.level && (
          <p>
            {getLevelLabel(course.level)} <span>level</span>
          </p>
        )}
        {course.trainers && (
          <div>
            With{" "}
            {course.trainers?.map((trainer, index) => (
              <span key={index}>
                {index > 0 && " or "}
                {trainer}
              </span>
            ))}
          </div>
        )}
        {course.minAge && course.minAge < 18 && (
          <p>For girls* from {course.minAge} years old</p>
        )}

        {course.openToAll && <p>Open for trial</p>}
      </div>
    </div>
  );
}

export default Course;
