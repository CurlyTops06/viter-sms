const ResponsiveTable = ({ data, columns }) => {
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
      <div className="hidden xl:block overflow-x-auto">
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
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="xl:hidden divide-y divide-gray-100">
        {data.map((row) => (
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
        ))}
      </div>
    </>
  );
};

export default ResponsiveTable;
