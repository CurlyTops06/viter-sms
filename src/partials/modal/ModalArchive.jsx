import React from "react";
import { StoreContext } from "../../store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../functions/custom-hooks/queryData";
import {
  setIsArchive,
  setIsError,
  setIsSuccess,
  setMessage,
} from "../../store/StoreAction";
import { handleEscape } from "../../functions/functions-general";
import { FaQuestion } from "react-icons/fa";
import MessageError from "../MessageError";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalArchive = ({
  endpoint,
  msg,
  successMsg,
  item,
  dataItem = [],
  queryKey,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(endpoint, "put", values),
    onSuccess: (data) => {
      //multiple query key then refetch each query
      if (Array.isArray(queryKey)) {
        queryKey.map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        );
      } else {
        //one query to refetch
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }

      if (data.success) {
        dispatch(setIsSuccess(true));
        dispatch(setMessage(successMsg));
        dispatch(setIsArchive(false));
      } else {
        dispatch(setIsError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleSubmit = async () => {
    mutation.mutate({ ...dataItem, isActive: 0 });
  };
  const handleClose = () => {
    //If ongoing update do not clos modal
    if (mutation.isPending) return;
    dispatch(setIsError(false));
    dispatch(setIsArchive(false));
  };

  handleEscape(() => handleClose());

  React.useEffect(() => {
    dispatch(setIsError(false));
  }, []);

  return (
    <>
      <div
        className="bg-dark/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-99 flex justify-center items-center w-full md:inset-0 max-h-full animate-fadeIn"
        onClick={handleClose}
      >
        <div className="p-1 w-87.5 animate-slideUp">
          <div className="bg-white p-6 pt-10 text-center rounded-lg">
            <FaQuestion className="my-2 mx-auto animate-bounce h-11 w-11 size-11 text-red-600" />
            <p className="text-sm">{msg}</p>
            <p className="text-sm">{item?.msg ?? ""}</p>
            <p className="text-sm font-bold">{item?.name ?? ""}</p>
            {store.isError && <MessageError />}
            <div className="flex items-center gap-1 pt-8">
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={mutation.isPending}
                onClick={handleSubmit}
              >
                {mutation.isPending ? <ButtonSpinner /> : "Confirm"}
              </button>
              <button
                type="reset"
                className="btn-modal-cancel"
                disabled={mutation.isPending}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalArchive;
