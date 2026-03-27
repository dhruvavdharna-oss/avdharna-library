# Avdharna Digital Library

Static website for `avdharna.in/library`, prepared for free Vercel deployment.

## What is included

- No login required
- Static website only
- Avdharna logo integrated
- 8 categories
- 8 titles in each category
- Search + category filters + sorting
- External reference/search links for each title

## Categories included

- Environmental Impact Assessment (EIA)
- Architecture
- BIM & GIS
- Valuation & Real Estate
- Organic Farming & Soil Health
- Sustainable Cities & Urban Planning
- Urban Design & Public Realm
- Solar & Renewable Energy

## How to make it a true PDF library later

1. Create `library/pdfs/`
2. Upload your own licensed PDF files there
3. Open `library/data/books.js`
4. Replace `readUrl` and `downloadUrl` for any title with local file paths such as:

```js
readUrl: "./pdfs/my-book.pdf",
downloadUrl: "./pdfs/my-book.pdf"
```

## Deploy on Vercel

1. Upload the folder to GitHub
2. Import the repo into Vercel
3. Deploy
4. Point your domain `avdharna.in` to Vercel
5. Open `https://avdharna.in/library`

## Important

Use only books or PDFs that you own, are licensed to share, or are openly available.
