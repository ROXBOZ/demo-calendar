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
      className={`bg-sand-50 border-2 h-36 overflow-hidden  ${
        course.minAge < 18 ? "border-highlight-2" : "border-highlight-1"
      } pb-4 rounded-xl`}
      // style={{ height: `${heightRem}rem` }}
    >
      <div
        className={`flex ${
          course.minAge < 18 ? "bg-highlight-2" : "bg-highlight-1"
        } pt-2 leading-tight gap-2 px-4 justify-between font-medium items-baseline w-full pb-2`}
      >
        <h3>
          {course.title} &#40;{course.duration}min.&#41;
        </h3>
        <p>{course.startTime}</p>
      </div>
      <div className="px-4 py-2">
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
          <p>For girls* from {course.minAge} years old</p>
        )}

        {course.openToAll && <p>Open for trial</p>}
      </div>
    </div>
  );
}

export default Course;
