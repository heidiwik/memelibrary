import { Card, CardMedia, type CardProps } from '@mui/material';

interface ImageCardProps extends CardProps {
	imageUrl: string;
	title?: string;
	index?: number;
}

export default function ImageCard({ imageUrl, title, index, sx, ...cardProps }: ImageCardProps) {
	return (
		<Card
			key={index}
			{...cardProps}
			sx={{
				height: 300,
				display: 'flex',
				flexDirection: 'column',
				boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
				transition: 'transform 0.2s',
				'&:hover': {
					transform: 'scale(1.05)',
				},
				...sx,
			}}>
			<CardMedia
				component='img'
				sx={{
					height: '100%',
					objectFit: 'cover',
				}}
				image={imageUrl}
				alt={title ?? ''}
			/>
		</Card>
	);
}
