import { parse } from "yaml";
import peopleSource from "../../_data/people.yaml?raw";
import publicationsSource from "../../_data/pub.yaml?raw";
import gallerySource from "../../_data/gallery.yaml?raw";

const parsedPeople = parse(peopleSource) ?? {};

export const people = {
  faculty: Array.isArray(parsedPeople.faculty) ? parsedPeople.faculty : [],
  labMembers: Array.isArray(parsedPeople.lab_members) ? parsedPeople.lab_members : [],
  collaborators: Array.isArray(parsedPeople.collaborators) ? parsedPeople.collaborators : [],
  alumni: Array.isArray(parsedPeople.alumni) ? parsedPeople.alumni : [],
};

export const publications = (parse(publicationsSource) ?? [])
  .filter(Boolean)
  .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));

export const gallery = (parse(gallerySource) ?? [])
  .filter(Boolean)
  .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
