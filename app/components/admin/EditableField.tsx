import type { ElementType, ReactNode } from "react";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

/**
 * Text edit handler. When present on a section component, the field renders an
 * inline editor; when omitted the field renders as plain (public) markup.
 */
export type TextEdit = { onChange: (value: string) => void };

/** Image edit handler mirroring {@link TextEdit} for media fields. */
export type ImageEdit = { onChange: (src: string) => void };

type EditableFieldProps = {
  /** Semantic tag used for the static (public) render, e.g. "h2" or "p". */
  as?: ElementType;
  value: string;
  className?: string;
  multiline?: boolean;
  label?: string;
  id?: string;
  aos?: string;
  aosDelay?: string | number;
  /** When provided, renders an inline text editor instead of static markup. */
  edit?: TextEdit;
};

/**
 * Renders section text either as the real public element (with AOS attrs) or,
 * when `edit` is supplied, as an inline admin editor carrying the same classes.
 * This keeps a single markup source for both the client site and the admin
 * editor so the two can never drift apart.
 */
export function EditableField({
  as: Tag = "div",
  value,
  className,
  multiline = false,
  label,
  id,
  aos,
  aosDelay,
  edit,
}: EditableFieldProps) {
  if (edit) {
    return (
      <EditableText
        id={id}
        className={className}
        value={value}
        onChange={edit.onChange}
        multiline={multiline}
        label={label}
      />
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      {...(aos ? { "data-aos": aos } : {})}
      {...(aosDelay != null ? { "data-aos-delay": String(aosDelay) } : {})}
    >
      {value}
    </Tag>
  );
}

type EditableMediaProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  /** When provided, renders a clickable image uploader instead of a plain img. */
  edit?: ImageEdit;
};

/** Image counterpart to {@link EditableField}. */
export function EditableMedia({
  src,
  alt = "",
  className,
  width,
  height,
  loading,
  edit,
}: EditableMediaProps) {
  if (edit) {
    return (
      <EditableImage
        src={src}
        onChange={edit.onChange}
        alt={alt}
        className={className ?? ""}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
    />
  );
}

/** Shared CTA arrow used by every section button. */
export function ArrowIcon() {
  return (
    <span className="svg-wrapper">
      <svg
        className="icon-20"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M13.3365 7.84518L6.16435 15.0173L4.98584 13.8388L12.158 6.66667H5.83652V5H15.0032V14.1667H13.3365V7.84518Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

type SectionButtonProps = {
  label: string;
  href: string;
  className: string;
  ariaLabel?: string;
  /** When provided, renders a non-navigating editable button. */
  edit?: TextEdit;
  /** Trailing nodes such as the arrow icon and helper text. */
  children?: ReactNode;
};

/**
 * A CTA button that renders a real `<a>` on the public site and a
 * non-navigating `<span>` with an inline label editor in the admin editor.
 * Both share the exact same classes and trailing icon markup.
 */
export function SectionButton({
  label,
  href,
  className,
  ariaLabel,
  edit,
  children,
}: SectionButtonProps) {
  if (edit) {
    return (
      <span className={className}>
        <EditableText
          value={label}
          onChange={edit.onChange}
          label={ariaLabel ?? "Button label"}
        />
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={className} aria-label={ariaLabel}>
      {label}
      {children}
    </a>
  );
}
