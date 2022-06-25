import config from '../../../config'
import MailIcon from '@mui/icons-material/Mail'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import LinkIcon from '@mui/icons-material/Link'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import PeopleIcon from '@mui/icons-material/People'

const Pages = [
    [
        {
            component: <SettingsApplicationsIcon />,
            label: 'App Settings',
            type: 'link',
            value: `/${ config.rootRoute }/admin/appSettings`
        },
        {
            component: <LinkIcon />,
            label: 'Endpoints',
            type: 'link',
            value: `/${ config.rootRoute }/admin/appEndpoints`
        },
        {
            component: <AccessibilityNewIcon />,
            label: 'Roles',
            type: 'link',
            value: `/${ config.rootRoute }/admin/appRoles`
        },
        {
            component: <SettingsAccessibilityIcon />,
            label: 'Role Endpoints',
            type: 'link',
            value: `/${ config.rootRoute }/admin/appRoleEndpoints`
        },
        {
            component: <PeopleIcon />,
            label: 'App Users',
            type: 'link',
            value: `/${ config.rootRoute }/admin/appUsers`
        }
    ]
    // [
    //     {
    //         component: <MailIcon />,
    //         label: 'Notes',
    //         type: 'action',
    //         value: 'notes'
    //     }
    // ],
    // [
    //     {
    //         // component: <MailIcon />,
    //         label: 'Notes II',
    //         type: 'action',
    //         value: 'notes II'
    //     }
    // ]
]

export default Pages