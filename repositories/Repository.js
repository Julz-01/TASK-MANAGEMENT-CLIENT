import TaskRepository from '~/repositories/TaskRepository'
import AuthRepository from '~/repositories/AuthRepository'

export default ($axios) => ({
    task: TaskRepository($axios),
    auth: AuthRepository($axios)
})