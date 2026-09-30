
import { Initiative } from "@/types/initiative";

export const RESEARCH_SOFTWARE_INITIATIVES: Initiative[] = [
  {
    id: "rs4rt",
    name: "RS4RT",
    category: "Research Software",
    description: "Resource-Sharing for Radiotherapy: a community platform sharing open-source software, data, AI tools, commercial solutions and educational resources for radiotherapy. Its software catalogue is curated in the Research Software Directory (RSD), with per-package metadata, repository links and licenses. Only part of the catalogue is AI — the collection is broader research software, listed here as a resource hub; inclusion does not imply regulatory clearance or clinical validation.",
    website: "https://rs4rt.org/",
    organization: "RS4RT community",
    status: "Active",
    lastVerified: "2026-09-30",
    tags: ["Open Source", "Radiotherapy", "Community", "Software Catalogue", "Resource Sharing"],
    features: [
      "Community-curated catalogue of open-source radiotherapy research software (e.g. CERR, CIL, AMIGOpy, conehead)",
      "Per-package entries in the Research Software Directory with repository links, metadata and licenses",
      "Subject areas including treatment planning and dosimetry, imaging, and clinical workflow",
      "Complementary links to datasets, AI tools and educational resources",
      "Contributions from the radiotherapy research community welcome"
    ],
    dataAccess: "Freely browsable; each package is governed by its own license and repository",
    additionalLinks: [
      {
        label: "Browse software on RSD",
        url: "https://research-software-directory.org/communities/rs4rt/software"
      }
    ]
  },
];
