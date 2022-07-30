import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import LoadingButton from '../atomicComponents/loadingButton'

const HorizontalStepsNav = (props) => {

    const [activeStep, setActiveStep] = useState(0)
    const [loadingStates, setLoadingStates] = useState({
        steps: [],
        final: false
    })

    const handleNext = async () => {
        let result = true
        let stps = loadingStates.steps
        
        if (   props.views
            && typeof props.views[activeStep].action === 'function'
            && props.views[activeStep].action.constructor.name === 'AsyncFunction') {
            // show loadinbg indicator for async function
            stps[activeStep] = true
            setLoadingStates({ ...loadingStates, ...{ steps: stps }})

            if (props.views && typeof props.views[activeStep].action === 'function') {
                result = await props.views[activeStep].action()
            }

            // set loading to false
            stps[activeStep] = false
            setLoadingStates({ ...loadingStates, ...{ steps: stps }})
        } else {
            // directly trigger next
            if (   props.views
                && typeof props.views[activeStep].action === 'function'
                && props.views[activeStep].action.constructor.name === 'Function') {
                result = props.views[activeStep].action()
            }
        }

        if (result) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    let views = props.views? props.views: []
    let nextLabel = props.nextBtnLabel? props.nextBtnLabel: 'Next'
    let finishLabel = props.finishBtnLabel? props.finishBtnLabel: 'Finish'
    let finalLabel = props.finalBtnLabel? props.finalBtnLabel: 'Done'

    useEffect(() => {
        let stps = []
    
        if (props.views && props.views.length) {
          stps = props.views.map(() => false)
          // push a loading state for the final view
          stps.push(false)
        }
      
        setLoadingStates({ ...loadingStates, ...{ steps: stps }})
    }, [props.views])

    return (
        <Box>
            <Stepper activeStep={activeStep}>
                {views.map((step, index) => {
                    return (
                        <Step
                            key={step.title}
                            onClick={() => {
                                if (props.disableLabelClick || loadingStates.steps.some(item => item)) return
                                setActiveStep(index)
                            }}>
                            <StepLabel>
                                <Typography
                                    {...activeStep === index? { color: 'primary' }: {}}
                                    variant="subtitle1"
                                    style={{
                                        ...{
                                            width: 'fit-content'
                                        },
                                        ...(activeStep === index? { fontWeight: 700 }: { fontWeight: 400 }),
                                        ...(props.disableLabelClick? {}: { cursor: 'pointer' })
                                    }}>
                                    {step.title}
                                </Typography>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            {/* steps contents */}
            {/*  for final view */}
            {activeStep === views.length ? (
                <>
                    <Box>
                        { props.finalView? props.finalView.component: <Typography>All steps completed</Typography> }
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Back to first</Button>
                        {
                            props.finalView && props.finalView.action? (
                                <LoadingButton
                                    style={{ marginLeft: 5 }}
                                    variant='contained'
                                    isLoading={loadingStates.final}
                                    onClick={async () => {
                                        setLoadingStates({ ...loadingStates, ...{ final: true }})
                                        await props.finalView.action()
                                        setLoadingStates({ ...loadingStates, ...{ final: false }})
                                    }}>{ finalLabel }</LoadingButton>
                            ): null
                        }
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        { views[activeStep] && views[activeStep].component? views[activeStep].component: null }
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <LoadingButton
                            isLoading={ loadingStates.steps[activeStep] }
                            onClick={handleNext}>
                            {activeStep === views.length - 1 ? finishLabel : nextLabel }
                        </LoadingButton>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default HorizontalStepsNav