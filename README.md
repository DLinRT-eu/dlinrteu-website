
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL-3.0][license-shield]][license-url]

# Deep learning in Radiotherapy products

> **Note**: The website is currently under development. We welcome contributions to verify and improve the product information accuracy.

## Who DLinRT.eu helps

- **Clinicians** — radiation oncologists, medical physicists, and RTTs evaluating whether a product is safe and mature enough for their patients.
- **HTA / Payers** — assessors and procurement teams identifying evidence and guideline gaps that delay adoption.
- **Vendors / Companies** — manufacturers seeking visibility and the option to display certified, manufacturer-verified product information; DLinRT is often the first access point users have to a product.
- **Researchers** — academics and clinical scientists planning validation or comparative studies.

See [Resources & Compliance → Who we help](https://dlinrt.eu/resources-compliance#stakeholders) for the per-audience views and suggested thresholds.

## Documentation

- **[Admin Guide](./docs/ADMIN_GUIDE.md)** - User management, review assignment, security monitoring
- **[Reviewer Guide](./docs/REVIEWER_GUIDE.md)** - Product review workflow and best practices
- **[Review Guide](./docs/review/GUIDE.md)** - How to review and update product information
- **[Field Reference](./docs/FIELD_REFERENCE.md)** - Definitions for every product field (useful when updating `lastUpdated`/`lastRevised`)
- **[Security Policy](./SECURITY.md)** - Security features, GDPR compliance, and reporting vulnerabilities
- **[Manufacturer Templates](./MANUFACTURER_TEMPLATES.md)** - Communication templates

For complete documentation overview, see [DOCUMENTATION_LINKS.md](./DOCUMENTATION_LINKS.md)



---

## Adding New Products

### Product Structure Overview

Products in DLinRT.eu support:

- **Multiple Categories**: Products can belong to multiple categories using the `secondaryCategories` field
- **Per-Category Evidence**: Use `categoryEvidence` to scope training/evaluation data and E/I/R levels per category for multi-category products
- **Multiple Versions**: Different versions of the same product can be tracked with separate `version` and `releaseDate` fields, plus `priorVersions` / `supersededBy` for cross-linking
- **Comprehensive Data**: Each product carries regulatory, technical, market, transparency (training/evaluation data), evidence (E/I/R), and safety-corrective-action information

### Catalog Inclusion Gate

A product enters the live catalog only when `hasRegulatoryApproval` resolves true — i.e. CE marked, FDA cleared, MDR-exempt with documented rationale, or approval/registration by NMPA, TGA, TFDA, PMDA, MFDS, Health Canada, ANVISA, MHRA, or UKCA. Products awaiting approval belong under `src/data/products/pipeline/`. DLinRT also restricts scope to AI/Deep Learning for radiotherapy — classical image processing and general QA tools are excluded unless their intended use explicitly targets AI-generated outputs.

### Source Disclosure

Every factual field must trace to a disclosed source. Use the top-level `source` field for the General Information card (multiple sources separated by `; `; embedded `http(s)` URLs are auto-linked and shortened in the UI with full-URL hover tooltips). Per-block sources (`trainingData.source*`, `evaluationData.source*`, `structuresProvenance`) accept `sourceAccess` (`public` / `regulatory` / `vendor-provided` / `restricted`) and require `sourceRetrievedOn` (`YYYY-MM-DD`) for non-public sources.

### Steps to Add a New Product

1. **Determine the appropriate category**
   - Products are organized by primary category in `src/data/products/<category>/`
   - Categories: `auto-contouring`, `clinical-prediction`, `image-enhancement`, `image-synthesis`, `performance-monitor`, `platform`, `reconstruction`, `registration`, `tracking`, `treatment-planning`
   - Use `secondaryCategories` for products that span multiple categories; use `categoryEvidence` to scope evidence per category

2. **Create or update the company-specific file**
   - Each company has its own file in the appropriate category directory
   - If the company already exists, add your product to its file
   - If it's a new company, create `company-name.ts`
   - Example: `src/data/products/auto-contouring/varian.ts`

3. **Follow the data format**
   - See [example templates](./src/data/products/examples) and the [Field Reference](./docs/FIELD_REFERENCE.md) for properly formatted data
   - Include `secondaryCategories` for multi-category products
   - Use separate entries for major versions; cross-link via `priorVersions` / `supersededBy`
   - All dates follow `YYYY-MM-DD`
   - Include regulatory information (`regulatory.ce` / `.fda` / `.tga` / `.tfda` / etc.) and a one-line `certification` summary
   - Set `usesAI` explicitly to `false` for non-AI tools (e.g. classical QA monitors); the default is `true`
   - Assign Evidence Rigor (E0–E3), Clinical Impact (I0–I5), and Adoption Readiness (R0–R5) with `*Notes` justification

4. **Update the category index** — add the export in the category `index.ts`

5. **Add the company logo** to `/public/logos/` using a consistent `company-name.png` (or `.svg`) name

### Change Tracking & Dates

- Update `lastUpdated` every time you edit any field in the product entry
- Refresh `lastRevised` only after a reviewer-level QA pass — it feeds the `/review` listing
- Set `companyRevisionDate` when a vendor representative formally re-verifies the entry
- When in doubt, consult the [Field Reference](./docs/FIELD_REFERENCE.md) for per-field rules and allowed values

For complete examples, refer to `src/data/products/examples/`.


---

## Key Features

- **Product Database**: Comprehensive catalog of AI/ML products in radiotherapy
- **Multi-Role System**: User, Reviewer, Company Representative, Admin roles. Company representatives can be onboarded either by **admin email invitation** (immediate verification) or by **self-service role request** (admin-reviewed)
- **Company Certifications**: Verified product certifications from manufacturers
- **Review System**: Structured product review with assignment workflows
- **Training Data Transparency**: Dataset size, demographics, disclosure level tracking per product
- **FSCA/Recall Tracking**: Field Safety Corrective Actions and recalls from FDA, BfArM, MHRA, EUDAMED
- **Compliance Resources**: Regulatory information and compliance checklists
- **Research Initiatives**: Database of datasets, challenges, and model zoos
- **User Tracking**: Track products you use or are evaluating
- **Community Experiences**: Share and view product adoption experiences
- **Healthcare Interoperability**: FHIR R4 export with TGA/TFDA support, evidence classification, and Schema.org JSON-LD SEO
- **Comprehensive Exports**: CSV with 23+ transparency and safety columns, FHIR R4 bundles, model cards
- **GDPR Compliance**: Data export, anonymization, and consent management

## Backend & Database

This project uses **Supabase** for backend functionality:
- User authentication with role-based access control (RBAC)
- PostgreSQL database with Row Level Security (RLS)
- Edge functions for serverless logic
- Real-time notifications
- Secure file storage

**User roles**: User, Reviewer, Company Representative, Administrator

## Development

This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS
- Supabase (Database, Auth, Edge Functions)
- TanStack Query (React Query)
- Shadcn/ui Components

### Running Locally

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone https://github.com/DLinRT-eu/dlinrteu-website.git

# Navigate to the project directory
cd dlinrteu-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

You can also use GitHub Codespaces for development:

1. Navigate to the repository
2. Click "Code" > "Codespaces"
3. Create a new codespace to start developing

## License

This project is licensed under the GNU AGPL-3.0 License - see the LICENSE file for details.

## Team

**Matteo Maspero**  
Project Lead – Computational Imaging Group Utrecht

Feel free to contact the Project Lead in case you would like to be involved!

## How to Contribute

We welcome contributions to improve the accuracy of product information. If you notice any inaccuracies or have updates about the AI products listed, please:

1. Open an issue describing the update needed.
2. Submit a pull request with your changes.
3. Ensure proper attribution and documentation.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DLinRT-eu/dlinrteu-website.svg?style=for-the-badge
[contributors-url]: https://github.com/DLinRT-eu/dlinrteu-website/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DLinRT-eu/dlinrteu-website.svg?style=for-the-badge
[forks-url]: https://github.com/DLinRT-eu/dlinrteu-website/network/members
[stars-shield]: https://img.shields.io/github/stars/DLinRT-eu/dlinrteu-website.svg?style=for-the-badge
[stars-url]: https://github.com/DLinRT-eu/dlinrteu-website/stargazers
[issues-shield]: https://img.shields.io/github/issues/DLinRT-eu/dlinrteu-website.svg?style=for-the-badge
[issues-url]: https://github.com/DLinRT-eu/dlinrteu-website/issues
[license-shield]: https://img.shields.io/github/license/DLinRT-eu/dlinrteu-website.svg?style=for-the-badge
[license-url]: https://github.com/DLinRT-eu/dlinrteu-website/blob/master/LICENSE
