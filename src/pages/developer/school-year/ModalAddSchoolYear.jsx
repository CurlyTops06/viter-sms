import { queryData } from "@/functions/custom-hooks/queryData";
import { InputText } from "@/functions/FormInputs";
import { apiVersion } from "@/functions/functions-general";
import ModalWrapperSide from "@/partials/modal/ModalWrapperSide";
import ButtonSpinner from "@/partials/spinners/ButtonSpinner";
import { setIsError, setIsSuccess, setMessage } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";

const ModalAddSchoolYear = ({ itemEdit, setIsOpen }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/school-year/school-year.php?id=${itemEdit.school_year_aid}` //Update Api Path
          : `${apiVersion}/controllers/developer/school-year/school-year.php`,
        itemEdit ? "put" : "post", // Post = Create
        values, //The data to be sent
      ),
    onSuccess: (data) => {
      if (data.success) {
        // If success show the message
        dispatch(setIsSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}.`));
        setIsOpen(false);
      } else {
        // If this is error alert/show the error msg
        dispatch(setIsError(true));
        dispatch(setMessage(data.error));
      }
      //This is to refetch the data after update or create
      queryClient.invalidateQueries({ queryKey: ["school-year"] });
    },
  });

  // THis is for the initial values in the modal
  const initVal = {
    school_year_start: itemEdit ? itemEdit.school_year_start : "",
    school_year_end: itemEdit ? itemEdit.school_year_end : "",
  };
  // This is for the validation in the form field
  const yupSchema = Yup.object({
    school_year_start: Yup.string().trim().required("Required."),
    school_year_end: Yup.string().trim().required("Required."),
  });

  //   THis is the function to close the modal
  const handleClose = () => {
    // if updating is pending don't close the modal
    if (mutation.isPending) return;
    // animate the modal
    setAnimate("translate-x-full");
    dispatch(setIsError(false));
    // delay and close the modal
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  React.useEffect(() => {
    // animate the modal entrance
    dispatch(setIsError(false));
    setAnimate("");
  }, []);

  return (
    <>
      <ModalWrapperSide handleClose={handleClose} className={`${animate}`}>
        <div className="flex justify-between mb-4  px-3 pt-2">
          <h3 className="text-black/80 font-medium text-sm">
            {itemEdit ? "Update" : "Add"} School Year
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
              dispatch(setIsError(false));
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
                          label="Year Date Start"
                          name="school_year_start"
                          type="date"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mb-6">
                        <InputText
                          label="Year Date End"
                          name="school_year_end"
                          type="date"
                          min={props.values.school_year_start}
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

export default ModalAddSchoolYear;
