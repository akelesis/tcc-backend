
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            const subjects = await app.db('subject').where({deleted_at: null})

            res.status(200).send(subjects)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const getById = async (req, res) => {
        const subjectId = req.params.id
        try {
            const subject = await app.db('subject').where({ id: subjectId }).first()

            res.status(200).send(subject)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const post = async (req, res) => {
        const subject = req.body
        try {
            existsOrError(subject.subject_name, "nome indefinido")
            existsOrError(subject.semester, "semestre não informado")
            existsOrError(subject.workload, "carga horária indefinida")
            existsOrError(subject.credits, "quantidade de créditos indefinida")
            
            const subjectFromDB = await app.db('subject').where({ subject_name: subject.subject_name, deleted_at: null }).first()
            notExistsOrError(subjectFromDB, "Disciplina já foi cadastrada anteriormente!")

            const subjectSaved = await app.db('subject')
                .insert({ subject_name: subject.subject_name, semester: subject.semester, workload: subject.workload, credits: subject.credits, subject_code: "Teste", created_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })

            res.status(201).json({ msg: 'Disciplina gravada com sucesso!', subjectSaved })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const put = async (req, res) => {
        const subject = req.body
        const subjectId = req.params.id

        try {
            const updatedSubject = await app.db('subject')
                .update({ subject_name: subject.subject_name, semester: subject.semester, workload: subject.workload, credits: subject.credits, updated_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
                .where({ subject_id: subjectId })

            res.status(200).json({ msg: 'Disciplina atualizada com sucesso!', updatedSubject })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const remove = async (req, res) => {
        const subjectId = req.params.id

        try {
            const removedsubject = await app.db('subject')
                .update({deleted_at: new Date().toISOString().replace('Z', '').replace('T', ' ')})
                .where({ subject_id: subjectId })

            existsOrError(removedsubject, 'Sala não encontrada!')

            res.status(204).send()
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    return { get, getById, post, put, remove }
}