import { ProductDetails } from "@/types/productDetails";
import { PHILIPS_MRCAT_BRAIN_PRODUCTS } from "./philips-mrcat-brain";
import { PHILIPS_MRCAT_PELVIS_PRODUCTS } from "./philips-mrcat-pelvis";
import { PHILIPS_MRCAT_HEAD_NECK_PRODUCTS } from "./philips-mrcat-head-neck";
import { PHILIPS_MRCAT_PROSTATE_PRODUCTS } from "./philips-mrcat-prostate";
import { SIEMENS_PRODUCTS } from "./siemens";
import { SPECTRONIC_PRODUCTS } from "./spectronic";

import { THERAPANACEA_MRBOX_PRODUCTS } from "./therapanacea";
import { THERAPANACEA_ADAPTBOX_PRODUCTS } from "./therapanacea-adaptbox";

export const IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  ...PHILIPS_MRCAT_BRAIN_PRODUCTS,
  ...PHILIPS_MRCAT_PELVIS_PRODUCTS,
  ...PHILIPS_MRCAT_HEAD_NECK_PRODUCTS,
  ...PHILIPS_MRCAT_PROSTATE_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...SPECTRONIC_PRODUCTS,
  ...THERAPANACEA_MRBOX_PRODUCTS,
  ...THERAPANACEA_ADAPTBOX_PRODUCTS
];
