import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// - import excel through copy paste
// - import excel through upload
// - option to create table

// - create table from clipboard
// * edit and evaluation mode
// * create editable table
// * editable column
// * editable row
// * dragable column
// * dragable row
// * add/remove column
// * add/remove row

const ImportTable = (props) => {
    const tableData = useState({
        header: ['Endpoint', 'Name', 'Type', 'Category', 'Subcategory'],
        data: []
    })
    const steps = ['Import Data', 'Modify Data', 'Evaluate and Finish']

    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set())

    const isStepOptional = (step) => {
        return step === 1
    }

    const isStepSkipped = (step) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values())
        newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values())
        newSkipped.add(activeStep)
        return newSkipped
        })
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}

                if (isStepSkipped(index)) {
                    stepProps.completed = false
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                )
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&aposre finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
                </>
            ) : (
                <>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                    </Button>
                    )}

                    <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </>
            )}
        </Box>
    )
}

export default ImportTable