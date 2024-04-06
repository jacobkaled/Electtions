import { json } from "@sveltejs/kit";
import data from "../regions/data.json";

export async function GET(event) {
  if (
    !event.url.searchParams.has("okres") ||
    !event.url.searchParams.has("obec")
  )
    return json([]);

  const inputOkres = event.url.searchParams.get("okres");
  const inputObec = event.url.searchParams.get("obec");

  const d = data.OKRES.find((okres) => okres.NAZ_OKRES === inputOkres);
  if (!d) {
    return json([]);
  }
  const f = d?.OBEC.find((obec) => obec.NAZ_OBEC === inputObec);
  if (!f) {
    return json([]);
  }
  return json(f.HODN_KAND);
}
