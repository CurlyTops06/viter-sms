import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../functions/functions-general";
import ModalWrapperSide from "../../../partials/modal/ModalWrapperSide";
import { FaTimesCircle } from "react-icons/fa";
import { InputSelect, InputText } from "../../../functions/FormInputs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalAddStudents = ({ itemEdit, setIsOpen }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  //   THis is to refetch the reading data when update is happening
  const queryClient = useQueryClient();
  //   This is the update or create function
  const mutation = useMutation({
    mutationFn: async (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/students/students.php?id=${itemEdit.students_aid}` //Update Api Path
          : `${apiVersion}/controllers/developer/students/students.php`,
        itemEdit ? "put" : "post", // Post = Create
        values, //The data to be sent
      ),
    onSuccess: (data) => {
      if (data.success) {
        // If success show the message
        alert(`Successfully ${itemEdit ? "updated" : "added"}.`);
        setIsOpen(false);
      } else {
        // If this is error alert/show the error msg
        alert(data.error);
      }
      //This is to refetch the data after update or create
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  // THis is for the initial values in the modal
  const initVal = {
    students_id: itemEdit ? itemEdit.students_id : "",
    students_first_name: itemEdit ? itemEdit.students_first_name : "",
    students_middle_name: itemEdit ? itemEdit.students_middle_name : "",
    students_last_name: itemEdit ? itemEdit.students_last_name : "",
    students_grade: itemEdit ? itemEdit.students_grade : "",
    students_section: itemEdit ? itemEdit.students_section : "",
  };
  // This is for the validation in the form field
  const yupSchema = Yup.object({
    students_id: Yup.string().trim().required("Required."),
    students_first_name: Yup.string().trim().required("Required."),
    students_middle_name: Yup.string().trim().required("Required."),
    students_last_name: Yup.string().trim().required("Required."),
    students_grade: Yup.string().trim().required("Required."),
    students_section: Yup.string().trim().required("Required."),
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
          <h3 className="text-black/80 font-medium text-sm">
            {itemEdit ? "Update" : "Add"} Student
          </h3>
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
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form className="h-full">
                  <div className="modal-form-container">
                    <div className="modal-container">
                      <div className="relative mb-6">
                        <InputText
                          label="Student ID"
                          name="students_id"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="First Name"
                          name="students_first_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Middle Name"
                          name="students_middle_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Last Name"
                          name="students_last_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6 text-black">
                        {/* <InputText
                          label="Grade"
                          name="students_grade"
                          disabled={mutation.isPending}
                        /> */}
                        <InputSelect
                          label="Grade"
                          name="students_grade"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select Grade">
                            <option value="" hidden>
                              --
                            </option>
                            <option>Grade 7</option>
                            <option>Grade 8</option>
                            <option>Grade 9</option>
                            <option>Grade 10</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-6 text-black">
                        {/* <InputText
                          label="Section"
                          name="students_section"
                          disabled={mutation.isPending}
                        /> */}
                        <InputSelect
                          label="Section"
                          name="students_section"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select Section">
                            <option value="" hidden>
                              --
                            </option>
                            <option>Section A</option>
                            <option>Section B</option>
                            <option>Section C</option>
                            <option>Section D</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                    </div>
                    <div className="modal-action">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit"
                      >
                        {mutation.isPending ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        onClick={handleClose}
                        disabled={mutation.isPending}
                        className="btn-modal-cancel"
                      >
                        Cancel
                      </button>
                    </div>
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
