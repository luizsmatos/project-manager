import { api } from '@/lib/axios'

import { EnumTaskStatus, TaskDTO } from './dtos/task-dto'

interface ListProjectTasksBody {
  projectId: string
  title?: string
  status?: EnumTaskStatus
  page?: number | null
}

export interface ListProjectTasksResponse {
  tasks: TaskDTO[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export async function listProjectTasks({
  projectId,
  title,
  status,
  page,
}: ListProjectTasksBody) {
  const response = await api.get<ListProjectTasksResponse>(
    `/projects/${projectId}/tasks`,
    {
      params: {
        title,
        status,
        page,
      },
    },
  )

  return response.data
}
