import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type BlobInfo = { name: string; url: string };

interface ImageModalProps {
	image: BlobInfo | null;
	onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
	return (
		<Modal
			open={!!image}
			onClose={onClose}
			sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			slotProps={{
				backdrop: {
					sx: {
						bgcolor: 'rgba(0, 0, 0, 0.85)',
						backdropFilter: 'blur(4px)',
					},
				},
			}}>
			<Box sx={{ position: 'relative', minWidth: 500, maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
				<IconButton
					onClick={onClose}
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
						bgcolor: 'rgba(255, 255, 255, 0.8)',
						'&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
						zIndex: 1,
                        border: '1px solid #ccc',
					}}>
					<CloseIcon sx={{ fontSize: 10 }} />
				</IconButton>
				{image && (
					<img
						src={image.url}
						alt={image.name}
						style={{ minWidth: 500, maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
					/>
				)}
			</Box>
		</Modal>
	);
}
