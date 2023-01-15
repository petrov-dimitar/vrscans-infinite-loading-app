import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AppAccordion({ title, children, ...props }) {
  return (
    <div>
      <Accordion {...props}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            sx={{
              fontFamily: 'Plus Jakarta Sans',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '23px',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: '#090C02'
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
