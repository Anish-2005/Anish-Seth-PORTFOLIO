import { HomeClient } from "@/app/HomeClient";
import { getNotes, getProjects } from "@/lib/content";

export default function Home() {
  const projects = getProjects();
  const notes = getNotes();
  return <HomeClient projects={projects} notes={notes} />;
}
