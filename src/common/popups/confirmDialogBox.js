import NormalDialogBox from './normalDialogBox'

import utils from '../utilities'

const ConfirmDialogBox = (props) => {
    return (
        <NormalDialogBox
            title={ props.title? props.title: '' }
            open={ props.open? props.open: false }
            fullWidth={ true }

            strictClose={ true }         // will enable/disable close event from the dialog background
            proceedConfirmation={ true } // a confirm dialog before proceeding
            proceedLabel={ 'Proceed' }   // button proceed label
            onProceed={async () => {     // method to run when proceeding
                console.log('will proceed!')
                await utils.waitFor(2)
                return true
            }}
            onClose={props.onClose? props.onClose: () => {}}>
            { props.children }
        </NormalDialogBox>
    )
}

export default ConfirmDialogBox