import config from '../../../config'
import CommitIcon from '@mui/icons-material/Commit'

const Pages = [
    [
        {
            component: <CommitIcon />,
            label: 'Introduction',
            type: 'link',
            value: `/${ config.rootRoute }/demo/introduction`
        },
        {
            component: <CommitIcon />,
            label: 'Buttons',
            type: 'link',
            value: `/${ config.rootRoute }/demo/buttons`
        },
        {
            component: <CommitIcon />,
            label: 'Inputs',
            type: 'link',
            value: `/${ config.rootRoute }/demo/inputs`
        },
        {
            component: <CommitIcon />,
            label: 'Lists',
            type: 'link',
            value: `/${ config.rootRoute }/demo/lists`
        },
        {
            component: <CommitIcon />,
            label: 'Navigations',
            type: 'link',
            value: `/${ config.rootRoute }/demo/navigations`
        },
        {
            component: <CommitIcon />,
            label: 'Blocks',
            type: 'link',
            value: `/${ config.rootRoute }/demo/blocks`
        }
    ]
]

export default Pages