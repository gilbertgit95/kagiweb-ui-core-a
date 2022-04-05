import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Check from '@mui/icons-material/Check'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

const drawerWidth = 200

const SubPagesLayout = (props) => {


    return (
        <Container maxWidth="lg">
            <Box>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                    <Toolbar />
                    <Divider />
                    <MenuList dense>
                        <MenuItem>
                            <ListItemText inset>Single</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText inset>1.15</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText inset>Double</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Check />
                            </ListItemIcon>
                            Custom: 1.2
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemText>Add space before paragraph</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>Add space after paragraph</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemText>Custom spacing...</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Drawer>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant="h4" gutterBottom component="div">
                            { config.appName }
                        </Typography>
                    </Grid> */}
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Box>
                            { props.children? props.children: null }
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Copyrights 2021
                        </Typography>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    )
}

export default SubPagesLayout