import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FrontPage() {
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
			<Typography variant='body1'>{'Here be memes..'}</Typography>
		</Box>
	);
}
