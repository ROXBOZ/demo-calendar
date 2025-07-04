import React from "react";

export const Filters: React.FC<FiltersProps> = ({
  levelFilter,
  setLevelFilter,
  titleFilter,
  setTitleFilter,
  trainerFilter,
  setTrainerFilter,
  ageGroup,
  setAgeGroup,
  openToAllOnly,
  setOpenToAllOnly,
  titles,
  trainers,
  resetFilters,
}) => {
  return (
    <div className="flex flex-wr  gap-4 justify-between items-baseline bg-chocolate-200 p-4 rounded">
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-3 items-baseline bg-sand-100 p-4 rounded">
          <label className="font-semibold">Title</label>
          <select
            className="hover:cursor-pointer"
            value={titleFilter}
            onChange={(e) => {
              setTitleFilter(e.target.value);
              resetFilters("title");
            }}
          >
            <option>All</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 items-baseline bg-sand-100 p-4 rounded">
          <label className="font-semibold">Level</label>
          <select
            className="hover:cursor-pointer"
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value);
              resetFilters("level");
            }}
          >
            <option value="">All</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </select>
        </div>

        <div className="flex gap-3 items-baseline bg-sand-100 p-4 rounded">
          <label className="font-semibold">Trainer</label>
          <select
            className="hover:cursor-pointer"
            value={trainerFilter}
            onChange={(e) => {
              setTrainerFilter(e.target.value);
              resetFilters("trainer");
            }}
          >
            <option value="">All</option>
            {trainers.map((trainer) => (
              <option key={trainer} value={trainer}>
                {trainer}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 items-baseline bg-sand-100 p-4 rounded">
          <label className="font-semibold">Age Group</label>
          <select
            className="hover:cursor-pointer"
            value={ageGroup}
            onChange={(e) => {
              setAgeGroup(e.target.value as "youngs" | "adults" | "");
              resetFilters("ageGroup");
            }}
          >
            <option value="">All</option>
            <option value="youngs">Youngs</option>
            <option value="adults">Adults</option>
          </select>
        </div>

        <div className="flex gap-3 items-baseline bg-sand-100 p-4 rounded">
          <input
            type="checkbox"
            id="openToAll"
            checked={openToAllOnly}
            onChange={() => {
              setOpenToAllOnly((prev) => !prev);
              resetFilters("openToAll");
            }}
            className="size-4 hover:cursor-pointer"
          />
          <label className="font-semibold" htmlFor="openToAll">
            Open to All
          </label>
        </div>
      </div>

      <button
        className="bg-sand-300 whitespace-nowrap ring-inset hover:ring-2 hover:ring-sand-400 active:bg-sand-400 hover:delay-200 hover:duration-200 px-6 py-3 rounded font-semibold hover:cursor-pointer"
        onClick={() => {
          setLevelFilter("");
          setTitleFilter("");
          setTrainerFilter("");
          setAgeGroup("");
          setOpenToAllOnly(false);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};
