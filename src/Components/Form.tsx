import rawData from "../data.json";
import { useState } from "react";
function Form({ setShowModal }: { setShowModal: (show: boolean) => void }) {
  const metadata = rawData as Course[];
  const demoTitles = [...new Set(metadata.map((course) => course.title))];
  const [form, setForm] = useState({
    title: demoTitles[0],
    weekDay: 1,
    duration: 60,
    level: 1,
    startTime: "10:00",
  });
  const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [hour, minute] = form.startTime.split(":");

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
    <div className="absolute top-0 bg-sand-950/60 right-0 left-0 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-[65ch] bg-sand-50 rounded shadow-md p-12 h-fit relative w-full">
        <button
          className="absolute top-4 right-12 px-3 rounded hover:bg-sand-100"
          onClick={() => {
            setShowModal(false);
          }}
        >
          close
        </button>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* title */}
          <div className="flex gap-2 items-baseline">
            <label htmlFor="title" className="whitespace-nowrap">
              Title of the Course <span className="text-highlight-1">*</span>
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
              className="select-classes"
            >
              {demoTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-sand-100 flex flex-col gap-4 p-5 rounded">
            {/* Day of the week */}
            <div className="flex gap-2 items-baseline">
              <label htmlFor="weekDay" className="whitespace-nowrap">
                Day of the week <span className="text-highlight-1">*</span>
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
                className="select-classes"
              >
                <option value="" disabled>
                  Select a day
                </option>
                {weekDay.map((day, index) => (
                  <option key={index} value={index + 1}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div className="flex gap-2 items-baseline">
              <label htmlFor="startTime" className="whitespace-nowrap">
                Starting Time <span className="text-highlight-1">*</span>
              </label>
              <div className="flex space-x-2 w-full">
                <select
                  name="startHour"
                  value={hour}
                  onChange={(e) => {
                    const newHour = e.target.value.padStart(2, "0");
                    setForm({ ...form, startTime: `${newHour}:${minute}` });
                  }}
                  required
                  className="select-classes"
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
                    setForm({ ...form, startTime: `${hour}:${newMinute}` });
                  }}
                  required
                  className="select-classes"
                >
                  {["00", "15", "30", "45"].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration */}
            <div className="flex gap-2 items-baseline">
              <label htmlFor="duration" className="whitespace-nowrap">
                Duration <span className="text-highlight-1">*</span>
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
                className="select-classes"
              >
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>
          </div>
          {/* Level */}
          <div className="flex gap-2 items-baseline">
            <label htmlFor="level" className="whitespace-nowrap">
              Level <span className="text-highlight-1">*</span>
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
              className="select-classes"
            >
              <option value={1}>Beginner</option>
              <option value={2}>Intermediate</option>
              <option value={3}>Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-highlight-2 rounded w-full font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
