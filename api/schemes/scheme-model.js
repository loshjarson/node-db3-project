const db = require("../../data/db-config")

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

  return db
    .select('sc.scheme_name', 'st.*')
    .from('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')
    .then((steps) => {
      if(steps[0].step_id === null) {
        const schemeSteps = {
          'scheme_id': scheme_id,
          'scheme_name': steps[0].scheme_name,
          'steps': []
        }
        return schemeSteps
      } else {
        const schemeSteps = {
          'scheme_id': scheme_id,
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
}

function add(scheme) { // EXERCISE D
  return db('schemes')
    .insert({ scheme_name: scheme.scheme_name })
    .then(id => {
      return db('schemes')
      .where("scheme_id",id)
    })
}

function addStep(scheme_id, step) { // EXERCISE E
  return db('steps')
    .insert({
      step_number: step.step_number,
      instructions: step.instructions,
      scheme_id: scheme_id
    })
    .then(id => {
      return findSteps(scheme_id)
    })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
