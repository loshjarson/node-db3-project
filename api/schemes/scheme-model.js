function find() { // EXERCISE A
  return db
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .from('schemes as sc ')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id')
}

function findById(scheme_id) { // EXERCISE B
  const schemeID = Number(scheme_id)
  return db
    .select('sc.scheme_name', 'st.*')
    .from('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', schemeID)
    .orderBy('st.step_number')
    .then((steps) => {
      if(steps[0].step_id === null) {
        const schemeSteps = {
          'scheme_id': schemeID,
          'scheme_name': steps[0].scheme_name,
          'steps': []
        }
        return schemeSteps
      } else {
        const schemeSteps = {
          'scheme_id': schemeID,
          'scheme_name': steps[0].scheme_name,
          'steps': steps.map(step => {
            return {
              "step_id": step.step_id,
              "step_number": step.step_number,
              "instructions": step.instructions
            }
          })
        }
        return schemeSteps
        
      }
      
    })
}

function findSteps(scheme_id) { // EXERCISE C
  return db
    .select('st.step_id','st.step_number','st.instructions','sc.scheme_name')
    .from('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_id', "desc")
    .then(steps => {
      if (steps[0].step_number === null) {
        return [];
      } else {
        return steps;
      }
    })
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
