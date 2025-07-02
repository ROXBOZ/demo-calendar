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
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
      <div>
        <label>Title</label>
        <select
          className="w-full p-2 border"
          value={titleFilter}
          onChange={(e) => {
            setTitleFilter(e.target.value);
            resetFilters("title");
          }}
        >
          <option value="">All</option>
          {titles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Level</label>
        <select
          className="w-full p-2 border"
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

      <div>
        <label>Trainer</label>
        <select
          className="w-full p-2 border"
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

      <div>
        <label>Age Group</label>
        <select
          className="w-full p-2 border"
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

      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          id="openToAll"
          checked={openToAllOnly}
          onChange={() => {
            setOpenToAllOnly((prev) => !prev);
            resetFilters("openToAll");
          }}
          className="size-4"
        />
        <label htmlFor="openToAll">Open to All</label>
      </div>

      {/* Reset button */}
      <button
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
