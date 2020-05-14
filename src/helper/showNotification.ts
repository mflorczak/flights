import { NotificationProgrammatic as Notification } from 'buefy'
import { ApiResponse } from '@/store/models'


export function showError(error: any) {
  console.log(error)
  Notification.open({
      duration: 5000,
      message: `${error.response.data.message}`,
      position: 'is-top',
      type: 'is-danger',
      hasIcon: true
  })
}

export function showSuccess(response: ApiResponse) {
  console.log(response)
  Notification.open({
      duration: 3000,
      message: `${response.message}`,
      position: 'is-top',
      type: 'is-success',
      hasIcon: true
  })
}