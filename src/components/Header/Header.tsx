import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Fab from '@mui/material/Fab';
import { type CommonProps } from 'types/components';
import { type SxProps, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

interface UpperHeaderProps {
  product: string;
  help?: boolean;
}

export interface HeaderProps extends CommonProps, UpperHeaderProps {
  menu: MenuDropdownProp[];
}

interface MenuDropdownProp {
  label: string;
  children?: JSX.Element[];
}

const MenuDropdown = ({ label, children }: MenuDropdownProp) => {
  const [menuOpen, setMenuOpen] = useState(false); // TODO use a reducer
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        onClick={() => {
          setMenuOpen((open) => !open);
        }}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="sidenav" color="primary">
          {label}
        </Typography>
        <ArrowDropDownIcon
          color="primary"
          fontSize="small"
          sx={menuOpen ? styles.menuIconOpen : styles.menuIconClosed}
        />
      </Stack>
      {menuOpen ? <Stack sx={styles.menu}>{children}</Stack> : null}
    </Stack>
  );
};

const UpperHeader = ({ product, help }: UpperHeaderProps) => (
  <Stack direction="row" sx={styles.top}>
    <Typography variant="h5">{product}</Typography>
    {help && (
      <Stack direction="row" alignItems="center" gap="16px">
        <Typography variant="subtitle2">Serve aiuto?</Typography>
        <Fab color="primary" sx={{ width: '44px', height: '44px' }}>
          <ChatBubbleOutlineIcon sx={{ width: '16.67px', height: '16.67px' }} />
        </Fab>
      </Stack>
    )}
  </Stack>
);

export const Header = ({ product, help, theme, menu }: HeaderProps) => {
  const { palette } = useTheme();
  const backgroundColor =
    theme === 'dark' ? palette.primary.dark : palette.background.paper;

  return (
    <Box bgcolor={backgroundColor} sx={styles.main} gap="19px">
      <UpperHeader {...{ product, help }} />
      <Divider />
      <Stack direction="row" gap="32px" paddingY="16px">
        {menu.map((menu, index) => (
          <MenuDropdown key={index} label={menu.label}>
            {menu.children}
          </MenuDropdown>
        ))}
      </Stack>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  main: {
    paddingX: '24px',
  },
  top: {
    paddingY: '18px',
    justifyContent: 'space-between',
  },
  menu: {
    position: 'absolute',
    listStyleTpe: 'none',
    margin: '5px 0',
    padding: 0,
    background: 'white',
    width: '100px',
    marginTop: '40px',
  },
  menuIconOpen: {
    transform: 'rotate(-180deg)',
    transition: 'transform 0.2s',
  },
  menuIconClosed: {
    transition: 'transform 0.2s',
  },
};
