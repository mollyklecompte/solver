const getEquationStepChanges = require('./getEquationStepChanges');
const getEquationSubstepChanges = require('./getEquationSubstepChanges');
const arrayToCommaList = require('./arrayToCommaList');

function describeEquationStep(step) {
  // console.log("FUNCTION " + StepChanges.changeFunction);
  var StepChanges = getEquationStepChanges(step);
  var stepDescription = "";

  if (step.changeType === 'SIMPLIFY_LEFT_SIDE' || step.changeType === 'SIMPLIFY_RIGHT_SIDE') {
    if (step.substeps.length >0) {
      stepDescription = "See substeps.";
    }

    else {
      if (StepChanges.changeFunction === "add") {
        var addValues = StepChanges.changeValues;
        stepDescription = "Add " + arrayToCommaList(StepChanges.changeValues);
      }
      else if (StepChanges.changeFunction === "subtract") {
        stepDescription = "Subtract " + StepChanges.changeValues[1] + " from " + StepChanges.changeValues[0];
      }
      else if (StepChanges.changeFunction === "multiply") {
        stepDescription = "Multiply " + arrayToCommaList(StepChanges.changeValues);
      }
      else if (StepChanges.changeFunction === "divide") {
        stepDescription = "Divide " + StepChanges.changeValues[0] + " by " + StepChanges.changeValues[1];
      }

      else {
        stepDescription = "Boop.";
      }
    }
  }

  else if (step.changeType === "DIVIDE_FROM_BOTH_SIDES") {
    stepDescription = "Divide both sides by " + StepChanges.changeValues[0];
  }
  else if (step.changeType === "ADD_TO_BOTH_SIDES") {
    stepDescription = "Add " + StepChanges.changeValues[0] + " to both sides.";
  }
  else if (step.changeType === "SUBTRACT_FROM_BOTH_SIDES") {
    stepDescription = "Subtract " + StepChanges.changeValues[0] + " from both sides.";
  }
  return stepDescription;
}

module.exports = describeEquationStep;
