import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" color="white">Brand</Typography>
            </Box>
            <Typography variant="h6" color="textPrimary">
              Brand name
            </Typography>
          </Box>

          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Product
              </Typography>
              <Box>
                <Link href="#" color="textSecondary" variant="body2" display="block">Features</Link>
                <Link href="#" color="textSecondary" variant="body2" display="block">Integrations</Link>
                <Link href="#" color="textSecondary" variant="body2" display="block">Pricing</Link>
                <Link href="#" color="textSecondary" variant="body2" display="block">FAQ</Link>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Company
              </Typography>
              <Box>
                <Link href="#" color="textSecondary" variant="body2" display="block">Privacy</Link>
                <Link href="#" color="textSecondary" variant="body2" display="block">Terms of Service</Link>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Developers
              </Typography>
              <Box>
                <Link href="#" color="textSecondary" variant="body2" display="block">Public API</Link>
                <Link href="#" color="textSecondary" variant="body2" display="block">Documentation</Link>
                <Link href="#" color="textSecondary" variant="body2" display="block">Guides</Link>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Social media
              </Typography>
              <Box display="flex" gap={1}>
                <IconButton color="primary" aria-label="Facebook" href="#" size="small">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Twitter" href="#" size="small">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Instagram" href="#" size="small">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
