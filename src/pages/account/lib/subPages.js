import config from '../../../config'
import MailIcon from '@mui/icons-material/Mail'
import SettingsIcon from '@mui/icons-material/Settings'
import FaceIcon from '@mui/icons-material/Face'
import KeyIcon from '@mui/icons-material/Key'

const Pages = [
    [
        {
            component: <KeyIcon />,
            label: 'Credentials',
            type: 'link',
            value: `/${ config.rootRoute }/account/credentials`
        },
        {
            component: <FaceIcon />,
            label: 'Profile',
            type: 'link',
            value: `/${ config.rootRoute }/account/profile`
        },
        {
            component: <SettingsIcon />,
            label: 'Settings',
            type: 'link',
            value: `/${ config.rootRoute }/account/settings`
        },
    ],
    [
        {
            component: <MailIcon />,
            label: 'Notes',
            type: 'action',
            value: 'notes'
        }
    ],
    [
        {
            // component: <MailIcon />,
            label: 'Notes II',
            type: 'action',
            value: 'notes II'
        }
    ]
]

export default Pages