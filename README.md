
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL-3.0][license-shield]][license-url]

# Deep learning in Radiotherapy products

> **Note**: The website is currently under development. We welcome contributions to verify and improve the product information accuracy.

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
- **Multiple Versions**: Different versions of the same product can be tracked with separate `version` and `releaseDate` fields
- **Comprehensive Data**: Each product includes regulatory, technical, market, and evidence information

### Steps to Add a New Product

1. **Determine the Appropriate Category**
   - Products are organized by primary category in `src/data/products/` directory
   - Use `secondaryCategories` field for products that span multiple categories
   - See the [Review Guide](./docs/review/GUIDE.md) for current categories

2. **Create or Update the Company-Specific File**
   - Each company has its own file in the appropriate category directory
   - If the company already exists, add your product to its file
   - If it's a new company, create a new file named `company-name.ts`
   - Example: `src/data/products/auto-contouring/varian.ts`

3. **Follow the Data Format**
   - See [example templates](./src/data/products/examples) for properly formatted data
   - Include `secondaryCategories` array for multi-category products
   - Use separate entries for different product versions with distinct `version` and `releaseDate` fields
   - Ensure all dates follow YYYY-MM-DD format
   - Include regulatory information with proper structure

4. **Multiple Versions Support**
   - Create separate product entries for major version releases
   - Use consistent `id` patterns (e.g., `product-v1`, `product-v2`)
   - Track evolution through `version` and `releaseDate` fields
   - Maintain backward compatibility in data structure

5. **Update the Category Index**
   - After adding the product, update the category index file to include your new products

6. **Add the Company Logo**
   - Place the company logo in the `/public/logos/` directory
   - Use a consistent naming scheme: `company-name.png`

### Change Tracking & Dates

- Update `lastUpdated` every time you edit any field in the product entry (structure, evidence, regulatory, etc.).
- Refresh `lastRevised` only after a reviewer-level QA pass—the value feeds the `/review` listing table.
- When in doubt, consult the [Field Reference](./docs/FIELD_REFERENCE.md) for per-field rules and allowed values.

For complete examples, refer to the example templates in `src/data/products/examples/`.

---

## Key Features

- **Product Database**: Comprehensive catalog of AI/ML products in radiotherapy
- **Multi-Role System**: User, Reviewer, Company Representative, Admin roles
- **Company Certifications**: Verified product certifications from manufacturers
- **Review System**: Structured product review with assignment workflows
- **Compliance Resources**: Regulatory information and compliance checklists
- **Research Initiatives**: Database of datasets, challenges, and model zoos
- **User Tracking**: Track products you use or are evaluating
- **Community Experiences**: Share and view product adoption experiences
- **Healthcare Interoperability**: FHIR R4 export for hospital system integration
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
