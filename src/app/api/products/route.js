import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  { id: "dental", name: "Dental Instruments", keywords: ["dental", "tooth", "extraction", "excavator", "burnisher", "plugger", "condenser", "mirror", "probe", "scaler", "curet", "elevator", "orthodontic", "prosthetic"] },
  { id: "surgical", name: "Surgical Instruments", keywords: ["surgical", "scalpel", "retractor", "forceps", "scissors", "hemostat", "clamp", "needle", "suture"] },
  { id: "orthopedic", name: "Orthopedic Instruments", keywords: ["orthopedic", "orthopaedic", "bone", "rongeur", "saw", "drill", "mallet", "chisel", "pin", "plate"] },
  { id: "laparoscopic", name: "Laparoscopic Instruments", keywords: ["laparoscop", "trocar", "cannula", "veress", "abdominal", "insufflator"] },
  { id: "ophthalmic", name: "Ophthalmic Instruments", keywords: ["ophthalmic", "eye", "lens"] },
  { id: "ent", name: "ENT Instruments", keywords: ["ent", "ear", "nose", "throat", "nasal", "sinus", "tonsil", "larynx", "irrigation"] },
  { id: "gynecological", name: "Gynecological Instruments", keywords: ["gynecolog", "vaginal", "uterine", "curette", "speculum", "dilator", "cannula", "suction"] },
  { id: "neurosurgical", name: "Neurosurgical Instruments", keywords: ["neuro", "brain", "spinal", "dura", "dural", "hooks", "retractors", "spatula"] },
  { id: "cardiovascular", name: "Cardiovascular Instruments", keywords: ["cardiac", "artery", "vein", "vascular", "strip", "hook", "bypass"] },
  { id: "urological", name: "Urological Instruments", keywords: ["urolog", "cyst", "kidney", "bladder", "prostate", "ureth", "ureter", "french", "bougie", "sound", "cathet"] },
  { id: "plastic-surgery", name: "Plastic Surgery Instruments", keywords: ["plastic", "aesthetic", "cosmet", "reconstruct", "rhinoplasty", "blepharoplasty", "facelift", "liposuction"] },
  { id: "cardiothoracic", name: "Cardiothoracic Instruments", keywords: ["cardiothor", "thorac", "chest", "heart", "lung", "rib", "sternum", "mammary", "coronary"] },
  { id: "gastrointestinal", name: "Gastrointestinal Instruments", keywords: ["gastro", "intestinal", "stomach", "colon", "rectum", "anal", "digest", "hernia", "liver", "gallblad"] },
  { id: "endoscopic", name: "Endoscopic Instruments", keywords: ["endoscop", "scope", "camera", "fiber", "arthros", "bronch", "cystosc", "gastros", "hysteros"] },
  { id: "veterinary", name: "Veterinary Instruments", keywords: ["veter", "veterinary", "animal", "vet", "equine", "canine", "feline", "bovine"] },
  { id: "podiatry", name: "Podiatry Instruments", keywords: ["podiatr", "foot", "feet", "toe", "podal", "ankle", "nail", "corn", "callus"] },
  { id: "dermatology", name: "Dermatology Instruments", keywords: ["dermat", "skin", "cutaneous", "mole", "wart", "biopsy", "derm", "cosmetic"] },
  { id: "anesthesia", name: "Anesthesia Instruments", keywords: ["anesth", "anesthesia", "airway", "breath", "laryng", "intubat", "mask", "ventilat", "oxygen"] },
  { id: "sterilization", name: "Sterilization Instruments", keywords: ["steril", "autoclav", "cleans", "disinfect", "ultrason", "bowl", "tray", "container"] },
  { id: "diagnostic", name: "Diagnostic Instruments", keywords: ["diagnost", "examin", "otoscop", "ophthalmoscop", "retinoscop", "laryngoscop", "penlight", "reflex"] },
  { id: "examination", name: "Examination Instruments", keywords: ["examin", "obgyn", "obste", "vagin", "rect", "anal", "speculum", "pelvic"] },
  { id: "minor-surgery", name: "Minor Surgery Instruments", keywords: ["minor", "office", "clinic", "surgicenter", "procedure", "excis", "currett", "biopsy"] },
  { id: "phlebotomy", name: "Phlebotomy Instruments", keywords: ["phlebot", "blood", "venipunct", "draw", "tourniquet", "cannula", "butterfly", "needle"] },
  { id: "orthodontics", name: "Orthodontics Instruments", keywords: ["orthodont", "bracket", "wire", "ligature", "pliers", "elastics", "separator", "band"] },
  { id: "general", name: "General Instruments", keywords: [] },
];

// Cache for categories
let categoryCountsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute

function getCategoryCounts(products) {
  const now = Date.now();
  if (categoryCountsCache && lastCacheTime && now - lastCacheTime < CACHE_DURATION) {
    return categoryCountsCache;
  }

  const categorized = {};
  CATEGORIES.forEach(cat => {
    categorized[cat.id] = 0;
  });

  products.forEach(product => {
    const nameLower = product.name?.toLowerCase() || "";
    let matchedCat = "general";

    for (const category of CATEGORIES) {
      if (category.id === "general") continue;
      if (category.keywords.some(kw => nameLower.includes(kw))) {
        matchedCat = category.id;
        break;
      }
    }

    categorized[matchedCat]++;
  });

  categoryCountsCache = categorized;
  lastCacheTime = now;
  return categorized;
}

function getCategoryProducts(categoryId, products, limit = 100) {
  const categoryDef = CATEGORIES.find(c => c.id === categoryId);

  if (!categoryDef) {
    return [];
  }

  const matchedProducts = [];

  for (const product of products) {
    if (matchedProducts.length >= limit) break;

    const nameLower = product.name?.toLowerCase() || "";
    let matched = categoryId === "general";

    if (!matched) {
      for (const kw of categoryDef.keywords) {
        if (nameLower.includes(kw)) {
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      matchedProducts.push(product);
    }
  }

  return matchedProducts;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '100', 10);

  try {
    // Read products.json file
    const productsPath = path.join(process.cwd(), 'src', 'app', 'products', 'products.json');
    const fileContent = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(fileContent);

    // Return products for specific category
    if (category) {
      const categoryProducts = getCategoryProducts(category, products, limit);
      return NextResponse.json(categoryProducts);
    }

    // Return just categories and counts (no products - to keep response small)
    const counts = getCategoryCounts(products);
    const summary = CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: counts[cat.id]
    }));

    return NextResponse.json({
      categories: summary
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load products', details: error.message },
      { status: 500 }
    );
  }
}
