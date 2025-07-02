import { useMemo, useState } from "react";

import { Filters } from "@/Components/Calendar/Filters";
import rawData from "../data.json";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Home: React.FC = () => {
  const metadata = rawData as Course[];
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [trainerFilter, setTrainerFilter] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<"youngs" | "adults" | "">("");
  const [openToAllOnly, setOpenToAllOnly] = useState<boolean>(false);
  const baseHeight = 8;

  const getLevelLabel = (level?: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Intermediate";
      case 3:
        return "Advanced";
      default:
        return "";
    }
  };

  const rooms = useMemo(
    () => Array.from(new Set(metadata.map((c) => c.room))),
    [metadata]
  );
  const titles = useMemo(
    () => Array.from(new Set(metadata.map((c) => c.title))),
    [metadata]
  );
  const trainers = useMemo(
    () => Array.from(new Set(metadata.flatMap((c) => c.trainers ?? []))).sort(),
    [metadata]
  );

  const resetFilters = (
    filterType: "level" | "title" | "trainer" | "ageGroup" | "openToAll"
  ) => {
    if (filterType === "level") {
      setTitleFilter("");
      setTrainerFilter("");
      setAgeGroup("");
      setOpenToAllOnly(false);
    } else if (filterType === "title") {
      setLevelFilter("");
      setTrainerFilter("");
      setAgeGroup("");
      setOpenToAllOnly(false);
    } else if (filterType === "trainer") {
      setLevelFilter("");
      setTitleFilter("");
      setAgeGroup("");
      setOpenToAllOnly(false);
    } else if (filterType === "ageGroup") {
      setLevelFilter("");
      setTitleFilter("");
      setTrainerFilter("");
      setOpenToAllOnly(false);
    } else if (filterType === "openToAll") {
      setLevelFilter("");
      setTitleFilter("");
      setTrainerFilter("");
      setAgeGroup("");
    }
  };

  const filteredCourses = useMemo(() => {
    return metadata.filter((course) => {
      const matchTitle = titleFilter ? course.title === titleFilter : true;
      const matchLevel = levelFilter
        ? String(course.level) === levelFilter
        : true;
      const matchTrainer = trainerFilter
        ? course.trainers?.includes(trainerFilter)
        : true;

      let matchAge = true;
      if (ageGroup === "youngs") {
        matchAge = Boolean(course.minAge && course.minAge < 18);
      } else if (ageGroup === "adults") {
        matchAge = Boolean(course.minAge && course.minAge >= 18);
      }

      const matchOpen = openToAllOnly ? course.openToAll : true;

      return matchTitle && matchLevel && matchTrainer && matchAge && matchOpen;
    });
  }, [
    titleFilter,
    levelFilter,
    trainerFilter,
    ageGroup,
    openToAllOnly,
    metadata,
  ]);

  const coursesByRoomAndDay = useMemo(() => {
    return rooms.reduce((acc, room) => {
      acc[room] = weekDays.map((_, index) => {
        const dayIndex = index + 1;
        return filteredCourses
          .filter(
            (course) => course.room === room && course.weekDay === dayIndex
          )
          .sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? ""));
      });
      return acc;
    }, {} as Record<number, Course[][]>);
  }, [rooms, filteredCourses]);

  return (
    <div>
      <main className="p-4 flex flex-col gap-4">
        <Filters
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          trainerFilter={trainerFilter}
          setTrainerFilter={setTrainerFilter}
          ageGroup={ageGroup}
          setAgeGroup={setAgeGroup}
          openToAllOnly={openToAllOnly}
          setOpenToAllOnly={setOpenToAllOnly}
          titles={titles}
          trainers={trainers}
          resetFilters={resetFilters}
        />

        <div className="flex flex-col gap-4">
          {rooms.map((room) => (
            <div key={room} className="bg-blue-100 p-4 flex flex-col gap-4">
              <h1 className="text-xl font-semibold">
                {room === 1 ? "Workout Room" : "Boxing Room"}
              </h1>
              <p></p>
              <div className="grid grid-cols-1 md:grid-cols-5 divide-x">
                {weekDays.map((day, index) => (
                  <div key={index} className="p-4 flex flex-col gap-2">
                    <h2 className="font-semibold">{day}</h2>
                    {coursesByRoomAndDay[room][index].length > 0 ? (
                      coursesByRoomAndDay[room][index].map((course, idx) => {
                        const heightRem = (course.duration / 60) * baseHeight;
                        return (
                          <div
                            key={idx}
                            className="border-t pt-1"
                            style={{ height: `${heightRem}rem` }}
                          >
                            <div className="flex justify-between items-baseline w-full pb-2">
                              <h3 className="text-lg">{course.title}</h3>
                              <p>{course.startTime}</p>
                            </div>
                            <div className="flex gap-1">
                              {course.level && (
                                <p>
                                  {getLevelLabel(course.level)}{" "}
                                  <span>level</span>
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
                      })
                    ) : (
                      <p>No Course</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
