import { SinglePagePortfolio } from "@/app/SinglePagePortfolio";
import { getNotes, getProjects } from "@/lib/content";

export default function Home() {
  const projects = getProjects();
  const notes = getNotes();
  return <SinglePagePortfolio projects={projects} notes={notes} />;
}
