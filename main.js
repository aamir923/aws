const url = window.location.href;
const replacedURL = url.replace('#', '&');
const finalURL = new URLSearchParams(replacedURL);
var accessToken = finalURL.get('access_token');
var idToken = finalURL.get("id_token");
var UserName, UserEmail, UserId;

// Change - Your region
aws_region = 'ap-south-1';
AWS.config.region = aws_region;

AWS.config.apiVersions = {
    cognitoidentityserviceprovider: '2016-04-18'
};

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

var params = {
    AccessToken: accessToken
};

cognitoidentityserviceprovider.getUser(params, function(err, data) {
    if (err) {
        console.error('Error:', err);
        // Change - Link to the Home Page
        window.location.href = 'https://aamir923.github.io/aws/index.html';
    } else {
        console.log('Full data:', data);
        console.log('User Attributes:', data.UserAttributes);

        // Log all attributes to identify the correct attribute names
        data.UserAttributes.forEach(attribute => {
            console.log(`Attribute Name: ${attribute.Name}, Attribute Value: ${attribute.Value}`);
        });

        for (var i = 0; i < data.UserAttributes.length; i++) {
            if (data.UserAttributes[i].Name === 'name') {
                UserName = data.UserAttributes[i].Value;
                console.log('Found name:', UserName);
            } else if (data.UserAttributes[i].Name === 'email') {
                UserEmail = data.UserAttributes[i].Value;
                console.log('Found email:', UserEmail);
            } else if (data.UserAttributes[i].Name === 'sub') { // 'sub' is the default attribute for userId in Cognito
                UserId = data.UserAttributes[i].Value;
                console.log('Found userId:', UserId);
            }
        }

        // Check if we found the values
        console.log('Final UserName:', UserName);
        console.log('Final UserEmail:', UserEmail);
        console.log('Final UserId:', UserId);

        if (document.getElementById('userName')) {
            document.getElementById('userName').innerHTML = UserName || 'Name not found';
        }
        if (document.getElementById('userEmail')) {
            document.getElementById('userEmail').innerHTML = UserEmail || 'Email not found';
        }

        // Fetch and display tasks
        fetchTasks(UserId);
    }
});
