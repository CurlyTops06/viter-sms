import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import FetchingSpinner from "../../partials/spinners/FetchingSpinner";
import TableLoading from "../../partials/TableLoading";

const ResponsiveTable = ({
  data,
  columns,
  isLoading = false,
  isFetching = false,
  error = false,
}) => {
  const mainCol = columns.find((c) => c.mobileLabel === null);
  const topRightCol = columns.find((c) => c.mobilePosition === "topRight");
  const bodyColumns = columns.filter(
    (c) =>
      c.mobileLabel !== null &&
      c.mobilePosition !== "topRight" &&
      c.mobilePosition !== "bottomRight",
  );
  const bottomRight = columns.find((c) => c.mobilePosition === "bottomRight");

  return (
    <>
      {/* Desktop table */}
      <div className="hidden xl:block overflow-x-auto relative">
        {/* This is for when page is loaded but need to refetch the data */}
        {isLoading && isFetching && <FetchingSpinner />}
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-black">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="100%" className="p-5">
                  {/* Initial Page loading */}
                  <TableLoading cols={2} count={20} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="100%" className="p-5">
                  <ServerError />
                </td>
              </tr>
            ) : data.length == 0 ? (
              <tr>
                <td colSpan="100%" className="p-5">
                  <NoData />
                </td>
              </tr>
            ) : (
              data.map((row, key) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="xl:hidden divide-y divide-gray-100 relative">
        {isLoading && isFetching && <FetchingSpinner />}
        {isLoading ? (
          <div className="p-5 w-full h-full">
            <TableLoading cols={2} count={20} />
          </div>
        ) : error ? (
          <div className="p-5 w-full h-full">
            <ServerError />
          </div>
        ) : data.length == 0 ? (
          <div className="p-5 w-full h-full">
            <NoData />
          </div>
        ) : (
          data.map((row) => (
            <div key={row.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                {mainCol?.render(row)}
                {topRightCol?.render(row)}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  {bodyColumns.map((col) => (
                    <div key={col.key}>
                      <small className="text-xs text-gray-500">
                        {col.mobileLabel}
                      </small>
                      {col.render(row)}
                    </div>
                  ))}
                </div>
                {bottomRight?.render(row)}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ResponsiveTable;
