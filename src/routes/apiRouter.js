const Router = require('express').Router
const Company = require('../models/Company.js')
const Job = require('../models/Job.js')

const apiRouter = Router()

const jobsRows = [
    {
    title: 'SQL Server Administrator - Postgres',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination. User generated content in real-time will have multiple touchpoints for offshoring.',
    location: 'Guadalajara',
    salary: 27000,
    fullTime: true,
    companyId: 1
  },
  {
    title: 'UX Engineer',
    description: 'Override the digital divide with additional clickthroughs from DevOps. Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    location: 'Monterrey',
    salary: 35000,
    fullTime: true,
    companyId: 1
  },
  {
    title: 'API Architect',
    description: 'Collaboratively administrate turnkey channels whereas virtual e-tailers. Objectively seize scalable metrics whereas proactive e-services.',
    location: 'Ciudad de Mexio',
    salary: 39000,
    fullTime: true,
    companyId: 2
  },
  {
    title: 'Mid-Level Front End Engineer',
    description: 'Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking. Completely pursue scalable customer service through sustainable potentialities.',
    location: 'Ciudad de Mexico',
    salary: 21000,
    fullTime: false,
    companyId: 2
  }
]
const companiesRows = [
  {
  name: 'Company ABC',
  description: 'Energistically network alternative technology deploying impactful partnerships.',
  imageLink: 'http://www.tinygraphs.com/labs/isogrids/hexa16/nsuaio',
  location: 'Guadalajara'
  },
  {
  name: 'Lossless Enterprises',
  description: 'Quickly strategizing team driven "outside the box" thinking.',
  location: 'Ciudad de Mexico',
  imageLink: 'http://www.tinygraphs.com/labs/isogrids/hexa16/8282',
  }
]

const fetchCompanies = (req, res)=>{
  Company.query()
  .eager('companyJobs')
  .then((recordsWithCompanies)=>{
    res.status(200).json(recordsWithCompanies)
  })
  .catch((err)=>{
    console.log("ya bailó Bertha");
    var errorMessage = err.toString()
    res.status(500).send(errorMessage)
  })
}
const fetchOneCompany = (req, res)=>{
  const db = req.app.locals.db
  const idInRoute = req.params._id

  db.select('*').from('companies')
    .where('id', '=', idInRoute)
    .then((records)=>{
      res.json(records[0])
  })
}
const createOneCompany = (req, res)=>{
  Company
    .query()
    .insert(req.body)
    .then((newCompany)=>{
      res.status(200).json(newCompany)
    })
}
const editOneCompany = (req, res)=>{
  Company
    .query()
    .updateAndFetchById( req.params._id , req.body )
    .then((updateCompany)=>{
      res.status(200).json(updateCompany)
    })
}

const fetchJobs = (req, res)=>{
  Job.query()
  .eager("companiesList")
  .then((recordsWithJobs)=>{
    res.status(200).json(recordsWithJobs)
  })
  .catch((err)=>{
    console.log("valió madre");
    var errorMessage = err.toString()
    res.status(500).send(errorMessage)
  })

}
const fetchOneJob = (req, res)=>{
  const db = req.app.locals.db
  const idInRoute = req.params._id

  db.select('*').from('jobs')
    .where('id', '=', idInRoute)
    .then((jobsRecords)=>{
      res.json(jobsRecords[0])
    })
}
const createOneJob = (req, res)=>{
  Job
    .query()
    .insert(req.body)
    .then((newJob)=>{
      res.status(200).json(newJob)
    })
}
const editOneJob = (req, res)=>{
  Job
    .query()
    .updateAndFetchById(req.params._id, req.body)
    .then((updatedJob)=>{
      res.status(200).json(updatedJob)
    })
}
const deleteOneJob = (req, res)=>{
  Job
    .query()
    .deleteById(req.params._id)
    .then((deletedJob)=>{
      res.status(200).json(deletedJob)
    })
}

apiRouter.get('/', (req, res)=>{
  res.json({
    '/api/jobs' : 'Show jobs',
    '/api/companies' : 'Show companies'
  })
})

apiRouter
  .get('/companies', fetchCompanies)
  .get('/companies/:_id', fetchOneCompany)
  .post('/companies', createOneCompany)
  .put('/companies/:_id', editOneCompany)

apiRouter
  .get('/jobs', fetchJobs)
  .get('/jobs/:_id', fetchOneJob)
  .post('/jobs', createOneJob)
  .put('/jobs/:_id', editOneJob)
  .delete('/jobs/:_id', deleteOneJob)


module.exports = apiRouter
