import { SweetAlertOptions } from "sweetalert2";

export function createErrorOptions(error: any): SweetAlertOptions {
  const msg = error.code ? `[${error.code}] ${error.message}` : error.message
  return {
    title: error.name,
    text: msg,
    icon: 'error',
    confirmButtonText: 'Ok',
  };
}

export function getNotImplementedOptions(msg: string): SweetAlertOptions {
  return {
    title: 'Error',
    text: `${msg} not implemented.`,
    icon: 'error',
    confirmButtonText: 'Ok',
  }
}

export function isAdmin(user: any) {
  return (user.type == 'admin');
}
