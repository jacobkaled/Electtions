import { json } from "@sveltejs/kit";
import data from "./data.json";

export async function GET() {
  const regoins = data.OKRES.map((okres) =>
    okres.OBEC.map((obec) => ({
      okres: okres.NAZ_OKRES,
      obec: obec.NAZ_OBEC,
    }))
  ).flat();

  return json(regoins);
}
