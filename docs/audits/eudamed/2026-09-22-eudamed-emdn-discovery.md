# EUDAMED EMDN discovery sweep — 2026-09-22

Read-only discovery sweep against the public EUDAMED API (`https://ec.europa.eu/tools/eudamed/api`) using the official EMDN workbook downloaded from the European Commission EMDN page. EMDN is the nomenclature used for device registration in EUDAMED.

> **Educational reference only.** This report records public registration metadata and screening leads. It is not a regulatory determination and does not mean any product is clinically validated.

## Scope

- EMDN source: https://health.ec.europa.eu/medical-devices-topics-interest/european-medical-devices-nomenclature-emdn_en
- Workbook: https://webgate.ec.europa.eu/dyna2/emdn/build/EMDN%20v2026_EN.xlsx
- Branches: Z1101, Z1104
- Catalogue rule applied: include only products with disclosed AI/deep-learning use in a core radiotherapy function. CE registration alone is not sufficient.
- EUDAMED caveat: device registration becomes mandatory on 2026-05-28; absence from EUDAMED is not proof that a CE mark is absent.

## Branch summary

| Branch | Official term | Codes in branch | Terminal codes | Returned rows | Deduplicated rows | Filter reliable | Note |
|---|---|---:|---:|---:|---:|---|---|
| Z1101 | RADIOTHERAPY AND RADIOSURGERY INSTRUMENTS | 70 | 59 | 148 | 74 | yes | — |
| Z1104 | ECHOGRAPHY INSTRUMENTS | 45 | 32 | 67 | 42 | yes | — |

## Screening summary

| Status | Count | Meaning |
|---|---:|---|
| catalogue-match | 14 | Already represented in DLinRT by Basic UDI-DI or manufacturer/name match |
| missing-candidate | 0 | EUDAMED row contains AI/segmentation/planning wording and needs public-source verification |
| manual-review | 60 | Radiotherapy software row, but AI/deep-learning use is not disclosed in EUDAMED |
| out-of-scope | 42 | Hardware/accessory/general ultrasound/non-AI record by row wording |

## Missing candidates and manual-review rows

| Status | Trade name | Manufacturer | Branch | EMDN code | Risk | Basic UDI-DI | Reason | EUDAMED |
|---|---|---|---|---|---|---|---|---|
| manual-review | Accuray Precision | Accuray Incorporated | Z1101 | Z11010401 | class-iib | 081137603PrecisionC3 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/7b19a27b-9107-4e77-bbe4-621e638a21f8) |
| manual-review | Adapt LTE Powered by Cenos | Accuray Incorporated | Z1101 | Z11019092 | class-i | 081137603AdaptLTEP9 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019092) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/56901d4d-77ba-4554-9de1-3c843a53493d) |
| manual-review | 3D Brachy Application | Adaptiiv Medical Technologies Inc. | Z1101 | Z11010392 | class-i | 08600074023SoftwareEK | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010392) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/35402584-8be4-46e5-a5c7-f35afd8859ef) |
| manual-review | SagiPlan® Treatment Planning System, preconfigured Notebook EN | BEBIG Medical GmbH | Z1101 | Z11010392 | class-iib | 40659830002BC3 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010392) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5f89620b-1df3-413a-b7f0-90c611298421) |
| manual-review | RT Elements - Cranial SRS w/ Cones, 3.0 | Brainlab SE | Z1101 | Z11010492 | class-iib | B-04056481000530 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/79d15655-0a46-49ec-ab51-0f9e79e3bdfd) |
| manual-review | RT Elements - Cranial SRS, 3.0 | Brainlab SE | Z1101 | Z11010492 | class-iib | B-04056481142100 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/12d99abb-fc46-41e3-9e32-66093d13892e) |
| manual-review | RT Elements - Dose Review, 3.0 | Brainlab SE | Z1101 | Z11010492 | class-iib | B-04056481142131 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/20d0b348-2acf-4b7e-bf9e-88b717d729b5) |
| manual-review | RT Elements - Multiple Brain Mets SRS, 3.0 | Brainlab SE | Z1101 | Z11010492 | class-iib | B-04056481142094 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5d4d6dee-b84e-4ed1-b042-cbb0a8734a6f) |
| manual-review | RT Elements - RT QA, 3.0 | Brainlab SE | Z1101 | Z11010492 | class-iib | B-04056481142124 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/a154df41-4a18-4414-8201-cadfcca3f1c4) |
| manual-review | RT Elements - Spine SRS, 3.0 | Brainlab SE | Z1101 | Z11010492 | class-iib | B-04056481142117 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/388ade9b-1af9-4590-8106-d038b5ca2342) |
| manual-review | RT Elements, 4.7 | Brainlab SE | Z1101 | Z11010492 | class-iib | 4056481RTElementsW8 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/c2e4a9b6-4e3f-4e09-bbb5-9f639098bc93) |
| manual-review | EPIbeam | DOSISOFT | Z1101 | Z11019092 | class-iib | B-+B501THINKQA0100060 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019092) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/f97ab04f-00e4-4328-8760-fe7dcf44fd3d) |
| manual-review | EPIgray | DOSISOFT | Z1101 | Z11019092 | class-iib | B-+B501EPIGRAY0200100 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019092) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/68cea146-b19d-4335-a82a-48ce2da20551) |
| manual-review | ISOgray | DOSISOFT | Z1101 | Z11010401 | class-iib | B-+B501ISOGRAY0403010 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/cb317912-339c-4133-a7b8-6bbd275feb04) |
| manual-review | MU2net | DOSISOFT | Z1101 | Z11019092 | class-i | B-+B501MU2NET0201010 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019092) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/cf88bb03-b469-4f4f-8186-d7efce1a57f2) |
| manual-review | ThinkQA Edition 2 | DOSISOFT | Z1101 | Z11019092 | class-i | ++B501THINKQA0200000RP | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019092) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/4cd72a66-cfda-4dc9-ba11-7d1297b13d2b) |
| manual-review | EBS Preoperative planning software | Ekliptik razvoj in svetovanje d.o.o. | Z1101 | Z11010292 | class-i | B-03830061890954 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010292) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/4b3d5ac1-275c-4c8f-8346-1870d5bbdaa1) |
| manual-review | Leksell GammaPlan 11.5 | Elekta Solutions AB | Z1101 | Z11010782 | class-iib | 073400483BUDI000000001ZQ | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010782) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/9ebde251-2d9b-4a3a-8ab5-3678e111d393) |
| manual-review | Monaco RTP System | Elekta Solutions AB | Z1101 | Z11010401 | class-iib | 00858164002BUDI0000002H9 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/c734a074-80d9-4098-9b2e-d1aab68ac818) |
| manual-review | Oncentra Brachy | Elekta Solutions AB | Z1101 | Z11010492 | class-iib | 073402015BUDI000000030PE | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/4a6288a5-7c55-4e59-a15e-168c8a210323) |
| manual-review | radiance v4 | GMV SOLUCIONES GLOBALES INERNET S.A.U. | Z1101 | Z11010401 | class-iib | B-08436567540017 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/bad7bd6c-401b-4698-b6c2-99a5bb5b85a2) |
| manual-review | Radiance v5 | GMV SOLUCIONES GLOBALES INERNET S.A.U. | Z1101 | Z11010401 | class-iib | 843656754RADIANCEA2 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/693e5748-1dfb-44c5-9071-1abc2b7d9655) |
| manual-review | — | Ion Beam Applications SA | Z1101 | Z11019082 | class-iib | 54040138IBA-PTC-00PN | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5b0cc575-367e-4843-b51c-44e28419a7ef) |
| manual-review | 4SeePlan | Linearbeam srl | Z1101 | Z11010492 | class-iib | 805361401TPS0017Y | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/b82591bb-b9f3-4f86-912c-4385c72663a9) |
| manual-review | MRIA | Manteia Technologies Co., Ltd. | Z1101 | Z11010492 | class-iia | 697312740MRIALG | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/54a467b4-db2e-4cef-8ad8-e70501379832) |
| manual-review | Pinnacle3® | Philips Medical Systems (Cleveland), Inc. | Z1101 | Z11010401 | class-iib | B-00884838102965 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/2eb3c7ea-3ee6-4dcf-9c20-a9119971707e) |
| manual-review | — | Radiochromic S.L. | Z1101 | Z11010182 | class-i | ++B9875X1RN | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/7a255ff7-6e4d-44a1-9f44-f0f4c997ef62) |
| manual-review | — | Radiochromic S.L. | Z1101 | Z11010182 | class-i | ++B9876X0RR | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/002e4b97-09c7-4639-b6bd-a8a6fa72536a) |
| manual-review | — | Radiochromic S.L. | Z1101 | Z11010182 | class-i | ++B9875X0RL | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5cc6f6b2-6419-49b9-a45b-e78761b50e72) |
| manual-review | — | Radiochromic S.L. | Z1101 | Z11010182 | class-i | ++B9874X0RF | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/8b7acb89-efe9-4941-a73b-a3ad3adf8d5f) |
| manual-review | — | Radiochromic S.L. | Z1101 | Z11010182 | class-i | ++B9873X4RJ | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/1a57bc38-27f8-40f7-8474-221296340325) |
| manual-review | RayCare v2026 | RAYSEARCH LABORATORIES AB (PUBL) | Z1101 | Z11019082 | class-iib | 73500020106HJ | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/89c16cb4-1124-4703-8796-86ec9be75429) |
| manual-review | RayStation 2023B | RAYSEARCH LABORATORIES AB (PUBL) | Z1101 | Z11019082 | class-iib | 73500020101H8 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/86ca03ac-cd17-49da-8a75-06042cee9ea0) |
| manual-review | RayStation v2025 SPC2 | RAYSEARCH LABORATORIES AB (PUBL) | Z1101 | Z11019082 | class-iib | 73500020105HG | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/4b80a171-4967-4fab-afef-6b063ca0bbc6) |
| manual-review | — | Shanghai United Imaging Healthcare Co.,Ltd. | Z1101 | Z11010192 | class-iib | 697157683522NP | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010192) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/ee590eee-4be9-4ffe-9b6e-b37abf203c2a) |
| manual-review | — | Shanghai United Imaging Healthcare Co.,Ltd. | Z1101 | Z11010192 | class-iib | 697157683521NM | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010192) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/ce8ca660-0ef2-406e-b755-c5de782e0c9e) |
| manual-review | Adaptivo | Standard Imaging, Inc. | Z1101 | Z11010182 | class-i | 08665620002ADAPTIVONV | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/a654c6cc-e647-4da5-9528-c61a96cacc9b) |
| manual-review | Exradin A30 | Standard Imaging, Inc. | Z1101 | Z11019082 | class-i | 0850019946EXRADINICL5 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/0d889dbb-8975-462b-abe3-16debed7d333) |
| manual-review | IMSure | Standard Imaging, Inc. | Z1101 | Z11010182 | class-i | 08665620002IMSURE8S | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/c4957c36-c090-411b-9f05-d03abd3837c5) |
| manual-review | LinacView | Standard Imaging, Inc. | Z1101 | Z11010182 | class-i | 08665620002LINACVIEWHF | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/a8bde1b8-a207-417e-855c-3ebaad329c64) |
| manual-review | MAX SD Electrometer | Standard Imaging, Inc. | Z1101 | Z11019082 | class-i | 0850019946EMETERSCINTIAU | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5f4cb99e-20e6-47db-8405-a05bdfa59fbe) |
| manual-review | PIPSpro | Standard Imaging, Inc. | Z1101 | Z11010182 | class-i | 08665620002PIPSPROPX | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5519544e-38fc-4250-9526-405d0d343cbd) |
| manual-review | QA Pilot | Standard Imaging, Inc. | Z1101 | Z11010182 | class-i | 08665620002QAPILOTJF | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/4fcf4ec2-64e1-46c1-a24e-c5f516cd9e7f) |
| manual-review | SuperMAX | Standard Imaging, Inc. | Z1101 | Z11019082 | class-i | 0850019946ELECTROMETER7L | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/906b7c6b-7aae-4a27-bba0-827e30b7a018) |
| manual-review | TomoScanner | Standard Imaging, Inc. | Z1101 | Z11019082 | class-i | 0850019946WATERTANKU9 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/e2390d2f-782f-45a7-8dcf-601a8621972f) |
| manual-review | SunCHECK | Sun Nuclear Corporation | Z1101 | Z11010192 | class-iib | 506060888SWSunCHECKTS | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010192) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/7f81e60f-a2d5-4401-ae21-7d2839ce0816) |
| manual-review | — | SYNAPTIQ TECHNOLOGIES SRL | Z1101 | Z11010292 | class-iia | 42700043558MediqRT59 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010292) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/c846b994-10e9-4320-910a-0ac792169825) |
| manual-review | InterVapor® Personalized Procedure Program (IP3®) | Uptake Medical Technology, Inc. | Z1101 | Z11010292 | class-iib | B-00855644003067 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010292) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/6747306b-91ae-4797-83a8-64936448f2bc) |
| manual-review | ARIA Radiation Therapy Management | Varian Medical Systems, Inc. | Z1101 | Z11010401 | class-iib | 089947500200119PV | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/453350d6-757d-490b-9e06-b26ae822a028) |
| manual-review | ARIA Radiation Therapy Management 15.6 | Varian Medical Systems, Inc. | Z1101 | Z11010401 | class-iib | B-00856100006110 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/682f8fde-76d2-4c02-8b07-706fa1297593) |
| manual-review | Eclipse Treatment Planning System | Varian Medical Systems, Inc. | Z1101 | Z11010401 | class-iib | 089947500200107PN | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/b0f6d185-0291-4e60-8f1f-560f6181a4da) |
| manual-review | Eclipse Treatment Planning System 15.6 | Varian Medical Systems, Inc. | Z1101 | Z11010482 | class-iib | B-00855141006066 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010482) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/1ef93eba-a891-4259-be9f-29067ae8e344) |
| manual-review | Ethos Treatment Management | Varian Medical Systems, Inc. | Z1101 | Z11010492 | class-iib | 089947500200117PR | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010492) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/2777f0ee-f2c9-470e-978d-06ad740299a9) |
| manual-review | Ethos Treatment Planning | Varian Medical Systems, Inc. | Z1101 | Z11010401 | class-iib | 089947500200121PG | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/0f026889-4be1-445d-bd64-4d4b729b85fb) |
| manual-review | Mobius3D | Varian Medical Systems, Inc. | Z1101 | Z11010482 | class-iib | 089947500200115PM | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010482) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/f36b18ac-99f1-4ffb-a2b2-2983419c9f3e) |
| manual-review | Varian Treatment | Varian Medical Systems, Inc. | Z1101 | Z11010401 | class-iib | 089947500200123PL | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010401) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/0b61e31c-1c93-4dc0-879c-daebb4d912d7) |
| manual-review | Varian Verification System | Varian Medical Systems, Inc. | Z1101 | Z11010182 | class-iib | 089947500200125PQ | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010182) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/5a0fcaa9-23b6-4d81-95f8-22a097924212) |
| manual-review | VariSeed 10.0 | Varian Medical Systems, Inc. | Z1101 | Z11010482 | class-iib | 089947500201007PQ | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010482) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/cb2a3c4f-99b7-42d7-b971-3e9f8bcbc706) |
| manual-review | Vitesse 5.0 | Varian Medical Systems, Inc. | Z1101 | Z11010482 | class-iib | 089947500201006PN | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11010482) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/25e31606-b73b-4604-b5ba-82d1fb67d421) |
| manual-review | Xstrahl XBeam Standalone Software v1.5.5 | Xstrahl Limited | Z1101 | Z11019082 | class-iib | B-05060494200169 | Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row. | [query](https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=300&size=300&languageIso2Code=en&cndCode=Z11019082) · [detail](https://ec.europa.eu/tools/eudamed/api/devices/basicUdiData/udiDiData/2a660b57-953c-4bdf-8ceb-4709476067e1) |

## Existing catalogue matches

| Trade name | Manufacturer | DLinRT product | EMDN code | Basic UDI-DI |
|---|---|---|---|---|
| — | Limbus AI Inc. | Limbus Contour | Z11010282 | 6280113821608Q |
| Limbus Contour | Limbus AI Inc. | Limbus Contour | Z11010282 | B-00628011382177 |
| AccuContour | Manteia Technologies Co., Ltd. | AccuContour | Z11010492 | 697312740AccuContourXE |
| AccuContour-Lite | Manteia Technologies Co., Ltd. | AccuContour | Z11010492 | 697312740AccuContourLTQ3 |
| MOZI TPS | Manteia Technologies Co., Ltd. | MOZI TPS | Z11010401 | 697312740MOZITPS77 |
| Contour+ (MVision AI Segmentation) | MVision AI Oy | Contour+ | Z11010292 | 64298300642AISEG1.2SZ |
| Dose+ | MVision AI Oy | Dose+ | Z11010292 | 642983006423Dose1.0DH |
| MVision Segmentation Service | MVision AI Oy | Contour+ | Z11010292 | B-06429830064206 |
| Workspace+ | MVision AI Oy | Workspace+ | Z11010292 | 642983006424WS1.0ZQ |
| MRI Planner | Spectronic Medical AB | MRI Planner | Z11010482 | B-07350097430017 |
| Plan AI | Sun Nuclear Corporation | Plan AI | Z11010192 | 506060888PlanAIXR |
| ART-Plan | THERAPANACEA | ART-Plan+ | Z11010482 | 3770019940ARTPLANN4 |
| ART-Plan | THERAPANACEA | ART-Plan+ | Z11010482 | 3770019940ARTPLANV2QP |
| ART-Plan | THERAPANACEA | ART-Plan+ | Z11010482 | 3770019940020YB |



## EMDN terminal scope checked

- Z11019004 — AUTOMATIC CURVE TRACERS
- Z11019005 — SHIELDING BLOCK CUTTERS
- Z11019080 — VARIOUS RADIOTHERAPY AND RADIOSURGERY INSTRUMENTS - HARDWARE ACCESSORIES
- Z11019082 — VARIOUS RADIOTHERAPY AND RADIOSURGERY INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11019085 — VARIOUS RADIOTHERAPY AND RADIOSURGERY INSTRUMENTS - CONSUMABLES
- Z11019092 — VARIOUS RADIOTHERAPY AND RADIOSURGERY INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11019099 — VARIOUS RADIOTHERAPY AND RADIOSURGERY INSTRUMENTS - OTHER
- Z11010101 — SINGLE ENERGY LINEAR ACCELERATORS
- Z11010102 — MEDIUM AND MULTI ENERGY LINEAR ACCELERATORS
- Z11010103 — MULTI AND HIGH ENERGY LINEAR ACCELERATORS
- Z11010104 — INTRA-OPERATIVE LINEAR ACCELERATORS
- Z11010180 — LINEAR ACCELERATORS - HARDWARE ACCESSORIES
- Z11010182 — LINEAR ACCELERATORS - SOFTWARE ACCESSORIES
- Z11010185 — LINEAR ACCELERATORS - CONSUMABLES
- Z11010192 — LINEAR ACCELERATORS - MEDICAL DEVICE SOFTWARE
- Z11010199 — LINEAR ACCELERATORS – OTHER
- Z11010201 — RADIOTHERAPY SIMULATORS
- Z11010202 — COMPUTED TOMOGRAPHY (CT) FOR RADIOTHERAPY SIMULATION
- Z11010280 — INSTRUMENTS FOR RADIOTHERAPY SIMULATION - HARDWARE ACCESSORIES
- Z11010282 — INSTRUMENTS FOR RADIOTHERAPY SIMULATION - SOFTWARE ACCESSORIES
- Z11010285 — INSTRUMENTS FOR RADIOTHERAPY SIMULATION - CONSUMABLES
- Z11010292 — INSTRUMENTS FOR RADIOTHERAPY SIMULATION - MEDICAL DEVICE SOFTWARE
- Z11010301 — BRACHYTHERAPY RADIATION SYSTEMS
- Z11010380 — BRACHYTHERAPY RADIATION SYSTEMS - HARDWARE ACCESSORIES
- Z11010382 — BRACHYTHERAPY RADIATION SYSTEMS - SOFTWARE ACCESSORIES
- Z11010385 — BRACHYTHERAPY RADIATION SYSTEMS - CONSUMABLES
- Z11010392 — BRACHYTHERAPY RADIATION SYSTEMS - MEDICAL DEVICE SOFTWARE
- Z11010401 — RADIOTHERAPY TREATMENT PLANNING SYSTEMS
- Z11010480 — RADIOTHERAPY TREATMENT PLANNING INSTRUMENTS - HARDWARE ACCESSORIES
- Z11010482 — RADIOTHERAPY TREATMENT PLANNING INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11010485 — RADIOTHERAPY TREATMENT PLANNING INSTRUMENTS - CONSUMABLES
- Z11010492 — RADIOTHERAPY TREATMENT PLANNING INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11010501 — INTRAVASCULAR RADIOTHERAPY SYSTEMS
- Z11010580 — INTRAVASCULAR RADIOTHERAPY INSTRUMENTS - HARDWARE ACCESSORIES
- Z11010582 — INTRAVASCULAR RADIOTHERAPY INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11010585 — INTRAVASCULAR RADIOTHERAPY INSTRUMENTS - CONSUMABLES
- Z11010592 — INTRAVASCULAR RADIOTHERAPY INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11010701 — RADIOSURGERY SYSTEMS
- Z11010780 — RADIOSURGERY INSTRUMENTS - HARDWARE ACCESSORIES
- Z11010782 — RADIOSURGERY INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11010785 — RADIOSURGERY INSTRUMENTS - CONSUMABLES
- Z11010792 — RADIOSURGERY INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11010801 — TOMOTHERAPY SYSTEMS
- Z11010880 — TOMOTHERAPY INSTRUMENTS - HARDWARE ACCESSORIES
- Z11010882 — TOMOTHERAPY INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11010885 — TOMOTHERAPY INSTRUMENTS - CONSUMABLES
- Z11010892 — TOMOTHERAPY INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11010901 — INTEGRATED SYSTEMS FOR MAGNETIC RESONANCE RADIOTHERAPY
- Z11010980 — MAGNETIC RESONANCE RADIOTHERAPY INSTRUMENTS - HARDWARE ACCESSORIES
- Z11010982 — MAGNETIC RESONANCE RADIOTHERAPY INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11010985 — MAGNETIC RESONANCE RADIOTHERAPY INSTRUMENTS - SPECIFIC MATERIALS
- Z11010992 — MAGNETIC RESONANCE RADIOTHERAPY INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11011001 — PROTON THERAPY SYSTEMS
- Z11011080 — PROTON THERAPY INSTRUMENTS - HARDWARE ACCESSORIES
- Z11011082 — PROTON THERAPY INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11011085 — PROTON THERAPY INSTRUMENTS - CONSUMABLES
- Z11011092 — PROTON THERAPY INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11019001 — CAESIUM THERAPY EQUIPMENT
- Z11019002 — COBALT THERAPY EQUIPMENT
- Z11040101 — INTERNAL ULTRASOUND SCANNERS
- Z11040102 — CARDIOLOGY ULTRASOUND SCANNERS
- Z11040103 — PORTABLE ULTRASOUND SCANNERS
- Z11040104 — MULTIDISCIPLINARY ULTRASOUND SCANNERS (INTERNAL AND CARDIOLOGY, ETC.)
- Z11040105 — OBSTETRIC/GYNAECOLOGICAL ULTRASOUND SCANNERS
- Z11040106 — HANDHELD ULTRASOUND SCANNERS
- Z11040107 — ECHOPHTHALMOGRAPHS
- Z1104018099 — ULTRASOUND SCANNERS – HARDWARE ACCESSORIES – OTHER
- Z11040182 — ULTRASOUND SCANNERS - SOFTWARE ACCESSORIES
- Z11040185 — ULTRASOUND SCANNERS - CONSUMABLES
- Z11040192 — ULTRASOUND SCANNERS - MEDICAL DEVICE SOFTWARE
- Z11040199 — ULTRASOUND SCANNERS - OTHER
- Z110402010101 — TWO–DIMENSIONAL LINEAR–ARRAY TRANSCUTANEOUS ULTRASOUND PROBES
- Z110402010102 — MULTIDIMENSIONAL LINEAR–ARRAY TRANSCUTANEOUS ULTRASOUND PROBES
- Z110402010201 — CURVILINEAR TRANSCUTANEOUS TWO–DIMENSIONAL ULTRASOUND PROBES  (CONVEX–ARRAY)
- Z110402010202 — CURVILINEAR TRANSCUTANEOUS MULTIDIMENSIONAL ULTRASOUND PROBES  (CONVEX–ARRAY)
- Z110402010301 — TRANSCUTANEOUS ULTRASOUND SECTOR PROBES (PHASED ARRAY), TWO–DIMENSIONAL
- Z110402010302 — TRANSCUTANEOUS ULTRASOUND SECTOR PROBES (PHASED ARRAY), MULTIDIMENSIONAL
- Z110402010401 — TRANSCUTANEOUS ULTRASOUND ACTIVE MATRIX PROBES, TWO–DIMENSIONAL
- Z110402010402 — TRANSCUTANEOUS ULTRASOUND ACTIVE MATRIX PROBES, MULTIDIMENSIONAL
- Z110402010501 — CMUT ARRAY TRANSCUTANEOUS ULTRASOUND PROBES, TWO–DIMENSIONAL
- Z110402010502 — CMUT ARRAY TRANSCUTANEOUS ULTRASOUND PROBES, MULTIDIMENSIONAL
- Z1104020201 — ENDOCAVITARY ULTRASOUND PROBES, TWO–DIMENSIONAL
- Z1104020202 — ENDOCAVITARY ULTRASOUND PROBES, MULTIDIMENSIONAL
- Z1104020301 — TRANSESOPHAGEAL ULTRASOUND PROBES, TWO–DIMENSIONAL
- Z1104020302 — TRANSESOPHAGEAL ULTRASOUND PROBES, MULTIDIMENSIONAL
- Z11040299 — ULTRASOUND PROBES – OTHER
- Z11049080 — VARIOUS ULTRASOUND INSTRUMENTS - HARDWARE ACCESSORIES
- Z11049082 — VARIOUS ULTRASOUND INSTRUMENTS - SOFTWARE ACCESSORIES
- Z11049085 — VARIOUS ULTRASOUND INSTRUMENTS - CONSUMABLES
- Z11049092 — VARIOUS ULTRASOUND INSTRUMENTS - MEDICAL DEVICE SOFTWARE
- Z11049099 — VARIOUS ULTRASOUND INSTRUMENTS - OTHER

## Catalogue action

Do not add products from this report automatically. Add only rows that pass a separate source review confirming: (1) AI/deep-learning is used, (2) the function is a core radiotherapy task, and (3) intended use and regulatory identity can be traced to disclosed sources.
