import { createFileRoute } from "@tanstack/react-router";
import { Admin } from "@/components/AdminApp";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin Dashboard — Zobayerul Islam" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: Admin,
});
