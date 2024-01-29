import APIhelper from "./APIhelper.js";





class Jira {

  apiHelper = new APIhelper();

  issueData = null;

  async getIssue(issueKey) {
    const endPoint = `/rest/api/3/issue/${issueKey}`;
    const response = await this.apiHelper.APIcallGET(endPoint);
    if (response.status == 200) {
      this.issueData = await response.json();
      console.log("Getting issue SUccess data: ", this.issueData);
    } else {
      console.log("Error in getting issue");
    }
  }


  projectData = null;
  async getProject(projectKey) {
    const endPoint = `/rest/api/3/project/${projectKey}`;
    const response = await this.apiHelper.APIcallGET(endPoint);
    if (response.status == 200) {
      this.projectData = await response.json();
      console.log("Getting project Success data:", this.projectData);
    } else {
      console.log("Error in getting issue");
    }
  }


  async creatingIssue() {
    let issueTypeId = null;

    this.projectData['issueTypes'].forEach(issueType => {
      if (issueType['name'] == this.issueData['fields']['issuetype']['name']) {
        issueTypeId = issueType['id'];
        return;
      }
    });

    // CREATING NEW ISSUE WITH PROJECT PROVIDED AND PREVIOUS ISSUE
    console.log("issueData['fields']['timetracking'] ==", this.issueData['fields']['timetracking']);
    console.log("issueData['fields']['timetracking'] parsed ==", JSON.stringify(this.issueData['fields']['timetracking']));


    let createIssue_body = `{
        "fields": {
          "assignee": {
            "accountId": "${this.issueData['fields']['assignee']['accountId']}"
          },
          "description": ${JSON.stringify(this.issueData['fields']['description'])},
          "issuetype": {
            "id": "${issueTypeId}"
          },
          "project": {
            "id": "${this.projectData['id']}"
          },
          "summary": "${this.issueData['fields']['summary']}",
          "timetracking": {
            "originalEstimate": "2h 10m",
            "remainingEstimate": "2h 10m"
          }
        },
        "update": {}
    }`;

    console.log("The previous issue : ", this.issueData);
    console.log("The project into tranfer : ", this.projectData);
    console.log("The issue id got : ", issueTypeId);
    console.log("The new issue BODY : ", createIssue_body);

    const endPointReq = `/rest/api/3/issue`;
    let request = await this.apiHelper.APIcallPOST(endPointReq, createIssue_body);
    console.log("The REQUEST : ", request);
    let requestData = null;
    if (request.ok) {
      requestData = await request.json();
      console.log("Creating issue Success data:", requestData);
    } else {
      console.log("Error in creating an issue");
    }

  }

}

$("#transfer-current-issueBTN").click(async function () {
  $("#transfer-current-issueBTN").addClass('d-none');
  $("#spinner").removeClass('d-none');

  // ACCEPTING INPUT KEYS THROUGH FIELDS. 
  const inputs = $("input");
  console.log("All the inout tags : ", inputs);


  // const issueKey = inputs[0].value;
  const issueKey = "RVBD-2880";

  const jira = new Jira();



  // GETTING ISSUE
  await jira.getIssue(issueKey);

  // GETTING PROJECT TO TRANSFER 
  const projectKey = "TA";
  await jira.getProject(projectKey);

  // ISSUE TYPE FROM PROJECT WITH CURRENT ISSUE TYPE NAME
  // await jira.creatingIssue()



  console.log("Executed...");
  $("#transfer-current-issueBTN").removeClass('d-none');
  $("#spinner").addClass('d-none');

});

let selectedFields = new Map();

$("#add-fields-btn").click(() => {
  const selectedField = $(".select-field-input option:selected");

  // adding it into map first
  if (selectedField.text() != "Choose...") {
    selectedFields.set(selectedField.attr("value"), selectedField.text());
    selectedField.remove();

    // adding into show selected fields
    $(".selected-fields-holder").append(`<span class="d-inline-block selected-field  p-1 px-2 rounded-pill" value=${selectedField.attr("value")}>${selectedField.text()}
            <button type="button" class="btn-close ms-1" aria-label="Close"></button>
            </span>`);
  }



  console.log("The map is : ", selectedFields);
});

// remove from field selection
$(document).on("click", ".selected-fields-holder .btn-close", function () {
  // again adding it into options
  $(".select-field-input").append(`<option value="${$(this).parent().attr("value")}">${selectedFields.get($(this).parent().attr("value"))}</option>`);

  selectedFields.delete($(this).parent().attr("value"));
  $(this).parent().remove();
  console.log("Removed from map : ", selectedFields);
});


$("#bulk-Transfer").click(function () {
  // window.location.href = "/Pages/bulkTransfer.html ";
  window.open('/Pages/bulkTransfer.html', '_blank')
});