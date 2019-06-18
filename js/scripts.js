//Business Logic for AddressBook -----

function AddressBook(){
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i<this.contacts.length; i++) {
    if(this.contacts[i]) {
      if (this.contacts[i].id == id ) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i<this.contacts.length; i++) {
    if(this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for Contacts ----
function Address(emailAddress, homeAddress) {
  this.emailAddress = emailAddress,
  this.homeAddress = homeAddress
}
// Address.prototype.allAddress = function (){
//   return this.emailAddress + " " + this.homeAddress + " " + this.workAddress + " " + this.otherAddress;
// }

function Contact(firstName, lastName, phoneNumber,Address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.Address = Address

}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function (newFirstName){
  this.firstName = newFirstName
}


//User Interface Logic -----
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = " ";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName +" " + contact.lastName + " "+"</li>";
  });
  contactsList.html(htmlForContactInfo)
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.Address.emailAddress);
  $(".home-address").html(contact.Address.homeAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id="+ + contact.id + "> Delete</button>")
}
function attachContactListener(){
  $("ul#contacts").on("click","li",function(){
    showContact(this.id);
    // console.log("This id of this <li> is " + this.id + ".");
  });
  $("#buttons").on("click",".deleteButton",function(){
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function(){
  attachContactListener();
  $("#new-contact").submit(function(event){
    event.preventDefault();
    var inputFirstName = $("input#new-first-name").val();
    var inputLastName = $("input#new-last-name").val();
    var inputPhoneNumber = $("input#new-phone-number").val();
    var inputEmailAddress = $("input#new-email").val();
    var inputHomeAddress = $("input#home-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#home-address").val("");
    var newAddress = new Address(inputEmailAddress,inputHomeAddress);
    var newContact = new Contact(inputFirstName,inputLastName,inputPhoneNumber,newAddress);
    console.log();
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(addressBook.contacts);

  });
});
