import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import LoadingButton from '../atomicComponents/loadingButton'

const VerticalLinearStepperNav = (props) => {
  const [activeStep, setActiveStep] = useState(0)
  const [loadingStates, setLoadingStates] = useState({
    steps: []
  })

  const handleNext = async () => {
    let result = true

    // set loading to true
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

    // stps[activeStep] = true
    // setLoadingStates({ ...loadingStates, ...{ steps: stps }})

    // if (props.views && typeof props.views[activeStep].action === 'function') {
    //   result = await props.views[activeStep].action()
    // }

    // // set loading to false
    // stps[activeStep] = false
    // setLoadingStates({ ...loadingStates, ...{ steps: stps }})

    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinalAction = async () => {
    if (   props.finalView
        && props.finalView.action
        && typeof props.finalView.action === 'function') {

        // set loading to true
        let stps = loadingStates.steps
        stps[activeStep] = true
        setLoadingStates({ ...loadingStates, ...{ steps: stps }})

        let result = await props.finalView.action()

        // set loading to false
        stps[activeStep] = false
        setLoadingStates({ ...loadingStates, ...{ steps: stps }})
    }
  }

  let views = props.views? props.views: []
  let nextLabel = props.nextBtnLabel? props.nextBtnLabel: 'Next'
  let finishLabel = props.finishBtnlabel? props.finishBtnlabel: 'Finish'
  let finalLabel = props.finalBtnLabel? props.finalBtnLabel: 'Save Changes'

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
      {/* the main stepper */}
      <Stepper
        activeStep={activeStep}
        orientation="vertical">
        {views.map((step, index) => (
          <Step
            key={step.title}>
            {/* step label */}
            <StepLabel>
              <Typography
                {...activeStep === index? { color: 'primary' }: {}}
                onClick={() => {
                  if (props.disableLabelClick || loadingStates.steps.some(item => item)) return
                  setActiveStep(index)
                }}
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

            {/* step content */}
            <StepContent>
              <Box>
                { step.component? step.component: null }
              </Box>
              <Box sx={{ mb: 2 }}>
                <div
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    textAlign: 'end'
                  }}>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                  <LoadingButton
                    variant="contained"
                    isLoading={ loadingStates.steps[index] }
                    onClick={ handleNext }
                    sx={{ mt: 2}}>
                    { index === views.length - 1 ? finishLabel : nextLabel }
                  </LoadingButton>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* when finishing the last step */}
      {activeStep === views.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          { props.finalView? props.finalView.component: <Typography>All steps completed</Typography> }
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'end'
            }}>
            <Button
              variant='outlined'
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
            <LoadingButton
              variant='contained'
              isLoading={ loadingStates.steps[activeStep] }
              onClick={ handleFinalAction }
              sx={{ mt: 1, mr: 1 }}>
              { finalLabel }
            </LoadingButton>
          </div>
        </Paper>
      )}
    </Box>
  );
}

export default VerticalLinearStepperNav