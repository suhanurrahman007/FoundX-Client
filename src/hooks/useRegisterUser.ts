import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { registerUser } from "../services/AuthService/registerUser";
import { toast } from "sonner";

const useRegisterUser = () => {
    return (
        useMutation<any, Error, FieldValues>({
            mutationKey: ["User_Registration"],
            mutationFn: async (userData) => await registerUser(userData),
            onSuccess: ()=> {
                toast.success("User Registration successfully...!!");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    );
};

export default useRegisterUser;