module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        try {
            const allClasses = await app.db('class')
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
                    created_at: new Date().toISOString().replace('Z', '').replace('T', ' ')
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
        
        try {
            await app.db('class').where({class_id: classId}).del()
            res.status(204).send()
        }
        catch(err) {
            res.status(400).json(err)
        }

    }

    return {get, getById, post, put, remove}
}