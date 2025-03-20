const apiUrl = window.location.href;
const apiReplacedURL = apiUrl.replace('#', '&');
const apiFinalURL = new URLSearchParams(apiReplacedURL);

var api_access_token = apiFinalURL.get('access_token');

var apiBaseUrl = "https://mkwp2b47ng.execute-api.ap-south-1.amazonaws.com/test/test"; // Change to your API Gateway URL

// Function to create a todo
var createTodo = (title, due_date, description) => {
    fetch(apiBaseUrl, {
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "due_date": due_date,
            "description": description
        }),
        headers: {
            'Content-Type': 'application/json',
            'authentication': api_access_token
        },
    })
    .then(response => response.json())
    .then(result => {
        if (result['statusCode'] == 201) {
            alert("Todo Created Successfully");
        } else {
            alert("Error Creating Todo");
            console.log(result);
        }
    })
    .catch(error => console.log('Error:', error));
};

// Function to get a todo by title
var getTodo = (title, callback) => {
    fetch(`${apiBaseUrl}?title=${title}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authentication': api_access_token
        },
    })
    .then(response => response.json())
    .then(result => {
        if (result['statusCode'] == 200) {
            callback(result);
        } else {
            alert("Todo Not Found");
        }
    })
    .catch(error => console.log('Error:', error));
};

// Function to update a todo
var updateTodo = (title, due_date, description) => {
    fetch(apiBaseUrl, {
        method: "PUT",
        body: JSON.stringify({
            "title": title,
            "due_date": due_date,
            "description": description
        }),
        headers: {
            'Content-Type': 'application/json',
            'authentication': api_access_token
        },
    })
    .then(response => response.json())
    .then(result => {
        if (result['statusCode'] == 200) {
            alert("Todo Updated Successfully");
        } else {
            alert("Error Updating Todo");
        }
    })
    .catch(error => console.log('Error:', error));
};

// Function to delete a todo
var deleteTodo = (title) => {
    fetch(`${apiBaseUrl}?title=${title}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'authentication': api_access_token
        },
    })
    .then(response => response.json())
    .then(result => {
        if (result['statusCode'] == 200) {
            alert("Todo Deleted Successfully");
        } else {
            alert("Error Deleting Todo");
        }
    })
    .catch(error => console.log('Error:', error));
};
