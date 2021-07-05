module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            const allClasses = await app.db('class').select('class.class_id', 'college_semester', 'subject_name', 'description', 'professor_name')
                .innerJoin('professor_class', 'class.class_id', 'professor_class.class_id')
                .innerJoin('professor', 'professor_class.professor_id', 'professor.professor_id')
                .innerJoin('subject', 'class.subject_id', 'subject.subject_id')
                .where({'class.deleted_at': null})
            res.status(200).json(allClasses)
        }
        catch(err) {
            res.status(500).send(err)
        }
    }

    const getById = async (req, res) => {
        const classId = req.params.id

        try{
            const classFromDB = app.db('class').where({class_id: classId}).first()
            res.status(200).json(classFromDB)
        }
        catch(err) {
            res.status(400).json(err)
        }
    }

    const getByPeriodandSemester = async (req, res) => {
        const classPeriod = req.query.period
        const classSemester = req.query.semester

        try {
            const classes = await app.db('class').select('class_id', 'college_semester', 'description', 'subject_name', 'semester')
                .innerJoin('subject', 'class.subject_id', 'subject.subject_id')
                .where({college_semester: classPeriod, semester: classSemester})
            res.status(200).json(classes)
        }
        catch(err) {
            console.log(err)
        }
    }

    const post = async (req, res) => {
        const classData = req.body
        try{
            existsOrError(classData.college_semester, "periodo letivo não especificado")
            existsOrError(classData.description, "descrição da disciplina não fornecida")
            existsOrError(classData.subject_id, "disciplina não atribuida") 

            const newclass = await app.db('class')
                .insert({
                    college_semester: classData.college_semester, 
                    description: classData.description, 
                    subject_id: classData.subject_id,
                    created_at: new Date().toISOString().replace('Z', '').replace('T', ' ')
                })
            res.status(201).json(newclass)
        }
        catch(err) {
            res.status(400).json(err)
        }
    }

    const put = async (req, res) => {
        const classData = req.body
        const classId = req.params.id
        
        try {
            const updatedClass = app.db('class')
                .update({
                    college_semester: classData.college_semester, 
                    description: classData.description, 
                    subject_id: classData.subject_id,
                    updated_at: new Date().toISOString().replace('Z', '').replace('T', ' ')
                })
                .where({class_id: classId})
            res.status(200).json(updatedClass)
        }
        catch(err) {
            res.status(400).json(err)
        }
    }

    const remove = async (req, res) => {
        const classId = req.params.id
        console.log(classId)
        try {
            await app.db('class').update({deleted_at: new Date().toISOString().replace('Z', '').replace('T', ' ')}).where({class_id: classId})
            res.status(204).send()
        }
        catch(err) {
            res.status(400).json(err)
        }

    }

    return {get, getById, getByPeriodandSemester, post, put, remove}
}