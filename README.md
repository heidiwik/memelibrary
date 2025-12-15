# MemeHub

A meme gallery web app built with React, TypeScript, and Vite. Displays images stored in Azure Blob Storage in a responsive grid with a lightbox modal for full-size viewing.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** (with React Compiler via Babel)
- **Material UI 7** for components and layout
- **React Router 7** for client-side routing
- **Azure Blob Storage SDK** for fetching images

## Pages

| Route | Description |
| ------------ | --------------------------------- |
| `/` | Front page |
| `/frontpage` | Front page (alias) |
| `/memes` | Meme gallery with image grid |

## Project Structure

```
src/
├── App.tsx                  # Router setup
├── Menu.tsx                 # Top navigation bar
├── pages/
│   ├── FrontPage.tsx        # Landing page
│   ├── Memes.tsx            # Gallery page
│   └── PageLayout.tsx       # Shared layout wrapper
├── components/
│   ├── ImageCard.tsx        # Image thumbnail card
│   ├── ImageModal.tsx       # Full-size image lightbox
│   └── MemeGallery.tsx      # Gallery grid with blob listing
└── services/
    └── AzureService.ts      # Azure Blob Storage client setup
```

## Getting Started

### Prerequisites

- Node.js
- An Azure Storage account with a blob container containing images

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_AZURE_STORAGE_ACCOUNT=<storage-account-name>
VITE_AZURE_STORAGE_CONTAINER=<container-name>
VITE_AZURE_STORAGE_SAS=<sas-token>        # required for local dev
```

In production the app uses `DefaultAzureCredential` instead of a SAS token.

### Install & Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```
