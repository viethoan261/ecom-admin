import { notifications } from '@mantine/notifications';

export const renderNotification = (title: string, description: string, type: notiType) => {
  notifications.show({
    title: title,
    message: description,
    color: getColorByType(type),
    withCloseButton: true,
    autoClose: 1200,
  });
};

export enum notiType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

const getColorByType = (type: notiType) => {
  switch (type) {
    case notiType.SUCCESS:
      return 'green';
    case notiType.ERROR:
      return 'red';
    case notiType.INFO:
      return 'blue';
  }
};
