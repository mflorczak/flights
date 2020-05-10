import { NotificationProgrammatic as Notification } from 'buefy'


export function showError(error: any) {
  Notification.open({
      duration: 5000,
      message: `${error.response.data.message}`,
      position: 'is-top',
      type: 'is-danger',
      hasIcon: true
  })
}