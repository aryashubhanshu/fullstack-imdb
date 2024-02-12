function Dropdown({ title, options, func }) {
  return (
    <div className="select">
      <select defaultValue={0} name="format" id="format" onChange={func}>
        <option value={0} disabled>
          {title}
        </option>
        {options.map((opt, ind) => (
          <option key={ind} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
