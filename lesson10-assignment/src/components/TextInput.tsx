// TODO: Type this component so that:
// 1. It extends all native <input> props (value, onChange, placeholder, etc.)
// 2. `label` and `hint` are optional custom string props
// 3. `error` is an optional string
// 4. Bonus: use a discriminated union on the `multiline` prop.
//    When multiline is true, the component renders a <textarea> and should
//    accept <textarea> props (rows, cols, wrap, etc.) instead of <input> props.
//    When multiline is false or omitted, it renders an <input> with <input> props.
function TextInput({ label, hint, error, multiline, className, ...props }: any) {
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}
      {hint && (
        <span className="text-xs text-gray-500">{hint}</span>
      )}
      <InputComponent
        className={`rounded border px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'} ${className || ''}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}

export { TextInput };
