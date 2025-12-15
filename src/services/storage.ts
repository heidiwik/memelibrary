// src/storage.ts
import { BlobServiceClient } from "@azure/storage-blob";

// 1) Ask your backend for a short-lived SAS (https only)
const res = await fetch("/api/storage/sas"); // returns { sasUrl: "https://<acct>.blob.core.windows.net?<SAS>" }
const { sasUrl } = await res.json();

// 2) Use the SAS directly in the BlobServiceClient
const blobService = new BlobServiceClient(sasUrl);

// Example: list containers
for await (const c of blobService.listContainers()) {
  console.log(c.name);
}
