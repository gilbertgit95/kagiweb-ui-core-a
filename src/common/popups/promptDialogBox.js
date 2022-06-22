import NormalDialogBox from './normalDialogBox'

const PromptDialogBox = (props) => {
    return (
        <NormalDialogBox
            title={ props.title? props.title: 'Prompt' }
            open={ props.open? props.open: false }
            fullWidth={ true }

            strictClose={ true }         // will enable/disable close event from the dialog background
            onClose={props.onClose? props.onClose: () => {}}>
            { props.children }
        </NormalDialogBox>
    )
}

export default PromptDialogBox