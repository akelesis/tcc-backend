module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator

    const post = async (req, res) => {
        const professorClass = req.body
        console.log(professorClass)
        try {
            existsOrError(professorClass.professor_id, "professor indefinido")
            existsOrError(professorClass.class_id, "departamento não informado")

            const professorClassFromDB = await app.db('professor_class')
                .where({ professor_id: professorClass.professor_id, class_id: professorClass.class_id }).first()

            notExistsOrError(professorClassFromDB, "Professor já foi cadastrado na turma anteriormente!")

            const professorClassSaved = await app.db('professor_class')
                .insert({ professor_id: professorClass.professor_id, class_id: professorClass.class_id })

            res.status(201).json({ msg: 'Professor gravado em turma com sucesso!', professorClassSaved })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const put = async (req, res) => {
        const professorClassId = req.params.id
        const professorClass = req.body

        existsOrError(professorClass.professor_id, "professor indefinido")
        existsOrError(professorClass.class_id, "turma não informada")
        
        try {
            const updatedProfessorClass = await app.db('professor_class')
                .update({professor_id: professorClass.professor_id, class_id: professorClass.class_id})
                .where({professor_class_id: professorClassId})
            res.status(200).json({ msg: 'Professor atualizado em turma com sucesso!', updatedProfessorClass})
        }
        catch(err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const getClassByProfessor = async (req, res) => {
        const professor_id = req.params.id;

        try{
            const professor_classes = await app.db('professor')
                .innerJoin('professor_class', 'professor.professor_id', 'professor_class.professor_id')
                .innerJoin('class', 'professor_class.class_id', 'class.class_id')
                .where({professor_id})

            res.status(200).json(professor_classes)
        }
        catch(err) {
            res.status(400).json(err)
        }
    }


    return { post, put, getClassByProfessor }
}