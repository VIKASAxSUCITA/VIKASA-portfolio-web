"use client";

import { useRef, useState } from "react";
import Image from "@tiptap/extension-image";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type Editor,
  type NodeViewProps,
} from "@tiptap/react";
import {
  discardPendingImage,
  markBlobForDeletion,
  stageImageFile,
} from "@/lib/content/pendingImages";

function EditableImageNodeView({
  node,
  updateAttributes,
  deleteNode,
  editor,
  selected,
}: NodeViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const src = String(node.attrs.src || "");
  const editable = editor.isEditable;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      if (src) {
        markBlobForDeletion(src);
        discardPendingImage(src);
      }
      const next = await stageImageFile(file);
      updateAttributes({ src: next });
    } catch (error) {
      console.error(error);
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not process that image. Try another file."
      );
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    if (src) {
      markBlobForDeletion(src);
      discardPendingImage(src);
    }
    deleteNode();
  }

  const fileName =
    src.split("/").pop()?.split("?")[0]?.slice(0, 24) || "Image";

  return (
    <NodeViewWrapper
      className={`insight-rte-image-wrap${selected ? " is-selected" : ""}`}
      data-drag-handle
    >
      <div className="insight-rte-image-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="insight-rte-image" draggable={false} />
        {editable ? (
          <div className="insight-rte-image-actions">
            <span className="insight-rte-image-chip">{fileName}</span>
            <button
              type="button"
              className="insight-rte-image-chip"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              {busy ? "…" : "Change"}
            </button>
            <button
              type="button"
              className="insight-rte-image-chip is-danger"
              onClick={handleRemove}
              disabled={busy}
            >
              Remove
            </button>
          </div>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </div>
    </NodeViewWrapper>
  );
}

/** TipTap image with Change / Remove overlays; Change marks old Blob for delete on Save. */
export const InsightEditableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "insight-rte-image",
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(EditableImageNodeView);
  },
});

/** Always insert a new image — never replace the currently selected one. */
export function insertEditorImage(editor: Editor, src: string) {
  const attrs = { src, class: "insight-rte-image" };
  if (editor.isActive("image")) {
    editor
      .chain()
      .focus()
      .insertContentAt(editor.state.selection.to, { type: "image", attrs })
      .run();
    return;
  }
  editor.chain().focus().insertContent({ type: "image", attrs }).run();
}

