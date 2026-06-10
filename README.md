# CryptoView 📈

A full-stack cryptocurrency market dashboard built with Node.js, Express, and EJS. Fetches live data from the CoinGecko API to display real-time market information including coin prices, global market stats, top gainers/losers, search functionality, and individual coin detail pages.

---

## Features

- **Live Coins Table** — Top coins ranked by market cap with price, 24h change, and market cap
- **Search** — Search across all coins on CoinGecko, not just the displayed ones
- **Coin Details Page** — Click any coin to see its name, symbol, description, price, market cap, rank, and 24h change
- **Global Market Sidebar** — Total global crypto market cap and 24h change
- **Top 5 Gainers & Losers** — Derived by sorting the coins list by 24h price change
- **Color-coded 24h Change** — Green for gains, red for losses with ▲▼ indicators

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS |
| HTTP Client | Axios |
| API | CoinGecko Public API |
| Styling | Custom CSS (dark theme) |

---

## Project Structure

```
crypto-dashboard/
├── public/
│   └── style.css          # Global stylesheet
├── views/
│   ├── index.ejs          # Homepage — coins table + sidebar
│   ├── search.ejs         # Search results page
│   └── coins.ejs          # Individual coin details page
├── .env                   # API key (not committed)
├── .gitignore
├── index.js               # Express server + routes
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js installed
- A free CoinGecko API key from [coingecko.com](https://www.coingecko.com/en/api)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** in the root directory
```
API_KEY=your_coingecko_api_key_here
```

4. **Start the server**
```bash
node index.js
```

5. **Open your browser** and visit `http://localhost:3000`

---

## API Endpoints Used

| CoinGecko Endpoint | Purpose |
|---|---|
| `GET /coins/markets` | Fetch top coins for the homepage table |
| `GET /search?query=` | Search coins by name |
| `GET /coins/{id}` | Fetch individual coin details |
| `GET /global` | Fetch global market data |

---

## Key Learnings

This project was built as a capstone to learn API integration properly:

- Understanding `req.params` vs `req.query` in Express
- Inspecting API response structures before building UI
- Handling nested data (e.g. `market_data.current_price.usd`)
- Null-safe data handling with the `??` operator
- Deriving insights (gainers/losers) by sorting existing API data
- Making multiple API calls within a single Express route

---

## Notes

- Uses the CoinGecko **Demo (free)** API tier — rate limits apply (429 errors may occur with rapid requests)
- Watchlist and historical price chart features are planned for a future update


