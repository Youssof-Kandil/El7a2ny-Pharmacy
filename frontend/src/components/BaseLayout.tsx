import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Logout, Notifications } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { NotificationsList } from './notification'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to?: string
  action?: { (): void }
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, action } = props

  return (
    <li>
      {action ? (
        <ListItemButton onClick={action}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItemButton>
      ) : to ? (
        <ListItemButton component={Link} to={to} onClick={action}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItemButton>
      ) : null}
    </li>
  )
}

export type OutletContextType = {
  setSidebarLinks: React.Dispatch<React.SetStateAction<SidebarLink[]>>
  sidebarLinks: SidebarLink[]
}

const drawerWidth = 240

interface SidebarLink {
  to?: string
  text: string
  icon?: React.ReactElement
  action?: { (): void }
}

export function BaseLayout() {
  const [sidebarLinks, setSidebarLinks] = useState<SidebarLink[]>([])
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={!openDrawer ? handleDrawerOpen : handleDrawerClose}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            Pharmacy
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography>
            <OnlyAuthenticated>
              Hi fml
              {/* <NotificationsList />
          This is the line causing the error
            */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Notifications />
              </IconButton>
            </OnlyAuthenticated>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <Toolbar />
        <Divider />
        <List aria-label="main mailbox folders">
          {sidebarLinks.map((link, i) => (
            <ListItemLink
              action={link.action}
              key={i}
              to={link.to}
              primary={link.text}
              icon={link.icon}
            />
          ))}
          <OnlyAuthenticated>
            <ListItemLink
              to="/auth/logout"
              primary="Logout"
              icon={<Logout />}
            />
          </OnlyAuthenticated>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Outlet
            context={
              { setSidebarLinks, sidebarLinks } satisfies OutletContextType
            }
          />
        </LocalizationProvider>
      </Box>
    </Box>
  )
}
