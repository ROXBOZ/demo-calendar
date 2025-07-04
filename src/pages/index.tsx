import { useMemo, useState } from "react";

import Course from "@/Components/Calendar/Course";
import { Filters } from "@/Components/Calendar/Filters";
import Form from "@/Components/Form";
import rawData from "../data.json";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Home: React.FC = () => {
  //NOTE TypeScript won’t check if the JSON actually matches Course[]. It’s just a type assertion.
  const metadata = rawData as Course[];
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [trainerFilter, setTrainerFilter] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<"youngs" | "adults" | "">("");
  const [openToAllOnly, setOpenToAllOnly] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
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
    [metadata]
  );
  const titles = useMemo(
    () => Array.from(new Set(metadata.map((course) => course.title))),
    [metadata]
  );
  const trainers = useMemo(
    () =>
      Array.from(
        new Set(metadata.flatMap((course) => course.trainers ?? []))
      ).sort(),
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
    <main className="bg-sand-200 min-h-screen p-4 flex flex-col gap-4">
      <div className="flex justify-between items-baseline">
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
        <button
          className="p-4 rounded bg-highlight-2 font-medium"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add course
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {showModal && <Form setShowModal={setShowModal} />}
        {rooms.map((room) => (
          <div key={room}>
            <h1 className="text-xl font-medium p-4">
              {room === 1 ? "Workout Room" : "Boxing Room"}
            </h1>
            <div className="grid bg-sand-100 p-4 rounded gap-4 grid-cols-1 md:grid-cols-5 ">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h2 className="font-medium px-4">{day}</h2>
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
                      className="w-full hover:cursor-pointer h-full bg-sand-50 rounded flex items-center justify-center font-medium text-sand-700"
                    >
                      NO COURSES
                    </button>
                  )}
                  <button className="disabled opacity-30 font-semibold">
                    + Add course
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-24 w-full flex text-center text-sm justify-center">
        Roxanne Borloz | ROXBOZ | 2025
      </p>
    </main>
  );
};

export default Home;
