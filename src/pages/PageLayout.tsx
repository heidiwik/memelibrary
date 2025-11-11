import React from 'react';
// import BasicMenu from '../Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../Menu';

interface PageLayoutProps {
	children: React.ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
	return (
		<Container sx={{ maxWidth: '100%', fontFamily: '"Lato", sans-serif' }} maxWidth={false}>
			<Box sx={{ width: '100%', marginBottom: '5em' }}>
				<ResponsiveAppBar />
			</Box>
			<Box sx={{ my: 4, color: 'lightpink', fontFamily: '"Lato", sans-serif' }}>
				<div className='page-content'>{props.children}</div>
			</Box>
		</Container>
	);
};
