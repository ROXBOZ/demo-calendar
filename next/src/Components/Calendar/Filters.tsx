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
    <div className="flex-wr bg-chocolate-200 flex items-baseline justify-between gap-4 rounded p-4">
      <div className="flex flex-wrap gap-4">
        <div className="bg-base-100 flex items-baseline gap-3 rounded p-4">
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

        <div className="bg-base-100 flex items-baseline gap-3 rounded p-4">
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

        <div className="bg-base-100 flex items-baseline gap-3 rounded p-4">
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

        <div className="bg-base-100 flex items-baseline gap-3 rounded p-4">
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

        <div className="bg-base-100 flex items-baseline gap-3 rounded p-4">
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
        className="bg-base-300 hover:ring-base-400 active:bg-base-400 rounded p-4 font-semibold whitespace-nowrap ring-inset hover:cursor-pointer hover:ring-2 hover:delay-200 hover:duration-200"
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
