"use client";

import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import { stageImageFile } from "@/lib/content/pendingImages";
import type { AboutContent } from "@/lib/content/types";

type LogoGroup = "partners" | "clients";

function LogoGrid({
  title,
  hint,
  items,
  onAdd,
  onDelete,
  disabled,
}: {
  title: string;
  hint: string;
  items: AboutContent["partners"];
  onAdd: (file: File) => Promise<void>;
  onDelete: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <section className="admin-logos-section">
      <div className="admin-logos-head">
        <div>
          <h2 className="heading text-28">{title}</h2>
          <p className="text text-14">{hint}</p>
        </div>
        <label className="button button--slim admin-logos-add">
          {disabled ? "Uploading…" : "+ Add image"}
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={disabled}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void onAdd(file);
            }}
          />
        </label>
      </div>

      {items.length === 0 ? (
        <p className="text text-16 admin-logos-empty">No logos yet.</p>
      ) : (
        <ul className="admin-logos-grid list-unstyled">
          {items.map((item) => (
            <li key={item.id} className="admin-logos-card">
              <img src={item.logo} alt={item.name} loading="lazy" />
              <button
                type="button"
                className="button button--slim admin-logos-delete"
                onClick={() => onDelete(item.id)}
                disabled={disabled}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function AdminLogosPage() {
  const {
    content,
    loading,
    saving,
    dirty,
    message,
    update,
    save,
  } = usePageWithFooterEditor("about");

  const shellProps = {
    pageTitle: "Partners & Clients",
    onSave: save,
    saving,
    dirty,
    message,
  };

  async function handleAdd(group: LogoGroup, file: File) {
    try {
      const logo = await stageImageFile(file);
      const id = `${group.slice(0, 1)}_${Date.now().toString(36)}`;
      const name = file.name.replace(/\.[^.]+$/, "") || "Logo";
      update((prev) => ({
        ...prev,
        [group]: [{ id, name, logo }, ...prev[group]],
      }));
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Could not add that image."
      );
    }
  }

  function handleDelete(group: LogoGroup, id: string) {
    const confirmed = window.confirm(
      "Remove this logo? Click Save in the top bar to publish."
    );
    if (!confirmed) return;
    update((prev) => ({
      ...prev,
      [group]: prev[group].filter((item) => item.id !== id),
    }));
  }

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading logos…</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <div className="admin-main admin-logos-page">
          <p className="text text-16 admin-logos-intro">
            Image-only Create and Delete. No edit — upload a new image or remove
            an existing one, then Save.
          </p>
          <LogoGrid
            title="Partners"
            hint="Shown in the About page partners marquee."
            items={content.partners}
            disabled={saving}
            onAdd={(file) => handleAdd("partners", file)}
            onDelete={(id) => handleDelete("partners", id)}
          />
          <LogoGrid
            title="Clients"
            hint="Shown in the About page clients marquee."
            items={content.clients}
            disabled={saving}
            onAdd={(file) => handleAdd("clients", file)}
            onDelete={(id) => handleDelete("clients", id)}
          />
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
