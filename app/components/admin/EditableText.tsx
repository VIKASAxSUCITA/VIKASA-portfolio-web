"use client";

import { forwardRef } from "react";

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  label?: string;
  id?: string;
  autoFocus?: boolean;
};

const EditableText = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  EditableTextProps
>(function EditableText(
  {
    value,
    onChange,
    multiline = false,
    className = "",
    label,
    id,
    autoFocus = false,
  },
  ref
) {
  const shared = {
    id,
    className: `admin-editable-text ${multiline ? "is-multiline" : ""} ${className}`.trim(),
    value,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(event.target.value),
    "aria-label": label || "Editable text",
    autoFocus,
  };

  return multiline ? (
    <textarea
      {...shared}
      rows={4}
      ref={ref as React.Ref<HTMLTextAreaElement>}
    />
  ) : (
    <input type="text" {...shared} ref={ref as React.Ref<HTMLInputElement>} />
  );
});

export default EditableText;
