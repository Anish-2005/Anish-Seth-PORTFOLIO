import { describe, expect, it } from "vitest";

import { getNotes, getProjects } from "@/lib/content";

describe("content", () => {
  it("loads projects from src/content/projects", () => {
    const projects = getProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty("id");
    expect(projects[0]).toHaveProperty("title");
  });

  it("loads notes from src/content/notes", () => {
    const notes = getNotes();
    expect(notes.length).toBeGreaterThan(0);
  });
});
