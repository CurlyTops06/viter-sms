import { queryData } from "@/functions/custom-hooks/queryData";
import { InputText } from "@/functions/FormInputs";
import { apiVersion } from "@/functions/functions-general";
import ModalWrapperSide from "@/partials/modal/ModalWrapperSide";
import ButtonSpinner from "@/partials/spinners/ButtonSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const ModalAddTeachers = ({ itemEdit, setIsOpen }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/teachers/teachers.php?id=${itemEdit.teachers_aid}`
          : `${apiVersion}/controllers/developer/teachers/teachers.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      if (data.success) {
        alert(`Successfully ${itemEdit ? "updated" : "added"}.`);
        setIsOpen(false);
      } else {
        alert(data.error);
      }
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  const initVal = {
    teachers_first_name: itemEdit ? itemEdit.teachers_first_name : "",
    teachers_middle_name: itemEdit ? itemEdit.teachers_middle_name : "",
    teachers_last_name: itemEdit ? itemEdit.teachers_last_name : "",
    teachers_subject: itemEdit ? itemEdit.teachers_subject : "",
    teachers_email: itemEdit ? itemEdit.teachers_email : "",
  };

  const yupSchema = Yup.object({
    teachers_first_name: Yup.string().trim().required("Required."),
    teachers_middle_name: Yup.string().trim().required("Required."),
    teachers_last_name: Yup.string().trim().required("Required."),
    teachers_email: Yup.string().trim().required("Required."),
    teachers_subject: Yup.string().trim().required("Required."),
  });

  const handleClose = () => {
    if (mutation.isPending) return;
    setAnimate("translate-x-full");
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);
  return (
    <>
      <ModalWrapperSide handleClose={handleClose} className={`${animate}`}>
        <div className="flex justify-between mb-4  px-3 pt-2">
          <h3 className="text-black/80 font-medium text-sm">
            {itemEdit ? "Update" : "Add"} Teacher
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
                          label="First Name"
                          name="teachers_first_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Middle Name"
                          name="teachers_middle_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Last Name"
                          name="teachers_last_name"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Email"
                          name="teachers_email"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Subject"
                          name="teachers_subject"
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

export default ModalAddTeachers;
