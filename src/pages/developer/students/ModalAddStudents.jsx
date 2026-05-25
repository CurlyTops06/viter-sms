import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../functions/functions-general";
import ModalWrapperSide from "../../../partials/modal/ModalWrapperSide";
import { FaTimesCircle } from "react-icons/fa";
import { InputText } from "../../../functions/FormInputs";
import { Formik, Form } from "formik";

const ModalAddStudents = ({ itemEdit, setIsOpen }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  //   THis is to refetch the reading data when update is happening
  const queryClient = useQueryClient();
  //   This is the update or create function
  const mutation = useMutation({
    mutationFn: async (values) =>
      queryData(
        `${apiVersion}/controllers/developer/students.php`,
        "post", // Post = Create
        values, //The data to be sent
      ),
    onSuccess: (data) => {
      if (data.success) {
        // If success show the message
        alert("Successfully added");
        setIsOpen(false);
      } else {
        // If this is error alert/show the error msg
        alert(data.error);
      }
      //This is to refetch the data after update or create
      queryClient.invalidateQueries(["students"]);
    },
  });

  //   THis is the function to close the modal
  const handleClose = () => {
    // if updating is pending don't close the modal
    if (mutation.isPending) return;
    // animate the modal
    setAnimate("translate-x-full");
    // delay and close the modal
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  React.useEffect(() => {
    // animate the modal entrance
    setAnimate("");
  }, []);

  return (
    <>
      <ModalWrapperSide handleClose={handleClose} className={`${animate}`}>
        <div className="flex justify-between mb-4  px-3 pt-2">
          <h3 className="text-black/80 font-medium text-sm">Add Student</h3>
          <button
            className=" text-black/50 cursor-pointer"
            type="button"
            onClick={handleClose}
            disabled={mutation.isPending}
          >
            <FaTimesCircle className="text-sm" />
          </button>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{}}
            validationSchema={null}
            onSubmit={() => {}}
          >
            {(props) => {
              return (
                <Form>
                  <div className="relative mb-6">
                    <InputText
                      label="Student ID"
                      name="students_id"
                      disabled={mutation.isPending}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddStudents;
