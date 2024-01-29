export default class APIhelper {

    #makeHeaders() {
        // Replace these variables with your Jira instance details
        const username = "aman.s@selectiva.io";
        const password =
            "ATATT3xFfGF0r-pXOnLFk79crb0kDxVli-dzz-dt1WxB0igXRkEoWmafMoAQucV5Rwy3FKmoOdwXBIZQdUssXIjpMiPEoI3jK2iyqTYRkCripHJzfw7uAN0mlrfBlozqzAT7VO2ltE2e9Vdkc4u4HOw3E_yYukQyB7L8NQedAng8GHyfHKBa9Fw=D72872FF";

        // Basic authentication headers
        const headers = new Headers({
            Authorization: "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json",
        });
        return headers;
    }

    async APIcallGET(endPoint) {
        // HEADERS for the connection.
        const jiraUrl = "https://selectiva.atlassian.net";
        const apiUrl = jiraUrl + endPoint;

        // Fetching the issue details
        const response = await fetch(apiUrl, {
            // mode: "no-cors",
            method: "GET",
            headers: this.#makeHeaders(),
        });


        return response;

    }

    async APIcallPOST(endPoint, requestBody) {
        // HEADERS for the connection.
        const jiraUrl = "https://selectiva.atlassian.net";
        const apiUrl = jiraUrl + endPoint;

        // Fetching the issue details
        const response = await fetch(apiUrl, {
            method: "POST",
            body: requestBody,
            headers: this.#makeHeaders()
        });


        return response;

    }
}