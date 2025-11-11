import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MemeGallery from '../components/MemeGallery';

export default function Memes() {
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
		</Box>
	);
}
