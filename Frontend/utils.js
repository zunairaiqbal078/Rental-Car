import { toast } from "react-toastify";
export const handleSuccess = (msg) => {
  toast.success(msg);
};
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};
