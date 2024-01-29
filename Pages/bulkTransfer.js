import APIhelper from "../APIhelper.js";

const bulkResponse = {
    "issues": [
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "28704",
            "self": "https://selectiva.atlassian.net/rest/api/3/issue/28704",
            "key": "TA-23",
            "fields": {
                "summary": "Session Attended",
                "description": {
                    "version": 1,
                    "type": "doc",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Chrome Extension: "
                                }
                            ]
                        },
                        {
                            "type": "orderedList",
                            "attrs": {
                                "order": 1
                            },
                            "content": [
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Figured out how to make extensions. "
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Discovered how Scrap out web pages content. "
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "Tried integretion with jira (Using Js)."
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "27893",
            "self": "https://selectiva.atlassian.net/rest/api/3/issue/27893",
            "key": "TA-22",
            "fields": {
                "summary": "Test Cases ",
                "description": {
                    "version": 1,
                    "type": "doc",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "inlineCard",
                                    "attrs": {
                                        "url": "https://docs.google.com/spreadsheets/d/1ubXfwUaj-QI8-8EgTl1TjrzwIIobY3xVqzGYXpVP5is/edit?usp=sharing"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": " "
                                }
                            ]
                        },
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Update the test cases on the related sheet."
                                }
                            ]
                        }
                    ]
                }
            }
        },
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "28853",
            "self": "https://selectiva.atlassian.net/rest/api/3/issue/28853",
            "key": "RVBD-2880",
            "fields": {
                "summary": "Attended Session of CPQ",
                "description": {
                    "version": 1,
                    "type": "doc",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Session is conducted by Ketan sir, Raj, and Harshit sir."
                                }
                            ]
                        }
                    ]
                }
            }
        }
    ]
};

class Jira {
    #apiHelper = new APIhelper();

    issueData = null;
    async getBulkIssue(issueKeys) {
        const endPoint = `/rest/api/3/search?fields=summary,description&jql=key%20in%20(${issueKeys})`;
        console.log("Endpoint == ", endPoint);
        const response = await this.#apiHelper.APIcallGET(endPoint);
        console.log('res', response);
        if (response.status == 200) {
            this.issueData = await response.json();
            console.log("Getting issue SUccess data: ", this.issueData);
            $("#uploaded_excel_data").toggleClass("d-none");
        } else {
            console.log("Error in getting issue");
        }
    }

}




$("#upload-excel").click(upload);

let issueKeys = [];
let uploadedSheetData = null;

// Method to upload a valid excel file
function upload() {
    // const files = document.getElementById('file_upload').files;

    const files = $('#formFileSm')[0].files;
    console.log("THe files : ", files);

    if (files.length == 0) {
        alert("Please choose any file...");
        return;
    }

    const filename = files[0].name;
    console.log("filename : ", filename);
    const extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();

    if (extension == '.XLS' || extension == '.XLSX') {
        //Here calling another method to read excel file into json
        excelFileToJSON(files[0]);
        $("#get-issue-btn").toggleClass("d-none");
    } else {
        alert("Please select a valid excel file.");
    }
}


//Method to read excel file and convert it into JSON 
function excelFileToJSON(file) {
    try {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {

            const data = e.target.result;
            const workbook = XLSX.read(data, {
                type: 'binary'
            });
            const firstSheetName = workbook.SheetNames[0];
            //reading only first sheet data
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
            uploadedSheetData = jsonData;
            console.log("data : ", jsonData);
            // console.log("data into string : ", JSON.stringify(jsonData));

            displayJsonToHtmlTable(jsonData);
        }
    } catch (e) {
        console.error(e);
    }
}

let uploadedTableCols = null;

function displayJsonToHtmlTable(jsonData) {
    const table = $("#uploaded_excel_data").eq(0);
    uploadedTableCols = Object.keys(jsonData[0]);

    // console.log("Column name : ", uploadedTableCols);
    if (jsonData.length > 0) {
        let htmlData = '<thead><tr>';
        // getting column name 
        htmlData += '<th scope="col">#</th>';
        uploadedTableCols.forEach((colName) => {
            htmlData += `<th scope="col">${colName}</th>`;
        });
        htmlData += '</tr></thead><tbody>'

        // making rows with data
        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            issueKeys.push(row["Issue Key"]);
            htmlData += `<tr><th scope="row">${i + 1}</th>
            <td><input type="text" column="Issue Key" value="${row["Issue Key"]}" class="border-0"></td>
            <td><input type="text" column="Issue Name" value="${row["Issue Name"]}" class="border-0"></td></tr>`;
        }

        htmlData += '</tbody>';
        table.html(htmlData);
    } else {
        table.html('There is no data in Excel');
    }
}

$("#get-issue-btn").click(function () {
    /* console.log("The issue keys : ", issueKeys);
    console.log("The issue with comma : ", issueKeys.join(","));
    issueKeys = issueKeys.join(",");
    const jira = new Jira();
    jira.getBulkIssue(issueKeys); */

    const table = $("#received-issue-data").eq(0);
    const issueCols = ["Issue Key", "Previous Project", "Summary", "Description", "Transfer Project",];


    // SHowing received issue data
    if (bulkResponse["issues"].length > 0) {
        let htmlData = '<thead><tr>';
        // getting column name 
        htmlData += '<th scope="col">#</th>';
        issueCols.forEach((colName) => {
            htmlData += `<th scope="col">${colName}</th>`;
        });
        htmlData += '</tr></thead><tbody>'

        let i = 0;
        bulkResponse["issues"].forEach((issue) => {

            // making rows with data
            const row = issue["fields"];
            htmlData += `<tr><th scope="row">${i + 1}</th>
                <td><input type="text" column="Issue Key" value="${issue["key"]}" class="border-0"></td>
                <td><input type="text" column="project" value="RVBD" class="border-0"></td>
                <td><input type="text" column="Issue Name" value="${row["summary"]}" class="border-0"></td>`;

            if (row["description"]["content"].length >= 1) {
                htmlData += `<td> <div contenteditable="true" style="width: 232px; outline:0px;">
                      <ol>${(function () {
                        let lines = "";
                        row["description"]["content"].forEach((descriptionLine) => {


                            if (descriptionLine["content"][0]["text"] == "undefined") {
                                lines += ` <li>${descriptionLine["content"][0]["content"]["text"]}</li>`;
                            } else {
                                lines += ` <li>${descriptionLine["content"][0]["text"]}</li>`;
                            }
                        })
                        return lines;
                    })()}</ol></div></td>`;
            }
            i++;

            htmlData += '<td><input type="text" column="Issue Key" value="TA" class="border-0"></td> </tr>';

        })


        htmlData += '</tbody>';
        table.html(htmlData);
    } else {
        alert("bulkResponse is EMPTY")
    }



})


$(document).on("change", "#uploaded_excel_data input", function () {
    // issue keys is change 
    if ($(this).attr('column') == "Issue Key") {
        issueKeys[($(this).parent().siblings().eq(0).text()) - 1] = $(this).val();
    }

    uploadedSheetData[($(this).parent().siblings().eq(0).text()) - 1][$(this).attr('column')] = $(this).val();
    console.log("The real data : ", uploadedSheetData[($(this).parent().siblings().eq(0).text()) - 1][$(this).attr('column')]);

});