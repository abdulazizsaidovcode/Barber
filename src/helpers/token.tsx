const token: string | null | undefined = sessionStorage.getItem('token');

export const config = {
  headers: {
    Authorization: token
  }
};

export const setConfig = (): string | null => config.headers.Authorization = token