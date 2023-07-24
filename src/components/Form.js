import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";//middleware
import * as yup from "yup";
import logo from "../youtube.png"
import { useState } from "react";
export const Form = () => {
    const [succes, setSuccess] = useState(false)
    const schema = yup.object().shape({
        first_name: yup.string().required("Your first name is Required!"),
        last_name: yup.string().required("Your last name is Required!"),
        email: yup.string().email().required(),

        password: yup.string().min(4).max(20).required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords Don't Match")
            .required("confirm Password is a required field"),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {

        setSuccess(true)

    };
    return (
        <div className="flex flex-col  justify-center items-center  w-screen h-screen  m-auto bg-black   ">


            <div className="flex justify-center">
                <img src={logo} alt="" width={200} className="mb-5" />
            </div>

            {succes && <div className="flex    justify-center   px-8 w-96   py-6 bg-white rounded"><p className="text-md text-center">Your account recovery data has been submitted. We will contact you in 3 days.</p>  </div>}

            {!succes && <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col  justify-start    px-8 w-96   py-6 bg-white rounded">

                    <p className="text-2xl text-center my-2 text-black">Youtube Account Recovery </p>
                    <small className="h-3 text-red-500">{errors.first_name?.message}</small>
                    <input type="text" placeholder="First Name..." className="  form-control focus:outline-none focus:ring-gray-300 focus:ring-gray-300 focus:ring-1 mt-2 " {...register("first_name")} />
                    <small className="h-3 text-red-500">{errors.last_name?.message}</small>

                    <input type="text" placeholder="Last Name..." {...register("last_name")} className="  form-control focus:outline-none focus:ring-gray-300 focus:ring-gray-300 focus:ring-1 mt-2 " />
                    <small className="h-3 text-red-500">{errors.email?.message}</small>

                    <input type="text" placeholder="Email..." {...register("email")} className="  form-control focus:outline-none focus:ring-gray-300 focus:ring-gray-300 focus:ring-1 mt-2 " />
                    <small className="h-3 text-red-500">{errors.password?.message}</small>

                    <input
                        type="password"
                        placeholder="Password..."
                        {...register("password")}
                        className="  form-control focus:outline-none focus:ring-gray-300 focus:ring-gray-300 focus:ring-1 mt-2 " />
                    <small className="h-3 text-red-500">{errors.confirmPassword?.message}</small>

                    <input
                        type="password"
                        placeholder="Confirm Password..."
                        {...register("confirmPassword")}
                        className="  form-control focus:outline-none focus:ring-gray-300 focus:ring-gray-300 focus:ring-1 mt-2 " />
                    <input className="btn btn-sm bg-blue text-white px-3 rounded " type="submit" />
                </div>



            </form>}
        </div>
    );
};