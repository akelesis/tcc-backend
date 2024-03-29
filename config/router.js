module.exports = (app) => {
    
    app.post("/signin", app.api.auth.signIn)
    app.post("/validateToken", app.api.auth.validateToken)

    app.route("/users")
        .get(app.api.user.get)
        .post(app.api.user.post)

    app.route("/users/:id")
        .get(app.api.user.getById)
        .put(app.api.user.put)
        .delete(app.api.user.remove)

    app.route('/rooms')
        .get(app.api.room.get)
        .post(app.api.room.post)

    app.route('/rooms/:id')
        .get(app.api.room.getById)
        .put(app.api.room.put)
        .delete(app.api.room.remove)

    app.route('/professors')
        .get(app.api.professor.get)
        .post(app.api.professor.post)

    app.route('/professors/:id')
        .get(app.api.professor.getById)
        .put(app.api.professor.put)
        .delete(app.api.professor.remove)

    app.route('/subjects')
        .get(app.api.subject.get)
        .post(app.api.subject.post)

    app.route('/subjects/:id')
        .get(app.api.subject.getById)
        .put(app.api.subject.put)
        .delete(app.api.subject.remove)

    app.route('/classes')
        .get(app.api.classes.get)
        .post(app.api.classes.post)

    app.route('/classes/:id')
        .get(app.api.classes.getById)
        .put(app.api.classes.put)
        .delete(app.api.classes.remove)

    app.route('/schedule/classes')
        .get(app.api.classes.getByPeriodandSemester)

    app.route('/professor_classes')
        .post(app.api.professor_class.post)
        .put(app.api.professor_class.put)

    app.route('/professor_classes/:id')
        .get(app.api.professor_class.getClassByProfessor)

    app.route('/schedule_classes')
        .get(app.api.time_room.get)
        .post(app.api.time_room.post)

    app.route('/schedule_classes/:id')
        .put(app.api.time_room.put)
        .delete(app.api.time_room.remove)

    app.route('/periods')
        .get(app.api.periods.getPeriods)
    
    app.route('/conflicts/professor_and_time')
        .post(app.api.conflicts.verifyProfessorAndTime)

    app.route('/conflicts/room_and_time')
        .post(app.api.conflicts.verifyRoomAndTime)
}