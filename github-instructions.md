# mn-punch-card-api

A REST API backend for a **Reward Cabinet** system — a punch-card/rewards program for [Mathnasium](https://www.mathnasium.com/) (New Tampa location). Parents and students can browse reward products sourced from Amazon, place orders using reward points, and administrators receive email notifications for new orders.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22.x |
| Language | TypeScript |
| Web Framework | Express (via [routing-controllers](https://github.com/typestack/routing-controllers)) |
| ORM | Sequelize 6 |
| Database | Microsoft SQL Server (Azure SQL) |
| Email | Mailgun |
| Product Data | Rainforest API (Amazon product lookups) |
| Logging | Winston + Azure Application Insights |
| Hosting | Azure App Service |

## Project Structure

```
mn-punch-card-api/
├── config/             # Sequelize CLI database configuration
├── logs/               # Log output files
├── migrations/         # Sequelize migration files
├── models/             # Sequelize model definitions (Products, ProductOrder, RefreshHistory)
├── src/
│   ├── index.ts        # Application entry point (Express server setup)
│   ├── config/         # Environment variables, logger config, admin user list
│   ├── controllers/    # Route controllers (Amazon, Email, OrderProduct, RefreshHistory, HealthCheck)
│   ├── docs/           # Internal deployment & migration docs
│   ├── middleware/      # Express middleware (request logging)
│   ├── repositories/   # Data access layer (DB queries)
│   ├── seed/           # Seed data for testing
│   ├── services/       # Business logic (Amazon API integration, email sending)
│   ├── types/          # TypeScript type definitions and interfaces
│   └── utils/          # Utility functions (reward card price calculation)
├── package.json
├── tsconfig.json
└── tslint.json
```

## Prerequisites

- **Node.js** 22.x
- **npm**
- Access to a **Microsoft SQL Server** database (Azure SQL)
- A **Rainforest API** key (for Amazon product data)
- A **Mailgun** account (for sending order notification emails)
- An **Azure Application Insights** resource (for logging/telemetry)

## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on |
| `LOG_LEVEL` | Set to `debug` for verbose dev logging |
| `DB_HOST` | SQL Server hostname |
| `DB_NAME` | Database name |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `RAINFOREST_KEY` | Rainforest API key for Amazon product lookups |
| `EMAIL_API_KEY` | Mailgun API key |
| `EMAIL_API_DOMAIN` | Mailgun sending domain |
| `APPINSIGHTS_INSTRUMENTATIONKEY` | Azure Application Insights instrumentation key |

> **Note:** The application will throw an error on startup if `PORT`, `EMAIL_API_KEY`, or `EMAIL_API_DOMAIN` are missing.

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/mn-punch-card-api.git
cd mn-punch-card-api

# 2. Install dependencies
npm install

# 3. Set up your .env file (see Environment Variables above)

# 4. Run database migrations
npm run migration

# 5. Start the development server (with debugger on port 3142)
npm run dev
```

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start dev server with ts-node and Node inspector on port 3142 |
| `build` | `npm run build` | Compile TypeScript to `dist/` |
| `start` | `npm run start` | Build and run the compiled app |
| `server` | `npm run server` | Run the compiled app (no build step) |
| `migration` | `npm run migration` | Run pending Sequelize database migrations |

## API Endpoints

### Health Check

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/healthcheck` | Returns server status |

### Amazon Products

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/amazon` | Get all products |
| `GET` | `/api/amazon/usage` | Get Rainforest API usage stats |
| `GET` | `/api/amazon/:asin` | Fetch a product from Amazon by ASIN |
| `POST` | `/api/amazon` | Save a new product |
| `POST` | `/api/amazon/:asin` | Fetch from Amazon and save to DB |
| `POST` | `/api/amazon/refresh` | Refresh all product prices from Amazon |
| `POST` | `/api/amazon/refresh/:id` | Refresh a single product's price |
| `PUT` | `/api/amazon/:id` | Update a product |
| `DELETE` | `/api/amazon/:id` | Soft-delete a product |

### Orders

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/orderproduct` | Get all orders |
| `PATCH` | `/api/orderproduct/:id` | Update an order |
| `DELETE` | `/api/orderproduct/:id` | Soft-delete an order |

### Email

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/email/buyproduct` | Place an order (sends email notification + saves order) |

### Refresh History

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/refresh-history` | Get all product refresh history records |

## Database

The application uses **Sequelize** with a **Microsoft SQL Server** (MSSQL) dialect. The database schema is managed via migrations in the `migrations/` folder.

### Models

- **Products** — Amazon product catalog (ASIN, title, price, reward card price, image, link, etc.)
- **ProductOrder** — Customer orders with child/parent info, shipping address, and product details
- **RefreshHistory** — Audit log of product price refreshes from Amazon

### Running Migrations

```bash
# Run all pending migrations
npm run migration

# Undo the most recent migration
npx sequelize-cli db:migrate:undo

# Undo all migrations
npx sequelize-cli db:migrate:undo:all

# Generate a new migration
npx sequelize-cli model:generate --name ModelName --attributes attr1:string,attr2:integer
```

## Reward Card Pricing

Product prices are converted to reward card prices using a configurable multiplier (currently `1.50x`). The formula:

```
rewardCardPrice = ceil(amazonPrice × 1.50)
```

## Deployment

The application is deployed to **Azure App Service** under the resource group `MathnasiumRewardCabinet`.

- Deploy via the Azure extension in VS Code: **App Service → Azure Subscription 1 → MathnasiumRewardCabinetApi → Deploy to Web App**
- Logs are available in the App Service file browser under `newlogs.log`

## Logging

All incoming requests are logged via `LoggingMiddleware`. The application uses Winston with two transports:

- **Console** — stdout logging
- **File** — writes to `logs/newlogs.log`
- **Azure Application Insights** — telemetry sent to Azure

Log format switches between a detailed dev format and a production format based on the `LOG_LEVEL` environment variable.

## Contributing

1. Create a feature branch from `main`
2. Make changes and test locally with `npm run dev`
3. Ensure the build succeeds: `npm run build`
4. Open a pull request with a clear description of your changes
