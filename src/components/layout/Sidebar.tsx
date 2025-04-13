import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  People,
  Add,
  Assessment,
  ExitToApp,
  Event as EventIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
}

const drawerWidth = 280;

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const menuItems = [
    { text: '儀表板', icon: <Dashboard />, path: '/' },
    { text: '個案管理', icon: <People />, path: '/casesmanagement' },
    { text: '新增個案', icon: <Add />, path: '/new-case' },
    { text: '活動管理', icon: <EventIcon />, path: '/activities' },
  ];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          background: theme.palette.grey[900],
          color: theme.palette.common.white,
          borderRight: 'none',
          boxSizing: 'border-box',
          height: '95%',
          margin: '24px',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '15px',
        },
      }}
    >
      {/* Logo 區塊 */}
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assessment sx={{ fontSize: 28 }} />
          個案管理系統
        </Typography>
      </Box>

      {/* 使用者資訊 */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}>A</Avatar>
        <Box>
          <Typography variant="subtitle1">管理員</Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">admin@example.com</Typography>
        </Box>
      </Box>

      {/* 主選單 */}
      <List sx={{ px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItemButton
            component={Link}
            to={item.path}
            key={item.text}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: '12px',
              mb: 1,
              color: 'inherit',
              bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
              transition: 'all 0.2s',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '1rem', fontWeight: location.pathname === item.path ? 600 : 400 }} />
          </ListItemButton>
        ))}
      </List>

      {/* 登出按鈕 */}
      <Box mt="auto">
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List sx={{ p: 2 }}>
          <ListItemButton
            onClick={onLogout}
            sx={{
              borderRadius: '12px',
              color: 'rgba(255,255,255,0.7)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="登出" primaryTypographyProps={{ fontSize: '0.95rem' }} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
