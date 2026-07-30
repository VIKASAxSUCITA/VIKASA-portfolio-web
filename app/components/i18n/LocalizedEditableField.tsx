"use client";

import {
  EditableField,
  type EditableFieldProps,
} from "@/app/components/admin/EditableField";
import type { Locale, LocalizedString } from "@/lib/i18n/locale";
import { asLocalized, readLocalized, setLocalized } from "@/lib/i18n/localized";

type LocalizedEditableFieldProps = Omit<
  EditableFieldProps,
  "value" | "edit"
> & {
  value: LocalizedString | string;
  locale: Locale;
  edit?: {
    onChange: (next: LocalizedString) => void;
  };
};

/** Editable / display field that follows the active EN / KM / ZH locale. */
export default function LocalizedEditableField({
  value,
  locale,
  edit,
  ...rest
}: LocalizedEditableFieldProps) {
  const localized = asLocalized(value);

  return (
    <EditableField
      {...rest}
      value={readLocalized(localized, locale)}
      edit={
        edit
          ? {
              onChange: (next) =>
                edit.onChange(setLocalized(localized, locale, next)),
            }
          : undefined
      }
    />
  );
}
