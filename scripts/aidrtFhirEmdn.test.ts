import { describe, expect, test } from "bun:test";
import { ALL_PRODUCTS } from "../src/data";
import { getProductEudamed } from "../src/utils/eudamed";
import { convertToAidrt } from "../src/utils/modelCard/aidrtExporter";
import { transformProductToDeviceDefinition } from "../src/utils/fhir/transformers/deviceDefinition";

const withEmdn = ALL_PRODUCTS.find((p) => getProductEudamed(p)?.emdnCode?.trim())!;
const without = ALL_PRODUCTS.find((p) => !getProductEudamed(p))!;

describe("EMDN code as a separate export item", () => {
  test("AID-RT card carries EMDN in its own field", () => {
    const card = convertToAidrt(withEmdn);
    expect(card.model_basic_information.eudamed_emdn_code).toBe(getProductEudamed(withEmdn)!.emdnCode!.trim());
    expect(card.model_basic_information.eudamed_basic_udi_di).toBe(getProductEudamed(withEmdn)!.basicUdi);
  });
  test("AID-RT card uses NA when no registry match", () => {
    expect(convertToAidrt(without).model_basic_information.eudamed_emdn_code).toBe("NA");
  });
  test("FHIR DeviceDefinition has an EMDN classification", () => {
    const { deviceDefinition } = transformProductToDeviceDefinition(withEmdn);
    const codes = (deviceDefinition.classification ?? []).flatMap((c) => c.type?.coding ?? []);
    expect(codes.some((c) => c.system?.includes("emdn") && c.code === getProductEudamed(withEmdn)!.emdnCode!.trim())).toBe(true);
  });
});
