
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            const lectures = await app.db('class')

            res.status(200).send(lectures)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const getById = async (req, res) => {
        const lectureId = req.params.id
        try {
            const lecture = await app.db('class').where({ id: lectureId }).first()

            res.status(200).send(lecture)
        }
        catch (err) {
            res.status(400).send({ msg: err, error: true })
        }
    }

    const post = async (req, res) => {
        const lecture = req.body
        try {
            existsOrError(lecture.id_subject, "Disciplina da turma não foi atribuida")
            existsOrError(lecture.id_professor, "Professor não foi atribuído à turma")

            const professorFromDB = await app.db('professor')
                .where({ id: lecture.id_professor }).first()
            const subjectFromDB = await app.db('subject').where({ id: lecture.id_subject }).first()

            if (subjectFromDB.deleted_at != null || professorFromDB.deleted_at != null) {
                throw "Dados inválidos, por favor selecione professor e disciplina válidos"
            }

            const lectureSaved = await app.db('class')
                .insert({ id_subject: lecture.id_subject, id_professor: lecture.id_professor, period: lecture.period, id_room: lecture.id_room, created_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
            res.status(201).json({ msg: 'Aula gravado com sucesso!', lectureSaved })
        } 
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const put = async (req, res) => {
        const lecture = req.body
        const lectureId = req.params.id

        console.log(lecture)

        try {
            const updatedLecture = await app.db('class')
                .update({ id_subject: lecture.id_subject, id_professor: lecture.id_professor, period: lecture.period, id_room: lecture.id_room, updated_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
                .where({ id: lectureId })

            res.status(200).json({ msg: 'Aula atualizada com sucesso!', updatedLecture })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const remove = async (req, res) => {
        const lectureId = req.params.id

        try {
            const removedLecture = await app.db('class')
                .update({ deleted_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
                .where({ id: lectureId })

            existsOrError(removedLecture, 'Aula não encontrada!')

            res.status(204).send()
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    return { get, getById, post, put, remove }
}