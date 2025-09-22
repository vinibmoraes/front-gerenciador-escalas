import React, { useState } from 'react';
import { NavLink as RouterNavLink, useLocation, NavLinkProps } from 'react-router-dom';
import logoWhite from '../../assets/logo-nacoes-branco.png';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  styled,
  Drawer,
  CSSObject,
  Theme,
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Church as ChurchIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  EventNote as EventNoteIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

// Create a ListItemButton that works with React Router's NavLink
const ListItemLink = (props: { to: string; children: React.ReactNode; sx?: any }) => {
  const { to, children, sx } = props;
  return (
    <ListItemButton
      component={RouterNavLink}
      to={to}
      sx={{
        minHeight: 48,
        justifyContent: 'initial',
        px: 2.5,
        '&.active': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: '#82CAFF',
          },
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
        ...sx,
      }}
    >
      {children}
    </ListItemButton>
  );
};

const drawerWidth = 240;
const collapsedWidth = 64;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
}

const menuItems: MenuItem[] = [
  { text: 'Início', icon: <HomeIcon />, path: '/inicio' },
  { text: 'Voluntários', icon: <PeopleIcon />, path: '/voluntarios' },
  { text: 'Ministérios', icon: <ChurchIcon />, path: '/ministerios' },
  { text: 'Atividades', icon: <EventNoteIcon />, path: '/atividades' },
  { text: 'Grupos', icon: <GroupsIcon />, path: '/grupos' },
  { text: 'Escalas', icon: <EventIcon />, path: '/escalas' },
  { text: 'Usuários', icon: <PersonIcon />, path: '/usuarios' },
  { text: 'Configurações', icon: <SettingsIcon />, path: '/configuracoes' },
];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: collapsedWidth,
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `-${collapsedWidth}px`,
    ...(open && {
      marginLeft: 0,
    }),
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, children }) => {
  const location = useLocation();
  const theme = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (text: string) => {
    setOpenSubmenu(openSubmenu === text ? null : text);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer
        variant="permanent"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#192A56',
            color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'white',
            '&.MuiDrawer-paperAnchorDockedLeft': {
              borderRight: 'none',
            },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <DrawerHeader>
          {isOpen && (
            <Box
              component="img"
              src={logoWhite}
              alt="Logo"
              sx={{
                height: 40,
                ml: 1,
                objectFit: 'contain',
              }}
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <IconButton 
              onClick={onToggle} 
              sx={{ 
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'white',
                ml: 'auto'
              }}
            >
              {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <Tooltip title={!isOpen ? item.text : ''} placement="right">
                    <ListItemLink
                      to={item.path || '#'}
                      sx={{
                        justifyContent: isOpen ? 'initial' : 'center',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: isOpen ? 3 : 'auto',
                          justifyContent: 'center',
                          color: isActive 
                            ? theme.palette.mode === 'dark' 
                              ? theme.palette.primary.main 
                              : '#82CAFF' 
                            : theme.palette.mode === 'dark' 
                              ? theme.palette.text.primary 
                              : 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{
                          noWrap: true,
                          sx: {
                            color: isActive 
                              ? theme.palette.mode === 'dark' 
                                ? theme.palette.primary.main 
                                : '#82CAFF'
                              : theme.palette.mode === 'dark' 
                                ? theme.palette.text.primary 
                                : 'rgba(255, 255, 255, 0.7)',
                            fontWeight: isActive ? 600 : 400,
                          },
                        }} 
                        sx={{ opacity: isOpen ? 1 : 0 }} 
                      />
                    </ListItemLink>
                  </Tooltip>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </StyledDrawer>
      <MainContent open={isOpen}>
        <DrawerHeader />
        {children}
      </MainContent>
    </Box>
  );
};

export default Sidebar;

