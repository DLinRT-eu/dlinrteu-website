# Update the share picture and description for /products

## What you asked
- Use a screenshot of the home page as the picture shown when /products is shared.
- Check whether the description used for search and social is still accurate.

## What I found
- The picture file the whole site points to (`opengraph-image.png`) is not actually an image — it is a 128-byte text file. So today no share preview shows anywhere, not just on /products.
- The /products description says the catalog covers "auto-contouring, treatment planning, imaging, and clinical prediction". The catalog is now broader: it also includes registration, tracking, performance monitoring, platforms, positioning, reconstruction and image synthesis.

## What I will do
1. Take a clean screenshot of the home page at the standard share size (1200x630) and save it as a real image in the site's public files.
2. Point the /products page's share picture at that new screenshot (leaving other pages untouched unless you want the same fix sitewide).
3. Rewrite the /products description so it reflects the full range of categories, staying under the length search engines display.
4. Leave the title, page content, structured data, sitemap and every other page as they are.

## Note
The change reaches the live site at dlinrt.eu only after the next publish. Social networks that already fetched the page keep showing their cached version until they re-fetch.

## Open question
Should the new screenshot also become the sitewide default picture (fixing the broken one for every page), or only be used for /products?
