const fs = require('fs');
const path = require('path');

const headers = [
  'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags', 'Published',
  'Option1 Name', 'Option1 Value', 'Option2 Name', 'Option2 Value', 'Option3 Name', 'Option3 Value',
  'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy',
  'Variant Fulfillment Service', 'Variant Price', 'Variant Compare At Price', 'Variant Requires Shipping',
  'Variant Taxable', 'Variant Barcode', 'Image Src', 'Image Position', 'Image Alt Text', 'Gift Card',
  'SEO Title', 'SEO Description', 'Google Shopping / Google Product Category', 'Google Shopping / Gender',
  'Google Shopping / Age Group', 'Google Shopping / MPN', 'Google Shopping / Condition',
  'Google Shopping / Custom Product', 'Google Shopping / Custom Label 0', 'Google Shopping / Custom Label 1',
  'Google Shopping / Custom Label 2', 'Google Shopping / Custom Label 3', 'Google Shopping / Custom Label 4',
  'Variant Image', 'Variant Weight Unit', 'Variant Tax Code', 'Cost per item', 'Included / United States',
  'Price / United States', 'Compare At Price / United States', 'Included / International',
  'Price / International', 'Compare At Price / International', 'Status'
];

const products = [
  {
    title: 'Plant-Based All-Purpose Surface Cleaner',
    price: '14.00',
    compareAtPrice: '18.00',
    qty: 50,
    imageSrc: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Tough on grease, gentle on the planet. Infused with natural tea tree and lemon extracts.</p>'
  },
  {
    title: 'Organic Lavender & Eucalyptus Dish Soap',
    price: '12.00',
    compareAtPrice: '',
    qty: 45,
    imageSrc: 'https://images.unsplash.com/photo-1608248597359-451648a9e46c?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Ultra-foaming plant-powered dish soap that cuts through grease while softening hands.</p>'
  },
  {
    title: 'Ultra-Concentrated Natural Laundry Detergent Sheets (60 Loads)',
    price: '22.00',
    compareAtPrice: '26.00',
    qty: 30,
    imageSrc: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Zero plastic, zero mess. Dissolves completely in hot or cold wash cycles.</p>'
  },
  {
    title: 'Eco-Friendly Mineral Powder Bathroom & Tile Scrub',
    price: '16.00',
    compareAtPrice: '',
    qty: 25,
    imageSrc: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Natural volcanic pumice and baking soda eliminate soap scum and water stains without harsh fumes.</p>'
  },
  {
    title: 'Natural Cedarwood & Pine Multi-Surface Floor Wash',
    price: '18.00',
    compareAtPrice: '24.00',
    qty: 0,
    imageSrc: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Restores shine to hardwood, tile, and stone with refreshing forest botanicals.</p>'
  },
  {
    title: 'Biodegradable Bamboo Fibre Kitchen Cleaning Cloths (Pack of 4)',
    price: '9.00',
    compareAtPrice: '',
    qty: 60,
    imageSrc: '',
    body: '<p>Super absorbent, naturally antibacterial, 100% compostable bamboo cleaning cloths.</p>'
  },
  {
    title: 'Zero-Waste Refillable Glass Spray Bottle with Non-Slip Silicone Boot for Multi-Surface Essential Oil Cleaning Solutions',
    price: '19.00',
    compareAtPrice: '',
    qty: 40,
    imageSrc: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Durable 16oz amber glass bottle protected by a silicone base. Built to last a lifetime.</p>'
  },
  {
    title: 'Citrus & Bergamot Natural Hand Wash Refill Pouch (1 Litre)',
    price: '24.00',
    compareAtPrice: '30.00',
    qty: 35,
    imageSrc: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    body: '<p>Refill your existing dispensers 4x over while cutting plastic waste by 85%.</p>'
  }
];

function generateHandle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeCsvField(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const rows = products.map((product) => {
  const handle = generateHandle(product.title);
  const sku = `PL-${handle.substring(0, 15).toUpperCase()}`;

  const row = {
    'Handle': handle,
    'Title': product.title,
    'Body (HTML)': product.body,
    'Vendor': 'Purelane',
    'Product Category': '',
    'Type': 'Homecare',
    'Tags': '',
    'Published': 'TRUE',
    'Option1 Name': 'Title',
    'Option1 Value': 'Default Title',
    'Option2 Name': '',
    'Option2 Value': '',
    'Option3 Name': '',
    'Option3 Value': '',
    'Variant SKU': sku,
    'Variant Grams': '0',
    'Variant Inventory Tracker': 'shopify',
    'Variant Inventory Qty': product.qty,
    'Variant Inventory Policy': 'deny',
    'Variant Fulfillment Service': 'manual',
    'Variant Price': product.price,
    'Variant Compare At Price': product.compareAtPrice,
    'Variant Requires Shipping': 'TRUE',
    'Variant Taxable': 'TRUE',
    'Variant Barcode': '',
    'Image Src': product.imageSrc,
    'Image Position': product.imageSrc ? '1' : '',
    'Image Alt Text': product.imageSrc ? product.title : '',
    'Gift Card': 'FALSE',
    'SEO Title': '',
    'SEO Description': '',
    'Google Shopping / Google Product Category': '',
    'Google Shopping / Gender': '',
    'Google Shopping / Age Group': '',
    'Google Shopping / MPN': '',
    'Google Shopping / Condition': '',
    'Google Shopping / Custom Product': '',
    'Google Shopping / Custom Label 0': '',
    'Google Shopping / Custom Label 1': '',
    'Google Shopping / Custom Label 2': '',
    'Google Shopping / Custom Label 3': '',
    'Google Shopping / Custom Label 4': '',
    'Variant Image': '',
    'Variant Weight Unit': 'kg',
    'Variant Tax Code': '',
    'Cost per item': '',
    'Included / United States': '',
    'Price / United States': '',
    'Compare At Price / United States': '',
    'Included / International': '',
    'Price / International': '',
    'Compare At Price / International': '',
    'Status': 'active'
  };

  return headers.map(header => escapeCsvField(row[header])).join(',');
});

const csvContent = [headers.join(','), ...rows].join('\n') + '\n';
const outputPath = path.join(__dirname, 'seed-products.csv');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, csvContent, 'utf8');
console.log(`Successfully generated Shopify CSV with ${products.length} products at ${outputPath}`);
