import { useMemo, useState } from "react";

import Course from "@/Components/Calendar/Course";
import { Filters } from "@/Components/Calendar/Filters";
import Form from "@/Components/Form";
import rawData from "../../data.json";

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const Calendar: React.FC = () => {
  //NOTE TypeScript won’t check if the JSON actually matches Course[]. It’s just a type assertion.
  const metadata = rawData as Course[];
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [trainerFilter, setTrainerFilter] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<"youngs" | "adults" | "">("");
  const [openToAllOnly, setOpenToAllOnly] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

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

  //NOTE Should create getAgeGroup with switch
  const rooms = useMemo(
    () => Array.from(new Set(metadata.map((course) => course.room))),
    [metadata],
  );
  const titles = useMemo(
    () => Array.from(new Set(metadata.map((course) => course.title))),
    [metadata],
  );
  const trainers = useMemo(
    () =>
      Array.from(
        new Set(metadata.flatMap((course) => course.trainers ?? [])),
      ).sort(),
    [metadata],
  );
  const resetFilters = (
    filterType: "level" | "title" | "trainer" | "ageGroup" | "openToAll",
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
    return rooms.reduce(
      (acc, room) => {
        acc[room] = weekDays.map((_, index) => {
          const dayIndex = index + 1;
          return filteredCourses
            .filter(
              (course) => course.room === room && course.weekDay === dayIndex,
            )
            .sort((a, b) =>
              (a.startTime ?? "").localeCompare(b.startTime ?? ""),
            );
        });
        return acc;
      },
      {} as Record<number, Course[][]>,
    );
  }, [rooms, filteredCourses]);

  return (
    <>
      <div className="hidden flex-row items-baseline justify-between md:flex">
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
      </div>

      <div className="flex flex-col gap-4">
        {showModal && (
          <Form
            setShowModal={setShowModal}
            selectedDay={selectedDay ? selectedDay : 1}
            setSelectedDay={setSelectedDay}
          />
        )}
        {rooms.map((room) => (
          <div key={room}>
            <h1 className="p-4 text-xl font-medium">
              {room === 1 ? "Workout Room" : "Boxing Room"}
            </h1>
            <div className="grid grid-cols-1 gap-4 rounded bg-stone-100 p-4 md:grid-cols-5">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h2 className="px-4 font-medium">{day}</h2>

                  {coursesByRoomAndDay[room][index].length > 0 ? (
                    coursesByRoomAndDay[room][index].map((course, idx) => {
                      return (
                        <Course
                          key={`${room}-${index}-${idx}`}
                          course={course}
                          idx={idx}
                          getLevelLabel={getLevelLabel}
                        />
                      );
                    })
                  ) : (
                    <button
                      onClick={() => {
                        setLevelFilter("");
                        setTitleFilter("");
                        setTrainerFilter("");
                        setAgeGroup("");
                        setOpenToAllOnly(false);
                      }}
                      className="flex h-full w-full items-center justify-center rounded bg-stone-50 font-medium text-stone-700 hover:cursor-pointer"
                    >
                      NO COURSES
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowModal(true);
                      setSelectedDay(index + 1);
                    }}
                    className="rounded-md bg-stone-200 py-1 font-semibold hover:cursor-pointer hover:ring-2 hover:ring-stone-300 hover:delay-200 hover:duration-300 hover:ring-inset active:bg-stone-300"
                  >
                    + Add course
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-24 flex w-full justify-center text-center text-sm">
        Roxanne Borloz | ROXBOZ | 2025
      </p>
    </>
  );
};

export default Calendar;
