import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from 'react';
import MemeGallery from '../components/MemeGallery';

const imageModules = import.meta.glob('../assets/images/*', { eager: true, as: 'url' });

export default function Memes() {
	const [images, setImages] = useState<{ src: string; alt: string; name: string }[]>([]);

	useEffect(() => {
		const imageList = Object.entries(imageModules).map(([path, url]) => {
			const filename = path.split('/').pop() || '';
			const nameWithoutExtension = filename.split('.')[0];

			return {
				src: url as string,
				alt: nameWithoutExtension.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
				name: filename,
			};
		});

		setImages(imageList);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '60vh',
				p: 4,
			}}>
			<Typography variant='h3' component='h1' gutterBottom>
				Memes for your entertainment
			</Typography>

			<MemeGallery />
			
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
					<Card
						key={index}
						sx={{
							height: 300,
							display: 'flex',
							flexDirection: 'column',
							boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
							transition: 'transform 0.2s',
							'&:hover': {
								transform: 'scale(1.05)',
							},
						}}>
						<CardMedia
							component='img'
							sx={{
								height: '100%',
								objectFit: 'cover',
							}}
							image={image.src}
							alt={image.alt}
						/>
					</Card>
				))}
			</Box>
		</Box>
	);
}
