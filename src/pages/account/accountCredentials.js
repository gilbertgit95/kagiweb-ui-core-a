import Grid from '@mui/material/Grid'

// import AccountContext from '../../common/context/accountContext'
import AccountView from './components/accountCredentialsView'
import AccountEdit from './components/accountCredentialsEdit'

import SubPageslayout from '../../common/layouts/subPagesLayout'

const AccountCredentials = (props) => {
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Home test value from context'})
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {/* <Typography>Account Core Content</Typography> */}
                <SubPageslayout>
                    <AccountView />
                    <AccountEdit />
                </SubPageslayout>
            </Grid>
        </Grid>
    )
}

export default AccountCredentials