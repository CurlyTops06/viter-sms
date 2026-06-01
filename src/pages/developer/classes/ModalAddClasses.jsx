import { queryData } from "@/functions/custom-hooks/queryData";
import { InputText } from "@/functions/FormInputs";
import { apiVersion } from "@/functions/functions-general";
import ModalWrapperSide from "@/partials/modal/ModalWrapperSide";
import ButtonSpinner from "@/partials/spinners/ButtonSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";

const ModalAddClasses = ({ itemEdit, setIsOpen }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/classes/classes.php?id=${itemEdit.classes_aid}` //Update Api Path
          : `${apiVersion}/controllers/developer/classes/classes.php`,
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
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  // THis is for the initial values in the modal
  const initVal = {
    classes_grade: itemEdit ? itemEdit.classes_grade : "",
    classes_section: itemEdit ? itemEdit.classes_section : "",
    classes_adviser: itemEdit ? itemEdit.classes_adviser : "",
    classes_number_students: itemEdit ? itemEdit.classes_number_students : "",
  };
  // This is for the validation in the form field
  const yupSchema = Yup.object({
    classes_grade: Yup.string().trim().required("Required."),
    classes_section: Yup.string().trim().required("Required."),
    classes_adviser: Yup.string().trim().required("Required."),
    classes_number_students: Yup.string().trim().required("Required."),
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
            {itemEdit ? "Update" : "Add"} Classes
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
                          label="Classes Grade"
                          name="classes_grade"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Classes Section"
                          name="classes_section"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Classes Adviser"
                          name="classes_adviser"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Classes Number of Students"
                          name="classes_number_students"
                          disabled={mutation.isPending}
                        />
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

export default ModalAddClasses;
