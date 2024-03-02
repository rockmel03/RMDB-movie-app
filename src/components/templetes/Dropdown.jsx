import React from "react";

const Dropdown = ({
  title = "filter",
  option = ["filter", "filter", "filter"],
  func = () => {},
}) => {
  return (
    <div className="bg-zinc-900 text-zinc-400 rounded-md pr-[.5em] hover:text-black hover:bg-zinc-400">
      <select
        defaultValue={0}
        onChange={(e) => func(e.target.value)}
        className="bg-transparent outline-none min-w-[8em] px-[1em] py-[.5em]"
      >
        <option className="capitalize pointer-events-none" disabled>
          {title.toUpperCase()}
        </option>
        {option.map((o, i) => (
          <option
            key={i}
            value={o}
            className="bg-zinc-900 text-white capitalize"
          >
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
