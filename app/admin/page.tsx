import type { Metadata } from "next"
import { UnderConstruction } from "@/components/under-construction"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <UnderConstruction titleKey="admin.title" textKey="admin.constructionText" />
}
