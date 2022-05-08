import { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const VerticalLinearStepper = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    let result = true

    if (props.views && typeof props.views[activeStep].action === 'function') {
      result = await props.views[activeStep].action()
    }

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
        let result = await props.finalView.action()
    }
  }

  let views = props.views? props.views: []
  let nextLabel = props.nextBtnLabel? props.nextBtnLabel: 'Next'
  let finishLabel = props.finishBtnlabel? props.finishBtnlabel: 'Finish'
  let finalLabel = props.finalBtnLabel? props.finalBtnLabel: 'Save Changes'

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
            <StepLabel
              optional={
                (index === views.length - 1) ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }>
              <Typography
                {...activeStep === index? { color: 'primary' }: {}}
                onClick={() => {
                  if (props.disableLabelClick) return
                  setActiveStep(index)
                }}
                variant="subtitle1"
                style={{
                  ...{
                    width: 'fit-content',
                    cursor: 'pointer'
                  },
                  ...(activeStep === index? { fontWeight: 700 }: { fontWeight: 400 })
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
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}>
                    {index === views.length - 1 ? finishLabel : nextLabel}
                  </Button>
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
            <Button variant='outlined' onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
            <Button variant='contained' onClick={handleFinalAction} sx={{ mt: 1, mr: 1 }}>
              { finalLabel }
            </Button>
          </div>
        </Paper>
      )}
    </Box>
  );
}

export default VerticalLinearStepper