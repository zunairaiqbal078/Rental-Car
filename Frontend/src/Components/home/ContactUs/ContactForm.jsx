import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  resetContactState,
} from "../../../store/contact-slice";
function ContactForm() {
  const dispatch = useDispatch();
  const { isLoading, successMessage, errorMessage } = useSelector(
    (state) => state.contact
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(submitContactForm(data))
      .unwrap()
      .then(() => {
        reset();
        setTimeout(() => dispatch(resetContactState()), 3000);
      });

    console.log("Form Submitted: ", data);
  };

  return (
    <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center text-yellow-600">
        Send Us a Message
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long.",
                },
              })}
              className={`w-full p-4 border rounded-lg focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-600`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address.",
                },
              })}
              className={`w-full p-4 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-600`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject"
            {...register("subject", {
              required: "Subject is required.",
            })}
            className={`w-full p-4 border rounded-lg focus:outline-none ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-600`}
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <textarea
            placeholder="Your Message"
            rows="6"
            {...register("message", {
              required: "Message is required.",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters long.",
              },
            })}
            className={`w-full p-4 border rounded-lg resize-none focus:outline-none ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-600`}
          ></textarea>
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white transition duration-300 bg-yellow-700 rounded-lg hover:bg-yellow-400"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
