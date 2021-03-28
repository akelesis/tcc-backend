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

    app.route('/lectures')
        .get(app.api.lecture.get)
        .post(app.api.lecture.post)

    app.route('/lectures/:id')
        .get(app.api.lecture.getById)
        .put(app.api.lecture.put)
        .delete(app.api.lecture.remove)
}