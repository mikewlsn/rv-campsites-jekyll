// assets/js/script.js
$(document).ready(function () {
  Papa.parse("{{ '/assets/data/campsites.csv' | relative_url }}", {
    download: true,
    header: true,
    complete: function (results) {
      console.log("Parsed CSV:", results.data); // For debugging

      const data = results.data;
      let rowsHtml = "";

      data.forEach((row) => {
        const parkName   = row["Park Name"]   || "";
        const state      = row["State"]       || "";
        const siteType   = row["Site Type"]   || "";
        const maxRvLength = row["Max RV Length"] || "";

        rowsHtml += `
          <tr>
            <td>${parkName}</td>
            <td>${state}</td>
            <td>${siteType}</td>
            <td>${maxRvLength}</td>
          </tr>
        `;
      });

      $("#campsitesTable tbody").html(rowsHtml);

      // Initialize DataTables with export buttons
      $("#campsitesTable").DataTable({
        dom: "Bfrtip",
        buttons: [
          "copyHtml5",
          "csvHtml5",
          "excelHtml5",
          "pdfHtml5"
        ]
      });
    }
  });
});
