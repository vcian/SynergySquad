import React from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const ChatTable = ({ data, columns }) => {
  const tableColumns = columns.map((column) => <Th>{column}</Th>);
  const tableData = data.map((rowData) => (
    <Tr>
      {Object.keys(rowData).map((key) => (
        <Td>{rowData[key]}</Td>
      ))}
    </Tr>
  ));
  function DownloadJSON2CSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";

      for (var index in array[i]) {
        line += array[i][index] + ",";
      }

      line.slice(0, line.Length - 1);

      str += line + "\r\n";
    }
    window.open("data:text/csv;charset=utf-8," + escape(str));
  }

  function exportToCsv(objArray) {
    var str = "";

    for (var i = 0; i < objArray.length; i++) {
      var line = "";

      for (var index in array[i]) {
        line += array[i][index] + ",";
      }

      line.slice(0, line.Length - 1);

      str += line + "\r\n";
    }

    window.open("data:text/csv;charset=utf-8," + escape(str));
  }

  function exportPdf(data, columns) {
    // function buildTableBody(data, columns) {
    //   var body = [];
    //   debugger;
    //   body.push(columns);

    //   data.forEach(function (row) {
    //     var dataRow = [];

    //     columns.forEach(function (column) {
    //       dataRow.push(row[column].toString());
    //     });

    //     body.push(dataRow);
    //   });

    //   return body;
    // }

    // function table(data, columns) {
    //   return {
    //     table: {
    //       headerRows: 1,
    //       body: buildTableBody(data, columns),
    //     },
    //   };
    // }

    const tableRows = [];
    for (const row of data) {
      const rowsData = [];
      for (const key of Object.keys(row)) {
        rowsData.push(row[key]);
      }
      tableRows.push(rowsData);
    }
    console.log(tableRows);
    console.log(columns);
    let dd = {
      content: [
        {
          table: {
            body: [
              [
                ...columns.map((item) => {
                  return { bold: true, text: item };
                }),
              ],
              ...tableRows,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    pdfmake.createPdf(dd).download("Query.pdf");
  }

  return (
    <div className="flex flex-col gap-2 max-h-full">
      <TableContainer overflowY={true}>
        <Table
          id="data-table"
          variant="simple"
          colorScheme="teal"
          className="border-white"
        >
          <Thead>
            <Tr className="text-white">{tableColumns}</Tr>
          </Thead>
          <Tbody className="text-white">{tableData}</Tbody>
        </Table>
      </TableContainer>
      <div className="flex flex-row gap-4">
        <Button colorScheme="blue" onClick={() => DownloadJSON2CSV(data)}>
          Export To CSV
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            exportPdf(data, columns);
          }}
        >
          Export To PDF
        </Button>
      </div>
    </div>
  );
};

export default ChatTable;
