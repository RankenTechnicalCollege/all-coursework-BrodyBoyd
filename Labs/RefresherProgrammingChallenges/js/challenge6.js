const userProfile = {
    name: "John Doe",
    email: "JohnD@gmail.com",
    isOnline: true,
    display: function() {
        return `Name: ${this.name}, Email: ${this.email}, Online: ${this.isOnline}`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userProfileOutput').innerText = userProfile.display();
});

document.getElementById('updateNameButton').addEventListener('click', function() {
    let newName = document.getElementById('updateName').value;
    userProfile.name = newName;
    document.getElementById('userProfileOutput').innerText = userProfile.display();
});

document.getElementById('updateEmailButton').addEventListener('click', function() {
    let newEmail = document.getElementById('updateEmail').value;
    userProfile.email = newEmail;
    document.getElementById('userProfileOutput').innerText = userProfile.display();
});