import { TypeRepository } from "../TypeRepository";
import ProdEncounterRepository from "./prodRepository";
import EncounterRepository from "./repository";

export function getPersonnelRepository(
  t: TypeRepository = "fake"
): EncounterRepository {
  if (t === "fake") {
    return new EncounterRepository();
  }
  return new ProdEncounterRepository();
}
