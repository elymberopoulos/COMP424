function myFunction() {

    var input= document.getElementById('myInput');
    var filter= input.value.toUpperCase();
    var ul= document.getElementById("faq");
    var li= ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        };
    };
};
myFunction();

var mainApp = {};
(function (){

  var uid = null;
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      uid = user.uid;
    }else{
      uid = null;
      window.location.replace("loggedOut.html");
      }
  });
  function logOut(){
    firebase.auth().signOut();
    console.log("logged out");
  }
  mainApp.logOut = logOut;
})();

document.getElementById('questionForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var question = getInputVal('question');

  // Save message
  saveMessage(name, company, email, phone, question);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('questionForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, question){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    question:question
  });
}
