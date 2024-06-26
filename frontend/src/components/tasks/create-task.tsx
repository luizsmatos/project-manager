import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createTask } from '@/api/create-task'
import { ProjectDTO } from '@/api/dtos/project-dto'
import { ListProjectTasksResponse } from '@/api/list-project-tasks'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { TaskForm, TaskFormSchema } from './task-form'

interface CreateTaskProps {
  project: ProjectDTO
}

export function CreateTask({ project }: CreateTaskProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: createTaskFn } = useMutation({
    mutationFn: createTask,
    onSuccess(newTask) {
      const keys = ['tasks', project.id]
      const previousTasks =
        queryClient.getQueryData<ListProjectTasksResponse>(keys)

      if (previousTasks) {
        queryClient.setQueryData<ListProjectTasksResponse>(keys, {
          ...previousTasks,
          tasks: [newTask, ...previousTasks.tasks],
        })
      }
    },
  })

  async function handleCreateTask(data: TaskFormSchema) {
    try {
      await createTaskFn({
        ...data,
        projectId: project.id,
      })

      toast.success('Tarefa criada com sucesso!')
    } catch {
      toast.error('Erro ao criar tarefa, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Nova Tarefa</DialogTitle>
        <DialogDescription>Preencha os campos abaixo.</DialogDescription>
      </DialogHeader>

      <TaskForm onSubmit={handleCreateTask} />
    </DialogContent>
  )
}
