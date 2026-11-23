function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  ...rest
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[13px] font-semibold text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full resize-y rounded-[10px] border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        {...rest}
      />
    </div>
  )
}

export default Textarea
