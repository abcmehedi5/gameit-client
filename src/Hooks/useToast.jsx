import Swal from "sweetalert2";

const useToast = () => {
  // sweet success
  const successAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: true,
      timer: 3500,
    });
  };

  // sweet  error alert
  const errorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: message,
      showConfirmButton: true,
      timer: 3500,
    });
  };
  return [successAlert, errorAlert];
};

export default useToast;
