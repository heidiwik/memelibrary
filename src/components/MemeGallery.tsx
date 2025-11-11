import { useEffect, useState } from 'react';
import { type BlobItem, ContainerClient } from '@azure/storage-blob';
import { Box } from '@mui/material';
import ImageCard from './ImageCard';

type BlobInfo = { name: string; url: string };

export default function MemeGallery() {
	const [images, setImages] = useState<BlobInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				const account = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT as string;
				const container = import.meta.env.VITE_AZURE_STORAGE_CONTAINER as string;
				const sas = import.meta.env.VITE_AZURE_STORAGE_SAS as string;

				if (!account || !container || !sas) {
					throw new Error('Missing Azure config.');
				}

				const containerClient = new ContainerClient(
					`https://${account}.blob.core.windows.net/${container}${sas}`,
				);

				const items: BlobInfo[] = [];
				for await (const blob of containerClient.listBlobsFlat()) {
					if (!isLikelyImage(blob)) continue;

					const url = `https://${account}.blob.core.windows.net/${container}/${encodeURIComponent(
						blob.name,
					)}${sas}`;
					items.push({ name: blob.name, url });
				}

				setImages(items);
			} catch (e: any) {
				setError(e.message ?? String(e));
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);

	if (loading) return <p>Loading images…</p>;

	if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>;

	if (images.length === 0) return <p>No images found.</p>;

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 3,
				mt: 2,
				maxWidth: '1200px',
				justifyContent: 'center',
			}}>
			{images.map((image, index) => (
                <ImageCard imageUrl={image.url} title={image.name} index={index} />
			))}
		</Box>
	);
}

function isLikelyImage(blob: BlobItem) {
	const ct = blob.properties?.contentType as string | undefined;
	if (ct?.startsWith('image/')) return true;
	const name = blob.name.toLowerCase();
	return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.bmp', '.tiff'].some((ext) => name.endsWith(ext));
}
