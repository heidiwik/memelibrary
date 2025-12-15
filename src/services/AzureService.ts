import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';

let cachedProdClient: ContainerClient | null = null;
let cachedLocalClient: ContainerClient | null = null;

export function getContainerClient(): ContainerClient {
	if (!cachedProdClient) {
		const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT as string | undefined;
		const containerName = import.meta.env.VITE_AZURE_STORAGE_CONTAINER as string | undefined;
		if (!accountName || !containerName) {
			throw new Error('Missing Azure storage account configuration.');
		}
		const accountUrl = `https://${accountName}.blob.core.windows.net`;
		const credential = new DefaultAzureCredential();
		const service = new BlobServiceClient(accountUrl, credential);
		cachedProdClient = service.getContainerClient(containerName);
	}
	return cachedProdClient;
}

export function getLocalContainerClient(): ContainerClient {
	if (!cachedLocalClient) {
		const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT as string | undefined;
		const containerName = import.meta.env.VITE_AZURE_STORAGE_CONTAINER as string | undefined;
		const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS as string | undefined;
		if (!accountName || !containerName || !sasToken) {
			throw new Error('Missing Azure SAS configuration for local development.');
		}
		const containerUrl = `https://${accountName}.blob.core.windows.net/${containerName}${sasToken}`;
		cachedLocalClient = new ContainerClient(containerUrl);
	}
	return cachedLocalClient;
}

export default getContainerClient;
