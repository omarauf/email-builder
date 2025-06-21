import Typography from '@mui/material/Typography';
import type { AccordionProps } from '@mui/material/Accordion';
import MuiAccordion, { accordionClasses } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material';
import { Iconify } from '../iconify';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  [`&.${accordionClasses.expanded}`]: {
    boxShadow: 'none',
    borderRadius: 0,
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<Iconify icon="ri:arrow-up-s-line" width={20} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  [`.${accordionClasses.expanded} &`]: {
    height: '100%',
  },
}));

interface Props {
  children: React.ReactNode;
  expanded: number;
  index: number;
  onChange: (event: React.SyntheticEvent, newExpanded: boolean) => void;
  title: string;
}

export function CustomAccordion({ children, expanded, index, title, onChange }: Props) {
  return (
    <Accordion
      expanded={expanded === index}
      onChange={onChange}
      slotProps={{ transition: { unmountOnExit: true } }}>
      <AccordionSummary>
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
