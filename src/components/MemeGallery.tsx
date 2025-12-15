import { useEffect, useState } from 'react';
import { type BlobItem } from '@azure/storage-blob';
import { Box } from '@mui/material';
import ImageCard from './ImageCard';
import ImageModal, { type BlobInfo } from './ImageModal';
import { getContainerClient, getLocalContainerClient } from '../services/AzureService';

export default function MemeGallery() {
	const [images, setImages] = useState<BlobInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState<BlobInfo | null>(null);

	const handleImageClick = (image: BlobInfo) => setSelectedImage(image);
	const handleClose = () => setSelectedImage(null);

	useEffect(() => {
		async function load() {
			try {
				const client = import.meta.env.DEV ? getLocalContainerClient() : getContainerClient();

				const items: BlobInfo[] = [];
				for await (const blob of client.listBlobsFlat()) {
					if (!isLikelyImage(blob)) continue;

					const blobClient = client.getBlobClient(blob.name);
					const url = blobClient.url;
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
		<>
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
					<ImageCard
						key={image.name}
						imageUrl={image.url}
						title={image.name}
						index={index}
						onClick={() => handleImageClick(image)}
						sx={{ cursor: 'pointer' }}
					/>
				))}
			</Box>
			<ImageModal image={selectedImage} onClose={handleClose} />
		</>
	);
}

function isLikelyImage(blob: BlobItem) {
	const ct = blob.properties?.contentType as string | undefined;
	if (ct?.startsWith('image/')) return true;
	const name = blob.name.toLowerCase();
	return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.bmp', '.tiff'].some((ext) => name.endsWith(ext));
}
