# Quick Start Guide

## 🚀 Test Locally (5 minutes)

### Step 1: Install Dependencies
```bash
cd b2b-lead-generator
npm install
```

### Step 2: Create Test Input
Create a file `input.json`:
```json
{
  "searchQueries": [
    {
      "category": "coffee shops",
      "location": "Seattle, WA",
      "maxResults": 20
    }
  ],
  "filters": {
    "minRating": 4.0,
    "minReviews": 5,
    "hasWebsite": true
  },
  "enrichment": {
    "extractEmails": true,
    "validateContacts": false
  },
  "scoring": {
    "enableScoring": true
  }
}
```

### Step 3: Run Locally
```bash
# Method 1: Using Apify CLI (recommended)
npm install -g apify-cli
apify run --purge

# Method 2: Direct Node.js
node src/main.js
```

### Step 4: View Results
Results are saved to: `storage/datasets/default/`

---

## 🌐 Deploy to Apify Platform

### Step 1: Install Apify CLI
```bash
npm install -g apify-cli
apify login
```

### Step 2: Initialize Actor
```bash
cd b2b-lead-generator
apify init
# Select: Use existing project
```

### Step 3: Push to Apify
```bash
apify push
```

This will:
- Upload your code
- Build Docker image
- Create actor on Apify platform
- Generate shareable URL

### Step 4: Test on Platform
```bash
apify call
```

---

## 📊 Sample Test Input (Small Test)

**Test with 10 results first:**
```json
{
  "searchQueries": [
    {
      "category": "restaurants",
      "location": "Austin, TX",
      "maxResults": 10
    }
  ],
  "filters": {
    "minRating": 4.0,
    "hasWebsite": true
  },
  "enrichment": {
    "extractEmails": true
  },
  "scoring": {
    "enableScoring": true,
    "idealCustomerProfile": {
      "industries": {
        "food_service": 30,
        "retail": 20
      },
      "locations": {
        "North America": 30
      }
    }
  },
  "output": {
    "format": "csv"
  },
  "proxy": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"]
  },
  "maxConcurrency": 3
}
```

**Expected Results:**
- 10 restaurants in Austin
- With emails extracted from websites
- Lead scores (A+ to F grades)
- Takes ~2-3 minutes
- Costs ~$0.20 compute units

---

## 🧪 Testing Checklist

Before publishing to Apify Store:

- [ ] Test with 10 results (basic scraping)
- [ ] Test with 50 results (with email extraction)
- [ ] Test with 100 results (full enrichment)
- [ ] Verify all filters work
- [ ] Check lead scoring accuracy
- [ ] Test webhook notifications
- [ ] Test different locations
- [ ] Test different categories
- [ ] Verify CSV export
- [ ] Verify JSON export

---

## 🐛 Common Issues

### "No results found"
- **Cause:** Search too specific
- **Fix:** Use broader terms ("restaurants" not "vegan restaurants")

### "Email extraction failing"
- **Cause:** Websites blocking scrapers
- **Fix:** Enable Apify residential proxies

### "Actor timeout"
- **Cause:** Too many results with full enrichment
- **Fix:** Lower `maxResults` or disable heavy enrichment

### "Proxy errors"
- **Cause:** Using datacenter proxies for Google
- **Fix:** Switch to residential proxies:
  ```json
  "proxy": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"]
  }
  ```

---

## 📈 Performance Tips

### Optimize Cost
```json
{
  "maxConcurrency": 3,           // Lower = cheaper
  "enrichment": {
    "extractEmails": true,        // Enable only what you need
    "validateContacts": false,
    "companyData": false
  }
}
```

### Optimize Speed
```json
{
  "maxConcurrency": 10,          // Higher = faster
  "filters": {
    "minRating": 4.5,            // Stricter filters = less processing
    "hasWebsite": true
  }
}
```

### Balance Cost & Speed
```json
{
  "maxConcurrency": 5,           // Sweet spot
  "enrichment": {
    "extractEmails": true,        // Core features only
    "validateContacts": true
  }
}
```

---

## 📝 Next Steps

1. **Test locally** with small dataset (10-20 results)
2. **Deploy to Apify** with `apify push`
3. **Run production test** with 100-500 results
4. **Publish to Apify Store**
5. **Market your actor**:
   - Create demo video
   - Write blog post
   - Share on Reddit (r/sales, r/entrepreneur)
   - Post on LinkedIn
   - Submit to Apify newsletter

---

## 💡 Pro Tips

### Batch Processing
Split large searches into multiple runs:
```bash
# Instead of 10,000 results in one run:
# Run 1: 0-1000
# Run 2: 1000-2000
# ... etc
```

### Use Schedules
Set up recurring runs on Apify:
- Daily: New leads every morning
- Weekly: Fresh data for sales team
- Monthly: Market research updates

### Integrate with Zapier
1. Run actor on schedule
2. Send webhook to Zapier
3. Auto-import to Google Sheets
4. Notify sales team via Slack

---

**Ready to test?** Run `npm install && apify run` to start! 🚀
