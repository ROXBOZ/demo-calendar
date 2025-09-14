import { useEffect, useState } from "react";

import Course from "../Calendar/Course";
import rawData from "../../data.json";
import { weekDays } from "../Calendar";

function Form({
  setShowModal,
  selectedDay,
  setSelectedDay,
}: {
  setShowModal: (show: boolean) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}) {
  const metadata = rawData as Course[];
  const demoTitles = [...new Set(metadata.map((course) => course.title))];
  const demoTrainers = [
    ...new Set(
      metadata
        .map((course) => course.trainers)
        .filter(Array.isArray)
        .flat()
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));

  const [form, setForm] = useState({
    title: demoTitles[0],
    weekDay: 1,
    duration: 60,
    level: 1,
    startTime: "10:00",
    minAge: 18,
    openToAll: false,
    trainers: [demoTrainers[0]],
    room: 1,
  });

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [minAge, setMinAge] = useState(18);
  const [hour, minute] = form.startTime.split(":");
  const [openToAll, setOpenToAll] = useState(false);
  const [selectedTrainers, setSelectedTrainers] = useState([] as string[]);
  const [selectedRoom, setSelectedRoom] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowModal]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      alert("Something went wrong (bad JSON)");
      return;
    }

    if (!res.ok) {
      alert(data?.error || "Form failed");
      return;
    }

    alert(data.message || "Form submitted!");
  };

  return (
    <div
      onClick={() => {
        setShowModal(false);
      }}
      className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-stone-950/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 max-h-[100vh] w-full max-w-[100ch] overflow-hidden rounded bg-stone-50 p-6 shadow-md md:m-4"
      >
        <button
          className="absolute top-0 right-0 flex items-center gap-1 rounded px-1 hover:cursor-pointer hover:bg-stone-100"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <span>✖</span> <span className="sr-only text-sm">close</span>
        </button>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex w-full flex-col-reverse gap-4 md:flex-row">
            <div className="max-h-[60vh] flex-1 overflow-y-auto md:max-h-none">
              <h2 className="text-lg font-medium">Add a new course</h2>

              <div className="flex flex-col items-baseline md:flex-row md:gap-2">
                <label htmlFor="title" className="whitespace-nowrap">
                  Title of the Course <span className="text-yellow-500">*</span>
                </label>
                <select
                  name="title"
                  id="title"
                  value={selectedTitle}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedTitle(value);
                    setForm({ ...form, title: value });
                  }}
                  required
                  className="form-input"
                >
                  {demoTitles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-4 flex flex-col gap-4 border-y border-amber-500 py-4">
                <div className="flex flex-col items-baseline md:flex-row md:gap-2">
                  <label htmlFor="weekDay" className="whitespace-nowrap">
                    Day of the week <span className="text-yellow-500">*</span>
                  </label>
                  <select
                    name="weekDay"
                    id="weekDay"
                    value={selectedDay}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSelectedDay(value);
                      setForm({ ...form, weekDay: value });
                    }}
                    required
                    className="form-input"
                  >
                    <option value="" disabled>
                      Select a day
                    </option>
                    {weekDays.map((day, index) => (
                      <option key={index} value={index + 1}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-baseline gap-2">
                  <label htmlFor="startTime" className="whitespace-nowrap">
                    Starting Time <span className="text-yellow-500">*</span>
                  </label>
                  <div className="flex w-full space-x-2">
                    <select
                      name="startHour"
                      value={hour}
                      onChange={(e) => {
                        const newHour = e.target.value.padStart(2, "0");
                        setForm({
                          ...form,
                          startTime: `${newHour}:${minute}`,
                        });
                      }}
                      required
                      className="form-input"
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const h = i.toString().padStart(2, "0");
                        return (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      name="startMinute"
                      value={minute}
                      onChange={(e) => {
                        const newMinute = e.target.value.padStart(2, "0");
                        setForm({
                          ...form,
                          startTime: `${hour}:${newMinute}`,
                        });
                      }}
                      required
                      className="form-input"
                    >
                      {["00", "15", "30", "45"].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <label htmlFor="duration" className="whitespace-nowrap">
                    Duration <span className="text-yellow-500">*</span>
                  </label>
                  <select
                    name="duration"
                    id="duration"
                    value={selectedDuration}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSelectedDuration(value);
                      setForm({ ...form, duration: value });
                    }}
                    required
                    className="form-input"
                  >
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                    <option value={120}>120 minutes</option>
                  </select>
                </div>

                <div className="flex items-baseline gap-2">
                  <label htmlFor="room" className="whitespace-nowrap">
                    Room <span className="text-yellow-500">*</span>
                  </label>
                  <select
                    name="room"
                    id="room"
                    value={selectedRoom}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSelectedRoom(value);
                      setForm({ ...form, room: value });
                    }}
                    required
                    className="form-input"
                  >
                    <option value={1}>Workout Room</option>
                    <option value={2}>Boxing Room</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="openToAll" className="whitespace-nowrap">
                    This course is open to all
                  </label>
                  <div className="flex py-1">
                    <input
                      className="checkbox"
                      type="checkbox"
                      name="openToAll"
                      id="openToAll"
                      checked={openToAll}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.checked;
                        setOpenToAll(value);
                        setForm({ ...form, openToAll: value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 flex items-baseline gap-2">
                <label htmlFor="level" className="whitespace-nowrap">
                  Level <span className="text-yellow-500">*</span>
                </label>
                <select
                  name="level"
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setSelectedLevel(value);
                    setForm({ ...form, level: value });
                  }}
                  required
                  className="form-input"
                >
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                </select>
              </div>

              <div className="flex items-baseline gap-2">
                <label htmlFor="minAge" className="whitespace-nowrap">
                  Minimum Age <span className="text-yellow-500">*</span>
                </label>
                <div className="w-full">
                  <input
                    name="minAge"
                    id="minAge"
                    value={minAge}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setMinAge(value);
                      setForm({ ...form, minAge: value });
                    }}
                    required
                    className="form-input"
                  />
                  {minAge && minAge > 1 && minAge < 18 ? (
                    <p className="px-2 text-xs text-amber-800">
                      This course will be shown as Course for Youngs from{" "}
                      {minAge} years old.
                    </p>
                  ) : minAge && minAge >= 18 ? (
                    <p className="px-2 text-xs text-amber-800">
                      This course will be shown as for Adults.
                    </p>
                  ) : minAge === 0 ? (
                    <p className="px-2 text-xs text-red-800">
                      Please enter a minimum age.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="my-4 flex flex-col gap-2 border-t border-amber-500 py-4">
                <label className="whitespace-nowrap">
                  Trainer(s) <span className="text-yellow-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                  {demoTrainers.map((trainer) => (
                    <label
                      key={trainer}
                      className="inline-flex items-center gap-1"
                    >
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="trainers"
                        value={trainer}
                        checked={selectedTrainers.includes(trainer as string)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newSelected = [
                              ...selectedTrainers,
                              trainer,
                            ].filter((t): t is string => typeof t === "string");
                            setSelectedTrainers(newSelected);
                            setForm({ ...form, trainers: newSelected });
                          } else {
                            const newSelected = selectedTrainers
                              .filter((t) => t !== trainer)
                              .filter(
                                (t): t is string => typeof t === "string",
                              );
                            setSelectedTrainers(newSelected);
                            setForm({ ...form, trainers: newSelected });
                          }
                        }}
                        required={selectedTrainers.length === 0}
                      />
                      {trainer}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 border-amber-500 md:border-l md:pl-4">
              <Course
                course={form as Course}
                idx={1}
                getLevelLabel={getLevelLabel}
              />
            </div>
          </div>
          {/* <button
            type="submit"
            className="w-full rounded bg-amber-500 px-6 py-2 font-medium hover:cursor-pointer hover:ring-2 hover:ring-amber-600 hover:delay-300 hover:duration-200 hover:ring-inset active:bg-amber-600"
          >
            Send
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Form;
