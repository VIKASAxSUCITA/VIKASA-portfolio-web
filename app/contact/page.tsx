import { redirect } from "next/navigation";

/** Contact lives on the home page at #contact. */
export default function Page() {
  redirect("/#contact");
}
