import { SweetAlertOptions } from "sweetalert2";

export function createErrorOptions(error: Error): SweetAlertOptions {
  return {
    title: error.name,
    text: error.message,
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
  return true;
}