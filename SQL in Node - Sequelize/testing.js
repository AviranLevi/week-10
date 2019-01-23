const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://AviranLevi:12345678@fs-bootcamp.cqc0oq2maxqm.us-west-2.rds.amazonaws.com/AviranLevi_db')

const addStudent = async (name, isBrilliant) => {
    let query = `insert into student values (null, '${name}', ${isBrilliant})`
    let result = await sequelize.query(query)
    return result[0]
}

const addTeacher = async (name, isTenured) => {
    let query = `insert into teacher values (null, '${name}', ${isTenured})`
    let result = await sequelize.query(query)
    return result[0]
}

const enrollStudent = async (studentName, teacherName) => {
    let findStudent = await sequelize.query(`select s_id from student where s_name = '${studentName}'`)
    let findTeacher = await sequelize.query(`select t_id from teacher where t_name = '${teacherName}'`)

    let studentId = findStudent[0][0].t_id
    let teacherId = findTeacher[0][0].s_id

    if (!(studentId && teacherId)) { return }

    sequelize.query(`insert into student_teacher
        values (${studentId}, ${teacherId})`)
}