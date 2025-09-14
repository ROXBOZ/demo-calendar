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
  return (
    <div
      key={idx}
      className={`min-h-36 overflow-hidden border-2 bg-stone-50 ${
        course.minAge < 18 ? "border-amber-500" : "border-yellow-500"
      } rounded-lg pb-4`}
    >
      <div
        className={`flex flex-col lg:flex-row ${
          course.minAge < 18 ? "bg-amber-500" : "bg-yellow-500"
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
