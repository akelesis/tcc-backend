module.exports = app => {
    const { notExistsOrError } = app.api.validator

    const getProfessorId = async (class_id) => {
        return await app.db('class')
            .select('professor.professor_id')
            .innerJoin('professor_class', 'class.class_id', 'professor_class.class_id')
            .innerJoin('professor', 'professor_class.professor_id', 'professor.professor_id')
            .where({ 'class.class_id': class_id }).first()
    }

    const getPossibleProfessorConflicts = async (timeslotInfo, professor_id) => {
        return await app.db('time_room')
                .select('day', 'time', 'professor_id', 'college_semester')
                .innerJoin('class', 'time_room.class_id', 'class.class_id')
                .innerJoin('professor_class', 'class.class_id', 'professor_class.class_id')
                .where({
                    professor_id: professor_id.professor_id,
                    day: timeslotInfo.day,
                    time: timeslotInfo.time,
                    college_semester: timeslotInfo.period
                })
    }

    const verifyProfessorAndTime = async (req, res) => {
        const timeslotInfo = req.body
        try {
            const professor_id = await getProfessorId(timeslotInfo.class_id)
            const regsFromDB = await getPossibleProfessorConflicts(timeslotInfo, professor_id)
            notExistsOrError(regsFromDB, 'O professor já possui turma cadastrada neste horário!')
            res.status(200).send()
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const getPeriod = async (class_id) => {
        return await app.db('class')
            .select('college_semester')
            .where({class_id}).first()
    }

    const verifyRoomAndTime = async (req, res) => {
        const timeslotInfo = req.body
        try {
            const period = await getPeriod(timeslotInfo.class_id)
            const regsFromDB = await app.db('time_room')
                .innerJoin('class', 'time_room.class_id', 'class.class_id')
                .where({
                    day: timeslotInfo.day,
                    time: timeslotInfo.time,
                    room_id: timeslotInfo.room_id,
                    college_semester: period.college_semester,
                    deleted_at: null
                })
            notExistsOrError(regsFromDB, 'A sala já está sendo usada neste horário')
            res.status(200).send()
        }
        catch(err) {
            res.status(400).json({msg:err, error: true})
        }
    }

    return { verifyProfessorAndTime, verifyRoomAndTime }
}